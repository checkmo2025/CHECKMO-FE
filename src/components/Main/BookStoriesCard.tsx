import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import checker from "../../assets/images/checker.png";
import likeIcon from "../../assets/icons/heartEmpty.png";
import likedIcon from "../../assets/icons/heartFilled.png";
import reportIcon from "../../assets/icons/report3.png";
import { toggleBookStoryLike } from "../../apis/BookStory/bookstories";
import { axiosInstance } from "../../apis/axiosInstance";
import noUserImage from "../../assets/images/userImage.png";

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
  const [subscribeLoading, setSubscribeLoading] = useState(false);

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
    if (subscribeLoading) return;
    setSubscribeLoading(true);
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
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <div
      className="rounded-[16px] border-2 border-[#EAE5E2] overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.03] transition-all duration-300 origin-center w-full"
      onClick={handleCardClick}
      role="button"
    >
      <div className="flex flex-col md:flex-row gap-4 p-7 h-full">
        {/* 왼쪽 책 이미지 */}
        <div className="w-full md:w-[200px] h-[290px] bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={bookCoverImageUrl || checker}
            alt={`${title} 책 표지`}
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 오른쪽 텍스트 영역 */}
        <div className="flex-1 flex flex-col">
          {/* 상단: 프로필 + 상태 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src={authorProfileImageUrl || noUserImage}
                alt={`${authorNickname} 프로필 이미지`}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-medium text-sm text-[#000000]">
                {authorNickname}
              </span>
            </div>
            <button
              type="button"
              className={`w-[60px] h-[24px] font-medium text-[12px] rounded-[15px] px-5 py-0.5 flex items-center justify-center whitespace-nowrap transition-colors duration-200 ${
                state === "내 이야기"
                  ? "cursor-default text-[#A6917D] bg-[#DED6CD]"
                  : `cursor-pointer ${
                      subscribed
                        ? "bg-[#A6917D] text-white hover:bg-[#8c7a69]"
                        : "bg-white text-[#A6917D] border border-[#A6917D] hover:bg-[#A6917D] hover:text-white"
                    } ${
                      subscribeLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`
              }`}
              onClick={state !== "내 이야기" ? handleSubscribe : undefined}
              disabled={state === "내 이야기" || subscribeLoading}
            >
              {state === "내 이야기"
                ? "내 이야기"
                : subscribeLoading
                ? "..."
                : subscribed
                ? "구독 중"
                : "구독"}
            </button>
          </div>

          {/* 제목 + 요약 */}
          <div className="mt-2 flex flex-col gap-1">
            <h4 className="font-pretendard font-semibold text-xl text-[#000000] break-words">
              {title}
            </h4>
            <p
              className="font-normal text-sm text-[#000000] break-words overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              {story}
            </p>
          </div>

          {/* 하단: 좋아요 + 신고 */}
          <div className="mt-auto flex items-center justify-end gap-2.5">
            <button
              type="button"
              className="flex items-center gap-1 cursor-pointer"
              onClick={handleLike}
            >
              <img
                src={liked ? likedIcon : likeIcon}
                alt={liked ? "liked" : "not liked"}
                className="w-6 h-6"
              />
              <span className="font-medium text-sm text-[#000000]">
                {likeCount}
              </span>
            </button>
            <img
              src={reportIcon}
              alt="report"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookStoriesCard;
