import { axiosInstance } from '../axiosInstance';
import type { BookSearchResponse } from '../../types/BookSearchdto';

// 책검색 데이터 가져오기
export function SearchBooks(keyword: string, page: number = 1): Promise<BookSearchResponse> {
  console.log('fetching…')
  return axiosInstance.get('/books/search', { 
    params: { keyword, page } 
  }).then(res => res.data);
}
