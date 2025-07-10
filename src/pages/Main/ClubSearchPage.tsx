// src/pages/BookClub/ClubSearchPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClubCard, { type ClubCardProps } from '../../components/SearchClub/ClubCard';
import checker from '../../assets/images/checker.png';
import searchIcon from '../../assets/images/searchIcon.png';

export default function ClubSearchPage(): React.ReactElement {
  const [query, setQuery] = useState('');

  // 예시 더미 데이터
  const dummyClubs: ClubCardProps[] = [
    { id: 1, title: '모임 명', tags: ['7기','사회'], target: '대학생', region: '서울', logoUrl: checker },
    { id: 2, title: '모임 명', tags: ['7기','사회'], target: '대학생', region: '서울', logoUrl: checker },
    { id: 3, title: '모임 명', tags: ['7기','사회'], target: '대학생', region: '서울', logoUrl: checker },
    { id: 4, title: '모임 명', tags: ['7기','사회'], target: '대학생', region: '서울', logoUrl: checker },
  ];

  // 검색 로직(예시)
  const filtered = dummyClubs.filter(c =>
    c.title.includes(query) ||
    c.region.includes(query) ||
    c.target.includes(query)
  );

  return (
    <div>
              {/* ── 검색 바 ── */}
        <div className="mb-[24px]">
          <div className="w-[1080px] h-[54px] ml-[51px] mt-[36px] flex items-center gap-[10px] bg-[#F4F2F1] rounded-[16px] px-[17px] py-[10px]">
            <img src={searchIcon} alt="search" className="w-[24px] h-[24px]" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="검색하기 (모임 명, 지역별 검색, 동아리 대상별 검색)"
              className="flex-1 bg-transparent outline-none placeholder-gray-400 
                font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]"
            />
        </div>
      </div>

      {/* 운영진 안내, 동아리 리스트 */}
      <div className= "w-[917px] ml-[132.5px] mt-[15px]">
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
        <div className="space-y-[16px]">
          {filtered.map(club => (
            <ClubCard key={club.id} {...club} />
          ))}
        </div>
      </div>
    </div>
  );
}
