import React, { useState } from "react";
import checker from "../../assets/images/checker.png";
import emptyHeartIcon from "../../assets/icons/heart_empty_bigger.png";
import filledHeartIcon from "../../assets/icons/heart_filled_noLine.png";
import sirenIcon from "../../assets/images/siren.png";
import { toggleBookStoryLike } from "../../apis/BookStory/bookstories";
import { followMember } from "../../apis/otherApi";
import { unfollowMember } from "../../apis/My/memberApi";

export interface BookStoryCardProps {
  userImage: string;
  userName: string;
  isSubscribed: boolean;
  title: string;
  summary: string;
  likes: number;
  bookImageUrl?: string;
  likedByMe?: boolean;
  onClick?: () => void;
  bookStoryId: number;
}

export default function BookStoryCard({
  userImage,
  userName,
  isSubscribed,
  title,
  summary,
  likes,
  bookImageUrl,
  likedByMe = false,
  onClick,
  bookStoryId,
}: BookStoryCardProps): React.ReactElement {

  const avatar = userImage || "/default-avatar.png";
  
  // 좋아요 상태 관리
  const [liked, setLiked] = useState(likedByMe);
  const [likeCount, setLikeCount] = useState(likes);
  const [loading, setLoading] = useState(false);

  // 구독 상태 관리
  const [subscribed, setSubscribed] = useState(isSubscribed);
  const [subscribeLoading, setSubscribeLoading] = useState(false);

  // 좋아요 처리 함수
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

  // 구독/구독취소 처리 함수
  const handleSubscribe = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (subscribeLoading) return;
    
    setSubscribeLoading(true);
    try {
      if (subscribed) {
        // 구독 취소
        await unfollowMember(userName);
        setSubscribed(false);
      } else {
        // 구독하기
        await followMember(userName);
        setSubscribed(true);
      }
    } catch (err) {
      console.error("구독 처리 실패", err);
      alert(`${subscribed ? "구독 취소" : "구독"}에 실패했습니다. 다시 시도해주세요.`);
    } finally {
      setSubscribeLoading(false);
    }
  };

  return (
    <div
      className="
        rounded-[16px]
        border-[2px] border-[#EAE5E2]
        overflow-hidden
        cursor-pointer
        hover:shadow-lg hover:scale-[1.03] transition-all duration-300 origin-center
        w-full
      "
      onClick={onClick}
      role="button"
    >
      <div className="flex flex-col gap-[10px] p-[28px] h-full">
        <div className="flex gap-[12px] flex-1">
          <div className="w-[200px] h-[290px] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={bookImageUrl || checker}
              alt="book cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[8px]">
                <img
                  src={avatar}
                  alt={userName}
                  className="w-[24px] h-[24px] rounded-full"
                />
                <span
                  className="
                    font-medium text-[12px] text-[#000000]
                  "
                >
                  {userName}
                </span>
              </div>
              <button
                type="button"
                className={`
                  w-[60px] h-[24px]
                  font-medium text-[12px] rounded-[15px]
                  px-[20px] py-[2px]
                  flex items-center justify-center
                  whitespace-nowrap
                  cursor-pointer
                  transition-colors duration-200
                  ${subscribed 
                    ? "bg-[#BFAB96] text-white hover:bg-[#A6917D]" 
                    : "bg-white text-[#BFAB96] border border-[#BFAB96] hover:bg-[#BFAB96] hover:text-white"
                  }
                  ${subscribeLoading ? "opacity-50 cursor-not-allowed" : ""}
                `}
                onClick={handleSubscribe}
              >
                {subscribeLoading ? "..." : subscribed ? "구독 중" : "구독"}
              </button>
            </div>
            <h4
              className="
                mt-[8px]
                font-pretendard font-semibold text-[20px] text-[#000000]
              "
            >
              {title}
            </h4>
            <p
              className="
                  w-[256px] h-[80px]
                  mt-[4px]
                  font-normal text-[14px] text-[#000000]
                  overflow-hidden
                "
              title={summary}
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4 as unknown as number,
                WebkitBoxOrient: 'vertical' as unknown as any,
              }}
            >
              {summary}
            </p>
            <div className="mt-auto flex items-center justify-end gap-[10px] pr-[2px]">
              <button
                type="button"
                className="flex items-center gap-[2px]"
                onClick={handleLike}
              >
                <img
                  src={liked ? filledHeartIcon : emptyHeartIcon}
                  alt={liked ? "liked" : "not liked"}
                  className="cursor-pointer"
                  width={24}
                  height={24}
                />
                <span
                  className="
                    font-medium text-[12px] text-[#000000]
                  "
                >
                  {likeCount}
                </span>
              </button>
                <img
                  src={sirenIcon}
                  alt="alert"
                  className="w-[24px] h-[24px] cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
