import { axiosInstance } from "../axiosInstance";

export interface ClubDto {
  clubId: number;
  clubName: string;
  open: boolean;
}

interface FetchMyClubsResult {
  clubList: ClubDto[];
}

/**
 * 내 클럽 목록 가져오기
 * @returns ClubDto[]
 */
export const fetchMyClubs = async (): Promise<ClubDto[]> => {
  try {
    const { clubList } = (await axiosInstance.get(
      "/clubs/myClubs"
    )) as FetchMyClubsResult;
    console.log("내 클럽 목록:", clubList);
    return clubList;
  } catch (error) {
    console.error("내 클럽 가져오기 실패:", error);
    return [];
  }
};
