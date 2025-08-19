import { useState, useEffect, useRef, useCallback } from "react";
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
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);

  const tabContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 데이터 로드 함수
  const loadStories = useCallback(
    async (reset = false) => {
      if (!tabs[activeTab] || loading) return;

      const { scope, clubId } = tabs[activeTab];
      if (scope !== "ALL" && !reset) return; // 무한 스크롤은 ALL에서만

      setLoading(true);
      try {
        const data = await fetchBookStories({
          scope,
          clubId,
          cursorId: reset ? null : cursor,
        });

        const newStories = data.bookStoryResponses || [];
        setStories((prev) => (reset ? newStories : [...prev, ...newStories]));
        setCursor(data.nextCursor ?? null);
        setHasNext(data.hasNext ?? false);

        // 새로운 클럽 탭 추가 (처음 한 번만)
        if (reset && data.memberClubList?.clubList?.length > 0) {
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
    },
    [tabs, activeTab, cursor, loading]
  );

  // 탭 변경 시 초기화 후 데이터 불러오기
  useEffect(() => {
    setStories([]);
    setCursor(null);
    setHasNext(true);
    loadStories(true);
  }, [activeTab]);

  // 무한 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || loading || !hasNext) return;
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      if (scrollHeight - scrollTop - clientHeight < 200) {
        loadStories();
      }
    };

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [loadStories, loading, hasNext]);

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
      <Header pageTitle="책 이야기" customClassName="mt-[30px] pl-4" />

      {/* 탭 및 목록 컨테이너 */}
      <div
        className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[30px] pl-[2px] pr-[30px] bg-[#FFFFFF]"
        ref={containerRef}
      >
        {/* 탭 */}
        <div className="flex items-center gap-2 mb-6 pl-4">
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
        <div className="flex justify-between items-center mb-6 pl-4">
          <Link to="/bookstory/search">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#A6917D] text-white text-sm font-medium cursor-pointer">
              <Pencil size={16} /> 책 이야기
            </button>
          </Link>
          <div className="flex gap-2 px-4">
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
              ? "grid grid-cols-2 gap-6 px-4"
              : "flex flex-col gap-4 w-full px-4"
          }`}
        >
          {stories.length === 0 && loading && <div>로딩 중...</div>}
          {stories.map((story) => (
            <div
              className="cursor-pointer hover:shadow-lg hover:scale-[1.03]"
              key={story.bookStoryId}
              onClick={() => navigate(`/bookstory/${story.bookStoryId}/detail`)}
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
                writtenByMe={story.writtenByMe}
                likedByMe={story.likedByMe}
                viewMode={viewMode}
                onToggleLike={handleToggleLike}
                onToggleSubscribe={handleToggleSubscribe}
              />
            </div>
          ))}
          {loading && stories.length > 0 && <div>로딩 중...</div>}
          {!loading && stories.length === 0 && <div>데이터가 없습니다.</div>}
        </div>
      </div>
    </div>
  );
}
