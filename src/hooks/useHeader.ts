import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getNotificationPreview, readNotification } from "../apis/headerApi";
import type { NotificationPreviewItem } from "../types/header";

export const TYPE_TEXT: Record<string, string> = {
  LIKE: "내 책이야기에 좋아요를 눌렀습니다.",
  COMMENT: "댓글을 남겼습니다.",
  FOLLOW: "구독했습니다.",
  CLUB_JOIN: "모임에 가입되셨습니다.",
};

export const QK = {
  me: ["header", "me"] as const,
  notiPreview: (size = 5) => ["header", "preview", size] as const,
};

/** 헤더 알림 데이터 훅 */
export const useHeaderData = (size = 5) => {
  const qc = useQueryClient();

  // 알림 미리보기 조회
  const {
    data,
    isLoading: notiLoading,
    error: notiError,
  } = useQuery<NotificationPreviewItem[], Error>({
    queryKey: QK.notiPreview(size),
    queryFn: () => getNotificationPreview(size),
  });

  // 알림 읽음 처리
  const { mutate: markAsRead } = useMutation({
    mutationFn: (id: number) => readNotification(id),
    onSuccess: async (_, id) => {
      // 1. 캐시에서 해당 알림 read=true로 표시 (UI 즉시 반영)
      qc.setQueryData<NotificationPreviewItem[]>(QK.notiPreview(size), (old) =>
        old
          ? old.map((n) =>
              n.notificationId === id ? { ...n, read: true } : n
            )
          : old
      );

      // 2. 최신 알림 다시 가져와서 부족하면 채워주기
      const fresh = await getNotificationPreview(size);
      qc.setQueryData(QK.notiPreview(size), (old: NotificationPreviewItem[] | undefined) => {
        if (!old) return fresh;
        const merged = [...old];
        fresh.forEach((n) => {
          if (!merged.find((m) => m.notificationId === n.notificationId)) {
            merged.push(n);
          }
        });
        return merged.slice(0, size);
      });

      // 3. Header와 알림 페이지 모두 강제 동기화 (refetchQueries로 즉시 서버 반영)
      await qc.refetchQueries({ queryKey: QK.notiPreview(5) });
      await qc.refetchQueries({ queryKey: ["notifications"], exact: false });
      await qc.refetchQueries({ queryKey: ["mypage", "notifications"], exact: false });
    },
  });

  return {
    notifications: data ?? [],
    notiLoading,
    notiError,
    markAsRead,
  };
};