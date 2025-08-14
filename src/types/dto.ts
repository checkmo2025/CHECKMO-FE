import type { ApiResponse } from "./apiResponse";
// 공용 Dto 파일
export type BookDto = {
  bookId?: number;
  title: string;
  author: string;
  imgUrl: string;
  publisher?: string;
};

export type MemberDto = {
  memberId: number;
  nickName: string;
  imgUrl: string;
};

export interface AuthorDto {
  nickname: string;
  profileImageUrl: string;
}

export type ClubDto = {
  clubId?: number; // 생성 시에는 없고, 조회 시에는 있음
  name: string;
  description: string;
  profileImageUrl?: string;
  open: boolean; // 공개/비공개 여부
  category: number[]; // 카테고리 ID 배열 (1~15)
  participantTypes: string[]; // 참여자 유형 배열
  region: string;
  insta?: string;
  kakao?: string;
};

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

export type ReviewDto = {
  reviewId: number;
  description: string;
  rate: number;
  author: MemberDto; // 리뷰 작성자
  createdAt: Date;
};

export type TeamDto = {
  teamId: number;
  name: string;
  teamNumber: number;
  memberCount: number;
  selectedTopicCount: number;
};

export type StatisticsDto = {
  totalParticipants: number;
  totalTopics: number;
  totalReviews: number;
  averageRating: number;
};


export type StaffCheckResponse = ApiResponse<boolean>;
export type StaffCheckResult = StaffCheckResponse['result']; // boolean