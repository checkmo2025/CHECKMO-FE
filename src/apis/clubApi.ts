import type { ClubDto, CreateClubRequestDto } from "../types/bookClub";
import type { ClubDto } from "../types/dto";
import { axiosInstance } from "./axiosInstance";

// 클럽 생성
export const createClub = async (clubData: CreateClubRequestDto): Promise<ClubDto> => {
  return axiosInstance.post('/clubs', clubData) as Promise<ClubDto>;

// 클럽 목록 조회
export const getClubList = async (): Promise<ClubDto[]> =>
  axiosInstance.get<ClubDto[]>("/api/clubs").then((r) => r.data);
};

// 클럽 상세 조회
export const getClubDetail = async (clubId: number): Promise<ClubDto> =>
  axiosInstance.get<ClubDto>(`/api/clubs/${clubId}`).then((r) => r.data);

// 클럽 검색
export const searchClubs = async (query: string): Promise<ClubDto[]> =>
  axiosInstance
    .get<ClubDto[]>(`/api/clubs/search?q=${encodeURIComponent(query)}`)
    .then((r) => r.data);