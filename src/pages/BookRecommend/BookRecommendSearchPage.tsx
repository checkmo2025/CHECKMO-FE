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
      <Header
        pageTitle="책 추천하기"
        userProfile={{
          username: "오즈",
  https://github.com/checkmo2025/CHECKMO-FE/pull/114/conflict?name=src%252Fpages%252FBookRecommend%252FBookRecommendSearchPage.tsx&base_oid=8578c04372b09e20bb61e57ebb16ecc00f80acf3&head_oid=d2849136e9191f2c0f403c357c27e502c1a2d1ef        bio: "re_turnto_oz",
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
