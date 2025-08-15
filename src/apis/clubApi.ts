import type { ClubDto, CreateClubRequestDto, ClubListResult, JoinClubRequest, JoinClubResult, IsStaffResult } from "../types/bookClub";
import { axiosInstance } from "./axiosInstance";


// 클럽 생성
export const createClub = async (clubData: CreateClubRequestDto): Promise<ClubDto> => {
  const response: ClubDto = await axiosInstance.post('/clubs', clubData);
  return response;
};

// 클럽 목록 조회
export type ClubSearchParams = {
  keyword?: string;
  region?: 0 | 1; // 0=전체, 1=지역 필터 적용
  participants?: 0 | 1; // 0=전체, 1=대상 유형 필터 적용
  cursorId?: number | null; // 해당 ID보다 작은 클럽만 조회
  size?: number; // 페이지 사이즈
};

// 검색/목록 조회 (커서 기반)
export const fetchClubList = async (
  params: ClubSearchParams
): Promise<ClubListResult> => {
  // axiosInstance는 성공 시 data.result를 반환하도록 인터셉터가 설정되어 있음
  const result: ClubListResult = await axiosInstance.get('/clubs/search', {
    params: {
      ...params,
      // null 커서는 보내지 않도록 처리
      cursorId: params.cursorId ?? undefined,
    },
  });
  return result;
};

// 클럽 가입 신청
export const requestJoinClub = async (
  clubId: number,
  payload: JoinClubRequest
): Promise<JoinClubResult> => {
  const result: JoinClubResult = await axiosInstance.post(`/clubs/${clubId}/join`, payload);
  return result;
};

// 클럽 상세 조회
export const getClubDetail = async (clubId: number): Promise<ClubDto> => {
  const result: ClubDto = await axiosInstance.get(`/clubs/${clubId}`);
  return result;
};

// 운영진 여부 확인
export const fetchIsStaff = async (clubId: number): Promise<IsStaffResult> => {
  const result: IsStaffResult = await axiosInstance.get(`/clubs/${clubId}/staff`);
  return result;
};