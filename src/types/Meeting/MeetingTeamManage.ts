import type { ApiResponse } from "../apiResponse";

export interface TeamMemberDTO {
  teamNumber: number;
  nicknameList: string[];
}

export interface MeetingTeamMutateRequest {
  teamMemberDTOList: TeamMemberDTO[];
}

export type MeetingTeamMutateResponse = ApiResponse<"">;
export type MeetingTeamMutateResponseResult = MeetingTeamMutateResponse['result'];