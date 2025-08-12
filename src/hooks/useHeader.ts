import { useQuery } from "@tanstack/react-query";
import { getMyProfile, getNotificationPreview } from "../apis/headerApi";
import type {
  MyProfileResult,
  NotificationPreviewResult,
  HeaderUserProfile,
  HeaderNotification,
} from "../types/header";

const TYPE_TEXT: Record<string, string> = {
  LIKE: "좋아요를 눌렀습니다.",
  COMMENT: "댓글을 남겼습니다.",
  FOLLOW: "팔로우했습니다.",
};

export const QK = {
  me: ["header", "me"] as const,
  notiPreview: (size = 5) => ["header", "preview", size] as const,
};

export const useHeaderData = () => {
  // 제네릭: <TQueryFnData, TError, TData>
  const {
    data: profile,
    isLoading: profileLoading,
    error: profileError,
  } = useQuery<MyProfileResult, Error, HeaderUserProfile>({
    queryKey: QK.me,
    queryFn: getMyProfile, // Promise<MyProfileResult>
    refetchOnMount: "always",
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    select: (d) => ({
      username: d.nickname ?? "",
      bio: d.description ?? "",
      imgUrl: d.profileImageUrl,
    }),
  });

  const {
    data: notifications,
    isLoading: notiLoading,
    error: notiError,
  } = useQuery<NotificationPreviewResult, Error, HeaderNotification[]>({
    queryKey: QK.notiPreview(5),
    queryFn: () => getNotificationPreview(5), // Promise<NotificationPreviewResult>
    refetchOnMount: "always",
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    select: (res) =>
      (res.notifications ?? []).map((n) => ({
        message: `${n.senderNickname}님이 ${TYPE_TEXT[n.notificationType] ?? n.notificationType}`,
        time: new Date(n.createdAt).toLocaleString(),
        redirectPath: n.redirectPath,
      })),
  });

  return {
    profile,
    profileLoading,
    profileError,
    notifications,
    notiLoading,
    notiError,
  };
};