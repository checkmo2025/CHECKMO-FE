import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { noticeListItemDto, voteItemDto } from "../../types/clubNotice";
import vector from "../../assets/icons/mainnotice.svg";
import arrow from "../../assets/icons/shortcut.png";
import { mapTagToRouteType } from "../../types/noticeType";
import { parseISO, format } from "date-fns";

type Params = {
  bookclubId: string;
};

export default function AnnouncementCard({
  items,
}: {
  items: noticeListItemDto[];
}): React.ReactElement {
  return (
    <div className="overflow-x-auto py-[6px] px-[6px]">
      <div className="flex gap-[24px] w-full md:min-w-max">
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
  const { bookclubId } = useParams<Params>();

  const handleCardClick = () => {
    if (!bookclubId) return;
    const noticeId = item.id;
    const type = mapTagToRouteType(item.tag);
    navigate(`/bookclub/${bookclubId}/notices/${noticeId}?type=${type}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative w-full md:w-[312px] h-auto md:h-[380px] flex-shrink-0 rounded-[16px] border-2 border-[#EAE5E2] p-6 mb-[20px] flex flex-col overflow-hidden cursor-pointer select-none
      hover:bg-gray-50 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 origin-center"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img src={vector} alt="icon" className="w-[24px] h-[24px]" />
          <h3
            className="
              ml-[13px]
              font-normal
              text-[18px]
            "
          >
            {item.title}
          </h3>
        </div>
        <span
          className={`inline-flex items-center justify-center w-[52px] h-[22px] opacity-100 rounded-[15px] text-[12px] text-[#FFFFFF] font-semibold whitespace-nowrap ${item.tag === "모임"
            ? "bg-[#90D26D]"
            : item.tag === "투표"
              ? "bg-[#FF8045]"
              : item.tag === "공지"
                ? "bg-[#FFC648]"
                : ""
            }`}
        >
          {item.tag}
        </span>
      </div>

      <div className="mt-[9px]">
        {item.tag === "모임" && item.meetingInfoDTO && (
          <div className="font-normal text-[12px] text-[#2C2C2C] space-y-1 pr-10">
            <p>
              다음 모임 날짜:{" "}
              {(() => {
                try {
                  const d = parseISO(item.meetingInfoDTO.meetingTime);
                  return format(d, "yyyy. MM. dd");
                } catch {
                  return item.meetingInfoDTO.meetingTime;
                }
              })()}
            </p>
            <p className="line-clamp-1">
              다음 모임 책: {item.meetingInfoDTO.bookInfo?.title}
            </p>
            <div className="md:absolute md:top-[67px] right-6 w-6 h-6">
              <img src={arrow} alt="icon" className="w-[24px] h-[24px]" />
            </div>
            <div className="md:absolute md:bottom-[24.5px] mt-[12px]">
              <div className="relative md:w-[262px] md:h-[232px] w-full h-[200px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                {item.meetingInfoDTO.bookInfo?.imgUrl ? (
                  <img
                    src={item.meetingInfoDTO.bookInfo.imgUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
            </div>
          </div>
        )}

        {item.tag === "투표" && (
          <div className="font-normal text-[12px] text-[#000000] space-y-[4px]">
            <p className="mt-[24px] mb-[16px] whitespace-pre-line">
              {item.content}
            </p>
            <div className="md:absolute md:top-[67px] md:right-[24px] self-end">
              <img src={arrow} alt="icon" className="w-[24px] h-[24px] -mt-3" />
            </div>
            <div className="w-full md:w-[269px] md:h-[207px] mt-[46px] border-[2px] border-[#EAE5E2] rounded-[16px]">
              <form className="mt-[14.5px]">
                {item.items
                  ?.slice(0, 3)
                  .map((option: voteItemDto, i: number) => (
                    <label
                      key={`${option.item}-${i}`}
                      className="
                      ml-[22.5px]
                      flex items-center
                      w-full md:w-[224px] h-[46px]
                      cursor-pointer
                      border-b-2 border-[#EAE5E2]
                      font-medium
                      text-[14px]
                      text-[#434343]
                    "
                    >
                      <input
                        type="radio"
                        name={`vote-${item.id}`}
                        value={option.item}
                        checked={option.selected}
                        disabled
                        readOnly
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
                      <span className="ml-[12px]">{option.item}</span>
                    </label>
                  ))}
                <button
                  type="button"
                  onClick={handleCardClick}
                  className="
                  md:ml-[177.5px] self-end mt-[16px]
                  w-[69px] h-[24px]
                  bg-[#FF8045] 
                  text-white 
                  rounded-[15px]
                  font-semibold
                  text-[12px]
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
          {item.tag === "공지" && (
            <div
              className="font-normal text-[12px] text-[#000000] space-y-[4px]"
            >
              <div className="md:absolute md:top-[67px] md:right-[24px] self-end">
                <img src={arrow} alt="icon" className="w-[24px] h-[24px] -mt-3" />
              </div>
              <p className="mt-[46px] font-normal text-[12px] whitespace-pre-line">
                {item.content}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
