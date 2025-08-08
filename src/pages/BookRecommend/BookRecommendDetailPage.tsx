import BookRecommendDetailCard from "../../components/BookRecommend/BookRecommendDetailCard";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import { useRecommendDetail } from "../../hooks/useRecommend";

const BookRecommendDetailPage = () => {
  const { bookclubId, recommendId } = useParams<{
    bookclubId: string;
    recommendId: string;
  }>();
  const numericClubId = bookclubId ? Number(bookclubId) : undefined;
  const numericRecommendId = recommendId ? Number(recommendId) : undefined;

  const { data, isLoading, isError, error } = useRecommendDetail(
    numericClubId!,
    numericRecommendId!
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col h-screen ml-5 mr-10">
      <div className="sticky top-0 bg-white z-10">
        <Header
          pageTitle={"추천 도서 상세"}
          userProfile={{
            username: "오즈",
            bio: "re_turnto_oz",
          }}
          notifications={[]}
          customClassName="mx-3 my-5"
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        {data && <BookRecommendDetailCard recommendDetail={data} />}
      </div>
    </div>
  );
};

export default BookRecommendDetailPage;
