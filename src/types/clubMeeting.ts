import type { ApiResponse } from "./apiResponse";
import type { AuthorDto, BookDto } from "./dto";

// 독서 모임 - 모임 전체 긴편 조회
export type MeetingListItemDto = {
  meetingId: number;
  tags: string;
  title: string;
  book: BookDto;
  meetingDate: string;
  meetingPlace: string;
};

export type ClubGenerationDto = {
  generation: number;
  meetings: MeetingListItemDto[];
};

export type MeetingListResultDto = {
  generations: ClubGenerationDto[];
  hasNext: boolean;
  nextCursor: number;
};

export type MeetingListResponse = ApiResponse<MeetingListResultDto>;

// 독서 모임 - 모임 상세 조회
export interface TopicDto {
  topicId: number;
  content: string;
  authorInfo: AuthorDto;
}

export interface TopicPreviewDto extends TopicDto {
  selectedTeams: number[]; // 해당 발제를 선택한 조들 (1:A조, 2:B조, 3:C조)
}

export interface TeamDto {
  teamNumber: number; // 1=A조, 2=B조 …
  topics: TopicDto[];
}

export interface MeetingDto {
  meetingId: number;
  generation: number; // 7기 …
  tags: string; // "사회"
  title: string; // "1차 정기모임"
  book: BookDto;
  meetingDate: string; // ISO — "2025‑06‑02T18:00"
  meetingPlace: string; // "제이스 스터디룸"
}

export interface MeetingDetailResultDto extends MeetingDto {
  topicPreview: TopicPreviewDto[];
  teams: TeamDto[];
}

export type MeetingDetailResponse = ApiResponse<MeetingDetailResultDto>;
