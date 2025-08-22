import type { GetMeetingMembersPayload, GetMeetingMembersResult } from "../../types/Meeting/GetmeetingMember";
import { axiosInstance } from "../axiosInstance";

export async function getMeetingMembers(
  { meetingId, cursorId = null, size = 15 }: GetMeetingMembersPayload
): Promise<GetMeetingMembersResult> {
  return await axiosInstance.get(
    `/meetings/${meetingId}/members`,
    { params: { cursorId, size } }
  );
}