import React from "react";
import { useNavigate } from "react-router-dom";
import BookSearch, {
  type Book,
  type Action,
} from "../../components/Search/BookSearch";
import Header from "../../components/Header"
import SearchedBookModal from "../../components/Search/SearchedBookModal"
import { useState } from "react";

export default function SearchPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [bookDetail, setbookDetail] = useState<Book | null>(null);

  const actions: Action[] = [
    {
      label: "책 이야기",
      onClick: (book: Book) => {
        // 책 이야기 페이지로 이동
        navigate(`/bookstory/${book.id}/write`);
      },
      className: "bg-[var(--button-brown,#A6917E)] text-white",
      iconUrl: "/assets/meteor-icons_pencil.svg", // 연필 아이콘
    },
    {
      label: "상세 보기",
      onClick: (book: Book) => {
        setbookDetail(book);
        setIsOpen(true);
      },
      className:
        "bg-[var(--button-brown,#FFF] text-black border-[1.5px] border-[var(--sub-color-1-brown,#BFAB96)]",
    },
  ];

  return (

    <div>
      <div className="flex h-screen ">
      <div className="absolute left-[315px] right-[42px] opacity-100 ">
        <Header pageTitle={'통합검색'} userProfile={{
          username: 'Luke',
          bio: '아 피곤하다.'
        }} 
        notifications={[]}
        customClassName="mt-15"
        />
        
        {/* 메인 컨텐츠 자리 */}
        <div className = "">
          <BookSearch SearchResultHeight = {235} actions={actions}/>
        </div>
      </div>
      {bookDetail && <SearchedBookModal isOpen={isOpen} onClose={() => setIsOpen(false)} book={bookDetail} /> }
      

      </div>
    </div>
    
  );
}
