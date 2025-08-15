export type NoticeTag = "모임" | "투표" | "공지";

export interface NoticeDto {
  id: number;
  title: string;
  tag: NoticeTag;
  date?: string;
  book?: string;
  content: string;
  imgUrl?: string;
  meetingPlace?: string;
  afterPartyPlace?: string;
}

export const dummyNotices: NoticeDto[] = [
  {
    id: 1,
    title: "8월 독서 모임 안내",
    tag: "모임",
    date: "2025-08-20 19:00",
    book: "데미안",
    content: "이번 달 모임은 데미안 읽고 토론합니다.",
    imgUrl: "https://placehold.co/262x232?text=모임",
    meetingPlace: "홍대 9번출구",
    afterPartyPlace: "반주시대",
  },
  {
    id: 2,
    title: "다음 달 투표 공지",
    tag: "투표",
    content: "다음 달 모임 주제를 정하기 위한 투표입니다.",
    imgUrl: "https://placehold.co/262x232?text=투표",
    meetingPlace: "홍대 9번출구",
    afterPartyPlace: "반주시대",
  },
  {
    id: 3,
    title: "공지사항 예시",
    tag: "공지",
    date: "2025-08-15",
    book: "1984",
    content: "공지사항 예시입니다. 중요한 내용 확인해주세요.",
    imgUrl: "https://placehold.co/262x232?text=공지",
  },
  {
    id: 4,
    title: "공지사항 예시2",
    tag: "공지",
    date: "2025-08-15",
    book: "홍학의 자리",
    content: "공지사항 예시입니다. 중요한 내용 확인해주세요.",
    imgUrl: "https://placehold.co/262x232?text=공지",
  },
  {
    id: 5,
    title: "투표 예시",
    tag: "투표",
    content: "언제 모여",
    imgUrl: "https://placehold.co/262x232?text=투표",
    meetingPlace: "공덕역",
    afterPartyPlace: "마포왕족발",
  },
];
