import type { MeetingListResponse } from "../../types/clubMeeting";

export const DummyMeetingList: MeetingListResponse = {
  isSuccess: true,
  code: "COMMON200",
  message: "성공입니다.",
  result: {
    generations: [
      {
        generation: 7,
        meetings: [
          {
            meetingId: 701,
            tags: "사회",
            title: "1차 정기모임",
            book: {
              title: "넥서스",
              author: "유발하라리",
              imgUrl: "https://example.com/nexus.jpg",
            },
            meetingDate: "2025-06-02T18:00",
            meetingPlace: "제이스 스터디룸",
          },
          {
            meetingId: 702,
            tags: "문학",
            title: "2차 정기모임",
            book: {
              title: "데미안",
              author: "헤르만 헤세",
              imgUrl: "https://example.com/demian.jpg",
            },
            meetingDate: "2025-07-01T19:00",
            meetingPlace: "강남 교보문고",
          },
          {
            meetingId: 703,
            tags: "문학",
            title: "3차 정기모임",
            book: {
              title: "데미안",
              author: "헤르만 헤세",
              imgUrl: "https://example.com/demian.jpg",
            },
            meetingDate: "2025-08-01T19:00",
            meetingPlace: "강남 교보문고",
          },
          {
            meetingId: 704,
            tags: "사회",
            title: "4차 정기모임",
            book: {
              title: "넥서스",
              author: "유발하라리",
              imgUrl: "https://example.com/nexus.jpg",
            },
            meetingDate: "2025-09-02T18:00",
            meetingPlace: "제이스 스터디룸",
          },
        ],
      },
      {
        generation: 6,
        meetings: [
          {
            meetingId: 601,
            tags: "문학",
            title: "1차 정기모임",
            book: {
              title: "어린왕자",
              author: "생텍쥐페리",
              imgUrl: "https://example.com/prince.jpg",
            },
            meetingDate: "2025-05-02T18:30",
            meetingPlace: "서울 시립 도서관",
          },
          {
            meetingId: 602,
            tags: "문학",
            title: "2차 정기모임",
            book: {
              title: "어린왕자",
              author: "생텍쥐페리",
              imgUrl: "https://example.com/prince.jpg",
            },
            meetingDate: "2025-05-03T18:30",
            meetingPlace: "서울 시립 도서관",
          },
          {
            meetingId: 603,
            tags: "문학",
            title: "3차 정기모임",
            book: {
              title: "어린왕자",
              author: "생텍쥐페리",
              imgUrl: "https://example.com/prince.jpg",
            },
            meetingDate: "2025-05-04T18:30",
            meetingPlace: "서울 시립 도서관",
          },
        ],
      },
    ],
    hasNext: true,
    nextCursor: 601,
  },
};
