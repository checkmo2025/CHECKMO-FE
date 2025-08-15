import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import BookSearch from "../../components/Search/BookSearch";
import type { SearchBook } from "../../types/BookSearchdto";
import Header from "../../components/Header";

const BookRecommendSearchPage = () => {
  const navigate = useNavigate();
  const { bookclubId } = useParams<{ bookclubId: string }>();

  const handleBookSelect = useCallback(
    (book: SearchBook) => {
      navigate(`/bookclub/${bookclubId}/recommend/${book.isbn}/create`);
    },
    [navigate, bookclubId]
  );

  const actions = [
    {
      label: "추천하기",
      onClick: handleBookSelect,
      className: "bg-[var(--button-brown,#A6917E)] text-white",
    },
  ];

  return (
    <div className="flex flex-col h-full mx-10 my-7">
      <Header pageTitle="책 추천하기" customClassName="mb-10" />
      <div className="flex-grow">
        <BookSearch SearchResultHeight={257} actions={actions} />
      </div>
    </div>
  );
};
export default BookRecommendSearchPage;
