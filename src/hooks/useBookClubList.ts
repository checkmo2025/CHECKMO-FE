import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchClubList } from '../apis/clubApi';
import type { ClubListResult } from '../types/bookClub';
import type { ClubSearchParams } from '../apis/clubApi';

export function useBookClubList(params: Omit<ClubSearchParams, 'cursorId'>) {
  return useInfiniteQuery<ClubListResult, Error>({
    queryKey: ['clubList', params],
    queryFn: ({ pageParam = null }) =>
      fetchClubList({ ...params, cursorId: pageParam as number | null }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null,
  });
}


