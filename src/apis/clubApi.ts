import axiosInstance from "../lib/axiosInstance";
import type { ClubDto } from "../types/dto";

// 클럽 목록 조회
export const getClubList = async (): Promise<ClubDto[]> =>
  axiosInstance
    .get<ClubDto[]>('/api/clubs')
    .then((r) => r.data);

// 클럽 생성
export const createClub = async (clubData: Omit<ClubDto, 'clubId'>): Promise<{isSuccess: boolean, code: string, message: string, result: ClubDto}> => {
  const headers = {
    'MemberId': 'mem_001' // 임시로 고정값 사용, 나중에 시큐리티 구현 후 삭제
  };
  
  return axiosInstance
    .post<{isSuccess: boolean, code: string, message: string, result: ClubDto}>('/api/clubs', clubData, { headers })
    .then((r) => r.data);
};

// 클럽 상세 조회
export const getClubDetail = async (clubId: number): Promise<ClubDto> =>
  axiosInstance
    .get<ClubDto>(`/api/clubs/${clubId}`)
    .then((r) => r.data);

// 클럽 검색
export const searchClubs = async (query: string): Promise<ClubDto[]> =>
  axiosInstance
    .get<ClubDto[]>(`/api/clubs/search?q=${encodeURIComponent(query)}`)
    .then((r) => r.data); 