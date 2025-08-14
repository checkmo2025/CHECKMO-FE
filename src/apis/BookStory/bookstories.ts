import type { BookStoriesResult } from "../../types/bookStories";
import { axiosInstance } from "../axiosInstance";

export type BookStoriesParams = {
  scope: "ALL" | "FOLLOWING" | "MY" | "CLUB" | "TARGET";
  clubId?: number;
  targetMemberNickname?: string;
  cursorId?: number | null;
};

// 책 이야기 전체 조회 API
export const fetchBookStories = async (
  params: BookStoriesParams
): Promise<BookStoriesResult> => {
  const result: BookStoriesResult = await axiosInstance.get("/book-stories", {
    params: {
      ...params,
      cursorId: params.cursorId ?? undefined,
    },
  });
  return result;
};
