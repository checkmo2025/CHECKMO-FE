import { useState, useEffect, useRef } from "react";
import BookStoryCard from "../../../components/BookStory/BookStoryCard";
import { LayoutGrid, List, Pencil } from "lucide-react";
import Header from "../../../components/Header";
import { fetchBookStories } from "../../../apis/BookStory/bookstories";
import type { BookStoryResponseDto } from "../../../types/bookStories";
import { Link, useNavigate } from "react-router-dom";

type Tab = {
  label: string;
  scope: "ALL" | "FOLLOWING" | "CLUB";
  clubId?: number;
};

export default function BookStoryHomePage() {
  const navigate = useNavigate();

  const [tabs, setTabs] = useState<Tab[]>([
    { label: "전체 보기", scope: "ALL" },
    { label: "구독 중 보기", scope: "FOLLOWING" },
  ]);
  const [activeTab, setActiveTab] = useState(0);
  const [stories, setStories] = useState<BookStoryResponseDto[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);
  const tabContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadStoriesAndClubs = async () => {
      if (!tabs[activeTab]) return;
      setLoading(true);
      try {
        const { scope, clubId } = tabs[activeTab];
        const data = await fetchBookStories({ scope, clubId });

        const filteredStories =
          scope === "FOLLOWING"
            ? (data.bookStoryResponses || []).filter(
                (story) => story.authorInfo?.following
              )
            : data.bookStoryResponses || [];

        setStories(filteredStories);

        if (data.memberClubList?.clubList?.length > 0) {
          setTabs((prev) => {
            const existingClubIds = new Set(prev.map((tab) => tab.clubId));
            const newClubs = data.memberClubList.clubList.filter(
              (club) => !existingClubIds.has(club.clubId)
            );
            if (newClubs.length === 0) return prev;
            return [
              ...prev,
              ...newClubs.map((club) => ({
                label: club.clubName,
                scope: "CLUB" as const,
                clubId: club.clubId,
              })),
            ];
          });
        }
      } catch (error) {
        console.error("책 이야기 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };

    loadStoriesAndClubs();
  }, [activeTab]);

  const handleToggleLike = (storyId: number, liked: boolean) => {
    setStories((prev) =>
      prev.map((story) =>
        story.bookStoryId === storyId
          ? {
              ...story,
              likedByMe: liked,
              likes: liked ? story.likes + 1 : story.likes - 1,
            }
          : story
      )
    );
  };

  const handleToggleSubscribe = (nickname: string, subscribed: boolean) => {
    setStories((prev) =>
      prev.map((story) =>
        story.authorInfo.nickname === nickname
          ? {
              ...story,
              authorInfo: { ...story.authorInfo, following: subscribed },
            }
          : story
      )
    );
  };

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100">
      <Header
        pageTitle="책 이야기"
        userProfile={{ username: "yujin", bio: "가나다" }}
        customClassName="mt-[30px]"
      />

      {/* 탭 */}
      <div className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[30px] pl-[2px] pr-[30px] bg-[#FFFFFF]">
        <div className="flex items-center gap-2 mb-6">
          <div
            className="flex gap-6 overflow-x-auto scrollbar-hide whitespace-nowrap"
            ref={tabContainerRef}
          >
            {tabs.map((tab, index) => (
              <button
                key={`${tab.scope}-${tab.clubId ?? "default"}`}
                onClick={() => setActiveTab(index)}
                className={`pb-2 text-sm font-medium relative transition-colors duration-150 inline-block cursor-pointer ${
                  index === activeTab
                    ? "text-black border-b-2 border-green-500"
                    : "text-gray-400 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 상단 버튼 & 보기 모드 */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/bookstory/search">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#A6917D] text-white text-sm font-medium cursor-pointer">
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
              <div
                className="cursor-pointer"
                key={story.bookStoryId}
                onClick={() =>
                  navigate(`/bookstory/${story.bookStoryId}/detail`)
                }
              >
                <BookStoryCard
                  bookStoryId={story.bookStoryId}
                  imageUrl={story.bookInfo.imgUrl}
                  profileUrl={story.authorInfo.profileImageUrl}
                  userName={story.authorInfo.nickname}
                  isSubscribed={story.authorInfo.following}
                  title={story.bookStoryTitle}
                  summary={story.description}
                  bookTitle={story.bookInfo.title}
                  author={story.bookInfo.author}
                  likes={story.likes}
                  likedByMe={story.likedByMe}
                  viewMode={viewMode}
                  onToggleLike={handleToggleLike}
                  onToggleSubscribe={handleToggleSubscribe}
                />
              </div>
            ))
          ) : (
            <div>데이터가 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
