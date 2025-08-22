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
    const fetchNoticesSequentially = async () => {
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
      { root, rootMargin: "0px", threshold: 1.0 }
    );

    observerRef.current = observer;
    const sentinel = document.getElementById("book-story-sentinel");
    if (sentinel) observer.observe(sentinel);

    return () => observer.disconnect();
  }, [loadBookStories]);

  return (
    <main className="w-full">
      <div
        ref={scrollContainerRef}
        className="h-screen overflow-y-auto scrollbar-hide pl-[42px] max-lg:px-4"
      >
        <div className="sticky top-0 z-10 bg-white pt-[30px]">
          <Header pageTitle="책모 홈" customClassName="!mt-0 !pl-0" />
        </div>

        <div className="w-full flex-1 bg-white space-y-[20px] pb-10">
          {/* 공지사항 */}
          <section className="mt-[36px] w-full px-[3px]">
            <div className="mb-[20px]">
              <h2 className="text-[18px] ml-[10px] font-semibold ">공지사항</h2>
            </div>

            {loadingNotices && <p className="ml-[10px]">공지사항 로딩중...</p>}

            {!loadingNotices && notices.length === 0 && (
              <div className="w-[calc(100%-50px)] h-[380px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px] mx-[10px]">
                <p className="text-[#969696]">
                  아직 등록된 공지사항이 없습니다.
                </p>
              </div>
            )}

            {notices.length > 0 && (
              <div className="overflow-x-auto p-[9px]">
                <div className="flex gap-[24px] w-full md:min-w-max mb-[20px]">
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
              </div>
            )}
          </section>

          {/* 책 이야기 */}
          <section className="w-full pl-[12px] pr-[42px] mt-10">
            <div className="flex justify-between items-center mb-[20px] ">
              <h2 className="text-[18px] font-semibold">책 이야기</h2>
              <span
                onClick={() => navigate(`/bookstory`)}
                className="text-[14px] text-[#8D8D8D] hover:underline cursor-pointer"
              >
                + 더보기
              </span>
            </div>

            {bookStories.length === 0 && loadingBooks && (
              <p className="ml-[10px]">책 이야기 로딩중...</p>
            )}
            {errorBooks && (
              <p className="text-red-500 ml-[10px]">에러: {errorBooks}</p>
            )}

            {!loadingBooks && !errorBooks && bookStories.length === 0 && (
              <div className="w-full h-[377px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px]">
                <p className="text-[#969696] ml-[10px]">
                  등록된 책 이야기가 없습니다.
                </p>
              </div>
            )}

            {bookStories.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
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
            )}

            <div id="book-story-sentinel" className="h-2"></div>
            {loadingBooks && (
              <p className="text-center py-4 ml-[10px]">추가 로딩중...</p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
