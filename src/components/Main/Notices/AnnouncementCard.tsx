import type { GeneralNotice } from "../../../types/mainNotices";
import mainNoticeIcon from "../../../assets/icons/mainnotice.svg";
import shortcutIcon from "../../../assets/icons/shortcut.png";

interface AnnouncementCardProps {
  notice: GeneralNotice;
}

const AnnouncementCard = ({ notice }: AnnouncementCardProps) => {
  return (
    <div className="relative w-[312px] h-[380px] flex-shrink-0 rounded-[16px] border-2 border-[#EAE5E2] p-6 flex flex-col overflow-hidden cursor-pointer select-none hover:bg-gray-50 hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <img src={mainNoticeIcon} alt="icon" className="w-6 h-6" />
          <h3 className="ml-3 font-medium text-lg w-[150px] truncate">
            {notice.title}
          </h3>
        </div>
        <span className="inline-flex items-center justify-center w-[52px] h-[22px] rounded-[15px] text-xs text-white font-semibold bg-[#FFC648]">
          공지
        </span>
      </div>

      <img
        src={shortcutIcon}
        alt="shortcut"
        className="absolute top-[67px] right-6 w-6 h-6"
      />

      <div className="mt-10 text-sm text-gray-800 whitespace-pre-line overflow-y-auto flex-1">
        {notice.content}
      </div>
    </div>
  );
};

export default AnnouncementCard;
