import type { RecommendationDto } from "../../types/dto";
import BookRecommendHeader from "../../pages/BookRecommend/BookRecommendHeader";
import StarRating from "./StarRating";

interface BookRecommendCardProps {
  recommend: RecommendationDto;
}

const BookRecommendCard = ({ recommend }: BookRecommendCardProps) => {
  const { memberInfo, bookInfo, content, rate } = recommend;

  return (
    <div
      className="relative rounded-lg overflow-hidden 
    border-2 border-gray-200 transition-transform duration-300 transform hover:shadow-lg hover:scale-105 bg-white"
    >
      <BookRecommendHeader memberInfo={memberInfo} />

      <div className="mt-2 mb-3 mr-3 ml-3">
        <div className="flex">
          <img
            // src={bookInfo.imgUrl}
            src="/chess.png"
            className="w-32 object-cover rounded-lg"
          />
          <div className="ml-4 flex-1">
            <h4 className="text-xl font-semibold text-gray-900">
              {bookInfo.title}
            </h4>
            <p className="text-sm text-gray-600 mt-1">{bookInfo.author}</p>
            <p className="text-sm text-gray-700 mt-2 line-clamp-3">{content}</p>
            <div className="mt-3 flex items-center">
              <StarRating rate={rate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRecommendCard;
