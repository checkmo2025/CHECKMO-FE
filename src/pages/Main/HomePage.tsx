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

  // 책 이야기
  const loadBookStories = useCallback(async () => {
    if (loadingBooks || !hasNext) return;
    setLoadingBooks(true);
    try {
      const params: BookStoriesParams = { scope: "ALL", cursorId };
      const data = await fetchBookStories(params);

      // 중복 제거
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

  // 초기 책 이야기 로드
  useEffect(() => {
    loadBookStories();
  }, []);

  // 공지사항 로드
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
      .then((noticesArrays) => setNotices(noticesArrays.flat()))
      .catch((err) => console.error("공지사항 불러오기 실패", err))
      .finally(() => setLoadingNotices(false));
  }, []);

  // 무한 스크롤 Intersection Observer
  useEffect(() => {
    const root = scrollContainerRef.current;
    if (!root) return;

    // 기존 옵저버 정리
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadBookStories();
          }
        });
      },
      { root, rootMargin: "100px", threshold: 0 }
    );

    observerRef.current = observer;

    const sentinel = document.getElementById("book-story-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadBookStories]);

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100">
      <Header pageTitle="책모 홈" customClassName="mt-[30px] pl-2" />

      <div
        ref={scrollContainerRef}
        className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[30px] pl-[2px] pr-[30px] bg-[#FFFFFF]"
      >
        {/* 공지사항 */}
        <div className="text-xl font-semibold text-gray-800 mb-4 pl-2">
          공지사항
        </div>
        {loadingNotices && <p>공지사항 로딩중...</p>}
        <div className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth mb-12 p-2">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="flex-shrink-0 cursor-pointer"
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
        <div className="grid grid-cols-2 gap-4 overflow-y-auto scroll-smooth scrollbar-hide pl-2">
          {bookStories.map((story) => {
            const state: "내 이야기" | "구독 중" | "구독하기" =
              story.writtenByMe
                ? "내 이야기"
                : story.authorInfo.following
                ? "구독 중"
                : "구독하기";

            return (
              <div
                key={story.bookStoryId}
                className="flex-shrink-0 w-[31rem] py-2"
              >
                <BookStoriesCard
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
              </div>
            );
          })}
        </div>

        {/* 무한 스크롤용 sentinel */}
        <div id="book-story-sentinel" className="h-2"></div>
        {loadingBooks && <p>추가 책 이야기 로딩중...</p>}
      </div>
    </div>
  );
}
