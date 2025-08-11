import type { ClubDto, CreateClubRequestDto } from "../types/bookClub";
import { axiosInstance } from "./axiosInstance";

// 이미지 업로드
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post('/upload/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.imageUrl;
};

// 클럽 생성 (현재 구현)
export const createClub = async (clubData: CreateClubRequestDto): Promise<ClubDto> => {
  // axiosInstance가 이미 data.result를 반환하므로 직접 타입 캐스팅
  return axiosInstance.post('/clubs', clubData) as Promise<ClubDto>;
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