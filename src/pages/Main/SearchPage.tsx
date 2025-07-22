import React from "react";
import { useNavigate } from "react-router-dom";
import BookSearch, {
  type Book,
  type Action,
} from "../../components/Search/BookSearch";

export default function SearchPage() {
  const navigate = useNavigate();

  const actions: Action[] = [
    {
      label: "책 이야기",
      onClick: (book: Book) => {
        // 책 이야기 페이지로 이동
        navigate(`/bookstory/${book.id}`);
      },
      className: "bg-[var(--button-brown,#A6917E)] text-white",
      iconUrl: "/assets/meteor-icons_pencil.svg", // 연필 아이콘
    },
    {
      label: "상세 보기",
      onClick: (book: Book) => {
        // 상세 보기 페이지로 이동
        navigate(`/bookdetail/${book.id}`);
      },
      className:
        "bg-[var(--button-brown,#FFF] text-black border-[1.5px] border-[var(--sub-color-1-brown,#BFAB96)]",
    },
  ];

  return (
    <div className="flex h-screen">
      <div className="absolute left-[315px] right-[42px] opacity-100 ">
        <Header pageTitle={'title'} userProfile={{
          username: '123',
          bio: '123'
        }} notifications={[]}/>
        
        {/* 메인 컨텐츠 자리 */}
        <div className = "">
          <BookSearch actions={actions}/>
        </div>
      </div>
    </div>
  );
}
