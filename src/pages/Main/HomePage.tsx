import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // <- 추가
import Header from "../../components/Header";
import NoticeCard from "../../components/Main/Notices/NoticeCard";
import BookStoriesCard from "../../components/Main/BookStoriesCard";

import type { BookStoryResponseDto } from "../../types/bookStories";
import type { NoticeDto } from "../../types/mainNotices";

import { fetchBookStories } from "../../apis/BookStory/bookstories";
import { fetchMyClubs } from "../../apis/Main/clubs";
import { fetchNoticesByClub } from "../../apis/Main/notices";

export default function HomePage() {
  const navigate = useNavigate(); // <- 추가
  const [bookStories, setBookStories] = useState<BookStoryResponseDto[]>([]);
  const [notices, setNotices] = useState<NoticeDto[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [loadingNotices, setLoadingNotices] = useState(false);
  const [errorBooks, setErrorBooks] = useState<string | null>(null);

  useEffect(() => {
    setLoadingBooks(true);
    fetchBookStories({ scope: "ALL" })
      .then((data) => setBookStories(data?.bookStoryResponses ?? []))
      .catch((e) => setErrorBooks(e.message ?? "책 이야기 불러오기 실패"))
      .finally(() => setLoadingBooks(false));

    setLoadingNotices(true);
    fetchMyClubs()
      .then((clubs) => {
        // 각 클럽별 공지 가져오기
        return Promise.all(
          clubs.map(async (club) => {
            const notices = await fetchNoticesByClub(club.clubId);
            // 각 notice에 clubId 추가
            return notices.map((notice) => ({
              ...notice,
              clubId: club.clubId,
            }));
          })
        );
      })
      .then((noticesArrays) => {
        // 2차원 배열을 1차원으로
        const allNotices = noticesArrays.flat();
        setNotices(allNotices);
      })
      .catch((err) => console.error("공지사항 불러오기 실패", err))
      .finally(() => setLoadingNotices(false));
  }, []);

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100">
      <Header pageTitle="책모 홈" customClassName="mt-[30px]" />

      <div className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[30px] pl-[2px] pr-[30px] bg-[#FFFFFF]">
        <div className="text-xl font-semibold text-gray-800 mb-4">공지사항</div>
        {loadingNotices && <p>공지사항 로딩중...</p>}
        <div className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth mb-12">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="flex-shrink-0 cursor-pointer"
              onClick={() =>
                navigate(`/bookclub/${notice.clubId}/notices/${notice.id}`)
              }
            >
              <NoticeCard notice={notice} />
            </div>
          ))}
        </div>

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
