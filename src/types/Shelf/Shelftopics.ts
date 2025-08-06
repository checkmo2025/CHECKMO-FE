import type { ApiResponse } from "../apiResponse";

export interface TopicAuthorInfo {
  nickname:        string;
  profileImageUrl: string;
}

export interface TopicItem {
  topicId:    number;
  content:    string;
  authorInfo: TopicAuthorInfo;
  author:     boolean;
}

//조회 
export interface TopicListRequest {
  meetingId: number;
  cursorId?: number;
  size:      number;
}

export type TopicListResponse = ApiResponse<{
  topics:     TopicItem[];
  hasNext:    boolean;
  nextCursor: number;
}>;

export type TopicListResponseResult = TopicListResponse["result"];

// 작성
export interface TopicCreateRequest {
  description: string;
}

export type TopicCreateResponse = ApiResponse<number>;

export type TopicCreateResponseResult = TopicCreateResponse["result"];

// 수정
export interface TopicUpdateRequest {
  topicId : number;
  description: string;
}
export type TopicUpdateResponse = ApiResponse<number>;

export type TopicUpdateResponseResult = TopicUpdateResponse["result"];

//삭제 - 삭제는 Request할 내용도, 응답도 필요 없으므로 ApiResponse를 사용하지 않음
