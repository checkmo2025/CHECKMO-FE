import React from 'react';
import { format, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';
// import { BOOK_CATEGORIES } from '../../types/dto';
import type { meetingInfoDto } from '../../types/clubNotice';
import calenderIcon from "../../assets/icons/calenderIcon.png";
import mapIcon from "../../assets/icons/mapIcon.png";

interface MeetingNoticeContentProps {
  data: meetingInfoDto;
}

export default function MeetingNoticeContent({ data }: MeetingNoticeContentProps): React.ReactElement {
  const formatMeetingTime = (value: string): string => {
    try {
      const date = parseISO(value);
      if (isNaN(date.getTime())) return value;
      const dateStr = format(date, 'yyyy. M. d.', { locale: ko });
      const dayStr = format(date, 'eee', { locale: ko });
      const timeStr = format(date, 'HH:mm', { locale: ko });
      return `${dateStr} (${dayStr}) ${timeStr}`;
    } catch {
      return value;
    }
  };
  return (
    <div>
      {/* 상단 영역 */}
      <div className="w-full lg:w-[552px] flex flex-col lg:flex-row gap-[16px] lg:gap-[32px] mb-[12px]">
        {/* 왼쪽: 책 이미지 */}
        <div className="flex-shrink-0">
          {data.bookInfo?.imgUrl && (
            <img
              src={data.bookInfo.imgUrl}
              alt="book cover"
              className="w-[140px] h-[204px] md:w-[180px] md:h-[263px] lg:w-[200px] lg:h-[292px] object-cover rounded-[8px]"
            />
          )}
        </div>

        {/* 오른쪽: 정보 */}
        <div className="flex-1 relative">
          {/* 책 제목 */}
          <div className="flex items-center justify-between mb-[6px]">
            <h2 className="font-semibold text-[18px] md:text-[20px] text-[#000000]">
              {data.bookInfo?.title}
            </h2>
          </div>

          {/* 책 정보 */}
          <div className="mb-[20px]">
            <p className="font-normal text-[14px] text-[#8D8D8D]">
            {data.bookInfo?.author ? `${data.bookInfo.author} 지음` : ''}
            </p>
          </div>

          {/* 책 설명 */}
          <div className="flex items-center justify-between">
            <p className="font-normal text-[14px] text-[#000000]">
              {data.content}
            </p>
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-[8px] mt-[12px] lg:mt-0 lg:absolute lg:bottom-[0px]">
            {/* 기수 태그 */}
            {data.generation && (
              <span className="inline-flex items-center justify-center min-w-[54px] px-[18px] h-[24px] bg-[#90D26D] text-white rounded-[15px] font-medium text-[12px]">
                {data.generation}기
              </span>
            )}
            {/* 카테고리 태그 */}
            {data.tag && String(data.tag)
              .split(',')
              .map(tag => tag.trim())
              .filter(Boolean)
              .map((tagLabel, index) => (
                <span
                  key={`${tagLabel}-${index}`}
                  className="inline-flex items-center justify-center min-w-[54px] px-[18px] h-[24px] bg-[#90D26D] text-white rounded-[15px] font-medium text-[12px]"
                >
                  {tagLabel}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* 일정 */}
      <div className="flex flex-col mb-[20px]">
        <h3 className="font-medium text-[18px] text-[#000000]">
          날짜
        </h3>
        <div className="bg-[#F4F2F1] w-full max-w-[1170px] h-auto min-h-[53px] mt-[12px] lg:mt-[19px] rounded-[16px] flex items-center gap-[12px] py-[12px]">
          <img src={calenderIcon} alt="calendar" className="w-[24px] h-[24px] ml-[20px]" />
          <p className="font-medium text-[18px] text-[#000000]">
            {formatMeetingTime(data.meetingTime)}
          </p>
        </div>
      </div>

      {/* 장소 */}
      <div className="flex flex-col mb-[36px]">
        <h3 className="font-medium text-[18px] text-[#000000]">
          장소
        </h3>
        <div className="bg-[#F4F2F1] w-full max-w-[1170px] h-auto min-h-[53px] mt-[12px] lg:mt-[19px] rounded-[16px] flex items-center gap-[12px] py-[12px]">
          <img src={mapIcon} alt="map" className="w-[24px] h-[24px] ml-[20px]" />
          <p className="font-medium text-[18px] text-[#000000]">
            {data.location}
          </p>
        </div>
      </div>

      {/* 하단: 상세 설명 */}
      <div className="w-full max-w-[1170px] h-auto p-[16px] lg:p-[20px] border-[2px] border-[#EAE5E2] rounded-[16px] mb-[36px]">
        <p className="font-medium text-[14px] text-[#2c2c2c] whitespace-pre-line">
          {data.content}
        </p>
      </div>
    </div>
  );
} 