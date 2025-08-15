import type { MeetingTeamMutateRequest } from "../../types/Meeting/MeetingTeamManage";
import { axiosInstance } from "../axiosInstance";

export function SetMeetingTeam(meetingId: number, body: MeetingTeamMutateRequest) {
  return axiosInstance.put<void>(`/meetings/${meetingId}/teams`, body);
}