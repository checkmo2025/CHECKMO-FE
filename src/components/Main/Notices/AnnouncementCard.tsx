import type { NoticeDto } from "../../../types/mainNotices";
import mainNoticeIcon from "../../../assets/icons/mainnotice.svg";

const AnnouncementCard = ({ id, title, date, book, content }: NoticeDto) => (
  <div className="rounded-[1rem] border-2 border-[#EAE5E2] bg-white w-[17.875rem] p-6 flex flex-col gap-7 h-[24rem]">
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <img src={mainNoticeIcon} alt="아이콘" className="w-6 h-6" />
          <span className="text-lg font-medium text-gray-700">{title}</span>
        </div>
        <div className="text-xs text-gray-700">
          다음 모임 날짜 : {date ?? "미정"}
        </div>
        <div className="text-xs text-gray-700">
          다음 모임 책 : {book ?? "정보 없음"}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <div className="bg-[#FFC648] px-4 py-2 rounded-2xl text-xs text-white font-semibold">
          공지
        </div>
        <img
          src="/src/assets/icons/shortcut.png"
          className="w-4 h-4 mt-2 cursor-pointer"
          alt="shortcut"
        />
      </div>
    </div>
    <div className="overflow-y-auto flex-1">{content}</div>
  </div>
);

export default AnnouncementCard;
