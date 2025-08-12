import type { ApiResponse } from "./apiResponse";
import type { AuthorDto, BookDto } from "./dto";

export interface ClubMeeting {
  meetingId: number;
  title: string;
  meetingTime: string;
  location: string;
  content: string;
  generation: number;
  tag: string;
  bookInfo: BookDto;
}

export type MeetingListResult = {
  meetingInfoList: ClubMeeting[];
  hasNext: boolean;
  nextCursor: number | null;
};

// 정기 독서모임 간편 조회
export type MeetingListResponse = ApiResponse<MeetingListResult>;

// 정기 독서 모임 생성
export type CreateClubMeeting = Omit<ClubMeeting, "meetingId">;

// 정기 독서 모임 수정
export type EditClubMeeting = Omit<ClubMeeting, "meetingId" | "bookInfo">;

// 발제
export interface Topic {
  topicId: number;
  content: string;
  authorInfo: AuthorDto;
  teamNumbers: number[];
}

export type TeamTopic = {
  teamNumber: number; // 1=A조, 2=B조 …
  topics: Topic[];
};

// 전체 발제 목록과 선택한 팀 정보 전체 조회
export type TopicResponse = ApiResponse<Topic>;

// 팀 별 선택된 발제 조회
export type TeamTopicResponse = ApiResponse<TeamTopic>;
