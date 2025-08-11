import BookRecommendCreateCard from "../../components/BookRecommend/BookRecommendCreateCard";
import { NonProfileHeader } from "../../components/NonProfileHeader";
import { useParams } from "react-router-dom";
import {
  useGetBookInfo,
  useCreateRecommend,
} from "../../hooks/useRecommend";
import type { PostRecommendDto } from "../../types/bookRecommend";

const BookRecommendCreatePage = () => {
  const { bookclubId, bookId } = useParams<{
    bookclubId: string;
    bookId: string;
  }>();
  const { mutate: createRecommend } = useCreateRecommend(parseInt(bookclubId!));
  const { data: bookInfo, isLoading, isError, error } = useGetBookInfo(bookId!);

  const handleSubmit = (data: { title: string; content: string; rating: number; tag: string; }) => {
    if (!bookInfo) return;

    const postData: PostRecommendDto = {
      title: data.title,
      content: data.content,
      rate: data.rating,
      bookDetail: bookInfo,
      tag: data.tag,
    };

    createRecommend(postData);
  };

  if (isLoading) {
    return <div>책 정보를 불러오는 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <div className="mx-10">
      <NonProfileHeader title="책 추천하기" />
      {bookInfo && (
        <BookRecommendCreateCard bookInfo={bookInfo} onSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default BookRecommendCreatePage;
