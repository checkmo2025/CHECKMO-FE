import { axiosInstance } from "./axiosInstance";
import type { MyProfileResult, NotificationPreviewResult } from "../types/header";

function asResult<T>(data: any): T {
  if (data && typeof data === "object" && "result" in data) {
    return data.result as T;           // 서버가 Envelope로 보낸 경우
  }
  return data as T;                    // 이미 언래핑된 경우
}

export async function getMyProfile(): Promise<MyProfileResult> {
  const { data } = await axiosInstance.get("/members/me");
  return asResult<MyProfileResult>(data);
}

export async function getNotificationPreview(size = 5): Promise<NotificationPreviewResult> {
  const { data } = await axiosInstance.get("/notifications/preview", { params: { size } });
  return asResult<NotificationPreviewResult>(data);
}
