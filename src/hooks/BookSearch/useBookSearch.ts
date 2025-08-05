import { useQuery } from '@tanstack/react-query';
import { searchBooks } from '../../apis/BookSearch/search';
import type { BookSearchResponse } from '../../types/BookSearchdto';

export function useBookSearch(keyword: string, page: number) {
  
  return useQuery<BookSearchResponse, Error>({
    queryKey: ['bookSearch', keyword, page],
    queryFn: () => {
      return searchBooks(keyword, page);
    },
    enabled: keyword.trim().length > 0,   // 빈 문자열일 땐 호출 금지
    staleTime: 1000 * 60 * 5,           // 5분 동안 캐시 유지
  });
}