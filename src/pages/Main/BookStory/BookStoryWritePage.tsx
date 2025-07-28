import { useState } from "react";
import { Link } from "react-router-dom";

const dummyBook = {
  id: 1,
  title: "넥서스",
  author: "유발 하라리",
  publisher: "출판 김영사",
  description:
    "글로벌 베스트셀러 《사피엔스》 《호모 데우스》 《21세기를 위한 21가지 제언》으로 우리 시대 가장 중요한 사상가이자 반열에 오른 유발 하라리 교수가 압도적 통찰로 AI 혁명의 의미와 본질을 꿰뚫어 보고 인류에게 남은 기회를 냉철하게 성찰하는 신작으로 돌아왔다.",
  imageUrl: "",
};

export default function BookStoryWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddStory = () => {
    const newStory = {
      imageUrl: "/placeholder/book7.png",
      profileUrl: "/placeholder/profile-default.png",
      userName: "guest",
      isSubscribed: false,
      title: title,
      summary: content.slice(0, 80) + "...",
      bookTitle: dummyBook.title,
      author: dummyBook.author,
      likes: 0,
    };

    const saved = JSON.parse(localStorage.getItem("bookStories") || "[]");
    saved.unshift(newStory);
    localStorage.setItem("bookStories", JSON.stringify(saved));

    window.location.href = "/bookstory";
  };

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8 font-sans text-gray-900">
      <div className="relative flex items-start gap-6 p-6 border border-gray-300 rounded-xl bg-white shadow-sm">
        <div className="w-28 h-36 rounded-lg bg-gray-200 flex-shrink-0">
          {dummyBook.imageUrl ? (
            <img
              src={dummyBook.imageUrl}
              alt={dummyBook.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : null}
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 4v16" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h12v16H3z"
              />
            </svg>
            <span>{dummyBook.title}</span>
          </div>

          <div className="text-xs text-gray-500 mt-1 mb-2">
            {dummyBook.author} | {dummyBook.publisher}
          </div>

          <p className="mt-2 text-xs leading-relaxed text-gray-800 whitespace-pre-line">
            {dummyBook.description}
          </p>
        </div>

        <div className="flex flex-col gap-2 absolute top-6 right-6 items-center">
          <button className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white cursor-default select-none">
            선택됨
          </button>
          <Link to="/bookstory/search">
            <button className="rounded-full border border-beige-500 px-3 py-1 text-xs font-semibold text-beige-700 hover:bg-beige-100">
              변경하기
            </button>
          </Link>
        </div>
      </div>

      <div className="p-6 border border-gray-300 rounded-xl bg-white min-h-[320px] flex flex-col">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="border-none focus:outline-none placeholder-gray-400 text-base font-semibold mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <hr className="border-t border-gray-300 mb-4" />
        <textarea
          placeholder="내용을 자유롭게 입력해주세요."
          className="flex-grow resize-none border-none focus:outline-none placeholder-gray-300 text-sm leading-relaxed"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="mt-4 flex justify-end gap-4">
          <button className="rounded-full border border-beige-500 px-6 py-2 text-sm text-beige-700 hover:bg-beige-100">
            임시저장
          </button>
          <button
            onClick={handleAddStory}
            className="rounded-full bg-red-500 px-6 py-2 text-sm font-semibold text-white hover:bg-beige-600"
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
}
