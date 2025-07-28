import type { BookDto } from "../../types/dto";
import BookRecommendCreateCard from "../../components/BookRecommend/BookRecommendCreateCard";

const dummyBook: BookDto = {
  bookId: 43,
  title: "넥서스",
  author: "유발 하라리",
  imgUrl: "/chess.png",
  publisher: "1234",
};

const BookRecommendCreatePage = () => {
  return <BookRecommendCreateCard bookInfo={dummyBook} />;
};

export default BookRecommendCreatePage;
