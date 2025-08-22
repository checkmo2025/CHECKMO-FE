import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMyProfile,
  patchMyProfile,
  getMyFollowing,
  getMyFollower,
  getMyClubs,
  getMyNotifications,
  leaveClub,
  unfollowMember,
  removeFollower,
  readNotification
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
import type { NotificationPreviewItem } from "../../types/header";

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
    staleTime: 1000 * 60,
  });

/** 알림 전체 조회 */
export const useMyNotificationsQuery = (cursorId: number | null) =>
  useQuery<NotificationResponse, Error>({
    queryKey: [QK_MY_HOME.notifications, cursorId],
    queryFn: () => getMyNotifications(cursorId),
    refetchOnMount: "always",
    staleTime: 0,
  });

/** 내가 가입한 클럽 탈퇴 */
export const useLeaveClub = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (clubId) => leaveClub(clubId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [QK_MY_HOME.myClubs] });
    },
  });
};

/** 팔로잉 취소 훅 */
export const useUnfollowMember = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (nickname) => unfollowMember(nickname),
    onSuccess: () => {
      // 팔로잉 목록 새로고침
      qc.invalidateQueries({ queryKey: [QK_MY_HOME.following] });
    },
  });
};

/** 팔로워 삭제 훅 */
export const useRemoveFollower = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (nickname) => removeFollower(nickname),
    onSuccess: () => {
      // 팔로워 목록 새로고침
      qc.invalidateQueries({ queryKey: [QK_MY_HOME.follower] });
    },
  });
};

/** 알림 읽음 처리 훅 */
export const useReadNotification = () => {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (id) => readNotification(id),
    onSuccess: async (_, id) => {
      // 1. 알림 페이지 invalidate (cursorId 붙은 쿼리까지 다 포함)
      qc.invalidateQueries({ queryKey: [QK_MY_HOME.notifications], exact: false });

      // 2. 헤더 알림 캐시에서 해당 알림 직접 업데이트
      qc.setQueryData<NotificationPreviewItem[]>(QK.notiPreview(5), (old) =>
        old ? old.map((n) =>
          n.notificationId === id ? { ...n, read: true } : n
        ) : old
      );

      // 3. 헤더도 서버 최신으로 갱신
      qc.invalidateQueries({ queryKey: QK.notiPreview(5), exact:true });
    },
  });
};
