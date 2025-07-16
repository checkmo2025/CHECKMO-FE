import React from 'react';
import checker from '../../assets/images/checker.png';
import heartIcon from '../../assets/images/heart.png';
import sirenIcon from '../../assets/images/siren.png';

export interface BookStoryCardProps {
  userImage: string;
  userName: string;
  isSubscribed: boolean;
  title: string;
  snippet: string;
  likes: number;
}

export default function BookStoryCard({
  userImage,
  userName,
  isSubscribed,
  title,
  snippet,
  likes,
}: BookStoryCardProps): React.ReactElement {
  // API에서 받을 이미지 URL 사용 (더미 데이터와 동일한 구조)
  const avatar = userImage || '/default-avatar.png';

  return (
    <div
      className="
        w-[528px] h-[332px]
        rounded-[16px]
        border-[2px] border-[#EAE5E2]
        overflow-hidden
      "
    >
      <div className="flex flex-col gap-[10px] p-[28px] h-full">
        {/* 상단: 표지 + 우측 정보 */}
        <div className="flex gap-[12px] flex-1">
          {/* 책 표지 */}
          <div className="w-[200px] h-[290px] bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={checker}
              alt="book cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 우측 컨텐츠 */}
          <div className="flex-1 flex flex-col">
            {/* 프로필 & 구독 버튼 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[8px]">
                <img
                  src={avatar}
                  alt={userName}
                  className="w-[24px] h-[24px] rounded-full"
                />
                <span
                  className="
                    font-pretendard font-medium text-[12px]
                    leading-[145%] tracking-[-0.1%] text-[#000000]
                  "
                >
                  {userName}
                </span>
              </div>
              <span
                className="
                  w-[60px] h-[24px]
                  font-pretendard font-medium text-[12px]
                  leading-[145%] tracking-[-0.1%] text-white
                  bg-[#A6917D] rounded-[15px]
                  px-[20px] py-[2px]
                  flex items-center justify-center
                  whitespace-nowrap
                  cursor-pointer    
                "
              >
                {isSubscribed ? '구독 중' : '구독하기'}
              </span>
            </div>

            {/* 제목 */}
            <h4
              className="
                mt-[8px]
                font-pretendard font-semibold text-[20px]
                leading-[135%] tracking-[-0.1%] text-[#000000]
              "
            >
              {title}
            </h4>

            {/* 스니펫 */}
                          <p
                className="
                  w-[256px] h-[80px]
                  mt-[4px]
                  font-pretendard font-normal text-[14px]
                  leading-[145%] tracking-[-0.1%] text-[#000000]
                "
              >
              {snippet}
            </p>

            {/* 하단 아이콘 & 카운트 */}
            <div className="mt-auto flex items-center justify-end gap-[8px]">
              <img
                src={heartIcon}
                alt="like"
                className="w-[24px] h-[24px] cursor-pointer"
              />
              <span
                className="
                  font-pretendard font-medium text-[12px]
                  leading-[145%] tracking-[-0.1%] text-[#000000]
                "
              >
                {likes}
              </span>
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
