import { axiosInstance } from "../axiosInstance";
import type {
  RecommendationsResponse,
  RecommendDetailResponse,
} from "../../types/bookRecommend";

export const getBookRecommends = async (
  clubId: number,
  cursorId?: number
): Promise<RecommendationsResponse> => {
  const params: { [key: string]: number } = {};
  if (cursorId) {
    params.cursorId = cursorId;
  }

  const response = await axiosInstance.get<RecommendationsResponse>(
    `/clubs/${clubId}/recommendations`,
    { params }
  );
  return response.data;
};

export const getBookRecommendDetail = async (
  clubId: number,
  recommendId: number
): Promise<RecommendDetailResponse> => {
  const response = await axiosInstance.get<RecommendDetailResponse>(
    `/clubs/${clubId}/recommendations/${recommendId}`
  );
  return response.data;
};
