import { useInfiniteQuery } from '@tanstack/react-query';
import { getClubNotices } from '../../apis/clubAnnouncements/clubNoticeApi';
import type { noticeListResult } from '../../types/clubNotice';

export function useClubNoticesInfinite(clubId: number, pageSize: number = 10) {
  return useInfiniteQuery<noticeListResult, Error>({
    queryKey: ['clubNotices', 'infinite', clubId, pageSize],
    queryFn: ({ pageParam }) =>
      getClubNotices(
        clubId,
        false,
        typeof pageParam === 'number' ? pageParam : undefined,
        pageSize
      ),
    enabled: !!clubId && clubId > 0,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && typeof lastPage.nextCursor === 'number'
        ? lastPage.nextCursor
        : undefined,
    staleTime: 1000 * 60 * 5,
  });
}


