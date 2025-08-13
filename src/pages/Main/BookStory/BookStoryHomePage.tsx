import { useState, useEffect } from "react";
import BookStoryCard from "../../../components/BookStory/BookStoryCard";
import { LayoutGrid, List, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import { axiosInstance } from "../../../apis/axiosInstance";
import { fetchBookStories } from "../../../apis/BookStory/bookstories";
import type { BookStoryResponseDto } from "../../../types/bookStories";

type Tab = {
  label: string;
  scope: "ALL" | "FOLLOWING" | "MY" | "CLUB";
  clubId?: number;
};

type Club = {
  clubId: number;
  clubName: string;
  open: boolean;
};

export default function BookStoryHomePage() {
  const [tabs, setTabs] = useState<Tab[]>([
    { label: "전체 보기", scope: "ALL" },
    { label: "구독 중 보기", scope: "FOLLOWING" },
    { label: "내 이야기", scope: "MY" },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [stories, setStories] = useState<BookStoryResponseDto[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMyClubs = async () => {
      try {
        const res = await axiosInstance.get("/clubs/myClubs");
        const clubList: Club[] = res.result?.clubList || [];
        // 기존 탭 뒤에 클럽별 탭 추가
        setTabs((prev) => [
          ...prev,
          ...clubList.map((club) => ({
            label: club.clubName,
            scope: "CLUB" as const,
            clubId: club.clubId,
          })),
        ]);
      } catch (error) {
        console.error("내 모임 조회 실패", error);
      }
    };
    loadMyClubs();
  }, []);

  // activeTab, tabs 변경될 때마다 책 이야기 조회
  useEffect(() => {
    const loadStories = async () => {
      if (!tabs[activeTab]) return;
      setLoading(true);
      try {
        const { scope, clubId } = tabs[activeTab];
        const data = await fetchBookStories({ scope, clubId });
        console.log(data.bookStoryResponses);
        setStories(data.bookStoryResponses || []);
      } catch (error) {
        console.error("책 이야기 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    loadStories();
  }, [activeTab, tabs]);

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100">
      {/* 헤더 */}
      <Header
        pageTitle="책 이야기"
        userProfile={{ username: "yujin", bio: "가나다" }}
        customClassName="mt-[30px]"
      />

      {/* 탭 */}
      <div className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[30px] pl-[2px] pr-[30px] bg-[#FFFFFF]">
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`pb-2 text-sm font-medium relative transition-colors duration-150 ${
                index === activeTab
                  ? "text-black border-b-2 border-green-500"
                  : "text-gray-400 hover:text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

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
              <BookStoryCard
                key={story.bookStoryId}
                imageUrl={story.bookInfo.imgUrl}
                profileUrl={story.authorInfo.profileImageUrl}
                userName={story.authorInfo.nickname}
                isSubscribed={story.authorInfo.following}
                title={story.bookStoryTitle}
                summary={story.description}
                bookTitle={story.bookStoryTitle}
                author={story.bookInfo.author}
                likes={story.likes}
                viewMode={viewMode}
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
