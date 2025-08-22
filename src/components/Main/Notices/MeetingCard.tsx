import type { MeetingNotice } from "../../../types/mainNotices";
import mainNoticeIcon from "../../../assets/icons/mainnotice.svg";
import shortcutIcon from "../../../assets/icons/shortcut.png";
import checkerIcon from "../../../assets/images/checker.png";

interface MeetingCardProps {
  notice: MeetingNotice;
}

const MeetingCard = ({ notice }: MeetingCardProps) => {
  const date = notice.meetingInfoDTO?.meetingTime
    ? new Date(notice.meetingInfoDTO.meetingTime).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "미정";

  const imgUrl = notice.meetingInfoDTO?.bookInfo?.imgUrl || checkerIcon;

  return (
    <div className="relative w-[312px] h-[380px] flex-shrink-0 rounded-[16px] border-2 border-[#EAE5E2] p-6 flex flex-col overflow-hidden cursor-pointer select-none hover:bg-gray-50 hover:shadow-lg hover:scale-[1.03] transition-all duration-300">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <img src={mainNoticeIcon} alt="icon" className="w-6 h-6" />
          <h3 className="ml-3 font-medium text-lg w-[150px] truncate">
            {notice.title}
          </h3>
        </div>
        <span className="inline-flex items-center justify-center w-[52px] h-[22px] rounded-[15px] text-xs text-white font-semibold bg-[#90D26D]">
          모임
        </span>
      </div>

      <div className="mt-2 text-xs text-gray-700 space-y-1 pr-10">
        <p>다음 모임 날짜: {date}</p>
        <p className="truncate">
          다음 모임 책: {notice.meetingInfoDTO?.bookInfo?.title ?? "정보 없음"}
        </p>
      </div>

      <img
        src={shortcutIcon}
        alt="shortcut"
        className="absolute top-[67px] right-6 w-6 h-6"
      />

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 mt-3 w-[262px] h-[232px] bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={imgUrl}
          alt={notice.title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default MeetingCard;
