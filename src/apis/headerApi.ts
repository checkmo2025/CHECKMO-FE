import { axiosInstance } from "./axiosInstance";
import type { MyProfileResult, NotificationPreviewItem } from "../types/header";

function asResult<T>(data: any): T {
  if (data && typeof data === "object" && "result" in data) {
    return data.result as T;
  }
  return data as T;
}

export async function getMyProfile(): Promise<MyProfileResult> {
  try {
    const { data } = await axiosInstance.get("/members/me");
    return asResult<MyProfileResult>(data);
  } catch (err: any) {
    if (err?.response?.status === 401) {
      return {
        nickname: "",
        description: "",
        profileImageUrl: "",
      }; // 기본 빈 객체
    }
    throw err;
  }
}

/** 알림 미리보기 조회 */
export const getNotificationPreview = async (
  size: number
): Promise<NotificationPreviewItem[]> => {
  const res: any = await axiosInstance.get(
    "/notifications/preview",
    { params: { size } }
  );

  return res.notifications;
};

/** 알림 읽음 처리: PATCH /api/notifications/{notificationId}/read */
export async function readNotification(notificationId: number): Promise<void> {
  return axiosInstance.patch(`/notifications/${notificationId}/read`);
}