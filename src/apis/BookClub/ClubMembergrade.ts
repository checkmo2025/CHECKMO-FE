// apis/BookClub/updateMemberGrade.ts
import type { ClubMemberStatus, UpdateMemberGradeResponse } from '../../types/Club/ClubMemberUpdate';
import { axiosInstance } from '../axiosInstance';


export function updateMemberGrade(clubId: number, memberId: number, status: ClubMemberStatus) {
  return axiosInstance.patch<UpdateMemberGradeResponse>(
    `/clubs/${clubId}/members/${memberId}/status`,
    null,
    { params: { status } }
  );
}