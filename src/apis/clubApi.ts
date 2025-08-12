import type { ClubDto, CreateClubRequestDto } from "../types/bookClub";
import { axiosInstance } from "./axiosInstance";


// 클럽 생성
export const createClub = async (clubData: CreateClubRequestDto): Promise<ClubDto> => {
  const { data } = await axiosInstance.post<ClubDto>('/clubs', clubData);
  return data;
};

// 클럽 상세 조회
export const getClubDetail = async (clubId: number): Promise<ClubDto> =>
  axiosInstance.get<ClubDto>(`/api/clubs/${clubId}`).then((r) => r.data);

// 클럽 검색
export const searchClubs = async (query: string): Promise<ClubDto[]> =>
  axiosInstance
    .get<ClubDto[]>(`/api/clubs/search?q=${encodeURIComponent(query)}`)
    .then((r) => r.data);