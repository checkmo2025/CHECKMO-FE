// src/pages/BookClub/ClubSearchPage.tsx
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ClubCard from '../../components/SearchClub/ClubCard';
import Modal from '../../components/Modal';
import Header from '../../components/Header.tsx';
import { useBookClubList } from '../../hooks/useBookClubList';
import { useDebounce } from '../../hooks/useDebounce';
import type { ClubListDto } from '../../types/bookClub';

export default function ClubSearchPage(): React.ReactElement {
  const [query, setQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // 검색 파라미터 구성 (규칙: keyword 없으면 전체 조회)
  const debouncedKeyword = useDebounce(query.trim(), 400);
  const requestParams = useMemo(() => ({
    keyword: debouncedKeyword || undefined,
    region: 0 as 0 | 1,
    participants: 0 as 0 | 1,
    size: 10,
  }), [debouncedKeyword]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useBookClubList(requestParams);

  const flatClubs: ClubListDto[] = useMemo(
    () => data?.pages.flatMap(p => p.clubList) ?? [],
    [data]
  );

  // 가입 신청 처리
  const handleJoinRequest = (_clubId: number, message: string) => {
    if (message === 'already_member') {
      setShowAlert(true);
      return;
    }
  };

  return (
    <>
      <div className="absolute left-[315px] right-[42px] opacity-100">
        <Header pageTitle={'모임 검색하기'}
          notifications={[]}
          customClassName="mt-[30px]"
          />

        <div className='flex flex-col flex-1'>
                {/* ── 검색 바 ── */}
          <div>
              <div className="mt-9 flex items-center h-[53px] py-[10px] px-[17px] rounded-2xl bg-[var(--Color-4,#F4F2F1)]">
                <img src="/assets/material-symbols_search-rounded.svg"
                alt="search" className="w-[33px] h-[33px]" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="검색하기 (모임 명, 지역별 검색, 동아리 대상별 검색)"
                  className="flex-1 bg-transparent outline-none 
                    font-pretendard font-medium text-[18px] leading-[135%] mx-[14px] tracking-[-0.1%]"
                />
            </div>
          </div>

          {/* 운영진 안내, 동아리 리스트 */}
          <div className= "flex flex-col mt-[15px]">
            {/* ── 운영진 안내 & 동아리 신청 버튼 ── */}
            <div className="flex justify-end items-center mr-[20px] mb-[10px] gap-[8px]">
              <span className="
                mr-[15px] font-pretendard font-medium text-[14px]
                leading-[145%] tracking-[-0.1%] text-[#2C2C2C]
                underline underline-offset-2
              ">
                독서모임 운영진이신가요?
              </span>
              <Link
                to="/bookclub/apply"
                className="
                  w-[105px] h-[32px]
                  bg-[#DED6CD] rounded-[16px]
                  px-[12px] py-[5px]
                  font-pretendard font-medium text-[12px] text-[#5C5C5C]
                  leading-[145%] tracking-[-0.1%]
                  flex items-center justify-center
                "
              >
                동아리 신청하기
              </Link>
            </div>

            {/* ── 동아리 리스트 ── */}
            <div className= "flex-col flex items-center space-y-[15px] overflow-y-auto h-[calc(100vh-220px)] w-full"  style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
              onScroll={(e) => {
                const el = e.currentTarget;
                if (hasNextPage && !isFetchingNextPage && el.scrollTop + el.clientHeight >= el.scrollHeight - 40) {
                  fetchNextPage();
                }
              }}
            >
              {status === 'pending' && (
                <div className="py-8 text-sm text-gray-500">로딩 중...</div>
              )}
              {status === 'success' && flatClubs.map(({ club }) => (
                <div key={club.clubId} className='h-full'>
                  <ClubCard
                    id={club.clubId}
                    title={club.name}
                    category={club.category}
                    participantTypes={club.participantTypes}
                    region={club.region}
                    logoUrl={club.profileImageUrl}
                    onJoinRequest={handleJoinRequest}
                  />
                </div>
              ))}
              {status === 'success' && flatClubs.length === 0 && (
                <div className="py-8 text-sm text-gray-500">검색 결과가 없습니다.</div>
              )}
              {isFetchingNextPage && (
                <div className="py-4 text-xs text-gray-400">더 불러오는 중...</div>
              )}
            </div>
          </div>
        </div>
      </div>

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
