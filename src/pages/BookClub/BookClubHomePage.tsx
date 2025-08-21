import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import AnnouncementCard from '../../components/BookClub/AnnouncementCard';
import { useClubNotices } from '../../hooks/BookClub/useClubNotices';
import Header from '../../components/Header';
import BookStoryCard from '../../components/BookClub/BookStoryCard';
import { useNavigate } from 'react-router-dom';
import { useBookStoriesInfinite } from '../../hooks/BookStory/useBookStoriesInfinite';
import type { BookStoryResponseDto } from '../../types/bookStories';
import { useIsStaff } from '../../hooks/BookClub/useIsStaff';
import { fetchMyClubs } from '../../apis/Main/clubs';
import type { ClubDto } from '../../apis/Main/clubs';
interface Params {
  bookclubId: string;
  [key: string]: string | undefined;
}

// 변환 없이 API DTO 그대로 사용

export default function BookClubHomePage(): React.ReactElement {
  const navigate = useNavigate();
  const { bookclubId } = useParams<Params>();
  const numericClubId = Number.isFinite(Number(bookclubId)) && Number(bookclubId) > 0 ? Number(bookclubId) : 0;
  
  // 사이드바와 동일한 방식으로 클럽 이름 가져오기
  const [bookclubName, setBookclubName] = useState("모임 이름");
  const [myClubs, setMyClubs] = useState<ClubDto[]>([]);
  const [isLoadingClubName, setIsLoadingClubName] = useState(true);
  
  const { data: isStaff } = useIsStaff(numericClubId);

  // 사이드바와 동일한 방식으로 내 클럽 목록 로드
  useEffect(() => {
    const loadClubs = async () => {
      try {
        setIsLoadingClubName(true);
        const clubs = await fetchMyClubs();
        setMyClubs(clubs);
      } catch (error) {
        console.error('클럽 목록 로드 실패:', error);
      } finally {
        setIsLoadingClubName(false);
      }
    };
    loadClubs();
  }, []);

  // 현재 클럽 ID에 해당하는 클럽 이름 설정
  useEffect(() => {
    if (bookclubId && myClubs.length > 0) {
      const matchedClub = myClubs.find((c) => c.clubId === Number(bookclubId));
      if (matchedClub) {
        setBookclubName(matchedClub.clubName);
      } else {
        setBookclubName("접근 제한된 클럽");
      }
    }
  }, [bookclubId, myClubs]);

  // API 훅 사용
  const { notices, loading, error } = useClubNotices({ 
    clubId: numericClubId,
    onlyImportant: true,
    size: 5 
  });
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
      <Header pageTitle={isLoadingClubName ? '로딩중...' : `${bookclubName} 홈`}
        isAdmin={!!isStaff}
        showManageButton={!!isStaff}
        manageLabel="모임 관리하기"
        manageTo={`/bookclub/${numericClubId}/admin`}
        />

      { /* ── 메인 컨텐츠 ── */}
      <div className="overflow-y-auto h-[calc(100vh-105px)] w-full flex-1 pt-[27px] pl-[2px] bg-[#FFFFFF]">
        <div className="flex flex-col gap-[20px]">
          {/* ── 공지사항 섹션 ── */}
          <section className="w-full">
            <div className="px-[7px] flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-semibold">공지사항</h2>  
              <Link to={`/bookclub/${numericClubId}/notices`} className="text-[14px] text-[#969696] mr-[3px] hover:underline">
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
            {!loading && !error && notices.length > 0 && (
              <AnnouncementCard items={notices} />
            )}
            
            {/* 공지사항이 없는 경우 */}
            {!loading && !error && notices.length === 0 && (
              <div className="w-full h-[377px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px]">
                <p className="text-[#969696]">아직 등록된 중요 공지사항이 없습니다.</p>
              </div>
            )}
          </section>

          {/* ── 책 이야기 섹션 ── */}
          <section className="px-[7px] w-full h-[376px] mb-[60px]">
            <div className="flex justify-between items-center mb-[20px]">
              <h2 className="text-[18px] font-semibold">책 이야기</h2>
              <Link to={`/bookstory`} className="text-[14px] text-[#8D8D8D] mr-2 hover:underline">
                  + 더보기
              </Link>
            </div>
            {isLoadingStories && (
              <p className="text-[#969696]">책 이야기를 불러오는 중...</p>
            )}
            {isErrorStories && (
              <p className="text-red-500">{String((errorStories as Error)?.message || '책 이야기 로딩 에러')}</p>
            )}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[25px] cursor-pointer">
              {clubBookStories.map((story) => (
                <div key={story.bookStoryId} className="w-full">
                  <BookStoryCard
                    bookStoryId={story.bookStoryId}
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