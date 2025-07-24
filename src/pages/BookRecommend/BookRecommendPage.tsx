import { Link } from "react-router-dom";
import BookRecommendCard from "../../components/BookRecommend/BookRecommendCard";
import { dummyRecommendList } from "./DummyRecommendList";

const BookRecommendPage = () => {
  const dummyList = dummyRecommendList;
  const recommendations = dummyList.result.recommendations;

  return (
    <div className="flex flex-row mt-3 ml-3 mr-3">
      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {recommendations.map((rec) => (
          <Link key={rec.recommendId} to={`/recommend/${rec.recommendId}`}>
            <BookRecommendCard recommend={rec} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookRecommendPage;
