import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AnnouncementCard from '../../components/BookClub/AnnouncementCard';
import BookStoryCard, { type BookStoryCardProps } from '../../components/BookClub/BookStoryCard';
import type { ClubDto } from '../../types/dto';
import { PARTICIPANT_TYPES } from '../../types/dto';
import checkerImage from '../../assets/images/checker.png';
import userImage from '../../assets/images/userImage.png';
import Header from '../../components/Header';
import type { AnnouncementProps } from '../../types/announcement';
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

  // ── ClubDto 더미 데이터 ──
  const dummyClubData: ClubDto = {
    clubId: Number(clubId) || 1,
    name: '북적북적',
    description: '함께 읽고 토론하는 즐거운 독서 모임입니다. 매주 다양한 책을 읽고 의견을 나눕니다.',
    profileImageUrl: checkerImage,
    open: true,
    category: [2, 3, 6], // 소설/시/희곡, 에세이, 인문학
    participantTypes: [PARTICIPANT_TYPES.STUDENT, PARTICIPANT_TYPES.WORKER, PARTICIPANT_TYPES.OFFLINE],
    region: '서울',
    
    insta: '@bookclub_official',
    kakao: 'bookclub_chat'
  };

  // ── 더미 데이터 (임시) ──
  const dummyAnnouncements: AnnouncementProps[] = [
    {
      id: 1,
      title: "북적북적",
      story:
        "줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.",
      state: "구독 중",
      likes: 12,
    },
    {
      title: '5/24 모임 투표',
      tag: '투표',
      meetingDate: '2025.06.12 · 18시',
      meetingPlace: '카페 모임',
      afterPartyPlace: '맛집',
      voteOptions: [
        { id: 'yes', label: '참여', value: 'yes' },
        { id: 'talk', label: '토론만 참여', value: 'talk' },
        { id: 'no', label: '불참', value: 'no' },
      ],
      onVoteSubmit: (selectedValue: string[]) => {
        console.log(`Selected vote: ${selectedValue}`);
      },
    },
  ];

  

  const dummyStories: BookStoryCardProps[] = [
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
