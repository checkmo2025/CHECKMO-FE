import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Trash2, Edit2, Heart, AlertCircle } from "lucide-react";
import backIcon from "../../../assets/icons/backIcon.png";

const currentUser = "hy";

const dummyData = [
  {
    id: 1,
    title: "나는 나이든 왕자다",
    author: "hy",
    description: "어린 왕자는 ...",
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
    description: "두 번째 책에 대한 이야기입니다.",
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
  const navigate = useNavigate();

  const story = dummyData.find((item) => item.id === Number(storyId));

  if (!story) {
    return <div>해당 스토리를 찾을 수 없습니다.</div>;
  }

  const { title, author, description, isSubscribed, likeCount, bookInfo } =
    story;

  const isMyStory = author === currentUser;

  return (
    <div>
      <div className="pt-10 pl-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-lg font-semibold mb-4"
          type="button"
        >
          <img src={backIcon} alt="뒤로가기" className="w-5 h-5" />
          {title}
        </button>
      </div>

      <div className="pl-10 mt-12 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold"></div>
          <span className="text-base font-semibold">{author}</span>
        </div>

        <div className="flex gap-8">
          {/* 이미지 영역 */}
          <div className="w-64 h-80 rounded-xl bg-gray-200" />

          {/* 텍스트 영역*/}
          <div className="flex flex-col flex-1 h-80">
            <h1 className="text-2xl font-semibold mb-4">{title}</h1>
            {!isMyStory && (
              <button
                className={`w-24 py-1 rounded-full text-sm font-semibold ${
                  isSubscribed
                    ? "bg-brown-500 text-white"
                    : "border border-brown-500 text-brown-500"
                } mb-6`}
              >
                {isSubscribed ? "구독 중" : "구독하기"}
              </button>
            )}

            <p className="text-sm leading-relaxed whitespace-pre-line mb-6">
              {description}
            </p>
            <div className="flex-grow" />

            {/* 하단 정보 및 아이콘 */}
            <div className="flex items-center justify-between text-gray-400 text-xs">
              <div>
                도서 : {bookInfo.name} | {bookInfo.author}
              </div>
              <div className="flex items-center gap-4">
                {isMyStory ? (
                  <>
                    <button>
                      <Trash2 size={16} />
                    </button>
                    <button>
                      <Edit2 size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Heart size={16} />
                      <span>{likeCount}</span>
                    </div>
                    <button>
                      <AlertCircle size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
