import { format, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import type { BookDto } from "../../types/dto";

interface MeetingCardProps {
  title?: string;
  book: BookDto;
  meetingDate: string;
  meetingPlace: string;
  tags?: string;
  generation?: number;
  className?: string;
}

export const MeetingCard = ({
  title,
  book,
  meetingDate,
  meetingPlace,
  tags,
  generation,
  className = "",
}: MeetingCardProps) => {
  const date = parseISO(meetingDate);
  const dateStr = format(date, "yyyy.MM.dd");
  const timeStr = format(date, "a h시", { locale: ko });

  const tag = tags?.split(",");

  return (
    <div
      className={
        className
          ? `${className}`
          : `flex border-2 border-[#EAE5E2] min-w-[700px] rounded-xl p-4 bg-white`
      }
    >
      <div className="w-32 h-40 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={book.imgUrl}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 ml-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          {title && (
            <div className="flex flex-row items-center">
              <img className="w-5 h-5 mr-2" src="/chat-logo.png" />
              <h3 className="text-md font-medium text-gray-900">{title}</h3>
            </div>
          )}
          <div className="flex space-x-2">
            {tag &&
              tag.map((t) => (
                <span
                  key={t}
                  className="px-3.5 py-1 bg-[#90D26D] text-white text-xs rounded-full"
                >
                  {t}
                </span>
              ))}
            {generation && (
              <span className="px-3.5 py-1 bg-[#90D26D] text-white text-xs rounded-full">
                {generation}기
              </span>
            )}
          </div>
        </div>

        <div className="text-sm font-medium space-y-1 mb-1">
          <p className="text-gray-900">도서: {book.title}</p>
          <p className="text-gray-900">작가: {book.author}</p>
          <p className="text-gray-500">날짜: {dateStr}</p>
          <p className="text-gray-500">시간: {timeStr}</p>
          <p className="text-gray-500">장소: {meetingPlace}</p>
        </div>
      </div>
    </div>
  );
};
