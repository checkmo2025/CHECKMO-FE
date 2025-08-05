import React from 'react';
import type { AnnouncementProps } from '../../types/announcement';

interface GeneralNoticeContentProps {
  data: AnnouncementProps;
}

export default function GeneralNoticeContent({ data }: GeneralNoticeContentProps): React.ReactElement {
  return (
    <div className="w-[1080px] h-[622px] p-[20px] border-[2px] border-[#EAE5E2] rounded-[16px] mb-[36px]">
      {/* 제목 영역 */}
        <div className="w-full h-[57px] border-b-[2px] border-[#EEEEEE] mb-[20px]">
          <h3 className="pt-[10px] pb-[20px] pl-[23.5px] font-pretendard font-semibold text-[20px] leading-[145%] tracking-[-0.1%] text-[#000000] ">
            {data.title}
          </h3>
      </div>
      {/* 내용 영역 */}
      <p className="font-pretendard font-medium text-[14px] leading-[180%] tracking-[-0.1%] text-[#2c2c2c] whitespace-pre-line">
        {data.description}
      </p>
    </div>
  );
} 