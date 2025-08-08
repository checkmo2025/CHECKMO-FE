import { Link, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import BookRecommendCard from "../../components/BookRecommend/BookRecommendCard";
import Header from "../../components/Header";
import { useBookRecommends } from "../../hooks/useRecommend";

const BookRecommendPage = () => {
  const { bookclubId } = useParams<{ bookclubId: string }>();
  const numericClubId = bookclubId ? Number(bookclubId) : undefined;

  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetching, 
    isFetchingNextPage, 
    isError, 
    error 
  } = useBookRecommends(numericClubId!);
  
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  if (!numericClubId) {
    return <div>Invalid Club ID</div>;
  }

  if (isFetching && !data) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const recommendations = data?.pages.flatMap(p => p.bookRecommendList) || [];

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
      {recommendations.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
          {recommendations.map((rec) => (
            <Link key={rec.id} to={`${rec.id}`}>
              <BookRecommendCard recommend={rec} />
            </Link>
          ))}
        </div>
      ) : (
        <div>추천 도서가 없습니다.</div>
      )}
      <div ref={ref} style={{ height: 20 }} />
      {isFetchingNextPage && <p>Loading more...</p>}
    </div>
  );
};

export default BookRecommendPage;