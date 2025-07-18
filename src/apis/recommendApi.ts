import axiosInstance from "../lib/axiosInstance";
import type { RecommendListDto } from "../types/bookRecommend";

export const getRecommendList = async (
  clubId: number
): Promise<RecommendListDto> =>
  axiosInstance
    .get<RecommendListDto>(`/api/clubs/${clubId}/recommendations`)
    .then((r) => r.data);

export const getRecommendDetail = async (
  clubId: number,
  recommendId: number
): Promise<RecommendListDto> =>
  axiosInstance
    .get<RecommendListDto>(
      `/api/clubs/${clubId}/recommendations/${recommendId}`
    )
    .then((r) => r.data);
