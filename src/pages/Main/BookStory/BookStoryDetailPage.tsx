import React from "react";
import { useParams } from "react-router-dom";
import { Trash2, Edit2 } from "lucide-react";

const dummyData = [
  {
    id: 1,
    title: "나는 나이든 왕자다",
    author: "hy",
    description: "...",
    isSubscribed: true,
    likeCount: 12,
    bookInfo: {
      name: "어린 왕자",
      author: "헤밍웨이",
    },
  },
  {
    id: 2,
    title: "두 번째 이야기",
    author: "kim",
    description: "...",
    isSubscribed: false,
    likeCount: 5,
    bookInfo: {
      name: "두 번째 책",
      author: "김작가",
    },
  },
];

export default function BookStoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();

  // storyId가 있을 때 해당 데이터 찾기
  const story = dummyData.find((item) => item.id === Number(storyId));

  // 만약 찾지 못하면 간단히 메시지 띄우기
  if (!story) {
    return <div>해당 스토리를 찾을 수 없습니다.</div>;
  }

  const { title, author, description, isSubscribed, likeCount, bookInfo } =
    story;

  return (
    <div>
      <div className="pt-10 pl-10">
        <button className="text-lg font-semibold mb-4">{`< ${title}`}</button>
      </div>
      <div className="flex gap-8 p-8 max-w-5xl mx-auto">
        <div className="w-64 h-80 rounded-xl bg-gray-200" />
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
              {author}
            </div>
            <span className="text-base font-semibold">{author}</span>
          </div>
          <h1 className="text-2xl font-semibold mb-4">{title}</h1>
          <button
            className={`w-24 py-1 rounded-full text-sm font-semibold ${
              isSubscribed
                ? "bg-brown-500 text-white"
                : "border border-brown-500 text-brown-500"
            } mb-6`}
          >
            {isSubscribed ? "구독 중" : "구독하기"}
          </button>

          <p className="text-sm leading-relaxed whitespace-pre-line mb-6">
            {description}
          </p>
          <div className="flex items-center justify-between text-gray-400 text-xs">
            <div>
              도서 : {bookInfo.name} | {bookInfo.author}
            </div>

            <div className="flex items-center gap-4">
              <button>
                <Trash2 size={16} />
              </button>
              <button>
                <Edit2 size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
