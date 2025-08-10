import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { deleteShelfReview} from '../../apis/Shelf/fetchShelfReviews';
import { buildReviewsKey, type ReviewListRequest, type ReviewListResponseResult } from '../../types/Shelf/Shelfreview';

export function useReviewDelete(req: ReviewListRequest) {
  const qc = useQueryClient();
  return useMutation<null, Error, number, { previousData: InfiniteData<ReviewListResponseResult> | undefined }>({
    
    mutationFn: (bookReviewId: number) => deleteShelfReview(req.meetingId, bookReviewId),
    onMutate: async (bookReviewId: number) => {
      const key = buildReviewsKey({ meetingId: req.meetingId, size: req.size });
      await qc.cancelQueries({ queryKey: ['reviewList', req] });
      
     const previousData = qc.getQueryData<InfiniteData<ReviewListResponseResult>>(key);

     qc.setQueryData<InfiniteData<ReviewListResponseResult>>(key, (old) => { 
      if (!old) return old; 
      return { ...old, pages: old.pages.map((page) => ({ ...page, bookReviewList: page.bookReviewList.filter((t) => t.bookReviewId !== bookReviewId), })), }; });

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
