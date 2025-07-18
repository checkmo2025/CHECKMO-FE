import type { RecommendationDto } from "./dto";

export type RecommendListResult = {
  recommendations: RecommendationDto[];
  hasNext: false;
  totalElements: number;
};

export type RecommendDetailResult = {
  recommend: RecommendationDto;
  isMyRecommendation: boolean; // 내가 작성했는 지 여부에 따라 수정/삭제 버튼 띄우기
};

export type RecommendListDto = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: RecommendListResult;
};

export type RecommendDetailDto = {
  isSuccess: boolean;
  code: string;
  result: RecommendDetailResult;
};
