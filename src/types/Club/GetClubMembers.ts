import type { ApiResponse } from "../apiResponse";
export type ClubMemberStatus = 'MEMBER' | 'STAFF' | 'PENDING' | 'BLOCKED' | 'ALL';

export interface GetClubMembersRequest {
  clubId: number;              // path
  status?: ClubMemberStatus;   // query
  cursorId?: number | null;    // query
  size?: number;               // query
}

// ---- response leaf types ----
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

// ---- paged payload ----
export interface ClubMembersPage {
  clubMembers: ClubMember[];
  hasNext: boolean;
  nextCursor: number | null;
  pageSize: number;
  staff: boolean;              
}

export type GetClubMembersResponse = ApiResponse<ClubMembersPage>;
export type GetClubMembersResponseResult = GetClubMembersResponse['result'];