import { axiosInstance } from "./axiosInstance";
import type { MyProfileResult, NotificationPreviewResult } from "../types/header";

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

export async function getNotificationPreview(size = 5): Promise<NotificationPreviewResult> {
  const { data } = await axiosInstance.get("/notifications/preview", { params: { size } });
  const result = asResult<NotificationPreviewResult>(data);
  return result ?? { notifications: [] };
}
