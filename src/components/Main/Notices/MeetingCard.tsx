import type { MeetingNotice } from "../../../types/mainNotices";
import mainNoticeIcon from "../../../assets/icons/mainnotice.svg";
import shortcutIcon from "../../../assets/icons/shortcut.png";
import checkerIcon from "../../../assets/images/checker.png";

interface MeetingCardProps {
  notice: MeetingNotice;
}

const MeetingCard = ({ notice }: MeetingCardProps) => {
  const date = notice.meetingInfoDTO.meetingTime.split("T")[0];
  const location =
    !notice.meetingInfoDTO.location ||
    notice.meetingInfoDTO.location === "string"
      ? "미정"
      : notice.meetingInfoDTO.location;
  const imgUrl =
    notice.meetingInfoDTO.bookInfo?.imgUrl &&
    notice.meetingInfoDTO.bookInfo.imgUrl !== "string"
      ? notice.meetingInfoDTO.bookInfo.imgUrl
      : notice.imgUrl && notice.imgUrl !== "string"
      ? notice.imgUrl
      : checkerIcon;

  return (
    <div className="hover:shadow-lg hover:scale-[1.03] rounded-lg border-2 border-[#EAE5E2] bg-white w-full sm:w-[17.875rem] p-4 flex flex-col gap-4 h-auto sm:h-[24rem]">
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <img src={mainNoticeIcon} alt="아이콘" className="w-5 h-5" />
            <span className="text-base sm:text-lg font-medium text-gray-700 truncate block max-w-[8rem]">
              {notice.title}
            </span>
          </div>
          <div className="text-xs text-gray-700">다음 모임 날짜 : {date}</div>
          <div className="text-xs text-gray-700 truncate">
            다음 모임 장소 : {location}
          </div>
        </div>
        <div className="flex flex-col items-end ml-2">
          <div className="bg-[#90D26D] px-2 py-1 rounded-2xl text-xs text-white font-semibold">
            모임
          </div>
          <img
            src={shortcutIcon}
            className="w-4 h-4 mt-2 cursor-pointer"
            alt="shortcut"
          />
        </div>
      </div>
      <img
        src={imgUrl}
        alt="모임 이미지"
        className="w-full h-auto max-h-[14.5rem] object-cover rounded-lg"
      />
    </div>
  );
};

export default MeetingCard;
