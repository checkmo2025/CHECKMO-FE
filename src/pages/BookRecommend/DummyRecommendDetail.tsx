import type { RecommendDetailDto } from "../../types/bookRecommend";
import type { RecommendationDto } from "../../types/dto";

const dummyRecommendation: RecommendationDto = {
  recommendId: 1001,
  bookInfo: {
    bookId: 987,
    title: "달까지 가자",
    author: "장류진",
    imgUrl: "https://example.com/images/book-covers/moon-trip.jpg",
    pulisher: "",
  },
  memberInfo: {
    memberId: 42,
    nickName: "hy_0716",
    imgUrl: "https://example.com/images/avatars/hy_0716.png",
  },
  content:
    "대출과 빚으로 나날이 고단한 사회 초년생이 친구들과 함께 거대한 계획을 실행한다는 설정이 흥미로웠습니다.\n특히 현실적인 대사와 군더더기 없는 전개가 좋았어요.",
  rate: 4.6,
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
