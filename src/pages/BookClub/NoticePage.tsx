import AnnouncementCard, { type AnnouncementCardProps } from '../../components/BookClub/AnnouncementCard';
import AnnouncementList, { type AnnouncementListItemProps } from '../../components/BookClub/AnnouncementList';
import checkerImage from "../../assets/images/checker.png";

export default function HomePage(): React.ReactElement {
  // 공지사항 더미 데이터
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
      meetingPlace: '홍대 9번 출구',
      afterPartyPlace: '반주시대',
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
    {
      title: '북적북적 MT 공지',
      tag: '공지',
      announcementTitle: '북적 북적 엠티가돌아왔다~',
      announcement: '🌲 북적북적 엠티 공지\n 📚 올해도 어김없이 북적이들의 소풍이 돌아왔습니다!\n 책 덮고 자연 속으로, 잠시 감성을 충전하러 떠나요✨\n ✔️ 날짜 / 장소 / 투표: [바로가기]',
    },
  ];

  const listItems: AnnouncementListItemProps[] = [
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
  ];

  return (
    <div className="w-[1083px] flex-1 mt-[36px] ml-[52px] min-h-screen">
        {/* 상단: 중요 공지사항 */}
        <section>
          <AnnouncementCard items={dummyAnnouncements} />
        </section>

        {/* 하단: 공지사항 목록*/}
        <section className="mt-[43px]">
          <AnnouncementList items={listItems} />
        </section>
      </div>
  );
}
