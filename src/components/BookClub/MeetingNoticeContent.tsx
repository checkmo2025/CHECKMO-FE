import React from 'react';
import { BOOK_CATEGORIES } from '../../types/dto';
import type { AnnouncementProps } from '../../types/announcement';
import calenderIcon from "../../assets/icons/calenderIcon.png";
import mapIcon from "../../assets/icons/mapIcon.png";

// 카테고리 ID를 이름으로 변환하는 함수
const getCategoryName = (categoryId: number): string => {
  return BOOK_CATEGORIES[categoryId as keyof typeof BOOK_CATEGORIES] || '기타';
};

interface MeetingNoticeContentProps {
  data: AnnouncementProps;
}

export default function MeetingNoticeContent({ data }: MeetingNoticeContentProps): React.ReactElement {
  return (
    <div>
      {/* 상단 영역 */}
      <div className="w-[552px] flex gap-[32px] mb-[12px]">
        {/* 왼쪽: 책 이미지 */}
        <div className="flex-shrink-0">
          <img
            src={data.imageUrl}
            alt="book cover"
            className="w-[200px] h-[292px] object-cover"
          />
        </div>

        {/* 오른쪽: 정보 */}
        <div className="flex-1 relative">
          {/* 책 제목 */}
          <div className="flex items-center justify-between mb-[6px]">
            <h2 className="font-pretendard font-semibold text-[20px] leading-[135%] tracking-[-0.1%] text-[#000000]">
              {data.book}
            </h2>
          </div>

          {/* 책 정보 */}
          <div className="mb-[20px]">
            <p className="font-pretendard font-normal text-[14px] leading-[145%] tracking-[-0.1%] text-[#8D8D8D]">
              {data.bookAuthor} 지음 | 출판 {data.bookPublisher}
            </p>
          </div>

          {/* 책 설명 */}
          <div className="flex items-center justify-between">
            <p className="font-pretendard font-normal text-[14px] leading-[135%] tracking-[-0.1%] text-[#000000]">
              {data.bookDescription}
            </p>
          </div>

          {/* 태그 */}
          <div className="absolute bottom-[0px] flex flex-wrap gap-[8px]">
            {/* 기수 태그 */}
            {data.generation && (
              <span className="inline-flex items-center justify-center min-w-[54px] px-[18px] h-[24px] bg-[#90D26D] text-white rounded-[15px] font-pretendard font-medium text-[12px] leading-[145%] tracking-[-0.1%]">
                {data.generation}기
              </span>
            )}
            
            {/* 독서 카테고리 태그 */}
            {data.categories?.map((categoryId: number) => (
              <span 
                key={categoryId}
                className="inline-flex items-center justify-center min-w-[54px] px-[16.5px] h-[24px] bg-[#90D26D] text-white rounded-[15px] font-pretendard font-medium text-[12px] leading-[145%] tracking-[-0.1%]"
              >
                {getCategoryName(categoryId)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 일정 */}
      <div className="flex flex-col mb-[20px]">
        <h3 className="font-pretendard font-medium text-[18px] leading-[145%] tracking-[-0.1%] text-[#000000]">
          날짜
        </h3>
        <div className="bg-[#F4F2F1] w-[1080px] h-[53px] mt-[19px] rounded-[16px] flex items-center gap-[12px]">
          <img src={calenderIcon} alt="calendar" className="w-[24px] h-[24px] ml-[20px]" />
          <p className="font-pretendard font-medium text-[18px] leading-[145%] tracking-[-0.1%] text-[#000000]">
            {data.meetingDate}
          </p>
        </div>
      </div>

      {/* 장소 */}
      <div className="flex flex-col mb-[36px]">
        <h3 className="font-pretendard font-medium text-[18px] leading-[145%] tracking-[-0.1%] text-[#000000]">
          장소
        </h3>
        <div className="bg-[#F4F2F1] w-[1080px] h-[53px] mt-[19px] rounded-[16px] flex items-center gap-[12px]">
          <img src={mapIcon} alt="map" className="w-[24px] h-[24px] ml-[20px]" />
          <p className="font-pretendard font-medium text-[18px] leading-[145%] tracking-[-0.1%] text-[#000000]">
            {data.meetingPlace}
          </p>
        </div>
      </div>

      {/* 하단: 상세 설명 */}
      <div className="w-[1080px] h-[622px] p-[20px] border-[2px] border-[#EAE5E2] rounded-[16px] mb-[36px]">
        <p className="font-pretendard font-medium text-[14px] leading-[180%] tracking-[-0.1%] text-[#2c2c2c] whitespace-pre-line">
          {data.description}
        </p>
      </div>
    </div>
  );
} 