import type { BookDto } from "../../types/dto";
import BookRecommendCreateCard from "../../components/BookRecommend/BookRecommendCreateCard";
import { useNavigate } from "react-router-dom";

const dummyBook: BookDto = {
  bookId: 43,
  title: "넥서스",
  author: "유발 하라리",
  imgUrl: "/chess.png",
  publisher: "1234",
};

const BookRecommendCreatePage = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-10">
      <div className="flex items-center my-10">
        <button onClick={() => navigate(-1)} className="mr-3">
          <img src="/src/assets/icons/backIcon.png" alt="뒤로가기" />
        </button>
        <h1 className="text-2xl font-bold">책 추천하기</h1>
      </div>
      <BookRecommendCreateCard bookInfo={dummyBook} />
    </div>
  );
};

export default BookRecommendCreatePage;
