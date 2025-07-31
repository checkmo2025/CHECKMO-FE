import React from "react";
import checker from "../../assets/images/checker.png";
import likeIcon from "../../assets/icons/likes.png";
import reportIcon from "../../assets/icons/report.png";

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
}: BookStoriesCardProps): React.ReactElement => {
  return (
    <div className="rounded-[16px] border-[2px] border-[#EAE5E2] overflow-hidden">
      <div className="flex flex-col gap-[10px] p-[28px] h-full">
        <div className="flex gap-[20px] flex-1">
          {/* 왼쪽 이미지 */}
          <div className="w-[200px] h-[290px] object-cover bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={checker}
              alt="book cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 오른쪽 텍스트 영역 */}
          <div className="flex-1 flex flex-col justify-between">
            {/* 상단: 프로필 + 구독 상태 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[8px]">
                <div className="w-[24px] h-[24px] bg-gray-300 rounded-full" />
                <span className="font-pretendard font-normal text-[12px] leading-[145%] text-[#000000]">
                  hy
                </span>
              </div>
              <span className="w-[60px] h-[24px] font-pretendard font-medium text-[12px] leading-[145%] text-white bg-[#A6917D] rounded-[15px] px-[20px] py-[2px] flex items-center justify-center whitespace-nowrap cursor-pointer">
                {state}
              </span>
            </div>

            {/* 제목 + 요약 */}
            <div className="mt-[12px] flex flex-col gap-[14px]">
              <h4 className="font-pretendard font-semibold text-[20px] leading-[135%] text-[#000000]">
                {title}
              </h4>
              <p className="min-w-[10rem] font-pretendard font-normal text-[14px] leading-[145%] text-[#000000] break-words">
                {story}
              </p>
            </div>

            {/* 하단: 좋아요 + 신고 */}
            <div className="mt-auto flex items-center justify-end gap-[11px]">
              <div className="flex items-center gap-[2px]">
                <img
                  src={likeIcon}
                  alt="like"
                  className="w-[20px] h-[20px] cursor-pointer"
                />
                <span className="font-pretendard font-medium text-[12px] text-[#000000]">
                  {likes}
                </span>
              </div>
              <img
                src={reportIcon}
                alt="alert"
                className="w-[20px] h-[20px] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookStoriesCard;
