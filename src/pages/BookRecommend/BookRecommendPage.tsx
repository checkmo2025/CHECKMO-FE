import { Link } from "react-router-dom";
import type { RecommendListDto } from "../../types/bookRecommend";
import BookRecommendCard from "./BookRecommendCard";

interface BookRecommendListProps {
  bookRecommendList: RecommendListDto;
}

const BookRecommendPage = ({ bookRecommendList }: BookRecommendListProps) => {
  const { recommendations } = bookRecommendList.result;

  return (
    <>
      <div className="flex flex-row mt-3 ml-3 mr-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <Link key={rec.recommendId} to={`/recommend/${rec.recommendId}`}>
              <BookRecommendCard recommend={rec} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default BookRecommendPage;
