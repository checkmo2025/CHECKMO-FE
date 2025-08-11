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

export type LoginApiResponse = ApiResponse<LoginResponse>;
