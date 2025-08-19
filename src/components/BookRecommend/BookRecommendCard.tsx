import type { RecommendationDto } from "../../types/bookRecommend";
import BookRecommendHeader from "./BookRecommendHeader";
import StarRating from "./StarRating";

interface BookRecommendCardProps {
  recommend: RecommendationDto;
}

const BookRecommendCard = ({ recommend }: BookRecommendCardProps) => {
  const { authorInfo, bookInfo, content, rate } = recommend;

  return (
    <div
      className="relative rounded-xl overflow-hidden
        border-2 border-gray-200 bg-white
        transition-transform duration-300 hover:shadow-lg hover:scale-[1.03] hover:z-15
        h-[clamp(400px,32vw,500px)] min-w-[400px]
        flex flex-col">
      <BookRecommendHeader
        author={{
          nickname: authorInfo.nickname,
          profileImageUrl: authorInfo.profileImageUrl,
        }}
      />

      <div className="mt-2 mb-4 mx-4 flex-1 flex overflow-hidden">
        <div className="w-[clamp(200px,18vw,250px)] shrink-0">
          <div className="w-full h-full aspect-[2/3] overflow-hidden rounded-lg bg-gray-100">
            <img
              src={bookInfo.imgUrl?.replace(/^(https?:)?\/\//, "//") || "/chess.png"}
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.currentTarget;
                t.onerror = null;
                t.src = "/chess.png";
              }}
            />
          </div>
        </div>

        <div className="ml-4 flex-1 min-w-0 flex flex-col space-y-2 group">
          <h4
            className="font-semibold text-gray-900 text-[clamp(16px,1.2vw,20px)] 
            line-clamp-2 md:line-clamp-3 xl:line-clamp-2 break-words"
            title={bookInfo.title}
          >
            {bookInfo.title}
          </h4>
          <p
            className="text-gray-600 mt-1 text-[clamp(12px,1vw,14px)] truncate"
            title={bookInfo.author}
          >
            {bookInfo.author}
          </p>
          <div
            className="relative mt-2 text-gray-700 text-[clamp(12px,1vw,14px)]
            line-clamp-2 md:line-clamp-3 lg:line-clamp-4 break-words
            transition-[max-height] duration-200 ease-out max-h-24 
            md:max-h-28 lg:max-h-32 group-hover:max-h-[999px]">
            <span
              className="pointer-events-none absolute inset-x-0 bottom-0 h-6
              bg-gradient-to-b from-transparent to-white opacity-100 
              group-hover:opacity-0 transition-opacity duration-200"
              aria-hidden
            />
            <p title={content}>{content}</p>
          </div>

          <div className="mt-auto pt-2 flex items-center">
            <StarRating rate={rate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRecommendCard;
