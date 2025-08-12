import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchShelfReviews } from '../../apis/Shelf/fetchShelfReviews';
import type { ReviewListRequest, ReviewListResponseResult,}  from '../../types/Shelf/Shelfreview';
import { buildReviewsKey } from '../../types/Shelf/Shelfreview';


export function useReviewInfinite(req: Omit<ReviewListRequest, 'cursorId'>) {
  return useInfiniteQuery<ReviewListResponseResult, Error>({
    queryKey: buildReviewsKey(req),
    queryFn: ({ pageParam = null }) =>
    fetchShelfReviews({ ...req, cursorId: pageParam }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null, // nextCursor
  });
}