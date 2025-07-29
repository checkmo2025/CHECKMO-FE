// src/components/SearchedBookModal.tsx
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import type { Book } from "../../components/Search/BookSearch";
import { useNavigate } from "react-router-dom";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
}

export default function SearchedBookModal({ isOpen, onClose, book }: Props) {
  const navigate = useNavigate();
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25">
      {/* 모달 창 */}
      <div className="relative h-[572px] w-[1090px] bg-white rounded-2xl shadow-xl">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ×
        </button>

        {/* 내부 콘텐츠: 30px 패딩 + flex 레이아웃 */}
        <div className="absolute inset-[30px] flex">
          {/* 좌측 커버 */}
          <div className="flex-shrink-0 h-[512px] w-[362px] overflow-hidden rounded-md bg-gray-100">
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={`${book.title} cover`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-gray-400">
                No Image
              </div>
            )}
          </div>

          {/* 좌우 간격 30px */}
          <div className="w-[30px]" />

          {/* 우측 컨텐츠 */}
          <div className="flex flex-1 flex-col">
            {/* 제목 / 메타 */}
            <div>
              <h2 className="text-[var(--Gray-1)] font-[Pretendard] text-[32px] font-bold leading-[135%] tracking-[-0.032px]">
                {book.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                유발 하라리 | 김병주 옮김 | 출판 김영사 | 2024.10.11
              </p>
            </div>

            {/* 설명 영역 (스크롤 가능) */}
            <div className="mt-9 flex-1 overflow-y-auto text-gray-700 leading-relaxed">
              {book.summary1 || "설명이 없습니다."}
            </div>

            {/* 액션 버튼 */}
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="rounded-lg px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={onClose}
              >
                닫기
              </button>
              <button
                className="rounded-lg px-4 py-2 bg-[var(--button-brown,#A6917E)] text-white hover:brightness-90"
                onClick={() => {

                  navigate(`/bookstory/${book.id}/write`);
                  onClose();
                }}
              >
                책 이야기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}