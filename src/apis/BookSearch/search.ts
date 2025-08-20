import { axiosInstance } from "../axiosInstance";
import type { BookSearchResult, SearchBook } from "../../types/BookSearchdto";

// 책검색 데이터 가져오기
export function SearchBooks(
  keyword: string,
  page: number = 1
): Promise<BookSearchResult> {
  return axiosInstance.get("/books/search", {
    params: { keyword, page },
  });
}

// 책 검색 상세 조회
export const getBookDetail = async (isbn: string): Promise<SearchBook> => {
  const response: SearchBook = await axiosInstance.get(`/books/${isbn}`);
  return response;
};
