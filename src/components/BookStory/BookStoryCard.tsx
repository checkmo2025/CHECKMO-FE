import likeIcon from "../../assets/icons/likes.png";
import reportIcon from "../../assets/icons/report.png";

interface BookStoryCardProps {
  imageUrl: string;
  profileUrl: string;
  userName: string;
  isSubscribed: boolean;
  title: string;
  summary: string;
  bookTitle: string;
  author: string;
  likes: number;
  viewMode?: "grid" | "list";
}

const BookStoryCard = (props: BookStoryCardProps) => {
  const {
    imageUrl,
    profileUrl,
    userName,
    isSubscribed,
    title,
    summary,
    bookTitle,
    author,
    likes,
    viewMode = "grid",
  } = props;

  const isList = viewMode === "list";

  return (
    <div
      className={`rounded-xl shadow-sm bg-white p-4 w-full flex ${
        isList ? "gap-4" : "gap-6"
      } min-w-0`}
    >
      {/* 이미지 */}
      <div
        className={`${
          isList ? "w-[11rem] h-[15.5rem]" : "w-[12.5rem] h-[18.125rem]"
        } bg-gray-200 rounded-md overflow-hidden flex-shrink-0`}
      >
        <img src={imageUrl} alt="book" className="w-full h-full object-cover" />
      </div>

      {/* 내용 */}
      <div className="flex flex-col justify-between flex-1 text-left">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center text-sm text-gray-700 mb-1">
            <div className="flex items-center gap-2">
              <img
                src={profileUrl}
                alt="profile"
                className="w-6 h-6 rounded-full"
              />
              <span className="font-medium">{userName}</span>
            </div>
            <span
              className={`text-xs rounded-[0.9375rem] px-[1rem] py-[0.25rem] w-[4.2rem] inline-flex justify-center ${
                isSubscribed
                  ? "text-white bg-[#A6917D]"
                  : "text-[#A6917D] border border-[#A6917D]"
              }`}
            >
              {isSubscribed ? "구독 중" : "구독"}
            </span>
          </div>

          <div className="text-base font-semibold">{title}</div>
          <div className="text-sm text-gray-700 line-clamp-2">{summary}</div>

          <div className="text-xs text-gray-500 mt-1">
            도서 : {bookTitle} | {author}
          </div>
        </div>

        <div className="flex gap-4 mt-3 text-sm text-gray-600 items-center justify-end">
          <div className="flex items-center gap-1">
            <img src={likeIcon} alt="like" className="w-4 h-4" />
            <span>{likes}</span>
          </div>
          <img
            src={reportIcon}
            alt="report"
            className="w-4 h-4 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default BookStoryCard;
