import { axiosInstance } from "../axiosInstance";
import type { NoticeDto } from "../../types/mainNotices";

interface FetchNoticesResult {
  noticeList: NoticeDto[];
  hasNext: boolean;
  nextCursor: string | null;
  pageSize: number;
  staff: boolean;
}

/**
 * clubId로 중요 공지사항 가져오기
 */
export const fetchNoticesByClub = async (
  clubId: number
): Promise<NoticeDto[]> => {
  try {
    const { noticeList } = (await axiosInstance.get(
      `/clubs/${clubId}/notices`,
      { params: { onlyImportant: true } }
    )) as FetchNoticesResult;

    //TODO: 콘솔 지우기
    console.log(`lubId=${clubId} 공지사항:`, noticeList);
    return noticeList;
  } catch (error) {
    console.error("공지사항 가져오기 실패:", error);
    return [];
  }
};
