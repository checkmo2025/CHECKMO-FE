import type { noticeListResult } from '../../types/clubNotice';
import { axiosInstance } from '../axiosInstance';

export const getClubNotices = async (
  clubId: number,
  onlyImportant: boolean = true,
  cursorId?: number,
  size: number = 5
): Promise<noticeListResult> => {
  try {
    const params: Record<string, any> = {
      onlyImportant,
      size: Math.min(size, 10) // 최대 10개로 제한
    };

    if (cursorId) {
      params.cursorId = cursorId;
    }

    const response = await axiosInstance.get<noticeListResult>(
      `/clubs/${clubId}/notices`,
      { params }
    );
    return response as unknown as noticeListResult;
  } catch (error) {
    console.error('공지사항 조회 실패:', error);
    throw error;
  }
};
