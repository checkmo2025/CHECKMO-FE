import type { VoteNotice } from "../../../types/mainNotices";
import mainNoticeIcon from "../../../assets/icons/mainnotice.svg";
import shortcutIcon from "../../../assets/icons/shortcut.png";

interface VoteCardProps {
  notice: VoteNotice;
}

const VoteCard = ({ notice }: VoteCardProps) => {
  const date = (
    notice.deadline ??
    notice.meetingInfoDTO?.meetingTime ??
    ""
  ).split("T")[0];
  const location = notice.meetingInfoDTO?.location ?? "장소 미정";
  const topItems = notice.items.slice(0, 3);

  return (
    <div className="hover:shadow-lg hover:scale-[1.03] rounded-lg border-2 border-[#EAE5E2] bg-white w-full sm:w-[17.875rem] p-4 flex flex-col gap-4 md:gap-6 h-auto sm:h-[24rem]">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <img src={mainNoticeIcon} alt="아이콘" className="w-5 h-5" />
            <span className="text-base sm:text-lg font-semibold text-gray-800 truncate block max-w-[8rem]">
              {notice.title.length > 10
                ? notice.title.slice(0, 10) + "…"
                : notice.title}
            </span>
          </div>
          <div className="text-xs text-gray-700">
            모임 날짜 : {date || "미정"}
          </div>
          <div className="text-xs text-gray-700 truncate">
            모임 장소 : {location}
          </div>
          <div className="text-xs text-gray-700">
            뒷풀이 장소 : {notice.afterPartyPlace ?? "장소 미정"}
          </div>
        </div>
        <div className="flex flex-col items-end ml-2">
          <div className="bg-[#FF8045] px-2 py-1 rounded-2xl text-xs text-white font-semibold">
            투표
          </div>
          <img
            src={shortcutIcon}
            className="w-4 h-4 mt-2 cursor-pointer"
            alt="shortcut"
          />
        </div>
      </div>

      <div className="border border-[#EAE5E2] rounded-xl px-3 py-3 flex flex-col gap-2 md:gap-3">
        {topItems.map((item, idx) => (
          <label
            key={idx}
            className="flex items-center gap-2 cursor-not-allowed border-b border-b-[#EAE5E2] py-1"
          >
            <input
              type="radio"
              name={`vote-${notice.title}`}
              className="accent-[#FF8045]"
              disabled
            />
            <span className="text-sm text-gray-700 truncate">{item.item}</span>
          </label>
        ))}
        <button
          className="bg-[#FF8045] text-white text-xs font-semibold rounded-full px-3 py-1 mt-2 self-end hidden sm:inline-block"
          disabled
        >
          투표 하기
        </button>
      </div>
    </div>
  );
};

export default VoteCard;
