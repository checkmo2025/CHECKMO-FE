// BookStoriesCard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import checker from "../../assets/images/checker.png";
import likeIcon from "../../assets/icons/heart_empty.png";
import likedIcon from "../../assets/icons/heart_filled_noLine.png";
import reportIcon from "../../assets/icons/report2.png";
import { toggleBookStoryLike } from "../../apis/BookStory/bookstories";
import { axiosInstance } from "../../apis/axiosInstance";

interface BookStoriesCardProps {
  bookStoryId: number;
  title: string;
  story: string;
  state: "내 이야기" | "구독 중" | "구독하기";
  likes: number;
  likedByMe: boolean;
  authorNickname: string;
  authorProfileImageUrl?: string;
  bookCoverImageUrl?: string;
}

const BookStoriesCard = ({
  bookStoryId,
  title,
  story,
  state,
  likes,
  likedByMe,
  authorNickname,
  authorProfileImageUrl,
  bookCoverImageUrl,
}: BookStoriesCardProps): React.ReactElement => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(likedByMe);
  const [likeCount, setLikeCount] = useState(likes);
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(state === "구독 중");

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      await toggleBookStoryLike(bookStoryId);
      setLikeCount((prev) => prev + (liked ? -1 : 1));
      setLiked(!liked);
    } catch (err) {
      console.error("좋아요 처리 실패", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/bookstory/${bookStoryId}/detail`);
  };

  const handleSubscribe = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (subscribed) {
        await axiosInstance.delete(`/members/${authorNickname}/following`);
        setSubscribed(false);
      } else {
        await axiosInstance.post(`/members/${authorNickname}/following`);
        setSubscribed(true);
      }
    } catch (error) {
      console.error("구독 처리 실패", error);
      alert("구독 처리 중 오류가 발생했습니다.");
    }
  };

  const renderStateButton = () => {
    if (state === "내 이야기") {
      return (
        <span className="w-[60px] h-[24px] font-pretendard font-medium text-[12px] leading-[145%] rounded-[15px] px-[20px] py-[2px] flex items-center justify-center whitespace-nowrap text-white bg-[#4A5568] cursor-default">
          내 이야기
        </span>
      );
    }

    if (subscribed) {
      return (
        <button
          onClick={handleSubscribe}
          className="cursor-pointer w-[60px] h-[24px] font-pretendard font-medium text-[12px] leading-[145%] rounded-[15px] px-[20px] py-[2px] flex items-center justify-center whitespace-nowrap text-white bg-[#A6917D]"
        >
          구독 중
        </button>
      );
    }

    return (
      <button
        onClick={handleSubscribe}
        className="cursor-pointer w-[60px] h-[24px] font-pretendard font-medium text-[12px] leading-[145%] rounded-[15px] px-[20px] py-[2px] flex items-center justify-center whitespace-nowrap text-[#A6917D] border border-[#A6917D]"
      >
        구독하기
      </button>
    );
  };

  return (
    <div
      className="hover:shadow-lg hover:scale-[1.03] rounded-[16px] border-[2px] border-[#EAE5E2] overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col gap-[10px] p-[20px] sm:p-[28px] h-full">
        <div className="flex flex-col md:flex-row gap-[10px]">
          {/* 왼쪽 책 이미지 */}
          <div className="w-full md:w-[200px] h-[290px] bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={bookCoverImageUrl ?? checker}
              alt={`${title} 책 표지`}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 오른쪽 텍스트 영역 */}
          <div className="flex-1 flex flex-col justify-between">
            {/* 상단: 프로필 + 상태 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[8px]">
                {authorProfileImageUrl ? (
                  <img
                    src={authorProfileImageUrl}
                    alt={`${authorNickname} 프로필 이미지`}
                    className="w-[24px] h-[24px] rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[24px] h-[24px] bg-gray-300 rounded-full" />
                )}
                <span className="font-pretendard font-normal text-[12px] leading-[145%] text-[#000000]">
                  {authorNickname}
                </span>
              </div>
              {renderStateButton()}
            </div>

            {/* 제목 + 요약 */}
            <div className="mt-[12px] flex flex-col gap-[14px]">
              <h4 className="font-pretendard font-semibold text-[18px] md:text-[20px] leading-[135%] text-[#000000] break-words">
                {title}
              </h4>
              <p className="min-w-[10rem] font-pretendard font-normal text-[14px] leading-[145%] text-[#000000] break-words line-clamp-4">
                {story}
              </p>
            </div>

            {/* 하단: 좋아요 + 신고 */}
            <div className="mt-auto flex items-center justify-end gap-[11px] text-sm">
              <div className="flex items-center gap-[2px]" onClick={handleLike}>
                <img
                  src={liked ? likedIcon : likeIcon}
                  alt="like"
                  className="w-4 h-4 mr-[6px] cursor-pointer"
                />
                <span className="font-pretendard font-medium text-[#000000]">
                  {likeCount}
                </span>
              </div>
              <img src={reportIcon} alt="alert" className="w-[22px] h-[22px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookStoriesCard;
