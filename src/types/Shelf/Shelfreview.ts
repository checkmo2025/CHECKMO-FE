import type { ApiResponse } from "../apiResponse";

export interface ReviewAuthorInfo {
  nickname:        string;
  profileImageUrl: string;
}

export interface ReviewItem {
  bookReviewId: number;
  description:  string;
  rate:         number;
  authorInfo:   ReviewAuthorInfo;
}

// 조회 
export interface ReviewListRequest {
  meetingId: number;
  cursorId?: number;
  size:      number;
}

export type ReviewListResponse = ApiResponse<{
  bookReviewList: ReviewItem[];
  hasNext:        boolean;
  nextCursor:     number;
}>;

export type ReviewListResponseResult = ReviewListResponse["result"];

// 작성
export interface ReviewCreateRequest {
  description: string;
  rate:        number;
}
export type ReviewCreateResponse = ApiResponse<number>;

export type ReviewCreateResponseResult = ReviewCreateResponse["result"];

// 수정
export interface ReviewUpdateRequest {
  reviewId : number;
  description: string;
  rate:        number;
}

export type ReviewUpdateResponse = ApiResponse<number>;

export type ReviewUpdateResponseResult = ReviewUpdateResponse["result"];

// 삭제 - 삭제는 Request할 내용도, 응답도 필요 없으므로 ApiResponse를 사용하지 않음