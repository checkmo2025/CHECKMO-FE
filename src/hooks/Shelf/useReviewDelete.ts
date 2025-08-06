import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteShelfReview} from '../../apis/Shelf/fetchShelfReviews';
import type { ReviewListRequest, ReviewListResponseResult } from '../../types/Shelf/Shelfreview';

export function useReviewDelete(req: ReviewListRequest) {
  const qc = useQueryClient();

  return useMutation<
    null,
    Error,
    number
  >({
    mutationFn: (bookReviewId: number) => deleteShelfReview(req.meetingId, bookReviewId),
    onMutate: async (bookReviewId: number) => {
      await qc.cancelQueries({ queryKey: ['reviewList', req] });
      const previous = qc.getQueryData<ReviewListResponseResult>(['reviewList', req]);

      qc.setQueryData<ReviewListResponseResult>(['reviewList', req], (old) => {
        if (!old) return old;
        return {
          ...old,
          bookReviewList: old.bookReviewList.filter((t) => t.bookReviewId !== bookReviewId),
        };
      });

      return { previous };
    },
    onError: (_err, context) => {
      if (context) {
        qc.setQueryData(['reviewList', req], context);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['reviewList', req] });
    },
  });
}
