// src/components/BookClub/AnnouncementCard.tsx
import React, { useState } from 'react';
import vector from '../../assets/images/vector.png';
import arrow from '../../assets/images/shortcutArrow.png';

export interface VoteOption {
  label: string;
  value: string;
}

export interface AnnouncementCardProps {
  title: string;
  tag: '모임' | '투표' | '공지';
  
  // 모임
  meetingDate?: string;
  book?: string;
  
  // 투표
  voteLink?: string;
  meetingPlace?: string;
  afterPartyPlace?: string;
  voteOptions?: VoteOption[];
  onVoteSubmit?: (selectedValue: string) => void;
  
  // 공지
  announcementTitle?: string;
  announcement?: string;

  // 이미지
  imageUrl?: string;
}

export default function AnnouncementCard({
  items,
}: {
  items: AnnouncementCardProps[];
}): React.ReactElement {
  return (
    <div className="flex gap-[24px]">
      {items.map((item, idx) => (
        <AnnouncementCardItem key={idx} item={item} />
      ))}
    </div>
  );
}

function AnnouncementCardItem({
  item,
}: {
  item: AnnouncementCardProps;
}): React.ReactElement {
  const [selectedVote, setSelectedVote] = useState<string>('');

  const handleVoteSubmit = () => {
    if (selectedVote && item.onVoteSubmit) {
      item.onVoteSubmit(selectedVote);
    }
  };

  return (
    <div
      className="
        relative
        w-[312px] h-[377px]           
        rounded-[16px]                      
        border-2                             
        border-[#EAE5E2] 
        py-[26px] px-[21.5px]                       
        flex flex-col                       
        overflow-hidden"
    >
      {/* ── 상단 헤더 ── */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={vector} alt="icon" className="w-[24px] h-[21px]" />
          <h3
            className="
              ml-[13px]
              font-pretendard
              font-medium
              text-[18px]
              leading-[135%]
              tracking-[-0.1%]
            "
          >
           {item.title}
         </h3>
        </div>
        {/* 태그 */}
        <span
          className={`
            inline-flex
            items-center
            justify-center
            w-[52px] h-[22px]
            opacity-100
            rounded-[15px]
            text-[12px] text-[#FFFFFF]
            font-pretendard
            font-semibold
            leading-[145%]
            tracking-[-0.1%]
            whitespace-nowrap
            ${item.tag === '모임' ? 'bg-[#90D26D]' : ''}
            ${item.tag === '투표' ? 'bg-[#FF8045]' : ''}
            ${item.tag === '공지' ? 'bg-[#FFC648]' : ''}
          `}
        >
          {item.tag}
        </span>
      </div>

      {/* ── 본문: 모임 vs 투표 vs 공지 ── */}
      <div className="mt-[9px]">
        {item.tag === '모임' && item.meetingDate && item.book && (
          <div className="
            font-pretendard      
            font-normal           
            text-[12px]           
            leading-[145%]        
            tracking-[-0.1%]      
            text-[#000000]
            space-y-[4px]    
             ">
            <p>다음 모임 날짜: {item.meetingDate}</p>
            <p>다음 모임 책: {item.book}</p>
            <div className="absolute top-[80px] right-[24px]">
             <img src={arrow} alt="icon" className="w-[24px] h-[24px] -mt-2" />
            </div>
            <div className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2">
              <div
                className="
                  relative
                  w-[262px] h-[232px]
                  bg-gray-100 rounded-lg
                  overflow-hidden
                "
              >
                {item.imageUrl
                  ? <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-gray-200" />
                }
              </div>
            </div>
          </div>
        )}

        {item.tag === '투표' && item.meetingDate && (
          <div className="
            font-pretendard      
            font-normal           
            text-[12px]           
            leading-[145%]        
            tracking-[-0.1%]      
            text-[#000000]  
            space-y-[4px]    
           ">
            <p>모임 날짜: {item.meetingDate}</p>
            {item.meetingPlace && <p>모임 장소: {item.meetingPlace}</p>}
            {item.afterPartyPlace && <p>뒤풀이 장소: {item.afterPartyPlace}</p>}
            <div className="absolute top-[80px] right-[24px]">
              <img src={arrow} alt="icon" className="w-[24px] h-[24px] -mt-2" />
            </div>
            <div className="w-[269px] h-[207px] mt-[26px] border-[2px] border-[#EAE5E2] rounded-[16px]">
              <form className = "mt-[14.5px]">
                {item.voteOptions?.map((option) => (
                  <label 
                    key={option.value} 
                    className="
                      ml-[22.5px]
                      flex items-center
                      w-[224px] h-[46px]
                      cursor-pointer
                      border-b-2 border-[#EAE5E2]
                      font-pretendard
                      font-medium
                      text-[14px]
                      leading-[145%]
                      tracking-[-0.1%]
                      text-[#434343]
                    "
                  >
                  <input
                    type="radio"
                    name="vote"
                    value={option.value}
                    checked={selectedVote === option.value}
                    onChange={(e) => setSelectedVote(e.target.value)}
                    className="
                      w-[24px] h-[24px]
                      border-2 border-[#BBBBBB]
                      rounded-full
                      appearance-none
                      cursor-pointer
                      mr-2
                      checked:bg-[#FF8045]
                      bg-white
                      transition-all duration-200
                    "
                  />
                  <span className="ml-[12px]">{option.label}</span>
                </label>
              ))}
              <button
                type="button"
                onClick={handleVoteSubmit}
                disabled={!selectedVote}
                className="
                  ml-[177.5px] mt-[16px]
                  w-[69px] h-[24px]
                  bg-[#FF8045] 
                  text-white 
                  rounded-[15px]
                  font-pretendard
                  font-semibold
                  text-[12px]
                  leading-[145%]
                  tracking-[-0.1%]                 
                  whitespace-nowrap
                  cursor-pointer
                "
              >
                투표하기
              </button>
            </form>
          </div>
        </div>
        )}

        <div className="mt-[9px]">
        {item.tag === '공지' && (
          <div className="
            font-pretendard      
            font-normal           
            text-[12px]           
            leading-[145%]        
            tracking-[-0.1%]      
            text-[#000000]
            space-y-[4px]    
             ">
            <p className="font-pretendard font-normal text-[12px] leading-[145%] tracking-[-0.1%]">{item.announcementTitle}</p>
            <p className="mt-[24px] font-pretendard font-normal text-[12px] leading-[145%] tracking-[-0.1%] whitespace-pre-line">{item.announcement}</p>
            <div className="absolute top-[80px] right-[24px]">
             <img src={arrow} alt="icon" className="w-[24px] h-[24px] -mt-2" />
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
