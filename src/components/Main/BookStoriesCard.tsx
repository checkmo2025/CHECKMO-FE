import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import checker from "../../assets/images/checker.png";
import likeIcon from "../../assets/icons/heart_empty.png";
import likedIcon from "../../assets/icons/heart_filled.png";
import reportIcon from "../../assets/icons/report.png";
import { toggleBookStoryLike } from "../../apis/BookStory/bookstories";

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

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (loading) return;
    setLoading(true);
    try {
      await toggleBookStoryLike(bookStoryId);
      if (liked) setLikeCount((prev) => prev - 1);
      else setLikeCount((prev) => prev + 1);
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

  const stateClass =
    state === "내 이야기"
      ? "text-white bg-[#4A5568]"
      : state === "구독 중"
      ? "text-white bg-[#A6917D]"
      : "text-[#A6917D] border border-[#A6917D]";

  return (
    <div
      className="rounded-[16px] border-[2px] border-[#EAE5E2] overflow-hidden cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex flex-col gap-[10px] p-[28px] h-full">
        <div className="flex gap-[20px] flex-1">
          {/* 왼쪽 책 이미지 */}
          <div className="w-[200px] h-[290px] bg-gray-100 rounded-lg overflow-hidden">
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
              <span
                className={`w-[60px] h-[24px] font-pretendard font-medium text-[12px] leading-[145%] rounded-[15px] px-[20px] py-[2px] flex items-center justify-center whitespace-nowrap ${stateClass}`}
              >
                {state}
              </span>
            </div>

            {/* 제목 + 요약 */}
            <div className="mt-[12px] flex flex-col gap-[14px]">
              <h4 className="font-pretendard font-semibold text-[20px] leading-[135%] text-[#000000]">
                {title}
              </h4>
              <p className="min-w-[10rem] font-pretendard font-normal text-[14px] leading-[145%] text-[#000000] break-words line-clamp-4">
                {story}
              </p>
            </div>

            {/* 하단: 좋아요 + 신고 */}
            <div className="mt-auto flex items-center justify-end gap-[11px]">
              <div className="flex items-center gap-[2px]" onClick={handleLike}>
                <img
                  src={liked ? likedIcon : likeIcon}
                  alt="like"
                  className="w-[19px] h-[19px] cursor-pointer"
                />
                <span className="font-pretendard font-medium text-[12px] text-[#000000]">
                  {likeCount}
                </span>
              </div>
              <img
                src={reportIcon}
                alt="alert"
                className="w-[19px] h-[19px] cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookStoriesCard;
