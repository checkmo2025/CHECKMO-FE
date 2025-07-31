import BookRecommendDetailCard from "../../components/BookRecommend/BookRecommendDetailCard";
import { dummyRecommendDetail } from "./DummyRecommendDetail";
import Header from "../../components/Header";

const BookRecommendDetailPage = () => {
  const data = dummyRecommendDetail;

  return (
    <div className="flex flex-col ml-5 mr-10">
      <Header
        pageTitle={"추천 도서 목록"}
        userProfile={{
          username: "오즈",
          bio: "re_turnto_oz",
        }}
        notifications={[]}
        customClassName="mx-3 my-5"
      />
      <BookRecommendDetailCard recommendDetail={data} />
    </div>
  );
};

export default BookRecommendDetailPage;
