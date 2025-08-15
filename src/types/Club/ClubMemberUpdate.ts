import type { ApiResponse } from "../apiResponse";

export type ClubMemberStatus = 'MEMBER' | 'STAFF' | 'PENDING' | 'BLOCKED';

export interface ClubMemberBasicInfo {
  nickname: string;
  profileImageUrl: string;
}

export interface ClubMember {
  clubMemberId: number;
  basicInfo: ClubMemberBasicInfo;
  joinMessage: string;
  clubMemberStatus: ClubMemberStatus;
}

export interface UpdateMemberGradePayload {
  updatedMember: ClubMember;
  requesterStaff: boolean; // 요청자가 스태프인지 여부
}

export type UpdateMemberGradeResponse = ApiResponse<UpdateMemberGradePayload>;
export type UpdateMemberGradeResult   = UpdateMemberGradeResponse['result'];