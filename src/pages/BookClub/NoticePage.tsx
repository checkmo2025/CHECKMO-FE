import AnnouncementCard from '../../components/BookClub/AnnouncementCard';
import AnnouncementList from '../../components/BookClub/AnnouncementList';
import type { AnnouncementProps } from '../../types/announcement';
import checkerImage from "../../assets/images/checker.png";
import Header from '../../components/Header';

export default function HomePage(): React.ReactElement {
  console.log('NoticePage rendering...');
  // 공지사항 더미 데이터
  const dummyAnnouncements: AnnouncementProps[] = [
    {
      id: 1,
      title: '북적북적',
      tag: '모임',
      meetingDate: '2025.06.12',  
      book: '넥서스',
      imageUrl: checkerImage,    // 나중에 실제 URL로 교체
    },
    {
      id: 2,
      title: '5/24 모임 투표',
      tag: '투표',
      meetingDate: '2025.06.12 · 18시',
      meetingPlace: '홍대 9번 출구',
      afterPartyPlace: '반주시대',
      voteOptions: [
        { id: '1', label: '참여', value: 'yes' },
        { id: '2', label: '토론만 참여', value: 'talk' },
        { id: '3', label: '불참', value: 'no' },
      ],
      onVoteSubmit: (selectedValues: string[]) => {
        console.log(`Selected votes: ${selectedValues}`);
        // 투표 처리 로직
      },
    },
    {
      id: 3,
      title: '북적북적 MT 공지',
      tag: '공지',
      announcementTitle: '북적 북적 엠티가돌아왔다~',
      announcement: '🌲 북적북적 엠티 공지\n 📚 올해도 어김없이 북적이들의 소풍이 돌아왔습니다!\n 책 덮고 자연 속으로, 잠시 감성을 충전하러 떠나요✨\n ✔️ 날짜 / 장소 / 투표: [바로가기]',
    },
    {
      id: 4,
      title: '북적북적',
      tag: '모임',
      meetingDate: '2025.06.12',  
      book: '넥서스',
      imageUrl: checkerImage,    // 나중에 실제 URL로 교체
    },
    {
      id: 5,
      title: '5/24 모임 투표',
      tag: '투표',
      meetingDate: '2025.06.12 · 18시',
      meetingPlace: '홍대 9번 출구',
      afterPartyPlace: '반주시대',
      voteOptions: [
        { id: '1', label: '참여', value: 'yes' },
        { id: '2', label: '토론만 참여', value: 'talk' },
        { id: '3', label: '불참', value: 'no' },
      ],
      onVoteSubmit: (selectedValues: string[]) => {
        console.log(`Selected votes: ${selectedValues}`);
        // 투표 처리 로직
      },
    },
  ];

  const listItems: AnnouncementProps[] = [
    {
      id: 1,
      title: '05.24 | 토론 모임 (8)',
      clubName: '북적북적',
      tag: '모임',
      imageUrl: checkerImage,
      meetingDate: '2025.06.12',
      book: '넥서스',
      bookAuthor: '유발하리리',
    },
    {
      id: 2,
      title: '5/24 모임 투표',
      clubName: '북적북적',
      tag: '투표',
      imageUrl: checkerImage,
      meetingDate: '2025.06.12 18:00',
      meetingPlace: '홍대 9번 출구',
      afterPartyPlace: '반주시대',
    },
    {
      id: 3,
      title: '북적북적 공지',
      tag: '공지',
      imageUrl: checkerImage,
      announcementTitle: '북적 북적 엠티가돌아왔다~',
      announcement: '🌲 북적북적 엠티 공지\n 📚 올해도 어김없이 북적이들의 소풍이 돌아왔습니다!\n 책 덮고 자연 속으로, 잠시 감성을 충전하러 떠나요✨\n ✔️ 날짜 / 장소 / 투표: [바로가기]',
    },
    {
      id: 4,
      title: '05.24 | 토론 모임 (8)',
      clubName: '북적북적',
      tag: '모임',
      imageUrl: checkerImage,
      meetingDate: '2025.06.12',
      book: '넥서스',
      bookAuthor: '유발하리리',
    },
    {
      id: 5,
      title: '5/24 모임 투표',
      clubName: '북적북적',
      tag: '투표',
      imageUrl: checkerImage,
      meetingDate: '2025.06.12 18:00',
      meetingPlace: '홍대 9번 출구',
      afterPartyPlace: '반주시대',
    },
  ];

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100 h-screen flex flex-col">
      <Header pageTitle={'공지사항'} userProfile={{
        username: 'dayoun',
        bio: '아 피곤하다.'
      }} 
      notifications={[]}
      customClassName="mt-[30px]"
      />

      {/* 메인 컨텐츠 - 남은 공간을 모두 사용하며 스크롤 */}
      <div className="flex-1 overflow-y-auto mt-[15px] ml-[52px] mr-4 pb-8">
        {/* 상단: 중요 공지사항 */}
        <section className="mb-6">
          <AnnouncementCard items={dummyAnnouncements.slice(0, 5)} />
        </section>

        {/* 하단: 공지사항 목록*/}
        <section className="mt-[43px]">
          <AnnouncementList items={listItems} />
        </section>
      </div>
    </div>
  );
}