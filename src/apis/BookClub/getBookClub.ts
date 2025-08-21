import { axiosInstance } from "../axiosInstance";

export interface ClubDetailDto {
  name: string;
  description: string;
  profileImageUrl: string;
  open: boolean;
  category: number[];
  region: string;
  participantTypes: string[];
  insta: string;
  kakao: string;
}

export const fetchClubDetail = async (
  clubId: number
): Promise<ClubDetailDto> => {
  return axiosInstance.get(`/clubs/${clubId}`);
};
