import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { noticeListItemDto, voteItemDto } from '../../types/clubNotice';
import vector from '../../assets/images/vector.png';
import arrow from '../../assets/images/shortcutArrow.png';
 
export default function AnnouncementCard({
  items,
}: {
  items: noticeListItemDto[];
}): React.ReactElement {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-[24px] min-w-max">
        {items.map((item, idx) => (
          <AnnouncementCardItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

function AnnouncementCardItem({
  item,
}: {
  item: noticeListItemDto;
}): React.ReactElement {
  const navigate = useNavigate();
  type RouteParams = { bookclubId?: string };
  const { bookclubId } = useParams<RouteParams>();

  const handleCardClick = () => {
    const itemId = item.id || 1;
    if (item.tag === '모임') {
      navigate(`/bookclub/${bookclubId}/notices/${itemId}`);
    } else if (item.tag === '투표') {
      navigate(`/bookclub/${bookclubId}/notices/${itemId}`);
    } else if (item.tag === '공지') {
      navigate(`/bookclub/${bookclubId}/notices/${itemId}`);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative w-[312px] h-[377px] rounded-[16px] border-2 border-[#EAE5E2] py-[26px] px-[21.5px] flex flex-col overflow-hidden cursor-pointer select-none hover:bg-gray-50 transition-colors"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={vector} alt="icon" className="w-[24px] h-[21px]" />
          <h3 className="ml-[13px] font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]">
           {item.title}
         </h3>
        </div>
        <span
          className={`inline-flex items-center justify-center w-[52px] h-[22px] opacity-100 rounded-[15px] text-[12px] text-[#FFFFFF] font-pretendard font-semibold leading-[145%] tracking-[-0.1%] whitespace-nowrap ${
            item.tag === '모임' ? 'bg-[#90D26D]' : 
            item.tag === '투표' ? 'bg-[#FF8045]' : 
            item.tag === '공지' ? 'bg-[#FFC648]' : ''
          }`}
        >
          {item.tag}
        </span>
      </div>

      <div className="mt-[9px]">
        {item.tag === '모임' && item.meetingInfoDTO && (
          <div className="font-pretendard font-normal text-[12px] leading-[145%] tracking-[-0.1%] text-[#000000] space-y-[4px]">
            <p>다음 모임 날짜: {item.meetingInfoDTO.meetingTime}</p>
            <p>다음 모임 책: {item.meetingInfoDTO.bookInfo.title}</p>
            <div className="absolute top-[80px] right-[24px]">
             <img src={arrow} alt="icon" className="w-[24px] h-[24px] -mt-2" />
            </div>
            <div className="absolute bottom-[24.5px]">
              <div className="relative w-[262px] h-[232px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                {item.meetingInfoDTO.bookInfo.imgUrl ? (
                  <img src={item.meetingInfoDTO.bookInfo.imgUrl} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
            </div>
          </div>
        )}

        {item.tag === '투표' && (
          <div className="font-pretendard font-normal text-[12px] leading-[145%] tracking-[-0.1%] text-[#000000] space-y-[4px]">
            <p className="mt-[24px] mb-[16px] whitespace-pre-line">{item.content}</p>
            <div className="absolute top-[80px] right-[24px]">
              <img src={arrow} alt="icon" className="w-[24px] h-[24px] -mt-2" />
            </div>
            <div className="relative w-[269px] h-[250px] mt-[26px] border-[2px] border-[#EAE5E2] rounded-[16px]">
              <div className="mt-[14.5px] pointer-events-none" aria-hidden="true">
                {item.items?.slice(0, 3).map((option: voteItemDto, index: number) => (
                  <label
                    key={`${option.item}-${index}`}
                    className="ml-[22.5px] flex items-center w-[224px] h-[46px] cursor-pointer border-b-2 border-[#EAE5E2] font-medium text-[14px] text-[#434343]"
                  >
                    <span
                      aria-hidden="true"
                      className="w-[24px] h-[24px] border-2 border-[#BBBBBB] rounded-full mr-2 bg-white"
                    />
                    <span className="ml-[12px]">{option.item}</span>
                  </label>
                ))}
                <div className="absolute right-[22.5px] bottom-[16px] w-[69px] h-[24px] bg-[#FF8045] text-white rounded-[15px] font-semibold text-[12px] whitespace-nowrap flex items-center justify-center">
                  투표하기
                </div>
              </div>
            </div>
          </div>
        )}

        {item.tag === '공지' && (
          <div className="mt-[9px]">
            <div className="font-normal text-[12px] text-[#000000] space-y-[4px]">
              <p className="mt-[24px] font-normal text-[12px] whitespace-pre-line">{item.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}