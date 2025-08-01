import type { BookDto } from "../../types/dto";
import BookRecommendCreateCard from "../../components/BookRecommend/BookRecommendCreateCard";
import { NonProfileHeader } from "../../components/NonProfileHeader";

const dummyBook: BookDto = {
  bookId: 43,
  title: "넥서스",
  author: "유발 하라리",
  imgUrl: "/chess.png",
  publisher: "1234",
};

const BookRecommendCreatePage = () => {
  return (
    <div className="mx-10">
      <NonProfileHeader title="책 추천하기" />
      <BookRecommendCreateCard bookInfo={dummyBook} />
    </div>
  );
};

export default BookRecommendCreatePage;
