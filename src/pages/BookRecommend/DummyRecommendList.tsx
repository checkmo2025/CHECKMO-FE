import type { RecommendList } from "../../types/bookRecommend";

export const dummyRecommendList: RecommendList = {
  isSuccess: true,
  code: "200",
  message: "성공적으로 불러왔습니다.",
  result: {
    recommendations: [
      {
        recommendId: 1,
        bookInfo: {
          bookId: 101,
          title: "넥서스",
          author: "유발 하라리",
          imgUrl: "https://example.com/covers/nexus.jpg",
        },
        memberInfo: {
          memberId: 11,
          nickName: "hy_0716",
          imgUrl: "https://example.com/avatars/hy_0716.png",
        },
        content:
          "현대 서울이 어떤 과정을 통해 형성되었는지 쉽고 재미있게 설명한 책입니다. 6·25 이후부터 70년대 도시계획까지 실제 사례를 풍부하게 다뤄요.",
        rate: 4.5,
        createdAt: new Date("2025-07-10T14:23:00Z"),
      },
      {
        recommendId: 2,
        bookInfo: {
          bookId: 102,
          title: "데이터 과학 입문",
          author: "박철수",
          imgUrl: "https://example.com/covers/data-science.jpg",
        },
        memberInfo: {
          memberId: 27,
          nickName: "data_guru",
          imgUrl: "https://example.com/avatars/data_guru.png",
        },
        content:
          "통계 기초부터 머신러닝 개념까지 친절하게 정리되어 있어 입문자에게 추천합니다.",
        rate: 4.0,
        createdAt: new Date("2025-06-28T09:15:00Z"),
      },
      {
        recommendId: 3,
        bookInfo: {
          bookId: 103,
          title: "리액트를 다루는 기술",
          author: "홍길동",
          imgUrl: "https://example.com/covers/react-guide.jpg",
        },
        memberInfo: {
          memberId: 35,
          nickName: "react_master",
          imgUrl: "https://example.com/avatars/react_master.png",
        },
        content:
          "React의 기본 문법부터 Hooks, 상태 관리까지 실습 예제가 풍부해서 실무에 바로 써먹기 좋습니다.",
        rate: 5.0,
        createdAt: new Date("2025-07-01T18:45:00Z"),
      },
      {
        recommendId: 4,
        bookInfo: {
          bookId: 104,
          title: "SSAFY",
          author: "홍길동123",
          imgUrl: "https://example.com/covers/react-guide.jpg",
        },
        memberInfo: {
          memberId: 343,
          nickName: "re_turnto_oz",
          imgUrl: "https://example.com/avatars/react_master.png",
        },
        content: "SSAFY 14기 서울 9반 홍길동123",
        rate: 3.3,
        createdAt: new Date("2025-07-01T18:45:00Z"),
      },
      {
        recommendId: 5,
        bookInfo: {
          bookId: 111,
          title: "SSAFY12",
          author: "홍길동123",
          imgUrl: "https://example.com/covers/react-guide.jpg",
        },
        memberInfo: {
          memberId: 343,
          nickName: "re_turnto_oz",
          imgUrl: "https://example.com/avatars/react_master.png",
        },
        content: "SSAFY 14기 서울 9반 홍길동123",
        rate: 4.3,
        createdAt: new Date("2025-07-01T18:45:00Z"),
      },
      {
        recommendId: 6,
        bookInfo: {
          bookId: 123,
          title: "SSAFY14",
          author: "홍길동123",
          imgUrl: "https://example.com/covers/react-guide.jpg",
        },
        memberInfo: {
          memberId: 343,
          nickName: "re_turnto_oz",
          imgUrl: "https://example.com/avatars/react_master.png",
        },
        content: "SSAFY 14기 서울 9반 홍길동123",
        rate: 2.1,
        createdAt: new Date("2025-07-01T18:45:00Z"),
      },
    ],
    hasNext: false,
    totalElements: 3,
  },
};
