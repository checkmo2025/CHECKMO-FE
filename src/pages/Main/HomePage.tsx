import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import NoticeCard from "../../components/Main/Notices/NoticeCard";
import BookStoriesCard from "../../components/Main/BookStoriesCard";

import type { BookStoryResponseDto } from "../../types/bookStories";
import type { NoticeDto } from "../../types/mainNotices";
import { fetchBookStories } from "../../apis/BookStory/bookstories";
import type { BookStoriesParams } from "../../apis/BookStory/bookstories";
import { fetchMyClubs } from "../../apis/Main/clubs";
import { fetchNoticesByClub } from "../../apis/Main/notices";

export default function HomePage() {
  const navigate = useNavigate();

  const [bookStories, setBookStories] = useState<BookStoryResponseDto[]>([]);
  const [notices, setNotices] = useState<NoticeDto[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingNotices, setLoadingNotices] = useState(false);
  const [errorBooks, setErrorBooks] = useState<string | null>(null);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [hasNext, setHasNext] = useState(true);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastFetchTimeRef = useRef<number>(0);

  const loadBookStories = useCallback(async () => {
    const now = Date.now();
    if (loadingBooks || !hasNext) return;
    if (now - lastFetchTimeRef.current < 500) return;
    lastFetchTimeRef.current = now;

    setLoadingBooks(true);
    try {
      const params: BookStoriesParams = { scope: "ALL", cursorId };
      const data = await fetchBookStories(params);

      setBookStories((prev) => {
        const newStories = data.bookStoryResponses.filter(
          (story) => !prev.some((s) => s.bookStoryId === story.bookStoryId)
        );
        return [...prev, ...newStories];
      });

      setCursorId(data.nextCursor);
      setHasNext(data.hasNext);
    } catch (e: any) {
      setErrorBooks(e.message ?? "책 이야기 불러오기 실패");
    } finally {
      setLoadingBooks(false);
    }
  }, [cursorId, hasNext, loadingBooks]);

  useEffect(() => {
    loadBookStories();
  }, []);

  useEffect(() => {
    setLoadingNotices(true);
    fetchMyClubs()
      .then((clubs) =>
        Promise.all(
          clubs.map(async (club) => {
            const notices = await fetchNoticesByClub(club.clubId);
            return notices.map((notice) => ({
              ...notice,
              clubId: club.clubId,
            }));
          })
        )
      )
      .then((noticesArrays) => {
        const allNotices = noticesArrays.flat();
        console.log("모든 공지사항:", allNotices); // <- 최종 데이터 확인
        setNotices(allNotices);
      })
      .catch((err) => console.error("공지사항 불러오기 실패", err))
      .finally(() => setLoadingNotices(false));
  }, []);

  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadBookStories();
          }
        });
      },
      {
        root,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    observerRef.current = observer;
    const sentinel = document.getElementById("book-story-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadBookStories]);

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100 max-xl:static max-xl:w-full">
      <Header pageTitle="책모 홈" customClassName="mt-[30px] pl-6" />

      <div
        ref={scrollContainerRef}
        className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[30px] px-4 bg-[#FFFFFF]"
      >
        {/* 공지사항 */}
        <div className="text-xl font-semibold text-gray-800 mb-4 pl-2">
          공지사항
        </div>
        {loadingNotices && <p>공지사항 로딩중...</p>}
        <div
          className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth mb-12 p-2
                        max-sm:flex-col max-sm:overflow-x-hidden max-sm:gap-3"
        >
          {notices.map((notice) => (
            <div
              key={`${notice.clubId}-${notice.id}`}
              className="flex-shrink-0 cursor-pointer max-sm:w-full"
              onClick={() => {
                const typeMap: Record<string, string> = {
                  공지: "general",
                  투표: "vote",
                  모임: "meeting",
                };
                const type = typeMap[notice.tag] ?? "general";
                navigate(
                  `/bookclub/${notice.clubId}/notices/${notice.id}?type=${type}`
                );
              }}
            >
              <NoticeCard notice={notice} />
            </div>
          ))}
        </div>

        {/* 책 이야기 */}
        <div className="text-xl font-semibold text-gray-800 mb-4 pl-2">
          책 이야기
        </div>
        {bookStories.length === 0 && loadingBooks && <p>책 이야기 로딩중...</p>}
        {errorBooks && (
          <p className="text-red-500">책 이야기 에러: {errorBooks}</p>
        )}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 
                        gap-4 scroll-smooth scrollbar-hide pl-2
                        max-sm:grid-cols-1 max-md:grid-cols-1"
        >
          {bookStories.map((story, index) => {
            const state: "내 이야기" | "구독 중" | "구독하기" =
              story.writtenByMe
                ? "내 이야기"
                : story.authorInfo.following
                ? "구독 중"
                : "구독하기";

            return (
              <BookStoriesCard
                key={`${story.bookStoryId}-${index}`}
                bookStoryId={story.bookStoryId}
                title={story.bookStoryTitle}
                story={story.description}
                state={state}
                likes={story.likes}
                likedByMe={story.likedByMe}
                authorNickname={story.authorInfo.nickname}
                authorProfileImageUrl={story.authorInfo.profileImageUrl}
                bookCoverImageUrl={story.bookInfo.imgUrl}
              />
            );
          })}
        </div>

        <div id="book-story-sentinel" className="h-2"></div>
        {loadingBooks && <p>추가 로딩중...</p>}
      </div>
    </div>
  );
}
