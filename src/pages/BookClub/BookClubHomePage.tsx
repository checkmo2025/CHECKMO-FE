import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef } from 'react';
import AnnouncementCard from '../../components/BookClub/AnnouncementCard';
import type { noticeListItemDto } from '../../types/clubNotice';
import { useClubNotices } from '../../hooks/BookClub/useClubNotices';
import Header from '../../components/Header';
import BookStoryCard from '../../components/BookClub/BookStoryCard';
import { useNavigate } from 'react-router-dom';
import { useBookStoriesInfinite } from '../../hooks/BookStory/useBookStoriesInfinite';
import type { BookStoryResponseDto } from '../../types/bookStories';
import { useClubDetail } from '../../hooks/BookClub/useClubDetail';
import { useIsStaff } from '../../hooks/BookClub/useIsStaff';
interface Params {
  bookclubId: string;
  [key: string]: string | undefined;
}

// 변환 없이 API DTO 그대로 사용

export default function BookClubHomePage(): React.ReactElement {
  const navigate = useNavigate();
  const { bookclubId } = useParams<Params>();
  const numericClubId = Number.isFinite(Number(bookclubId)) && Number(bookclubId) > 0 ? Number(bookclubId) : 0;
  
  const { data: club, isLoading: isClubLoading } = useClubDetail(numericClubId);
  const { data: isStaff } = useIsStaff(numericClubId);

  // API 훅 사용
  const { notices, loading, error } = useClubNotices({ 
    clubId: numericClubId,
    onlyImportant: true,
    size: 5 
  });

  // API 데이터에서 공지/투표만 필터링
  const filteredNotices: noticeListItemDto[] = notices.filter((notice) =>
    notice.tag === '공지' || notice.tag === '투표'
  );
  // 책이야기 무한스크롤 (클럽 스코프)
  const { data: bookStoriesPages, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isLoadingStories, isError: isErrorStories, error: errorStories } =
    useBookStoriesInfinite({ scope: 'CLUB', clubId: numericClubId });

  const clubBookStories: BookStoryResponseDto[] = useMemo(() => {
    if (!bookStoriesPages?.pages) return [];
    return bookStoriesPages.pages.flatMap((p) => p.bookStoryResponses || []);
  }, [bookStoriesPages]);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!hasNextPage) return;
    const el = loadMoreRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100">
      <Header pageTitle={isClubLoading ? '로딩중...' : `${club?.name ?? ''} 홈`}
        isAdmin={!!isStaff}
        showManageButton={!!isStaff}
        manageLabel="모임 관리하기"
        manageTo={`/bookclub/${numericClubId}/admin`}
        customClassName="mt-[30px]"
        />
      { /* ── 메인 컨텐츠 ── */}
      <div className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[57px] pl-[2px] pr-[30px] bg-[#FFFFFF]">
        <div className="flex flex-col gap-[36px]">
          {/* ── 공지사항 섹션 ── */}
          <section className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-semibold">공지사항</h2>  
              <Link to={`/bookclub/${numericClubId}/notices`} className="text-[14px] text-[#969696] mr-11 hover:underline">
                + 더보기
              </Link>
            </div>
            
            {/* 로딩 상태 */}
            {loading && (
              <div className="w-full h-[377px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px]">
                <p className="text-[#969696]">공지사항을 불러오는 중...</p>
              </div>
            )}
            
            {/* 에러 상태 */}
            {error && (
              <div className="w-full h-[377px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px]">
                <p className="text-red-500">{error}</p>
              </div>
            )}
            
            {/* 공지사항 데이터 */}
            {!loading && !error && filteredNotices.length > 0 && (
              <AnnouncementCard items={filteredNotices} />
            )}
            
            {/* 공지사항이 없는 경우 */}
            {!loading && !error && filteredNotices.length === 0 && (
              <div className="w-full h-[377px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px]">
                <p className="text-[#969696]">아직 등록된 중요 공지사항이 없습니다.</p>
              </div>
            )}
          </section>

          {/* ── 책 이야기 섹션 ── */}
          <section className="w-full h-[376px] mb-[60px]">
            <div className="flex justify-between items-center mb-[20px]">
              <h2 className="text-[18px] font-semibold">책 이야기</h2>
              <Link to={`/bookclub/${numericClubId}/admin`} className="text-[14px] text-[#8D8D8D] mr-11 hover:underline">
                  + 더보기
              </Link>
            </div>
            {isLoadingStories && (
              <p className="text-[#969696]">책 이야기를 불러오는 중...</p>
            )}
            {isErrorStories && (
              <p className="text-red-500">{String((errorStories as Error)?.message || '책 이야기 로딩 에러')}</p>
            )}
            <div className="flex-1 grid grid-cols-2 gap-[25px] cursor-pointer">
              {clubBookStories.map((story) => (
                <div key={story.bookStoryId} className="flex-shrink-0 min-w-[33rem]">
                  <BookStoryCard
                    userImage={story.authorInfo.profileImageUrl}
                    userName={story.authorInfo.nickname}
                    isSubscribed={story.authorInfo.following}
                    title={story.bookStoryTitle}
                    summary={story.description}
                    likes={story.likes}
                    likedByMe={story.likedByMe}
                    bookImageUrl={story.bookInfo.imgUrl}
                    onClick={() => navigate(`/bookstory/${story.bookStoryId}/detail`)}
                  />
                </div>
              ))}
            </div>
            <div ref={loadMoreRef} />
            {isFetchingNextPage && (
              <p className="text-[#969696] mt-2">불러오는 중...</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}