// src/components/BookClub/AnnouncementList.tsx
import React from 'react';
import { useNavigate, type Params, useParams } from 'react-router-dom';
import checkerImage from '../../assets/images/checker.png';
import vector from '../../assets/images/vector.png';
import type { AnnouncementProps } from '../../types/announcement';

export default function AnnouncementList({
  items,
}: {
  items: AnnouncementProps[];
}): React.ReactElement {
  const navigate = useNavigate();
  const { bookclubId } = useParams<Params>();
  const handleItemClick = (item: AnnouncementProps) => {
    const itemId = item.id;
    switch (item.tag) {
      case '모임':
        const meetingId = itemId;
        navigate(`/bookclub/${bookclubId}/notices/${meetingId}`);
        break;
      case '투표':
        const voteId = itemId;
        navigate(`/bookclub/${bookclubId}/notices/${voteId}`);
        break;
      case '공지':
        const generalId = itemId;
        navigate(`/bookclub/${bookclubId}/notices/${generalId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-[12px]">
      {items.map(item => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item)}
          className="
            w-[1083px] h-[204px]
            relative flex items-start
            bg-white border-[2px] border-[#EAE5E2] rounded-[16px]
            cursor-pointer
            hover:bg-gray-50
            transition-colors
          "
        >
          {/* 왼쪽: 모임 이미지 */}
          <img
            src={item.imageUrl ?? checkerImage}
            alt="club profile"
            className="w-[128px] h-[164px] ml-[21.5px] mt-[20px] rounded-lg object-cover"
          />

          {/* 오른쪽: 내용 */}
          <div className="ml-[29px] mt-[23px] w-[883px] h-[158px]">
            {/* 제목 */}
            <div className="flex items-center">
              <img src={vector} alt="icon" className="w-[24px] h-[24px]" />
              <p className="ml-[13px] font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] text-[#000000]">
                {item.title}
              </p>
            </div>

            {/* 본문 */}
            <div className="mt-[18px] space-y-[5px] font-pretendard font-medium text-[14px] leading-[145%] tracking-[-0.1%] text-[#8D8D8D]">
              {item.tag === '모임' && item.meetingDate && item.book && (
                <>
                  <p>
                    {item.clubName}의 다음 모임 날짜: {item.meetingDate}
                  </p>
                  <p>
                    {item.clubName}의 다음 모임 책: {item.book} | {item.bookAuthor}
                  </p>
                </>
              )}

              {item.tag === '투표' && item.meetingDate && (
                <>
                  <p>
                  {item.clubName}의 모임 날짜: {item.meetingDate}
                  </p>
                  {item.meetingPlace && (
                    <p>
                      {item.clubName}의 모임 장소: {item.meetingPlace}
                    </p>
                  )}
                  {item.afterPartyPlace && (
                    <p>
                      {item.clubName}의 뒤풀이 장소: {item.afterPartyPlace}
                    </p>
                  )}
                </>
              )}

              {item.tag === '공지' && item.announcementTitle && item.announcement && (
                <>
                  <p>
                    {item.announcementTitle}
                  </p>
                  <p className="whitespace-pre-line">
                    {item.announcement}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* 태그 */}
          <span
            className={`
              absolute top-[23px] right-[21.5px]
              inline-flex items-center justify-center
              w-[52px] h-[22px]
              rounded-[15px]
              font-pretendard text-[12px] font-[600]
              leading-[145%] tracking-[-0.1%]
              text-white whitespace-nowrap
              ${item.tag === '모임' ? 'bg-[#90D26D]' : 
                item.tag === '투표' ? 'bg-[#FF8045]' : 
                'bg-[#FFC648]'} /* 모임: #90D26D, 투표: #FF8045, 공지: #FFC648 */
            `}
          >
            {item.tag}
          </span>

          {/* 상세보기 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleItemClick(item);
            }}
            className="
              absolute bottom-[23px] right-[21.5px]
              w-[105px] h-[35px]
              bg-[#A6917D]
              rounded-[16px]
              font-pretendard font-medium text-[12px]
              leading-[145%] tracking-[-0.1%] 
              text-white
              whitespace-nowrap
              cursor-pointer
              hover:bg-[#9A8471]
              transition-colors
            "
          >
            상세보기
          </button>
        </div>
      ))}
    </div>
  );
}
