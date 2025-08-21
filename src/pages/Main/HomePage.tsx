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

  // --- 기존 state 및 데이터 fetching 로직은 모두 그대로 유지 ---
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
    // ... 기존 코드와 동일
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
    const fetchNoticesSequentially = async () => {
      // ... 기존 코드와 동일
      setLoadingNotices(true);
      try {
        const clubs = await fetchMyClubs();
        const allNotices: NoticeDto[] = [];

        for (const club of clubs) {
          try {
            const notices = await fetchNoticesByClub(club.clubId);
            allNotices.push(
              ...notices.map((notice) => ({ ...notice, clubId: club.clubId }))
            );
            await new Promise((res) => setTimeout(res, 150));
          } catch (err) {
            console.error(`클럽 ${club.clubId} 공지 가져오기 실패`, err);
          }
        }
        setNotices(allNotices);
      } catch (err) {
        console.error("클럽 가져오기 실패", err);
      } finally {
        setLoadingNotices(false);
      }
    };

    fetchNoticesSequentially();
  }, []);

  useEffect(() => {
    // ... 기존 IntersectionObserver 로직 동일
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

  // ... HomePage 컴포넌트 상단 코드는 모두 동일 ...

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100 max-xl:static max-xl:w-full">
      <Header pageTitle="책모 홈" customClassName="pl-6" />

      <div
        ref={scrollContainerRef}
        className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[30px] px-4 bg-[#FFFFFF]"
      >
        {/* === 공지사항 섹션 ('더 보기' 제거) === */}
        <section className="pt-4 px-1 w-full">
          {/* '더 보기' 버튼이 제거된 헤더 */}
          <div className="mb-5">
            <h2 className="ml-2 text-lg font-semibold">공지사항</h2>
          </div>

          {loadingNotices && <p className="pl-2">공지사항 로딩중...</p>}
          {!loadingNotices && notices.length === 0 && (
            <div className="w-full h-[380px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px] mx-auto">
              <p className="text-[#969696]">아직 등록된 공지사항이 없습니다.</p>
            </div>
          )}

          {notices.length > 0 && (
            <div className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth mb-12 p-2">
              {notices.map((notice) => (
                <div
                  key={`${notice.clubId}-${notice.id}`}
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
          )}
        </section>

        {/* === 책 이야기 섹션 (기존과 동일) === */}
        <section className="px-2 w-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="ml-2 text-lg font-semibold">책 이야기</h2>
            <span
              onClick={() => navigate(`/bookstory`)}
              className="mr-2 text-sm text-[#8D8D8D] hover:underline cursor-pointer"
            >
              + 더보기
            </span>
          </div>

          {/* ... 이하 책 이야기 관련 코드는 이전과 동일합니다 ... */}

          {bookStories.length === 0 && loadingBooks && (
            <p className="pl-2">책 이야기 로딩중...</p>
          )}
          {errorBooks && (
            <p className="text-red-500 pl-2">책 이야기 에러: {errorBooks}</p>
          )}
          {!loadingBooks && !errorBooks && bookStories.length === 0 && (
            <div className="w-full h-[377px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px] mx-auto mb-12">
              <p className="text-[#969696]">등록된 책 이야기가 없습니다.</p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
            {bookStories.map((story) => {
              const state: "내 이야기" | "구독 중" | "구독하기" =
                story.writtenByMe
                  ? "내 이야기"
                  : story.authorInfo.following
                  ? "구독 중"
                  : "구독하기";

              return (
                <BookStoriesCard
                  key={story.bookStoryId}
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
        </section>
      </div>
    </div>
  );
}
