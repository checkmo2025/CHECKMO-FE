import { useMutation, useQueryClient } from '@tanstack/react-query';
import type {ReviewUpdateRequest, ReviewUpdateResponseResult, ReviewListRequest,} from '../../types/Shelf/Shelfreview';
import { updateShelfReview } from '../../apis/Shelf/fetchShelfReviews';

export function useReviewUpdate(req: ReviewListRequest) {
  const qc = useQueryClient();

  return useMutation<
    ReviewUpdateResponseResult,
    Error,
    ReviewUpdateRequest 
    >({
    mutationFn : (ReviewUpdateRequest) => updateShelfReview(req.meetingId, ReviewUpdateRequest),
    onSuccess: () => {
      qc.invalidateQueries({ 
        queryKey: ['reviewList', req] 
      });
    },
  });
}
