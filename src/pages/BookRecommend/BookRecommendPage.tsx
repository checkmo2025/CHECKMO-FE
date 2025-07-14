import type { RecommendList } from "../../types/bookRecommend";
import BookRecommendCard from "./BookRecommendCard";

interface BookRecommendListProps {
  bookRecommendList: RecommendList;
}

const BookRecommendPage = ({ bookRecommendList }: BookRecommendListProps) => {
  const { recommendations } = bookRecommendList.result;

  return (
    <>
      <div className="flex flex-row mt-3 ml-3 mr-3">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => (
            <BookRecommendCard key={rec.recommendId} recommend={rec} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BookRecommendPage;
