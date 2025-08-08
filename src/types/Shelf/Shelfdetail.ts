import type { ApiResponse } from "../apiResponse";

export interface ShelfDetailRequest { meetingId: number; }

/** 책 상세 정보 */
export interface BookDetailInfo {
  bookId:      string;
  title:       string;
  author:      string;
  imgUrl:      string;
  publisher:   string;
  description: string;
}

export interface MeetingInfo {
  meetingId:   number;
  generation:  number;
  tag:         string;
  averageRate: number;
}

/** 토픽 작성자 정보 */
export interface AuthorInfo {
  nickname:        string;
  profileImageUrl: string;
}

/** 한 개의 토픽 아이템 */
export interface TopicItem {
  topicId:    number;
  content:    string;
  authorInfo: AuthorInfo;
  author:     boolean;
}

/** 토픽 목록 페이징 */
export interface TopicList {
  topics:     TopicItem[];
  hasNext:    boolean;
  nextCursor: number | null;
}

/** /shelf/detail API 응답 전체 */
export type ShelfDetailResponse = ApiResponse<{
  meetingInfo:    MeetingInfo;
  bookDetailInfo: BookDetailInfo;
  topicList:      TopicList;
}>;

/** result 부분만 추출 */
export type ShelfDetailResponseResult = ShelfDetailResponse["result"];

