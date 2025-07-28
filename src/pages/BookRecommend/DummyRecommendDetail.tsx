import type { RecommendDetailDto } from "../../types/bookRecommend";
import type { RecommendationDto } from "../../types/dto";

const dummyRecommendation: RecommendationDto = {
  recommendId: 1001,
  bookInfo: {
    bookId: 987,
    title: "넥서스",
    author: "유발 하리라",
    imgUrl: "https://example.com/images/book-covers/moon-trip.jpg",
    publisher: "김병주",
  },
  memberInfo: {
    memberId: 42,
    nickName: "hy_0716",
    imgUrl: "https://example.com/images/avatars/hy_0716.png",
  },
  content:
    "현대 서울이 어떤 과정으로 형성되었는지 설명하는 책입니다. 6.25 이후 시점부터 다루며 실제 70년대 서울시 도시계획 책임자였던 저자의 경험과 여러 사료들을 바탕으로 기술되어 쉽고 재미있게 읽을 수 있습니다. 총 5권으로 구성되어 있고 저도 다 읽지 않았지만 천천히 읽으면 재미있지 않을까 싶어요! <서부 전선 이상 없다>의 저자 레마르크의 소설입니다. 이 책은 2차 세계대전 전 히틀러 통치 시기를 배경으로 하는 소설입니다. 프랑스의 망명자들을 등장인물로 하는 이 소설은 탄압받고, 사랑하는 사람을 잃은 상황 속에서 살아가는 사람들에 대한 이야기입니다.",
  rate: 4.2,
  createdAt: new Date("2025-07-15T10:34:00Z"),
};

/* ── 상세 DTO (RecommendDetailDto) ── */
export const dummyRecommendDetail: RecommendDetailDto = {
  isSuccess: true,
  code: "RECOMMEND200",
  result: {
    recommend: dummyRecommendation,
    isMyRecommendation: false,
  },
};
