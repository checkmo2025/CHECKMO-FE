import { axiosInstance } from "../axiosInstance";
import type {
  PostRecommendDto,
  RecommendListResult,
  RecommendationDto,
  UpdateRecommendDto,
} from "../../types/bookRecommend";

// 추천 책 전체 조회
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

// 추천 책 상세 조회
export const getBookRecommendDetail = async (
  clubId: number,
  recommendId: number
): Promise<RecommendationDto> => {
  const response: RecommendationDto = await axiosInstance.get(
    `/clubs/${clubId}/recommendations/${recommendId}`
  );
  return response;
};

// 추천 책 등록
export const postBookRecommend = async (
  clubId: number,
  data: PostRecommendDto
) => {
  const response = await axiosInstance.post(
    `/clubs/${clubId}/recommendations`,
    data
  );
  return response;
};

// 추천 책 수정
export const updateBookRecommend = async (
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

// 추천 책 삭제
export const deleteBookRecommend = async (
  clubId: number,
  recommendId: number
) => {
  const response = await axiosInstance.delete(
    `/clubs/${clubId}/recommendations/${recommendId}`
  );
  return response;
};
