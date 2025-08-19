import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getMyNotifications } from "../../apis/My/memberApi";
import type { NotificationResponse } from "../../types/My/member";

/**
 * Infinite loader for My Notifications
 * - Cursor-based pagination per API contract
 */
export function useMyNotificationsInfinite() {
  return useInfiniteQuery<
    NotificationResponse, // 개별 페이지 타입
    Error, // 에러 타입
    InfiniteData<NotificationResponse>, // 전체 무한 데이터 타입
    ["notifications", "MY"], // queryKey 타입
    number | null // cursorId 타입
  >({
    queryKey: ["notifications", "MY"],
    queryFn: ({ pageParam = null }) => {
      console.log("🔔 Notifications API 요청:", { cursorId: pageParam });
      return getMyNotifications(pageParam);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
}
