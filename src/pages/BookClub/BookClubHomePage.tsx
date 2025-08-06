import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AnnouncementCard, { type AnnouncementCardProps } from '../../components/BookClub/AnnouncementCard';
import { NotificationItem, type NotificationItemProps } from '../../components/BookClub/NotificationItem';
import BookStoryCard, { type BookStoryCardProps } from '../../components/BookClub/BookStoryCard';
import type { ClubDto } from '../../types/dto';
import { BOOK_CATEGORIES, PARTICIPANT_TYPES } from '../../types/dto';
import checkerImage from '../../assets/images/checker.png';
import userImage from '../../assets/images/userImage.png';
import Header from '../../components/Header';
interface Params {
  clubId: string;
  [key: string]: string | undefined;
}

export default function BookClubHomePage(): React.ReactElement {
  const { clubId } = useParams<Params>();

  // ── ClubDto 더미 데이터 ──
  const dummyClubData: ClubDto = {
    clubId: Number(clubId) || 1,
    name: '북적북적 독서클럽',
    description: '함께 읽고 토론하는 즐거운 독서 모임입니다. 매주 다양한 책을 읽고 의견을 나눕니다.',
    profileImageUrl: checkerImage,
    open: true,
    category: [2, 3, 6], // 소설/시/희곡, 에세이, 인문학
    participantTypes: [PARTICIPANT_TYPES.STUDENT, PARTICIPANT_TYPES.WORKER, PARTICIPANT_TYPES.OFFLINE],
    region: '서울',
    purpose: '독서 토론 및 친목 도모',
    insta: '@bookclub_official',
    kakao: 'bookclub_chat'
  };

  // ── 더미 데이터 (임시) ──
  const dummyAnnouncements: AnnouncementCardProps[] = [
    {
      title: '북적북적',
      tag: '모임',
      meetingDate: '2025.06.12',
      book: '넥서스',
      imageUrl: checkerImage,
    },
    {
      title: '5/24 모임 투표',
      tag: '투표',
      meetingDate: '2025.06.12 · 18시',
      meetingPlace: '카페 모임',
      afterPartyPlace: '맛집',
      voteOptions: [
        { label: '참여', value: 'yes' },
        { label: '토론만 참여', value: 'talk' },
        { label: '불참', value: 'no' },
      ],
      onVoteSubmit: (selectedValue) => {
        console.log(`Selected vote: ${selectedValue}`);
      },
    },
  ];

  const dummyNotifications: NotificationItemProps[] = [
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false },
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false },
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false },
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false },
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false },
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false },
  ];

  const dummyStories: BookStoryCardProps[] = [
    {
      userName: 'hy',
      userImage: userImage,
      isSubscribed: false,
      title: '나는 나이든 왕자다',
      summary: '어린 왕자는 소행성의 주인이므로 어린 군주라는 뜻이다.어린 왕자는 B-612에서 바오밥나무 싹을 캐거나 석양을 보며 살고 있다. B-612는 크기가 너무 ...',
      likes: 12,
    },
    {
      userName: 'lee',
      userImage: userImage,
      isSubscribed: true,
      title: '나는 나이든 왕자다',
      summary: '어린 왕자는 소행성의 주인이므로 어린 군주라는 뜻이다.어린 왕자는 B-612에서 바오밥나무 싹을 캐거나 석양을 보며 살고 있다. B-612는 크기가 너무 ...',
      likes: 8,
    },
  ];

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100">
      <Header pageTitle={'모임 검색하기'} userProfile={{
          username: 'dayoun',
          bio: '아 피곤하다.'
        }} 
        notifications={[]}
        customClassName="mt-[60px]"
        />
      { /* ── 메인 컨텐츠 ── */}
      <div className="overflow-y-auto h-[calc(100vh-120px)] w-full">
        <div className="flex-1 pt-[57px] pl-[52px] pr-[52px] pb-[80px] bg-[#FFFFFF]">
          <div className="flex gap-[36px]">
            {/* ── 공지사항 섹션 ── */}
            <section className="w-[684px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[18px] font-semibold">공지사항</h2>  
                <Link to={`/bookclub/${clubId}/notices`} className="text-[14px] text-[#969696] mr-11 hover:underline">
                  + 더보기
                </Link>
              </div>
              <AnnouncementCard items={dummyAnnouncements} />
            </section>

            {/* ── 알림 섹션 ── */}
            <aside className="w-[360px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[18px] font-semibold">알림</h2>
                <Link to = {`/bookclub/${clubId}/notifications`} className="text-[14px] text-[#8D8D8D] mr-3 hover:underline">
                  + 더보기
                </Link>
              </div>
              <ul className="w-[360px] h-[380px] rounded-[15px] border-2 border-[#EAE5E2]
                py-[17px] px-[17px] gap-[10px] flex flex-col overflow-hidden">
                {dummyNotifications.map((n, idx) => (
                  <NotificationItem key={idx} {...n} />
                ))}
              </ul>
            </aside>
          </div>

          {/* ── 책 이야기 섹션 ── */}
          <section className="w-[1083px] h-[376px] mt-[36px]">
            <div className="flex justify-between items-center mb-[20px]">
              <h2 className="text-[18px] font-semibold">책 이야기</h2>
              <Link to={`/bookclub/${clubId}/notifications`} className="text-[14px] text-[#8D8D8D] mr-3 hover:underline">
                  + 더보기
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-[25px]">
              {dummyStories.map((s, idx) => (
                <BookStoryCard key={idx} {...s} />
              ))}
            </div>
          </section>
      </div>
      </div>
    </div>
  );
}
