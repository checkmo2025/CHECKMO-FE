import { useState, useEffect } from "react";
import NoticeCard from "../../components/Main/Notices/NoticeCard";
import BookStoriesCard from "../../components/Main/BookStoriesCard";
import Header from "../../components/Header";

import type { BookStoryResponseDto } from "../../types/bookStories";
import { fetchBookStories } from "../../apis/BookStory/bookstories";

import type { NoticeDto } from "../../types/mainNotices";
import { dummyNotices } from "../../types/mainNotices";

export default function HomePage() {
  const [bookStories, setBookStories] = useState<BookStoryResponseDto[]>([]);
  const [notices, setNotices] = useState<NoticeDto[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingNotices, setLoadingNotices] = useState(false);
  const [errorBooks, setErrorBooks] = useState<string | null>(null);

  useEffect(() => {
    // 책 이야기 API 호출
    setLoadingBooks(true);
    fetchBookStories({ scope: "ALL" })
      .then((data) => setBookStories(data?.bookStoryResponses ?? []))
      .catch((e) => setErrorBooks(e.message ?? "책 이야기 불러오기 실패"))
      .finally(() => setLoadingBooks(false));

    // 공지사항 더미 데이터 로딩
    setLoadingNotices(true);
    setTimeout(() => {
      setNotices(dummyNotices);
      setLoadingNotices(false);
    }, 500); // 실제 API처럼 약간 지연
  }, []);

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100">
      {/* 헤더 */}
      <Header pageTitle="책모 홈" customClassName="mt-[30px]" />

      {/* 메인 컨텐츠 */}
      <div className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[30px] pl-[2px] pr-[30px] bg-[#FFFFFF]">
        {/* 공지사항 */}
        <div className="text-xl font-semibold text-gray-800 mb-4">공지사항</div>
        {loadingNotices && <p>공지사항 로딩중...</p>}
        <div className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth mb-12">
          {notices.map((notice) => (
            <div key={notice.id} className="flex-shrink-0">
              <NoticeCard
                id={notice.id}
                title={notice.title}
                date={notice.date ?? "날짜 정보 없음"}
                book={notice.book ?? "책 정보 없음"}
                tag={notice.tag}
                imgUrl={
                  notice.imgUrl ?? "https://placehold.co/262x232?text=공지"
                }
                content={notice.content}
                meetingPlace={notice.meetingPlace}
                afterPartyPlace={notice.afterPartyPlace}
              />
            </div>
          ))}
        </div>

        {/* 책 이야기 */}
        <div className="text-xl font-semibold text-gray-800 mb-4">
          책 이야기
        </div>
        {loadingBooks && <p>책 이야기 로딩중...</p>}
        {errorBooks && (
          <p className="text-red-500">책 이야기 에러: {errorBooks}</p>
        )}
        <div className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth scrollbar-hide">
          {bookStories.map((story) => {
            const state: "내 이야기" | "구독 중" | "구독하기" =
              story.writtenByMe
                ? "내 이야기"
                : story.authorInfo.following
                ? "구독 중"
                : "구독하기";

            return (
              <div key={story.bookStoryId} className="flex-shrink-0 w-[33rem]">
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
      </div>
    </div>
  );
}
