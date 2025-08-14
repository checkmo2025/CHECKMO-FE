import { axiosInstance } from "../axiosInstance";
import type {
  UpdateMyProfileRequest,
  UpdateMyProfileResult,
  MyProfile,
} from "../../types/My/member";

/** 내 프로필 조회 (이미 있다면 기존 함수 사용해도 됨) */
export async function getMyProfile(): Promise<MyProfile> {
  return axiosInstance.get("/members/me");
}

/** 내 프로필 수정: PATCH /api/members/me */
export async function patchMyProfile(
  payload: UpdateMyProfileRequest
): Promise<UpdateMyProfileResult> {
  return axiosInstance.patch("/members/me", payload);
}