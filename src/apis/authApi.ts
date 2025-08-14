import { axiosInstance } from "./axiosInstance";
import type {
  LoginRequest,
  LoginResponse,
  AdditionalInfoRequest,
  AdditionalInfoResult,
  CheckNicknameResult,
  SignupRequest,
  SignupResult,
  EmailVerificationConfirmRequest,
  EmailVerificationConfirmResult,
  EmailVerificationSendResult,
} from "../types/auth";

// 로그인
export async function postLogin(payload: LoginRequest): Promise<LoginResponse> {
  return await axiosInstance.post("/auth/login", payload);
}

// 회원가입
export async function postSignup(payload: SignupRequest): Promise<SignupResult> {
  return await axiosInstance.post("/auth/signup", payload);
}

// 닉네임 중복 확인
export async function checkNickname(nickname: string): Promise<CheckNicknameResult> {
  return await axiosInstance.post(`/auth/check-nickname?nickname=${nickname}`);
}

// 이메일 인증 코드 전송
export async function requestEmailVerification(email: string): Promise<EmailVerificationSendResult> {
  return await axiosInstance.post(`/auth/email-verification?email=${encodeURIComponent(email)}`);
}

// 이메일 인증 코드 확인
export async function confirmEmailVerification(
  payload: EmailVerificationConfirmRequest
): Promise<EmailVerificationConfirmResult> {
  return await axiosInstance.post("/auth/email-verification/confirm", payload);
}

// 회원 추가 정보 입력
export async function postAdditionalInfo(
  payload: AdditionalInfoRequest
): Promise<AdditionalInfoResult> {
  return await axiosInstance.post("/auth/additional-info", payload);
}


// 로그아웃
export async function postLogout(): Promise<void> {
  return await axiosInstance.post("/auth/logout");
}