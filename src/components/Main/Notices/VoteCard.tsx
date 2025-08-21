import type { VoteNotice } from "../../../types/mainNotices";
import mainNoticeIcon from "../../../assets/icons/mainnotice.svg";
import shortcutIcon from "../../../assets/icons/shortcut.png";

interface VoteCardProps {
  notice: VoteNotice;
}

const VoteCard = ({ notice }: VoteCardProps) => {
  const topItems = notice.items.slice(0, 3);

  return (
    <div className="relative w-[312px] h-[380px] flex-shrink-0 rounded-[16px] border-2 border-[#EAE5E2] p-6 flex flex-col overflow-hidden cursor-pointer select-none hover:bg-gray-50 hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <img src={mainNoticeIcon} alt="icon" className="w-6 h-6" />
          <h3 className="ml-3 font-medium text-lg w-[150px] truncate">
            {notice.title}
          </h3>
        </div>
        <span className="inline-flex items-center justify-center w-[52px] h-[22px] rounded-[15px] text-xs text-white font-semibold bg-[#FF8045]">
          투표
        </span>
      </div>

      <p className="mt-6 mb-4 text-sm whitespace-pre-line line-clamp-2">
        {notice.content}
      </p>

      <img
        src={shortcutIcon}
        alt="shortcut"
        className="absolute top-[67px] right-6 w-6 h-6"
      />

      <div className="w-full mt-auto border-2 border-[#EAE5E2] rounded-[16px]">
        <form className="p-4">
          {topItems.map((option, i) => (
            <label
              key={`${option.item}-${i}`}
              className="ml-2 flex items-center w-full h-[46px] cursor-pointer border-b-2 border-[#EAE5E2] font-medium text-sm text-[#434343] last:border-b-0"
            >
              <input
                type="radio"
                name={`vote-${notice.id}`}
                value={option.item}
                disabled
                className="w-6 h-6 border-2 border-[#BBBBBB] rounded-full appearance-none cursor-pointer mr-2 checked:bg-[#FF8045] bg-white transition-all duration-200"
              />
              <span className="ml-3">{option.item}</span>
            </label>
          ))}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="w-[69px] h-[24px] bg-[#FF8045] text-white rounded-[15px] font-semibold text-xs whitespace-nowrap cursor-pointer"
            >
              투표하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VoteCard;
