import { useQuery } from "@tanstack/react-query";
import { getNotificationPreview } from "../apis/headerApi";
import type { NotificationPreviewItem } from "../types/header";

export const TYPE_TEXT: Record<string, string> = {
  LIKE: "좋아요를 눌렀습니다.",
  COMMENT: "댓글을 남겼습니다.",
  FOLLOW: "구독했습니다.",
  CLUB_JOIN: "모임에 가입했습니다.",
};

export const QK = {
  me: ["header", "me"] as const,
  notiPreview: (size = 5) => ["header", "preview", size] as const,
};

/** 헤더 알림 데이터 훅 */
export const useHeaderData = (size = 5) => {
  const {
    data,
    isLoading: notiLoading,
    error: notiError,
  } = useQuery<NotificationPreviewItem[], Error>({
    queryKey: QK.notiPreview(size),
    queryFn: () => getNotificationPreview(size),
  });

  return {
    notifications: data ?? [],
    notiLoading,
    notiError,
  };
};