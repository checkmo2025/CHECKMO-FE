import type { ApiResponse } from "./apiResponse";

// 카테고리 상수
export const BOOK_CATEGORIES = {
  1: "국내도서",
  2: "소설/시/희곡",
  3: "에세이",
  4: "경제/경영",
  5: "자기계발",
  6: "인문학",
  7: "여행",
  8: "역사/문화",
  9: "사회과학",
  10: "정치/외교/국방",
  11: "컴퓨터/IT",
  12: "과학",
  13: "외국어",
  14: "예술/대중문화",
  15: "어린이 도서",
} as const;

// 참여자 유형 상수
export const PARTICIPANT_TYPES = {
  STUDENT: "대학생",
  WORKER: "직장인",
  ONLINE: "온라인",
  CLUB: "동아리",
  MEETING: "모임",
  OFFLINE: "대면",
} as const;

// 클럽 생성 요청 타입 (ID 없음)
export type CreateClubRequestDto = {
  name: string;
  description: string;
  profileImageUrl?: string;
  open: boolean; // 공개/비공개 여부
  category: number[]; // 카테고리 ID 배열 (1~15)
  region: string;
  participantTypes: string[]; // 참여자 유형 배열
  insta?: string;
  kakao?: string;
};

// 클럽 응답 타입 (ID 포함)
export type ClubDto = {
  clubId: number; // 응답에는 ID 포함
  name: string;
  description: string;
  profileImageUrl?: string;
  open: boolean;
  category: number[];
  region: string;
  participantTypes: string[];
  insta?: string;
  kakao?: string;
  staff?: boolean;
};

export type ClubListDto = {
  club: ClubDto;
  member: boolean;
}

export type ClubListResult = {
  clubList: ClubListDto[];
  hasNext: boolean;
  nextCursor: number | null;
  pageSize: number;
}

// 클럽 생성 응답 타입
export type CreateClubResponse = ApiResponse<ClubDto>;

// 클럽 목록 조회 응답 타입
export type ClubSearchResponse = ApiResponse<ClubListResult>;

// 가입 신청 요청/응답 타입
export type JoinClubRequest = {
  joinMessage: string;
};

export type JoinClubResult = {
  clubId: number;
  clubName: string;
  open: boolean; // 공개 모임 여부 (true면 즉시 가입)
};

export type JoinClubResponse = ApiResponse<JoinClubResult>;

// 운영진 여부 확인 결과 타입
export type IsStaffResult = boolean;