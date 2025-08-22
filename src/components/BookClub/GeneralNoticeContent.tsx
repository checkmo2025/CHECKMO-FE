import React from 'react';
import type { generalNoticeItemDto } from '../../types/clubNotice';

interface GeneralNoticeContentProps {
  data: generalNoticeItemDto;
}

export default function GeneralNoticeContent({ data }: GeneralNoticeContentProps): React.ReactElement {
  return (
    <div className="w-full max-w-[1150px] h-auto min-h-[550px] py-[16px] lg:py-[20px] px-[8px] lg:px-[18px] border-[2px] border-[#EAE5E2] rounded-[16px] mb-[36px] mr-[-1px] ml-[-1px]">
      {/* 제목 영역 */}
        <div className="w-full h-auto min-h-[57px] border-b-[2px] border-[#EEEEEE] mb-[20px]">
          <h3 className="pt-[10px] pb-[20px] pl-[23.5px] font-semibold text-[20px] text-[#000000] ">
            {data.title}
          </h3>
      </div>
      {/* 내용 영역 */}
      <p className="pl-[23.5px] font-medium text-[14px] text-[#2c2c2c] whitespace-pre-line">
        {data.content}
      </p>
    </div>
  );
} 