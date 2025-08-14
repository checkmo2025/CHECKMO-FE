import { axiosInstance } from "../axiosInstance";
import type {
  UpdateMyProfileRequest,
  UpdateMyProfileResult,
  MyProfile,
  FollowResponse,
  ClubResponse,
  NotificationResponse,
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

/* -------------------- 마이홈페이지 전용 API -------------------- */

export async function getMyFollowing(cursorId: number | null): Promise<FollowResponse> {
  return axiosInstance.get<unknown, FollowResponse>(
    "/members/me/following",
    { params: { cursorId } }
  );
}

export async function getMyFollower(cursorId: number | null): Promise<FollowResponse> {
  return axiosInstance.get<unknown, FollowResponse>(
    "/members/me/follower",
    { params: { cursorId } }
  );
}

/** 내가 가입한 클럽 목록: GET /api/clubs/myPage */
export async function getMyClubs(cursorId: number | null): Promise<ClubResponse> {
  return axiosInstance.get<unknown, ClubResponse>(
    "/clubs/myPage",
    { params: { cursorId } }
  );
}

/** 알림 전체 조회: GET /api/notifications */
export async function getMyNotifications(
  cursorId: number | null
): Promise<NotificationResponse> {
  return axiosInstance.get<unknown, NotificationResponse>(
    "/notifications",
    { params: { cursorId } }
  );
}

/** 내가 가입한 모임 탈퇴: DELETE /api/clubs/{clubId}/leave */
export async function leaveClub(clubId: number): Promise<void> {
  return axiosInstance.delete(`/clubs/${clubId}/leave`);
}