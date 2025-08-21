// src/pages/BookClub/ClubSearchPage.tsx
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import ClubCard from '../../components/SearchClub/ClubCard';
import Modal from '../../components/Modal';
import Header from '../../components/Header.tsx';
import { useBookClubList } from '../../hooks/useBookClubList';
import { useDebounce } from '../../hooks/useDebounce';
import type { ClubListDto } from '../../types/bookClub';
import { useClubJoin } from '../../hooks/useClubJoin';
import { PARTICIPANT_TYPES } from '../../types/bookClub';
import { AnimatePresence, motion } from 'framer-motion';
import toggleOpen from '../../assets/icons/toggleOpen.png';
import toggleClose from '../../assets/icons/toggleClose.png';
import { fetchMyClubs, type ClubDto as MyClubDto } from '../../apis/Main/clubs';
import alertCircle from '../../assets/icons/alert_circle_loop.png';

export default function ClubSearchPage(): React.ReactElement {
  // ── 검색 상태
  const [query, setQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // ── 필터 상태 (체크박스/드롭다운)
  const [isNameChecked, setIsNameChecked] = useState<boolean>(false);
  const [isRegionChecked, setIsRegionChecked] = useState<boolean>(false);
  const [participant, setParticipant] = useState<string>('전체');
  const [isParticipantOpen, setIsParticipantOpen] = useState<boolean>(false);

  // ── 드롭다운 외부 클릭/ESC 닫기 ref
  const participantDropdownRef = useRef<HTMLDivElement | null>(null);

  // 검색 파라미터 구성 (규칙: keyword 없으면 전체 조회)
  const debouncedKeyword = useDebounce(query.trim(), 400);
  // ── 서버 요청 파라미터: 키워드 + (이름/지역) 범위 선택
  // 규칙
  // - 대상(참여 대상)은 서버 파라미터에 포함하지 않고, 클라이언트에서만 필터링
  // - 이름, 지역 둘 다 미선택 시: 둘 다 검색 범위로 간주 (교집합 적용을 위해 서버에 둘 다 1로 전달)
  const requestParams = useMemo(() => {
    const noneSelected = !isNameChecked && !isRegionChecked;
    const nameFlag: 0 | 1 = (isNameChecked || noneSelected) ? 1 : 0;
    const regionFlag: 0 | 1 = (isRegionChecked || noneSelected) ? 1 : 0;

    const keyword: string | undefined = debouncedKeyword ? debouncedKeyword : undefined;

    return {
      keyword,
      name: nameFlag,
      region: regionFlag,
      size: 10,
    };
  }, [debouncedKeyword, isNameChecked, isRegionChecked]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } = useBookClubList(requestParams);

  // ── 클라이언트 보정: 대상 선택 시 participantTypes 교집합 필터
  const flatClubs: ClubListDto[] = useMemo(() => {
    const list = data?.pages.flatMap(p => p.clubList) ?? [];
    if (participant !== '전체') {
      return list.filter(({ club }) => (club.participantTypes || []).includes(participant));
    }
    return list;
  }, [data, participant]);

  const { mutate: joinClub } = useClubJoin();

  // 내가 가입한 북클럽 목록 조회
  const { data: myClubs } = useQuery<MyClubDto[], Error>({
    queryKey: ['myClubs'],
    queryFn: fetchMyClubs,
    staleTime: 60 * 1000,
  });

  // 드롭다운: 바깥 클릭/ESC 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isParticipantOpen) return;
      const target = e.target as Node;
      if (participantDropdownRef.current && !participantDropdownRef.current.contains(target)) {
        setIsParticipantOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isParticipantOpen) return;
      if (e.key === 'Escape') setIsParticipantOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isParticipantOpen]);

  // 무한 스크롤: 페이지 하단 sentinel 관찰 (브라우저 외부 스크롤바 기준)
  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || status !== 'success') return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });
    const el = loadMoreRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, status]);

  // 가입 신청 처리
  const handleJoinRequest = (clubId: number, message: string) => {
    if (message === 'already_member') {
      setShowAlert(true);
      return;
    }
    if (message === 'no_message') {
      alert('가입 메시지를 작성해주세요.');
      return;
    }
    joinClub({ clubId, joinMessage: message });
  };

  return (
    <>
      <main className="w-full px-4 sm:px-[42px]">
        <div className="sticky top-0 z-20 bg-[#FFFFFF] pt-4 sm:pt-[30px] pb-[1px]">
          <Header pageTitle={'모임 검색하기'}
            customClassName="!mt-0"
          />

          <div className="w-full">
            {myClubs && myClubs.length === 0 && (
              <div className="mt-2 sm:mt-0 sm:absolute sm:top-[73px] sm:left-0 flex items-center justify-start gap-[10px] text-left w-full">
                <img src={alertCircle} alt="alert" className="w-[24px] h-[24px]" />
                <p className="text-[14px] text-[#FF8045] font-medium truncate max-w-[280px] sm:max-w-[700px]">
                  아직 모임에서 활동중이 아니시군요! 책모에서 다양한 독서 동아리에 가입해보세요!
                </p>
              </div>
            )}

            {/* ── 검색 바 ── */}
            <div className="mt-5 flex items-center w-full max-w-[1170px] h-[44px] sm:h-[53px] py-[8px] sm:py-[10px] px-[14px] sm:px-[17px] rounded-2xl bg-[var(--Color-4,#F4F2F1)] mx-auto">
              <img src="/assets/material-symbols_search-rounded.svg"
                alt="search" className="w-[24px] h-[24px]" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="검색하기 (모임 명, 지역별 검색)"
                className="flex-1 bg-transparent outline-none 
                  font-medium text-[16px] sm:text-[18px] mx-3 sm:mx-[14px]"
              />
            </div>

            {/* 검색 필터 영역 */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mt-2 mb-2 sm:mt-[10px] sm:mb-[10px] px-2 sm:px-0">
              <div className="flex items-center gap-[12px]">
                <div ref={participantDropdownRef} className="cursor-pointer relative flex items-center gap-[6px]">
                  <button
                    type="button"
                    onClick={() => setIsParticipantOpen((v) => !v)}
                    className="cursor-pointer w-[40px] h-[32px] text-[14px] text-[#5C5C5C] font-medium text-left flex items-center justify-start"
                    aria-haspopup="listbox"
                    aria-expanded={isParticipantOpen}
                  >
                    {participant === '전체'
                      ? '전체'
                      : PARTICIPANT_TYPES[participant as keyof typeof PARTICIPANT_TYPES]}
                  </button>
                  <button
                    type="button"
                    aria-label="대상 열고 닫기"
                    onClick={() => setIsParticipantOpen((v) => !v)}
                    className={"cursor-pointer w-[20px] h-[20px] flex items-center justify-center"}
                    aria-expanded={isParticipantOpen}
                  >
                    <img
                      src={isParticipantOpen ? toggleClose : toggleOpen}
                      alt={isParticipantOpen ? '대상 목록 닫기' : '대상 목록 열기'}
                      className="w-[12px] h-[12px]"
                    />
                  </button>
                  <AnimatePresence>
                    {isParticipantOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="absolute -left-[4px] top-full mt-[6px] z-10 w-[70px] rounded-[4px] bg-[var(--Gray7,#EEE)] overflow-hidden"
                      >
                        <div className="py-[10px] pr-[20px] pl-[10px] flex flex-col items-start gap-[4px]">
                          <button
                            type="button"
                            className={`cursor-pointer text-[14px] ${participant === '전체' ? 'text-[#5C5C5C]' : 'text-[#BBBBBB]'}`}
                            onClick={() => {
                              setParticipant('전체');
                              setIsParticipantOpen(false);
                            }}
                          >
                            전체
                          </button>
                          {Object.entries(PARTICIPANT_TYPES).map(([key, label]) => (
                            <button
                              key={key}
                              type="button"
                              className={`cursor-pointer text-[14px] ${participant === key ? 'text-[#5C5C5C]' : 'text-[#BBBBBB]'}`}
                              onClick={() => {
                                setParticipant(key);
                                setIsParticipantOpen(false);
                              }}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <label
                  className="flex items-center gap-[6px] text-[14px] text-[#5C5C5C] font-medium cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsNameChecked((v) => !v);
                  }}
                >
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isNameChecked}
                    onChange={(e) => setIsNameChecked(e.target.checked)}
                  />
                  <span className="w-[24px] h-[24px] rounded-full border-[2px] border-[#BBBBBB] peer-checked:border-[#90D26D] peer-checked:bg-[#90D26D] transition-colors"></span>
                  모임 명
                </label>
                <label
                  className="flex items-center gap-[6px] text-[14px] text-[#5C5C5C] font-medium cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsRegionChecked((v) => !v);
                  }}
                >
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isRegionChecked}
                    onChange={(e) => setIsRegionChecked(e.target.checked)}
                  />
                  <span className="w-[24px] h-[24px] rounded-full border-2 border-[#BDBDBD] peer-checked:border-[#90D26D] peer-checked:bg-[#90D26D] transition-colors"></span>
                  지역별
                </label>
              </div>

              <div className="hidden sm:flex items-center gap-2 sm:w-auto sm:justify-end">
                <span className="
                  hidden lg:inline whitespace-nowrap
                  mr-[15px] font-medium text-[14px]
                  text-[#2C2C2C]
                  underline underline-offset-2
                ">
                  독서모임 운영진이신가요?
                </span>
                <Link
                  to="/createClub"
                  className="
                    w-[115px] h-[32px]
                    bg-[#DED6CD] rounded-[16px]
                    px-[12px] py-[5px]
                    font-medium text-[12px] text-[#5C5C5C]
                    flex items-center justify-center text-center shrink-0
                    hover:bg-[#A6917D] hover:text-white transition-colors
                  "
                >
                  독서모임 생성하기
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 동아리 리스트 */}
        <section className="w-full">
          <div className="w-full max-w-[916px] mx-auto px-4 sm:px-2 flex flex-col items-stretch space-y-[15px]">
            {status === 'pending' && (
              <div className="py-8 text-sm text-gray-500">로딩 중...</div>
            )}
            {status === 'error' && (
              <div className="py-8 text-sm text-red-500">
                데이터를 불러오는 중 오류가 발생했습니다.
                {error?.message && <p className="text-xs mt-2">{error.message}</p>}
              </div>
            )}
            {status === 'success' && flatClubs.map(({ club, member }) => (
              <div key={club.clubId} className='h-full w-full'>
                <ClubCard
                  id={club.clubId}
                  title={club.name}
                  category={club.category}
                  participantTypes={club.participantTypes}
                  region={club.region}
                  logoUrl={club.profileImageUrl}
                  insta={club.insta}
                  kakao={club.kakao}
                  isMember={member}
                  onJoinRequest={handleJoinRequest}
                />
              </div>
            ))}
            {status === 'success' && flatClubs.length === 0 && (
              <div className="py-8 text-sm text-gray-500">검색 결과가 없습니다.</div>
            )}
            <div ref={loadMoreRef} className="h-[1px]" />
            {isFetchingNextPage && (
              <div className="w-full py-4 flex items-center justify-center">
                <p className="text-[#969696]">더 불러오는 중...</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* 알림 모달 */}
      {showAlert && (
        <Modal
          isOpen={showAlert}
          title="이미 가입한 독서모임입니다."
          buttons={[
            {
              label: "돌아가기",
              onClick: () => setShowAlert(false),
              variant: "primary"
            }
          ]}
          onBackdrop={() => setShowAlert(false)}
        />
      )}
    </>
  );
}
