import type { ClubDto, CreateClubRequestDto } from "../types/bookClub";
import { axiosInstance } from "./axiosInstance";

// 클럽 생성 (현재 구현)
export const createClub = async (clubData: CreateClubRequestDto): Promise<ClubDto> => {
  const headers = {
    'MemberId': 'mem_001' // 임시로 고정값 사용, 나중에 시큐리티 구현 후 삭제
  };
  
  // axiosInstance가 이미 data.result를 반환하므로 직접 타입 캐스팅
  return axiosInstance.post('/clubs', clubData, { headers }) as Promise<ClubDto>;
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