import type { ApiResponse } from "./apiResponse";

// 회원가입 & 이메일 인증 DTO 
export interface SignupRequest {
  email: string;
  password: string;
}
export interface SignupResult {
  email: string;
  profileCompleted: boolean;
}

// 이메일 인증
export interface EmailVerificationConfirmRequest {
  email: string;
  verificationCode: string;
}
export type EmailVerificationSendResult = string;      // 인증번호 요청 응답(메시지 문자열)
export type EmailVerificationConfirmResult = boolean;  // 인증 성공 여부

// 로그인 
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  nickname: string; // 토큰은 쿠키로 오므로 별도 필드 없음
}
export type LoginApiResponse = ApiResponse<LoginResponse>;

// 추가 정보 입력
export interface AdditionalInfoRequest {
  nickname: string;
  description: string;   
  imgUrl?: string;       // 프로필 이미지 URL(선택)
  categoryIds: number[]; 
}
export type AdditionalInfoResult = Record<string, never>; // 서버 result:{}

// 기타 
export type CheckNicknameResult = boolean;
