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
      className="
        font-pretendard relative rounded-xl overflow-hidden
        border-2 border-gray-200 bg-white
        transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]
        h-[clamp(400px,32vw,500px)]   /* ← 뷰포트가 넓어지면 높이도 함께 증가 */
        flex flex-col
      "
    >
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

        <div className="ml-4 flex-1 min-w-0 flex flex-col">
          <h4 className="text-[clamp(16px,1.2vw,20px)] font-semibold text-gray-900 line-clamp-2">
            {bookInfo.title}
          </h4>
          <p className="text-[clamp(12px,1vw,14px)] text-gray-600 mt-1 truncate">
            {bookInfo.author}
          </p>

          <p className="text-[clamp(12px,1vw,14px)] text-gray-700 mt-2 line-clamp-3">
            {content}
          </p>

          <div className="mt-auto pt-2 flex items-center">
            <StarRating rate={rate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRecommendCard;
