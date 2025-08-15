import type { ApiResponse } from "./apiResponse";

// 일반 공지사항 상세보기
export type generalNoticeItemDto = {
  id: number;
  title: string;
  content: string;
  important: boolean;
  tag: '공지'
}

export type generalNoticeResult = {
  noticeItem: generalNoticeItemDto;
  staff: boolean;
};

export type generalNoticeResponse = ApiResponse<generalNoticeResult>

// 투표 공지사항 상세보기
export type voteMembersDto = {
  nickname: string;
  profileImageUrl: string;
}

export type voteItemDto = {
  item: string;
  voteCount: number;
  votedMembers: voteMembersDto[];
  selected: boolean;
}

export type voteItemListDto = {
  items: voteItemDto[];
}

export type voteNoticeItemDto = {
  id: number;
  title: string;
  content: string;
  anonymity: boolean;
  duplication: boolean;
  startTime: string;
  deadline: string;
  tag: '투표';
  items: voteItemListDto;
}

export type voteNoticeResult = {
  noticeItem: voteNoticeItemDto;
  staff: boolean;
}

export type voteNoticeResponse = ApiResponse<voteNoticeResult>

// 모임 공지사항 상세보기
export type bookInfoDto = {
  bookId: string;
  title: string;
  author: string;
  imgUrl: string;
}

export type meetingInfoDto = {
  meetingId: number
  title: string;
  meetingTime: string;
  location: string;
  generation: number;
  tag: string;
  content: string;
  bookInfo: bookInfoDto;
}

export type authorInfoDto = {
  nickname: string;
  profileImageUrl: string;
}

export type topicInfoDto = {
  topicId: number;
  content: string;
  authorInfo: authorInfoDto;
  teamNumbers: number[];
}

export type topicListDto = {
  topics: topicInfoDto[];
}

export type TeamTopicDto = {
  topicId: number
  content: string
  authorInfo: authorInfoDto
  teamNumbers: number[] | null
}

export type TeamTopicListDto = {
  topics: TeamTopicDto[]
}

export type teamDto = {
  teamNumber: number;
  topics: TeamTopicListDto;
}

export type teamListDto = {
  teams: teamDto[];
}

export type meetingNoticeResult = {
  meetingInfo: meetingInfoDto;
  topics: topicListDto;
  teams: teamListDto;
}

export type meetingNoticeResponse = ApiResponse<meetingNoticeResult>


// 공지사항 목록 DTO (실제 API 응답 구조)
export type noticeListItemDto = {
  id: number;
  title: string;
  important: boolean;
  tag: '공지' | '모임' | '투표';
  content?: string; // 공지/모임 타입에 포함
  items?: voteItemDto[]; // 투표 타입에만 포함
  meetingInfoDTO?: meetingInfoDto; // 모임 타입에만 포함
};

export type noticeListResult = {
  noticeList: noticeListItemDto[];
  hasNext: boolean;
  nextCursor: number | null;
  pageSize: number;
  staff: boolean;
};

export type clubNoticeListResponse = ApiResponse<noticeListResult>

// 투표 삭제 결과 타입 (인터셉터로 result 문자열만 반환)
export type DeleteVoteResult = string;

// 공지 삭제 결과 타입 (인터셉터로 result 문자열만 반환)
export type DeleteGeneralNoticeResult = string;