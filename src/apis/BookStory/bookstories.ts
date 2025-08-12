import type { BookStoryResponseDto } from "../../types/bookStories";
import { axiosInstance } from "../axiosInstance";

export type BookStoriesParams = {
  scope: "ALL" | "FOLLOWING" | "MY" | "CLUB" | "TARGET";
  clubId?: number;
  targetMemberNickname?: string;
  cursorId?: number | null;
};

export type BookStoriesResult = {
  scopeInfo: any; // 필요한 타입으로 대체
  memberClubList: any;
  bookStoryResponses: BookStoryResponseDto[];
  hasNext: boolean;
  nextCursor: number;
  pageSize: number;
};

// 책 이야기 전체 조회 API
export const fetchBookStories = async (
  params: BookStoriesParams
): Promise<BookStoriesResult> => {
  const result = await axiosInstance.get("/book-stories", {
    params: {
      ...params,
      cursorId: params.cursorId ?? undefined,
    },
  });
  return result;
};
