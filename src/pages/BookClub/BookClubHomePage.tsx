import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AnnouncementCard from '../../components/BookClub/AnnouncementCard';
import  { type BookStoryCardProps } from '../../components/BookClub/BookStoryCard';
import type { noticeListItemDto } from '../../types/clubNotice';
import { useClubNotices } from '../../hooks/BookClub/useClubNotices';
import userImage from '../../assets/images/userImage.png';
import Header from '../../components/Header';
import BookStoriesCard from '../../components/Main/BookStoriesCard';
interface Params {
  bookclubId: string;
  [key: string]: string | undefined;
}

// 변환 없이 API DTO 그대로 사용

export default function BookClubHomePage(): React.ReactElement {
  const { bookclubId } = useParams<Params>();
  const numericClubId = Number.isFinite(Number(bookclubId)) && Number(bookclubId) > 0 ? Number(bookclubId) : 0;
  
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

  const bookstories = [
    {
      id: 1,
      title: "북적북적",
      story:
        "줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.",
      state: "구독 중",
      likes: 12,
    },
    {
      id: 2,
      title: "인간실격",
      story:
        "줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.",
      state: "구독 중",
      likes: 193,
    },
    {
      id: 3,
      title: "홍학의 자리",
      story:
        "줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.",
      state: "구독 중",
      likes: 2003,
    },
    {
      id: 4,
      title: "홍학의 자리",
      story:
        "줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.",
      state: "구독 중",
      likes: 2003,
    },
  ];

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100">
      <Header pageTitle={`${bookclubId} 홈`} //추후 수정 필요
        customClassName="mt-[30px]"
        />
      { /* ── 메인 컨텐츠 ── */}
      <div className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[57px] pl-[2px] pr-[30px] bg-[#FFFFFF]">
        <div className="flex flex-col gap-[36px]">
          {/* ── 공지사항 섹션 ── */}
          <section className="w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-semibold">공지사항</h2>  
              <Link to={`/bookclub/${bookclubId}/notices`} className="text-[14px] text-[#969696] mr-11 hover:underline">
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
              <Link to={`/bookclub/${bookclubId}/notifications`} className="text-[14px] text-[#8D8D8D] mr-3 hover:underline">
                  + 더보기
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-[25px]">
              {bookstories.map((story) => (
                <div key={story.id} className="flex-shrink-0 w-[33rem]">
                  <BookStoriesCard {...story} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
