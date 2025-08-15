import type { MeetingNotice } from "../../../types/mainNotices";
import mainNoticeIcon from "../../../assets/icons/mainnotice.svg";

interface MeetingCardProps {
  notice: MeetingNotice;
}

const MeetingCard = ({ notice }: MeetingCardProps) => {
  const date = notice.meetingInfoDTO.meetingTime.split("T")[0];
  const location = notice.meetingInfoDTO.location;
  const imgUrl = notice.meetingInfoDTO.bookInfo?.imgUrl ?? notice.imgUrl;

  return (
    <div className="rounded-[1rem] border-2 border-[#EAE5E2] bg-white w-[17.875rem] p-[1.5rem] flex flex-col gap-7 h-[24rem]">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <img src={mainNoticeIcon} alt="아이콘" className="w-6 h-6" />
            <span className="text-lg font-medium text-gray-700">
              {notice.title}
            </span>
          </div>
          <div className="text-xs text-gray-700">다음 모임 날짜 : {date}</div>
          <div className="text-xs text-gray-700">
            다음 모임 장소 : {location}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="bg-[#90D26D] px-4 py-2 rounded-2xl text-xs text-white font-semibold">
            모임
          </div>
          <img
            src="/src/assets/icons/shortcut.png"
            className="w-4 h-4 mt-2 cursor-pointer"
            alt="shortcut"
          />
        </div>
      </div>
      <img
        src={imgUrl}
        alt="모임 이미지"
        className="w-[16.375rem] h-[14.5rem] object-cover rounded-[1rem]"
      />
    </div>
  );
};

export default MeetingCard;
