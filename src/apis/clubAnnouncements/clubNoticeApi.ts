import type { noticeListResult, meetingInfoDto } from '../../types/clubNotice';
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

    if (cursorId != null) {
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

// 모임 공지사항 상세 조회
export const getMeetingNoticeDetail = async (
  clubId: number,
  noticeId: number
): Promise<meetingInfoDto> => {
  try {
    const response = await axiosInstance.get(
      `/clubs/${clubId}/notices/meeting/${noticeId}`
    );
    // 인터셉터가 data.result를 반환한다고 가정
    // 명세 예시: result.noticeItem.meetingInfoDTO
    const result = response as any;
    const meetingInfo: meetingInfoDto = result?.noticeItem?.meetingInfoDTO ?? result?.meetingInfo ?? result;
    return meetingInfo as meetingInfoDto;
  } catch (error) {
    console.error('모임 공지 상세 조회 실패:', error);
    throw error;
  }
};
