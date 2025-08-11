import type { ApiResponse } from "./apiResponse";

// 로그인 요청 DTO
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답(result) DTO — ApiResponse<T>의 result 페이로드
export interface LoginResponse {
  nickname: string;
  // 토큰은 cookie 형식으로 오기 때문에 상관없음
}

// 회원 추가 정보 입력 요청 DTO
export interface AdditionalInfoRequest {
  nickname: string;
  description: string;   // 소개
  imgUrl?: string;       // 이미지 업로드 연동 전이면 생략 가능
  categoryIds: number[]; // 관심 카테고리 ID 배열
}

// 서버 스웨거가 result:{} 이므로 반환 실데이터는 없음
export type AdditionalInfoResult = Record<string, never>;

export type LoginApiResponse = ApiResponse<LoginResponse>;

// 닉네임 중복 확인 결과
export type CheckNicknameResult = boolean;
