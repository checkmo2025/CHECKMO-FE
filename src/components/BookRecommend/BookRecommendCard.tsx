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
      className="font-pretendard relative rounded-xl overflow-hidden 
    border-2 border-gray-200 transition-transform duration-300 transform hover:shadow-lg 
    hover:scale-105 bg-white min-h-[350px] flex flex-col"
    >
      <BookRecommendHeader
        author={{
          nickname: authorInfo.nickname,
          profileImageUrl: authorInfo.profileImageUrl,
        }}
      />

      <div className="mt-2 mb-4 mx-4 flex-1 flex">
        <img
          src={bookInfo.imgUrl.replace(/^(https?:)?\/\//, "//") || "/chess.png"} // 이미지가 없을 경우 기본 이미지
          className="w-1/3 object-cover rounded-lg"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // 무한 루프 방지
            target.src = "/chess.png";
          }}
        />
        <div className="ml-4 flex-1 flex flex-col">
          <h4 className="text-xl font-semibold text-gray-900">
            {bookInfo.title}
          </h4>
          <p className="text-sm text-gray-600 mt-1">{bookInfo.author}</p>
          <p className="text-sm text-gray-700 mt-2 line-clamp-3">{content}</p>
          <div className="mt-auto flex items-center">
            <StarRating rate={rate} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRecommendCard;
