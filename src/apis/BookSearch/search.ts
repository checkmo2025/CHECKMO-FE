import { axiosInstance } from '../axiosInstance';
import type { BookSearchResponse } from '../../types/BookSearchdto';

// 책검색 데이터 가져오기
export function searchBooks(keyword: string, page: number = 1): Promise<BookSearchResponse> {
  return axiosInstance.get('/books/search', { 
    params: { keyword, page } 
  }
  );
}

// 책 상세 정보 가져오기
export function getBookDetails(isbn: string){
  return axiosInstance.get(`/api/books/${isbn}`);
}