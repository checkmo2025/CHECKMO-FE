import { Link } from 'react-router-dom';
import AnnouncementCard, { type AnnouncementCardProps } from '../../components/BookClub/AnnouncementCard';
import { NotificationItem, type NotificationItemProps } from '../../components/BookClub/NotificationItem';
import BookStoryCard, { type BookStoryCardProps } from '../../components/BookClub/BookStoryCard';
import checkerImage from '../../assets/images/checker.png';
import userImage from '../../assets/images/userImage.png';

export default function HomePage(): React.ReactElement {
  // ── 1) 공지사항 더미 데이터 ──
  const dummyAnnouncements: AnnouncementCardProps[] = [
    {
      title: '북적북적',
      tag: '모임',
      meetingDate: '2025.06.12',
      book: '넥서스',
      imageUrl: checkerImage,    // 나중에 실제 URL로 교체
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
        // 투표 처리 로직
      },
    },
  ];

  // ── 2) 알림 더미 데이터 ──
  const dummyNotifications: NotificationItemProps[] = [
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false },
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false  },
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false },
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false  },
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false },
    { message: '이현서님이 팔로우했습니다.', date: '2025.05.21 13:05 ', read: false  },
  ];

  // ── 3) 책 이야기 더미 데이터 ──
  const dummyStories: BookStoryCardProps[] = [
    {
      userName: 'hy',
      userImage: userImage, // API에서 올 URL 형태
      isSubscribed: false,
      title: '나는 나이든 왕자다',
      snippet: '어린 왕자는 소행성의 주인이므로 어린 군주라는 뜻이다.어린 왕자는 B-612에서 바오밥나무 싹을 캐거나 석양을 보며 살고 있다. B-612는 크기가 너무 ...',
      likes: 12,
    },
    {
      userName: 'lee',
      userImage: userImage, // API에서 올 URL 형태
      isSubscribed: true,
      title: '나는 나이든 왕자다',
      snippet: '어린 왕자는 소행성의 주인이므로 어린 군주라는 뜻이다.어린 왕자는 B-612에서 바오밥나무 싹을 캐거나 석양을 보며 살고 있다. B-612는 크기가 너무 ...',
      likes: 8,
    },
  ];

  return (
    <div className="flex-1 pt-[57px] pl-[52px] bg-[#FFFFFF] min-h-screen">
      <div className="flex gap-[36px]">
        {/* ── 공지사항 섹션 ── */}
        <section className="w-[684px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[18px] font-semibold">공지사항</h2>
            <Link to="/bookclub/notices" className="text-[14px] text-[#969696] mr-11 hover:underline">
              + 더보기
            </Link>
          </div>
          <AnnouncementCard items={dummyAnnouncements} />
        </section>

        {/* ── 알림 섹션 ── */}
        <aside className="w-[360px]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[18px] font-semibold">알림</h2>
            <Link to="/bookclub/notifications" className="text-[14px] text-[#8D8D8D] mr-3 hover:underline">
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
          <Link to="/bookclub/notifications" className="text-[14px] text-[#8D8D8D] mr-3 hover:underline">
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
  );
}
