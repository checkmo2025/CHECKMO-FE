import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyProfile,
  patchMyProfile,
  getMyFollowing,
  getMyFollower,
  getMyClubs,
  getMyNotifications,
} from "../../apis/My/memberApi";
import type {
  MyProfile,
  UpdateMyProfileRequest,
  UpdateMyProfileResult,
  FollowResponse,
  ClubResponse,
  NotificationResponse,
} from "../../types/My/member";
import { QK } from "../useHeader";

/* -------------------- 마이홈 전용 QK -------------------- */
 const QK_MY_HOME = {
  following: "myFollowing" as const,
  follower: "myFollower" as const,
  myClubs: "myClubs" as const,
  notifications: "myNotifications" as const,
};

/* -------------------- 기존 코드 -------------------- */
export const useMyProfileQuery = () =>
  useQuery<MyProfile, Error>({
    queryKey: QK.me,
    queryFn: getMyProfile,
  });

export const useUpdateMyProfile = () => {
  const qc = useQueryClient();
  return useMutation<UpdateMyProfileResult, Error, UpdateMyProfileRequest>({
    mutationFn: (payload) => patchMyProfile(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: QK.me }); // 헤더/프로필 즉시 반영
    },
  });
};

/* -------------------- 마이홈페이지 전용 훅 -------------------- */

/** 내가 팔로잉한 사람 목록 */
export const useMyFollowingQuery = (cursorId: number | null) =>
  useQuery<FollowResponse, Error>({
    queryKey: [QK_MY_HOME.following, cursorId],
    queryFn: () => getMyFollowing(cursorId),
    refetchOnMount: "always",
    staleTime: 0,
  });

  /** 나를 팔로우한 사람 목록 */
export const useMyFollowerQuery = (cursorId: number | null) =>
  useQuery<FollowResponse, Error>({
    queryKey: [QK_MY_HOME.follower, cursorId],
    queryFn: () => getMyFollower(cursorId),
    refetchOnMount: "always",
    staleTime: 0,
  });

/** 내가 가입한 클럽 목록 */
export const useMyClubsQuery = (cursorId: number | null) =>
  useQuery<ClubResponse, Error>({
    queryKey: [QK_MY_HOME.myClubs, cursorId],
    queryFn: () => getMyClubs(cursorId),
    refetchOnMount: "always",
    staleTime: 0,
  });

/** 알림 전체 조회 */
export const useMyNotificationsQuery = (cursorId: number | null) =>
  useQuery<NotificationResponse, Error>({
    queryKey: [QK_MY_HOME.notifications, cursorId],
    queryFn: () => getMyNotifications(cursorId),
    refetchOnMount: "always",
    staleTime: 0,
  });
  