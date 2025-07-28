import { Heart, AlertCircle } from "lucide-react";

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
      className={`rounded-xl shadow-sm bg-white p-4 w-full ${
        isList ? "flex gap-4" : "flex flex-col w-full"
      }`}
    >
      <div
        className={`${
          isList ? "w-[6rem] h-[8rem]" : "w-full h-[13rem] mb-3"
        } bg-gray-200 rounded-md overflow-hidden flex-shrink-0`}
      >
        <img src={imageUrl} alt="book" className="w-full h-full object-cover" />
      </div>

      <div
        className={`flex flex-col justify-between ${
          isList ? "flex-1" : ""
        } text-left`}
      >
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
            {isSubscribed && (
              <span className="text-xs text-white bg-gray-400 rounded px-1.5 py-0.5">
                구독 중
              </span>
            )}
          </div>

          <div className="text-base font-semibold">{title}</div>
          <div className="text-sm text-gray-700 line-clamp-2">{summary}</div>

          <div className="text-xs text-gray-500 mt-1">
            도서 : {bookTitle} | {author}
          </div>
        </div>

        <div className="flex gap-4 mt-3 text-sm text-gray-600 items-center">
          <div className="flex items-center gap-1">
            <Heart size={16} />
            <span>{likes}</span>
          </div>
          <AlertCircle size={16} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default BookStoryCard;
