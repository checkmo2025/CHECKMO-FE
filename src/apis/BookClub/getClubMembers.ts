import type { GetClubMembersRequest, GetClubMembersResponseResult } from "../../types/Club/GetClubMembers";
import { axiosInstance } from "../axiosInstance";

export function fetchClubMembers(req: GetClubMembersRequest): Promise<GetClubMembersResponseResult> {
  const { clubId, status, cursorId, size } = req;
  return axiosInstance.get(`/clubs/${clubId}/members`, {
    params: { status, cursorId, size }
  });
}
