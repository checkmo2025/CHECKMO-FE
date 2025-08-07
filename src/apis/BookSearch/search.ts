import { axiosInstance } from '../axiosInstance';
import type { BookSearchResult } from '../../types/BookSearchdto';

// 책검색 데이터 가져오기
export function SearchBooks(keyword: string, page: number = 1): Promise<BookSearchResult> {
  return axiosInstance.get('/books/search', { 
    params: { keyword, page } 
  }
  );
}
