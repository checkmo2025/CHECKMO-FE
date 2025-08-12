import axios from "axios";
import type { AxiosRequestConfig } from "axios";
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

// 게스트(비로그인) 전용 클라이언트: 쿠키 절대 전송 금지
const publicAxios = axios.create({
  baseURL: "/api",
  withCredentials: false,
});

// 게스트 POST 헬퍼: { isSuccess, code, message, result } > result만 안전하게 반환
async function publicPost<T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await publicAxios.post(url, data, config);
  const body = res?.data;
  if (!body?.isSuccess) {
    throw new Error(`${body?.code ?? "ERROR"}: ${body?.message ?? "요청 실패"}`);
  }
  return body.result as T;
}

// 로그인/보호 API (쿠키 필요)

// 로그인
export async function postLogin(payload: LoginRequest): Promise<LoginResponse> {
  const res: LoginResponse = await axiosInstance.post("/auth/login", payload);
  return res; // { nickname: string }
}

// 회원 추가 정보 입력
export async function postAdditionalInfo(
  payload: AdditionalInfoRequest
): Promise<AdditionalInfoResult> {
  const res: AdditionalInfoResult = await axiosInstance.post(
    "/auth/additional-info",
    payload
  );
  return res; // {}
}

// 공개 API (쿠키 불필요) 

// 닉네임 중복 확인 — POST + query, 비로그인 호출
export async function checkNickname(nickname: string): Promise<CheckNicknameResult> {
  // 서버가 result를 boolean 혹은 객체로 줄 수 있어 케이스 노멀라이즈
  const raw = await publicPost<unknown>("/auth/check-nickname", null, {
    params: { nickname },
  });

  if (typeof raw === "boolean") {
    // 서버가 true/false를 바로 주는 경우: true=사용 가능으로 해석
    return raw;
  }
  if (raw && typeof raw === "object") {
    const anyRes = raw as Record<string, unknown>;
    if ("available" in anyRes)     return Boolean(anyRes.available);
    if ("isAvailable" in anyRes)   return Boolean(anyRes.isAvailable);
    if ("duplicated" in anyRes)    return !Boolean(anyRes.duplicated);
    if ("isDuplicated" in anyRes)  return !Boolean(anyRes.isDuplicated);
  }
  // 형태를 모르면 안전하게 "불가"
  return false;
}

// 이메일 인증번호 발송 (게스트)
export async function requestEmailVerification(
  email: string
): Promise<EmailVerificationSendResult> {
  return publicPost<EmailVerificationSendResult>(
    "/auth/email-verification",
    null,
    { params: { email } }
  );
}

// 이메일 인증번호 확인 (게스트)
export async function confirmEmailVerification(
  payload: EmailVerificationConfirmRequest
): Promise<EmailVerificationConfirmResult> {
  return publicPost<EmailVerificationConfirmResult>(
    "/auth/email-verification/confirm",
    payload
  );
}

// 회원가입 (게스트)
export async function postSignup(payload: SignupRequest): Promise<SignupResult> {
  return publicPost<SignupResult>("/auth/signup", payload);
}