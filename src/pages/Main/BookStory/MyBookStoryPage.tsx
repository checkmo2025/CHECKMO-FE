import { useState, useEffect } from "react";
import MyBookStoryCard from "../../../components/BookStory/MyBookStoryCard";
import { LayoutGrid, List } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import { fetchBookStories } from "../../../apis/BookStory/bookstories";
import type { BookStoryResponseDto } from "../../../types/bookStories";
import { Pencil } from "lucide-react";

export default function MyBookStoryPage() {
  const [stories, setStories] = useState<BookStoryResponseDto[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      try {
        const data = await fetchBookStories({ scope: "MY" });
        setStories(data.bookStoryResponses || []);
      } catch (error) {
        console.error("내 책 이야기 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    loadStories();
  }, []);

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100">
      {/* 헤더 */}
      <Header
        pageTitle={`yj님의 책 이야기`} // 하드코딩
        userProfile={{ username: "yj", bio: "" }}
        customClassName="mt-[30px]"
      />

      <div className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[30px] pl-[2px] pr-[30px] bg-[#FFFFFF]">
        {/* 상단 버튼 & 보기 모드 */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/bookstory/search">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#A6917D] text-white text-sm font-medium">
              <Pencil size={16} /> 책 이야기
            </button>
          </Link>

          <div className="flex gap-2">
            <button onClick={() => setViewMode("grid")}>
              <LayoutGrid
                size={20}
                className={viewMode === "grid" ? "text-black" : "text-gray-400"}
              />
            </button>
            <button onClick={() => setViewMode("list")}>
              <List
                size={20}
                className={viewMode === "list" ? "text-black" : "text-gray-400"}
              />
            </button>
          </div>
        </div>

        {/* 책 이야기 목록 */}
        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-2 gap-6"
              : "flex flex-col gap-4 w-full"
          }`}
        >
          {loading ? (
            <div>로딩 중...</div>
          ) : stories.length > 0 ? (
            stories.map((story) => (
              <MyBookStoryCard
                key={story.bookStoryId}
                imageUrl={story.bookInfo.imgUrl}
                userName={story.authorInfo.nickname}
                title={story.bookStoryTitle}
                summary={story.description}
                bookTitle={story.bookStoryTitle}
                author={story.bookInfo.author}
                onEdit={() => console.log("수정", story.bookStoryId)}
                onDelete={() => console.log("삭제", story.bookStoryId)}
              />
            ))
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
