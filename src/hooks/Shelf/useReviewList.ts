import { useQuery } from '@tanstack/react-query';
import { fetchShelfReviews } from '../../apis/Shelf/fetchShelfReviews';
import type { ReviewListRequest, ReviewListResponseResult } from '../../types/Shelf/Shelfreview';

export function useReviewList(req: ReviewListRequest) {
  
  return useQuery<ReviewListResponseResult, Error>({
    queryKey: ['reviewList', req],
    queryFn: () => fetchShelfReviews(req),
    enabled: Boolean(req.meetingId),
    staleTime: 1000 * 60 * 5, // 5분
  });
}
