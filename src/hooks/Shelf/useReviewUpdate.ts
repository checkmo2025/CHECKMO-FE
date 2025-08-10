import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import {type ReviewUpdateRequest, type ReviewUpdateResponseResult, type ReviewListRequest, type ReviewListResponseResult, buildReviewsKey,} from '../../types/Shelf/Shelfreview';
import { updateShelfReview } from '../../apis/Shelf/fetchShelfReviews';

export function useReviewUpdate(req: ReviewListRequest) {
  const qc = useQueryClient();

  return useMutation<ReviewUpdateResponseResult, Error, ReviewUpdateRequest,  { previousData?: InfiniteData<ReviewListResponseResult>}>({
  mutationFn : (ReviewUpdateRequest) => updateShelfReview(req.meetingId, ReviewUpdateRequest),

  onMutate: async (updatedReview) => {
    const key = buildReviewsKey({ meetingId: req.meetingId, size: req.size });
    await qc.cancelQueries({ queryKey: key });

    // 캐시 데이터 보관 (롤백용)
    const previousData = qc.getQueryData<InfiniteData<ReviewListResponseResult>>(key);

    qc.setQueryData<InfiniteData<ReviewListResponseResult>>(key, old => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            bookReviewList: page.bookReviewList.map(review =>
              review.bookReviewId === updatedReview.reviewId
                ? { ...review, description: updatedReview.description, rate: updatedReview.rate }
                : review
            ),
          })),
        };
      });

      return { previousData };
  },
  onError: (_error, _newReview, context) => {
      qc.setQueryData(buildReviewsKey({ meetingId: req.meetingId, size: req.size }), context?.previousData);
  },
  onSettled: () => {
    qc.invalidateQueries({ queryKey: buildReviewsKey({ meetingId: req.meetingId, size: req.size }) });
  },
  });
}
