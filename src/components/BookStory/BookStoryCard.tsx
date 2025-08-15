import { useState } from "react";
import heartEmpty from "../../assets/icons/heart_empty.png";
import heartFilled from "../../assets/icons/heart_filled.png";
import reportIcon from "../../assets/icons/report.png";
import { toggleBookStoryLike } from "../../apis/BookStory/bookstories";
import { axiosInstance } from "../../apis/axiosInstance";

interface BookStoryCardProps {
  bookStoryId: number;
  imageUrl: string;
  profileUrl: string;
  userName: string;
  isSubscribed: boolean;
  title: string;
  summary: string;
  bookTitle: string;
  author: string;
  likes: number;
  likedByMe: boolean;
  viewMode?: "grid" | "list";
  onToggleLike: (storyId: number, liked: boolean) => void;
  onToggleSubscribe: (nickname: string, subscribed: boolean) => void;
}

const BookStoryCard = ({
  bookStoryId,
  imageUrl,
  profileUrl,
  userName,
  isSubscribed,
  title,
  summary,
  bookTitle,
  author,
  likes,
  likedByMe,
  viewMode = "grid",
  onToggleLike,
  onToggleSubscribe,
}: BookStoryCardProps) => {
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const [liked, setLiked] = useState(likedByMe);
  const [likeCount, setLikeCount] = useState(likes);

  const handleSubscribe = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (subscribed) return;
    try {
      await axiosInstance.post(`/members/${userName}/following`);
      setSubscribed(true);
      onToggleSubscribe(userName, true);
    } catch (error) {
      console.error("팔로우 실패", error);
      alert("팔로우에 실패했습니다.");
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await toggleBookStoryLike(bookStoryId);
      const newLiked = !liked;
      setLiked(newLiked);
      setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
      onToggleLike(bookStoryId, newLiked);
    } catch (error) {
      console.error("좋아요 처리 실패", error);
    }
  };

  const isList = viewMode === "list";

  return (
    <div
      className={`rounded-xl shadow-sm bg-white p-4 w-full flex ${
        isList ? "gap-4" : "gap-6"
      } min-w-0`}
    >
      {/* 이미지 */}
      <div
        className={`${
          isList ? "w-[11rem] h-[15.5rem]" : "w-[12.5rem] h-[18.125rem]"
        } bg-gray-200 rounded-md overflow-hidden flex-shrink-0`}
      >
        <img src={imageUrl} alt="book" className="w-full h-full object-cover" />
      </div>

      {/* 내용 */}
      <div className="flex flex-col justify-between flex-1 text-left">
        <div className="flex flex-col gap-1">
          {/* 프로필 & 구독 버튼 */}
          <div className="flex justify-between items-center text-sm text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <img
                src={profileUrl}
                alt="profile"
                className="w-6 h-6 rounded-full"
              />
              <span className="font-medium">{userName}</span>
            </div>

            <button
              className={`text-xs rounded-[0.9375rem] px-[1rem] py-[0.25rem] w-[4.2rem] inline-flex justify-center ${
                subscribed
                  ? "text-white bg-[#A6917D]"
                  : "text-[#A6917D] border border-[#A6917D]"
              }`}
              onClick={handleSubscribe}
            >
              {subscribed ? "구독 중" : "구독"}
            </button>
          </div>

          {/* 제목, 요약 */}
          <div className="text-base font-semibold">{title}</div>
          <div className="text-sm text-gray-700 line-clamp-2">{summary}</div>

          {/* 책 정보 */}
          <div className="text-xs text-gray-500 mt-1">
            도서 : {bookTitle} | {author}
          </div>
        </div>

        {/* 좋아요 & 신고 */}
        <div className="flex gap-4 mt-3 text-sm text-gray-600 items-center justify-end">
          <div
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleLike}
          >
            <img
              src={liked ? heartFilled : heartEmpty}
              alt="like"
              className="w-4 h-4"
            />
            <span>{likeCount}</span>
          </div>
          <img
            src={reportIcon}
            alt="report"
            className="w-[19px] h-[19px] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default BookStoryCard;
