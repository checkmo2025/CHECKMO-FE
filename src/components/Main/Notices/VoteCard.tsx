import type { VoteNotice } from "../../../types/mainNotices";
import mainNoticeIcon from "../../../assets/icons/mainnotice.svg";

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
    <div className="rounded-[1rem] border-2 border-[#EAE5E2] bg-white w-[17.875rem] p-6 flex flex-col gap-7 h-[24rem]">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <img src={mainNoticeIcon} alt="아이콘" className="w-6 h-6" />
            <span className="text-lg font-semibold text-gray-800">
              {notice.title.length > 10
                ? notice.title.slice(0, 10) + "…"
                : notice.title}
            </span>
          </div>
          <div className="text-xs text-gray-700">
            모임 날짜 : {date || "미정"}
          </div>
          <div className="text-xs text-gray-700">모임 장소 : {location}</div>
          <div className="text-xs text-gray-700">
            뒷풀이 장소 : {notice.afterPartyPlace ?? "장소 미정"}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-[#FF8045] px-4 py-2 rounded-2xl text-xs text-white font-semibold">
            투표
          </div>
          <img
            src="/src/assets/icons/shortcut.png"
            className="w-4 h-4 mt-2 cursor-pointer"
            alt="shortcut"
          />
        </div>
      </div>

      <div className="border border-[#EAE5E2] rounded-xl px-4 py-4 flex flex-col gap-3">
        {topItems.map((item, idx) => (
          <label
            key={idx}
            className="flex items-center gap-2 cursor-not-allowed border-b border-b-[#EAE5E2] py-2"
          >
            <input
              type="radio"
              name={`vote-${notice.title}`}
              className="accent-[#FF8045]"
              disabled
            />
            <span className="text-sm text-gray-700">{item.item}</span>
          </label>
        ))}
        <button
          className="bg-[#FF8045] text-white text-xs font-semibold rounded-full px-4 py-2 mt-4 self-end"
          disabled
        >
          투표 하기
        </button>
      </div>
    </div>
  );
};

export default VoteCard;
