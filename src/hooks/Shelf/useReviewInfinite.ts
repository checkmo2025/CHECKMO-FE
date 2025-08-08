import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchShelfReviews } from '../../apis/Shelf/fetchShelfReviews'
import type { ReviewListRequest, ReviewListResponseResult,} from '../../types/Shelf/Shelfreview'

export function useReviewInfinite(req: Omit<ReviewListRequest, 'cursorId'>) {
  return useInfiniteQuery<ReviewListResponseResult, Error>(
    ['reviews', req],
    {

      queryFn: ({ pageParam = null }) =>
        fetchShelfReviews({ ...req, cursorId: pageParam }),
      getNextPageParam: (ReviewListResponseResult.) => .nextCursor,
    }
  )
}