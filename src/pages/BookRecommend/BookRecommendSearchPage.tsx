import { useNavigate, useParams } from "react-router-dom";
import { useCallback } from "react";
import BookSearch, { type Book } from "../../components/Search/BookSearch";
import Header from "../../components/Header";

const BookRecommendSearchPage = () => {
  const navigate = useNavigate();
  const { bookclubId } = useParams<{ bookclubId: string }>();

  const handleBookSelect = useCallback(
    (book: Book) => {
      navigate(`/bookclub/${bookclubId}/recommend/create/${book.id}`);
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
      <Header
        pageTitle="책 추천하기"
        userProfile={{
          username: "오즈",
          bio: "re_turnto_oz",
        }}
        notifications={[]}
        customClassName="mb-10"
      />
      <div className="flex-grow">
        <BookSearch SearchResultHeight={287} actions={actions} />
      </div>
    </div>
  );
};

export default BookRecommendSearchPage;
