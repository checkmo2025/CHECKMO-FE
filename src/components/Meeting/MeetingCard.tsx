import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import type { MeetingListItemDto } from "../../types/clubMeeting";

interface MeetingCardProps {
  generation: number;
  meeting: MeetingListItemDto;
}

export const MeetingCard = ({ generation, meeting }: MeetingCardProps) => {
  const book = meeting.book;
  const date = parseISO(meeting.meetingDate);

  const dateStr = format(date, "yyyy.MM.dd");
  const timeStr = format(date, "a h시", { locale: ko });
  return (
    <div className="flex border-2 border-[#EAE5E2] min-w-[500px] rounded-xl p-4 bg-white mb-3">
      {/* 왼쪽 이미지 */}
      <div className="w-32 h-40 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <img
          src={meeting.book.imgUrl}
          alt={meeting.book.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 오른쪽 정보 */}
      <div className="flex-1 ml-4 flex flex-col justify-between">
        {/* 상단: 제목 + 태그 */}
        <div className="flex justify-between items-start">
          <div className="flex flex-row items-center">
            <img className="w-5 h-5 mr-2" src="/chat-logo.png" />
            <h3 className="text-md font-medium text-gray-900">
              {meeting.title}
            </h3>
          </div>
          <div className="flex space-x-2">
            <span className="px-3.5 py-1 bg-[#90D26D] text-white text-xs rounded-full">
              {meeting.tags}
            </span>
            <span className="px-3.5 py-1 bg-[#90D26D] text-white text-xs rounded-full">
              {generation}기
            </span>
          </div>
        </div>

        {/* 중단: 메타 정보 */}
        <div className="text-sm font-medium space-y-1">
          <p className="text-gray-900">도서: {book.title}</p>
          <p className="text-gray-900">작가: {book.author}</p>
          <p className="text-gray-500">날짜: {dateStr}</p>
          <p className="text-gray-500">시간: {timeStr}</p>
          <p className="text-gray-500">장소: {meeting.meetingPlace}</p>
        </div>
      </div>
    </div>
  );
};
