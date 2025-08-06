import { useQuery } from '@tanstack/react-query';
import { SearchBooks } from '../../apis/BookSearch/search';
import type { BookSearchResult } from '../../types/BookSearchdto';

export function useBookSearch(keyword: string, page: number ) {

  return useQuery<BookSearchResult, Error>({
    queryKey: ['bookSearch', keyword, page],
    queryFn: () => {return SearchBooks(keyword, page);},
    enabled: keyword.trim().length > 0,   // 빈 문자열일 땐 호출 금지
    staleTime: 1000 * 60 * 5,           // 5분 동안 캐시 유지
  });
}