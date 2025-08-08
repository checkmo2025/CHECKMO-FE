import type { ApiResponse } from "./apiResponse";
import type { AuthorDto, BookDto } from "./dto";

export type RecommendationDto = {
  id: number;
  title: string;
  content: string;
  rate: number;
  tag: string;
  bookInfo: BookDto;
  authorInfo: AuthorDto;
  staff: boolean; // 본인이 해당 클럽의 스탭인 지 여부
  author: boolean; // 본인이 해당 글의 작성자인 지 여부
};

export type RecommendListResult = {
  bookRecommendList: RecommendationDto[];
  hasNext: boolean;
  nextCursor: number;
  pageSize: number;
};

// 추천 책 전체 조회 응답
export type RecommendationsResponse = ApiResponse<RecommendListResult>;

// 추천 책 상세 조회 응답
export type RecommendDetailResponse = ApiResponse<RecommendationDto>;

export type UpdateRecommendDto = {
  title: string;
  content: string;
  rate: number;
  tag: string;
};
