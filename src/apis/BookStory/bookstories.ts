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

// 책 이야기 삭제 API
export const deleteBookStory = async (bookStoryId: number) => {
  return axiosInstance.delete(`/book-stories/${bookStoryId}`);
};

// 책 이야기 수정 API
export const updateBookStory = async (
  bookStoryId: number,
  payload: { description: string }
) => {
  return axiosInstance.patch(`/book-stories/${bookStoryId}`, payload);

// 책 이야기 등록 API
export type CreateBookStoryRequest = {
  bookInfo: {
    isbn: string;
    title: string;
    author: string;
    imgUrl: string;
    publisher: string;
    description: string;
  };
  title: string;
  description: string;
};

export const createBookStory = async (payload: CreateBookStoryRequest) => {
  return await axiosInstance.post("/book-stories", payload);
};
