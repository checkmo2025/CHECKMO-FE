import { useEffect, useState } from "react";
import NoticeCard from "../../components/Main/Notices/NoticeCard";
import BookStoriesCard from "../../components/Main/BookStoriesCard";
import Header from "../../components/Header";

import type { BookStoryResponseDto } from "../../types/bookStories";
import { fetchBookStories } from "../../apis/BookStory/bookstories";

import type { NoticeDto } from "../../types/notices";
import { fetchNotices } from "../../apis/notices";

export default function HomePage() {
  const [bookStories, setBookStories] = useState<BookStoryResponseDto[]>([]);
  const [notices, setNotices] = useState<NoticeDto[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingNotices, setLoadingNotices] = useState(false);
  const [errorBooks, setErrorBooks] = useState<string | null>(null);
  const [errorNotices, setErrorNotices] = useState<string | null>(null);

  useEffect(() => {
    setLoadingBooks(true);
    fetchBookStories({ scope: "ALL" })
      .then((data) => {
        setBookStories(data?.bookStoryResponses ?? []);
      })
      .catch((e) => setErrorBooks(e.message ?? "책 이야기 불러오기 실패"))
      .finally(() => setLoadingBooks(false));

    setLoadingNotices(true);
    fetchNotices({ onlyImportant: false })
      .then((data) => {
        setNotices(data?.noticeList ?? []);
      })
      .catch((e) => setErrorNotices(e.message ?? "공지사항 불러오기 실패"))
      .finally(() => setLoadingNotices(false));
  }, []);

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100">
      {/* 헤더 */}
      <Header
        pageTitle="책모 홈"
        userProfile={{
          username: "yujin",
          bio: "가나다",
        }}
        customClassName="mt-[30px]"
      />

      {/* 메인 컨텐츠 */}
      <div className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[30px] pl-[2px] pr-[30px] bg-[#FFFFFF]">
        {/* 공지사항 */}
        <div className="text-xl font-semibold text-gray-800 mb-4">공지사항</div>
        {loadingNotices && <p>공지사항 로딩중...</p>}
        {errorNotices && (
          <p className="text-red-500">공지사항 에러: {errorNotices}</p>
        )}
        <div className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth mb-12 scrollbar-hide">
          {notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              title={notice.title}
              date="날짜 정보 없음"
              book="책 정보 없음"
              type={
                notice.tag === "모임" ||
                notice.tag === "투표" ||
                notice.tag === "공지"
                  ? notice.tag
                  : "공지"
              }
              imageUrl="https://placehold.co/262x232?text=공지"
              content={notice.title}
            />
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
