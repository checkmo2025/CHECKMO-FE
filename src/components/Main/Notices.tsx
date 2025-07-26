import React from "react";

interface NoticeCardProps {
  title: string;
  date: string;
  book: string;
  type: string;
  imageUrl: string;
}

const NoticeCard = ({ title, date, book, type, imageUrl }: NoticeCardProps) => {
  return (
    <div className="flex h-[23.75rem] px-[1.5rem] py-[1.4375rem] justify-center items-center gap-[0.625rem] rounded-[1rem] border-2 border-[#EAE5E2] bg-white">
      <div className="flex w-[16.5rem] flex-col items-start gap-[1.75rem]">
        {/* 상단 텍스트 및 배지 */}
        <div className="flex items-center gap-[0.75rem] self-stretch">
          {/* 왼쪽 텍스트 영역 */}
          <div className="flex w-[12.5rem] flex-col justify-center items-start gap-[0.5625rem]">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
              <div className="text-gray-700 text-lg font-medium leading-normal font-pretendard">
                {title}
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="text-gray-700 text-xs font-normal leading-none font-pretendard">
                다음 모임 날짜 : {date}
              </div>
              <div className="text-gray-700 text-xs font-normal leading-none font-pretendard">
                다음 모임 책 : {book}
              </div>
            </div>
          </div>

          {/* 우측 배지 및 화살표 이미지 */}
          <div className="flex flex-col items-end justify-between h-full min-h-[4rem]">
            <div className="px-4 py-2 bg-[#90D26D] rounded-2xl flex justify-center items-center">
              <div className="text-white text-xs font-semibold whitespace-nowrap font-pretendard">
                {type}
              </div>
            </div>
            <img
              src="/src/assets/icons/shortcut.png"
              alt="바로가기"
              className="w-4 h-4 mt-2"
            />
          </div>
        </div>

        {/* 이미지 영역 */}
        <div>
          <img
            className="w-[16.375rem] h-[14.5rem] rounded-[1rem] object-cover border"
            src={imageUrl}
            alt="모임 이미지"
          />
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
