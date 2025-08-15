import { axiosInstance } from "../axiosInstance";
import type { NoticeResultDto } from "../../types/mainNotices";

// 특정 클럽 공지사항 조회 (중요공지 only)
export const fetchClubNotices = async (clubId: number) => {
  const result: NoticeResultDto = await axiosInstance.get(
    `/clubs/${clubId}/notices`,
    {
      params: { onlyImportant: true },
    }
  );
  // 각 notice에 clubId 추가
  return result.noticeList.map((n) => ({ ...n, clubId }));
};
