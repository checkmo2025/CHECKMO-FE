import { axiosInstance } from "./axiosInstance";
import type { LoginRequest, LoginResponse } from "../types/auth";
import type { AdditionalInfoRequest, AdditionalInfoResult } from "../types/auth";
import type { CheckNicknameResult } from "../types/auth";

// axiosInstance가 이미 data.result를 반환한다고 가정
// 로그인 API
export async function postLogin(payload: LoginRequest): Promise<LoginResponse> {
  const res: LoginResponse = await axiosInstance.post("/auth/login", payload);
  return res; // { nickname: string }
}

// 회원추가정보 API
export async function postAdditionalInfo(
  payload: AdditionalInfoRequest
): Promise<AdditionalInfoResult> {
  // axiosInstance가 bookRecommend처럼 data.result만 반환한다고 가정
  const res: AdditionalInfoResult = await axiosInstance.post(
    "/auth/additional-info",
    payload
  );
  return res; // {} (사용할 값은 없음)
}

// 닉네임 중복 확인 API
// 서버가 result=true 를 중복으로 줌 > 프론트에는 "사용 가능 여부"로 반환
export async function checkNickname(nickname: string): Promise<CheckNicknameResult> {
  // axiosInstance가 data.result만 반환한다고 가정 => rawResult에 바로 담김
  const rawResult: unknown = await axiosInstance.post(
    "/auth/check-nickname",
    null,
    { params: { nickname } }
  );

  if (typeof rawResult === "boolean") {
    // true = duplicated(중복) 이라고 가정 > 사용 가능
    return !rawResult;
  }
  if (rawResult && typeof rawResult === "object") {
    const anyRes = rawResult as Record<string, unknown>;
    if ("duplicated" in anyRes) return !Boolean(anyRes.duplicated);
    if ("isDuplicated" in anyRes) return !Boolean(anyRes.isDuplicated);
    if ("available" in anyRes) return Boolean(anyRes.available);
    if ("isAvailable" in anyRes) return Boolean(anyRes.isAvailable);
  }

  // 형태를 못 알아낸 경우: 안전하게 "사용 불가" 처리
  return false;
}