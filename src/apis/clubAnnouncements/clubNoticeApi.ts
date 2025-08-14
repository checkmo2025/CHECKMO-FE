import type { noticeListResult, meetingInfoDto, generalNoticeItemDto, voteNoticeItemDto } from '../../types/clubNotice';
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
    const result = response as any;
    const meetingInfo: meetingInfoDto = result?.noticeItem?.meetingInfoDTO ?? result?.meetingInfo ?? result;
    return meetingInfo as meetingInfoDto;
  } catch (error) {
    console.error('모임 공지 상세 조회 실패:', error);
    throw error;
  }
};

// 일반 공지사항 상세 조회
export const getGeneralNoticeDetail = async (
  clubId: number,
  noticeId: number
): Promise<generalNoticeItemDto> => {
  try {
    const response = await axiosInstance.get(
      `/clubs/${clubId}/notices/${noticeId}`
    );
    const result = response as any;
    const general: generalNoticeItemDto = result?.noticeItem ?? result;
    return general as generalNoticeItemDto;
  } catch (error) {
    console.error('일반 공지 상세 조회 실패:', error);
    throw error;
  }
};

// 투표 공지사항 상세 조회
export const getVoteNoticeDetail = async (
  clubId: number,
  voteId: number
): Promise<voteNoticeItemDto> => {
  try {
    const response = await axiosInstance.get(
      `/clubs/${clubId}/notices/votes/${voteId}`
    );
    const result = response as any;
    const ni = result?.noticeItem ?? result;
    const normalized: voteNoticeItemDto = {
      id: ni.id,
      title: ni.title,
      content: ni.content,
      items: Array.isArray(ni.items)
        ? { items: ni.items }
        : ni.items,
      anonymity: ni.anonymity,
      duplication: ni.duplication,
      tag: '투표'
    };
    return normalized;
  } catch (error) {
    console.error('투표 공지 상세 조회 실패:', error);
    throw error;
  }
};

// 투표 제출
export const submitVoteNotice = async (
  clubId: number,
  voteId: number,
  payload: Record<string, boolean>
): Promise<voteNoticeItemDto> => {
  try {
    const response = await axiosInstance.post(
      `/clubs/${clubId}/notices/votes/${voteId}/submit`,
      payload
    );
    const result = response as any;
    // result.noticeItem.items 가 배열로 올 수도 있어 유연 처리
    const ni = result?.noticeItem ?? result;
    const normalized: voteNoticeItemDto = {
      id: ni.id,
      title: ni.title,
      content: ni.content,
      items: Array.isArray(ni.items)
        ? { items: ni.items }
        : ni.items,
      anonymity: ni.anonymity,
      duplication: ni.duplication,
      tag: '투표'
    };
    return normalized;
  } catch (error) {
    console.error('투표 제출 실패:', error);
    throw error;
  }
};
