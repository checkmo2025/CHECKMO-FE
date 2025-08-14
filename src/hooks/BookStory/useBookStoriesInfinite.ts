import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchBookStories } from '../../apis/BookStory/bookstories';
import type { BookStoriesParams } from '../../apis/BookStory/bookstories';
import type { BookStoriesResult } from '../../types/bookStories';

/**
 * Infinite loader for Book Stories
 * - Supports scope-based filtering (ALL, MY, FOLLOWING, CLUB, TARGET)
 * - Uses cursor-based pagination per API contract
 */
export function useBookStoriesInfinite(params: Omit<BookStoriesParams, 'cursorId'>) {
  const { scope, clubId, targetMemberNickname } = params;

  return useInfiniteQuery<BookStoriesResult, Error>({
    queryKey: ['bookStories', scope, clubId, targetMemberNickname],
    queryFn: ({ pageParam = null }) => {
      const requestParams = { ...params, cursorId: pageParam as number | null };
      console.log('📚 BookStories API 요청:', requestParams);
      return fetchBookStories(requestParams);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
    enabled:
      scope !== 'CLUB' || (typeof clubId === 'number' && Number.isFinite(clubId) && clubId > 0),
    staleTime: 1000 * 60 * 5,
  });
}


