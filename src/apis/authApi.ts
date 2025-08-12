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

// 닉네임 중복 확인 — 쿠키 없이, POST + query
export async function checkNickname(nickname: string): Promise<CheckNicknameResult> {
  const url = `/api/auth/check-nickname?nickname=${encodeURIComponent(nickname)}`;

  const resp = await fetch(url, {
    method: "POST",
    credentials: "omit",
    headers: { Accept: "application/json" },
    body: null,
  });

// HTTP 에러 처리
  const data = await resp.json().catch(() => null);
  if (!resp.ok) {
    const msg = data?.message || `HTTP ${resp.status}`;
    const code = data?.code;
    throw new Error(code ? `${code}: ${msg}` : msg);
  }

// API 표준 처리
  if (!data?.isSuccess) throw new Error(`${data?.code}: ${data?.message}`);

  const r = data.result;

  if (typeof r === "boolean") return !r;

  if (r && typeof r === "object") {
    const anyRes = r as Record<string, unknown>;
    if ("available" in anyRes)     return Boolean(anyRes.available);
    if ("isAvailable" in anyRes)   return Boolean(anyRes.isAvailable);
    if ("duplicated" in anyRes)    return !Boolean(anyRes.duplicated);
    if ("isDuplicated" in anyRes)  return !Boolean(anyRes.isDuplicated);
  }
  return false;
}

// 이메일 인증(요청/확인)
export async function requestEmailVerification(
  email: string
): Promise<EmailVerificationSendResult> {
  const res: EmailVerificationSendResult = await axiosInstance.post(
    "/auth/email-verification",
    null,
    { params: { email } }
  );
  return res;
}

export async function confirmEmailVerification(
  payload: EmailVerificationConfirmRequest
): Promise<EmailVerificationConfirmResult> {
  const res: EmailVerificationConfirmResult = await axiosInstance.post(
    "/auth/email-verification/confirm",
    payload
  );
  return res;
}

// 회원가입
export async function postSignup(payload: SignupRequest): Promise<SignupResult> {
  const res: SignupResult = await axiosInstance.post("/auth/signup", payload);
  return res; // { email, profileCompleted }
}