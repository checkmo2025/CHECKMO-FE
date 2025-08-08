import { axiosInstance } from "../axiosInstance";
import type {
  RecommendListResult,
  RecommendationDto,
  UpdateRecommendDto,
} from "../../types/bookRecommend";

export const getBookRecommends = async (
  clubId: number,
  cursorId?: number
): Promise<RecommendListResult> => {
  const params: { [key: string]: number } = {};
  if (cursorId && cursorId > 0) {
    params.cursorId = cursorId;
  }

  const response: RecommendListResult = await axiosInstance.get(
    `/clubs/${clubId}/recommendations`,
    { params }
  );
  return response;
};

export const getBookRecommendDetail = async (
  clubId: number,
  recommendId: number
): Promise<RecommendationDto> => {
  const response: RecommendationDto = await axiosInstance.get(
    `/clubs/${clubId}/recommendations/${recommendId}`
  );
  return response;
};

export const updateBookRecommend = async (
  // 추천 책 수정
  clubId: number,
  recommendId: number,
  data: UpdateRecommendDto
) => {
  const response = await axiosInstance.patch(
    `/clubs/${clubId}/recommendations/${recommendId}`,
    data
  );
  return response;
};
