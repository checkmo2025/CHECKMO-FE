import { axiosInstance } from "../axiosInstance";
import type {
  CreateClubMeeting,
  MeetingDetailResult,
  MeetingListResult,
  UpdateClubMeeting,
} from "../../types/clubMeeting";

// 정기 독서 모임 간편 조회
export const getMeetingList = async (
  clubId: number,
  cursorId?: number,
  size?: number
): Promise<MeetingListResult> => {
  const params: { [key: string]: number } = {};
  if (cursorId && cursorId > 0) {
    params.cursorId = cursorId;
  }

  if (size && size > 0) {
    params.size = size;
  }

  const response: MeetingListResult = await axiosInstance.get(
    `/clubs/${clubId}/meetings`,
    { params }
  );
  return response;
};

// 정기 독서 모임 상세 조회
export const getMeetingDetail = async (
  meetingId: number
): Promise<MeetingDetailResult> => {
  const response: MeetingDetailResult = await axiosInstance.get(
    `/meetings/${meetingId}`
  );
  return response;
};

// 정기 독서 모임 생성
export const createClubMeeting = async (
  meetingId: number,
  data: CreateClubMeeting
) => {
  const response = await axiosInstance.post(`/meetings/${meetingId}`, data);
  return response;
};

// 정기 독서 모임 수정
export const updateClubMeeting = async (
  meetingId: number,
  data: UpdateClubMeeting
) => {
  const response = await axiosInstance.patch(`/meetings/${meetingId}`, data);
  return response;
};
