import { useQuery } from "@tanstack/react-query";
import { getNotificationPreview } from "../apis/headerApi";
import type { NotificationPreviewResult, HeaderNotification } from "../types/header";

const TYPE_TEXT: Record<string, string> = {
  LIKE: "좋아요를 눌렀습니다.",
  COMMENT: "댓글을 남겼습니다.",
  FOLLOW: "팔로우했습니다.",
  CLUB_JOIN: "모임에 가입했습니다",
};

export const QK = {
  me: ["header", "me"] as const,
  notiPreview: (size = 5) => ["header", "preview", size] as const,
};

export const useHeaderData = (size = 5) => {
  const {
    data: notifications,
    isLoading: notiLoading,
    error: notiError,
  } = useQuery<NotificationPreviewResult, Error, HeaderNotification[]>({
    queryKey: QK.notiPreview(size),
    queryFn: () => getNotificationPreview(size),
    refetchOnMount: "always",
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    select: (res) => {
      const notis = (res as any)?.result?.notifications ?? [];

      return notis.map((n: any) => {
        const message = n.senderNickname
          ? `${n.senderNickname}님이 ${TYPE_TEXT[n.notificationType] ?? n.notificationType}`
          : TYPE_TEXT[n.notificationType] ?? n.notificationType;

        return {
          message,
          time: new Date(n.createdAt).toLocaleString(),
          redirectPath: n.redirectPath,
        };
      });
    },
  });

  return { notifications, notiLoading, notiError };
};
