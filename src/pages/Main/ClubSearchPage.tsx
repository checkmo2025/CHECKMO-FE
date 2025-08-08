// src/pages/BookClub/ClubSearchPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClubCard, { type ClubCardProps } from '../../components/SearchClub/ClubCard';
import ClubJoinAlertModal from '../../components/SearchClub/ClubJoinAlertModal';
import checker from '../../assets/images/checker.png';
import Header from '../../components/Header.tsx';

export default function ClubSearchPage(): React.ReactElement {
  const [query, setQuery] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // 예시 더미 데이터
  const dummyClubs: ClubCardProps[] = [
    { 
      id: 1, 
      title: '북적북적 독서모임', 
      category: [6], // 인문학
      participantTypes: ['STUDENT'], 
      region: '서울', 
      logoUrl: checker 
    },
    { 
      id: 2, 
      title: '책을모아', 
      category: [9, 10], // 사회과학, 정치/외교/국방
      participantTypes: ['WORKER'], 
      region: '부산', 
      logoUrl: checker 
    },
    { 
      id: 3, 
      title: '슬기로운 독서생활', 
      category: [2, 3, 7], // 소설/시/희곡, 에세이, 여행
      participantTypes: ['STUDENT'], 
      region: '대구', 
      logoUrl: checker 
    },
    { 
      id: 4, 
      title: '독서재량', 
      category: [4, 5], // 경제/경영, 자기계발
      participantTypes: ['WORKER'], 
      region: '서울', 
      logoUrl: checker 
    },
    { 
      id: 5, 
      title: '책사랑', 
      category: [8], // 역사/문화
      participantTypes: ['STUDENT'], 
      region: '인천', 
      logoUrl: checker 
    },
    { 
      id: 6, 
      title: '독서모임', 
      category: [11, 12], // 컴퓨터/IT, 과학
      participantTypes: ['STUDENT'], 
      region: '서울', 
      logoUrl: checker 
    },
    { 
      id: 7, 
      title: '책읽는 사람들', 
      category: [13, 14], // 외국어, 예술/대중문화
      participantTypes: ['WORKER'], 
      region: '광주', 
      logoUrl: checker 
    },
  ];

  // 검색 로직(예시)
  const filtered = dummyClubs.filter(c =>
    c.title.includes(query) ||
    c.region.includes(query) ||
    c.participantTypes.some(type => type.includes(query))
  );

  // 가입 신청 처리
  const handleJoinRequest = (clubId: number, message: string) => {
    if (message === 'already_member') {
      setAlertMessage('이미 가입한 독서모임입니다.');
      setShowAlert(true);
      return;
    }
  };

  return (
    <>
      <div className="absolute left-[315px] right-[42px] opacity-100">
        <Header pageTitle={'모임 검색하기'} userProfile={{
            username: 'dayoun',
            bio: '아 피곤하다.'
          }} 
          notifications={[]}
          customClassName="mt-[30px]"
          />

        <div className='flex flex-col flex-1'>
                {/* ── 검색 바 ── */}
          <div>
              <div className="mt-9 flex items-center h-[53px] py-[10px] px-[17px] rounded-2xl bg-[var(--Color-4,#F4F2F1)]">
                <img src="/assets/material-symbols_search-rounded.svg" // PNG파일이 좀 연하더라고요~
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
            >
              {filtered.map(club => (
                <div key={club.id} className='h-full'>
                  <ClubCard {...club} onJoinRequest={handleJoinRequest} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 알림 모달 */}
      {showAlert && (
        <ClubJoinAlertModal
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </>
  );
}
