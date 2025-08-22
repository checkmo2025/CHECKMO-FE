import type { ApiResponse } from "../../types/apiResponse";

export interface Membership {
  clubMemberId: number;
  clubMemberStatus: 'MEMBER' | 'BLOCKED' | 'STAFF';
  updatedAt: string; 
}

export interface MemberInfo {
  nickname: string;
  profileImageUrl: string;
}

export interface MeetingMemberItem {
  memberInfo: MemberInfo;
  teamNumber: number;
}

export interface GetMeetingMembersPayload {
  meetingId: number;              
  cursorId?: number | null;     
  size?: number;             
}

export interface GetMeetingMembersData {
  membership: Membership;
  members: MeetingMemberItem[];
  hasNext: boolean;
  nextCursor: number | null;
}

export type GetMeetingMembersResponse = ApiResponse<GetMeetingMembersData>;
export type GetMeetingMembersResult   = GetMeetingMembersResponse['result'];