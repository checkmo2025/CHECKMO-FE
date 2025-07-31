import { Link } from "react-router-dom";
import BookRecommendCard from "../../components/BookRecommend/BookRecommendCard";
import { dummyRecommendList } from "./DummyRecommendList";
import Header from "../../components/Header";

const BookRecommendPage = () => {
  const dummyList = dummyRecommendList;
  const recommendations = dummyList.result.recommendations;

  return (
    <div className="flex flex-col mx-7">
      <Header
        pageTitle={"추천 도서 목록"}
        userProfile={{
          username: "오즈",
          bio: "re_turnto_oz",
        }}
        notifications={[]}
        customClassName="my-7"
      />
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
