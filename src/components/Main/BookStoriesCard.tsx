import React from "react";

interface BookStoriesCardProps {
  title: string;
  story: string;
  state: string;
  likes: number;
}

const BookStoriesCard = ({
  title,
  story,
  state,
  likes,
}: BookStoriesCardProps) => {
  return (
    <div className="flex flex-col w-[33rem] h-[20.75rem] px-[1.3125rem] py-[1.1875rem] justify-center items-center gap-[0.625rem] rounded-[0.9375rem] border-2 border-[#EAE5E2] bg-white">
      {/* 내부 콘텐츠 영역 (이미지 + 텍스트) */}
      <div className="flex items-center gap-[1.25rem] self-stretch">
        {/* 왼쪽 이미지 */}
        <img
          className="w-[12.5rem] h-[18.125rem] object-cover rounded-[0.5rem]"
          src="https://placehold.co/200x290"
          alt="책 이미지"
        />

        {/* 오른쪽 텍스트 영역 */}
        <div className="flex w-[16rem] flex-col justify-center items-end gap-[4.875rem]">
          {/* 상단: 프로필 + 구독 + 제목 + 내용 */}
          <div className="flex flex-col justify-end items-end gap-[0.75rem] self-stretch">
            {/* 프로필 + 구독 */}
            <div className="flex justify-between items-center self-stretch">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-300 rounded-full" />
                <div className="text-gray-700 text-sm font-normal font-pretendard leading-tight">
                  hy
                </div>
              </div>
              <div className="flex w-auto h-[1.5rem] px-5 py-[0.125rem] justify-center items-center gap-[0.625rem] bg-[#A6917D] rounded-[0.9375rem]">
                <div className="text-white text-xs font-semibold font-pretendard leading-none whitespace-nowrap">
                  {state}
                </div>
              </div>
            </div>

            {/* 제목 + 내용 */}
            <div className="flex flex-col items-start gap-[0.875rem] self-stretch">
              <div className="text-gray-800 text-xl font-semibold font-pretendard leading-7">
                {title}
              </div>
              <div className="text-gray-700 text-sm font-normal font-pretendard leading-tight self-stretch">
                {story}
              </div>
            </div>
          </div>

          {/* 하단: 좋아요 / 신고 */}
          <div className="flex w-[7.5rem] justify-end items-end gap-[0.6875rem]">
            <div className="flex items-center gap-[0.125rem]">
              <img
                src="/src/assets/icons/likes.png"
                alt="좋아요"
                className="w-5 h-5"
              />
              <div className="text-gray-700 text-xs font-medium font-pretendard leading-none">
                {likes}
              </div>
            </div>
            <img
              src="/src/assets/icons/report.png"
              alt="신고"
              className="w-5 h-5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookStoriesCard;
