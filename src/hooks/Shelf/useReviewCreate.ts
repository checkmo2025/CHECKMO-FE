import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShelfReview } from '../../apis/Shelf/fetchShelfReviews';
import type {ReviewCreateRequest, ReviewCreateResponseResult, ReviewListRequest,} from '../../types/Shelf/Shelfreview';

export function useReviewCreate(req: ReviewListRequest) {
  const qc = useQueryClient();

  return useMutation<
    ReviewCreateResponseResult,
    Error,
    ReviewCreateRequest
    >({
    mutationFn : (ReviewCreateRequest) => createShelfReview(req.meetingId, ReviewCreateRequest),
    onSuccess: () => {
      qc.invalidateQueries({ 
        queryKey: ['reviewList', req] 
      });
    },
  });
}
