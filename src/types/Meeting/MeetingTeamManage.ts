import type { ApiResponse } from "../apiResponse";

// ---- request ----
export interface TeamMemberDTO {
  teamNumber: number;
  nicknameList: string[];
}

export interface MeetingTeamMutateRequest {
  teamMemberDTOList: TeamMemberDTO[];
}

// ---- response ----
// result 없음
export type MeetingTeamMutateResponse = ApiResponse<"">;
export type MeetingTeamMutateResponseResult = MeetingTeamMutateResponse['result'];