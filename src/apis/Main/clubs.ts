import { axiosInstance } from "../axiosInstance";

export interface MyClubDto {
  clubId: number;
  clubName: string;
  open: boolean;
}

export interface MyClubsResult {
  clubList: MyClubDto[];
}

// 내가 가입한 클럽 조회
export const fetchMyClubs = async (): Promise<MyClubDto[]> => {
  const result: MyClubsResult = await axiosInstance.get("/clubs/myClubs");
  return result.clubList;
};
