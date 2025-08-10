import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { createShelfReview } from '../../apis/Shelf/fetchShelfReviews';
import type { ReviewCreateRequest, ReviewCreateResponseResult,  ReviewListResponseResult,  ReviewItem,  CreateParams,} from '../../types/Shelf/Shelfreview';
import { buildReviewsKey } from '../../types/Shelf/Shelfreview';

export function useReviewCreate({ meetingId, size, currentUser }: CreateParams) {
  const qc = useQueryClient();

  return useMutation<ReviewCreateResponseResult, Error, ReviewCreateRequest, { previousData?: InfiniteData<ReviewListResponseResult> }>({
    mutationFn: (ReviewCreateRequest) => createShelfReview(meetingId, ReviewCreateRequest),

    onMutate: async (newReview) => {
      const key = buildReviewsKey({ meetingId, size });
      await qc.cancelQueries({ queryKey: key });
      
      const previousData = qc.getQueryData<InfiniteData<ReviewListResponseResult>>(key);

      let tempId: number = 0;
      const firstItem = previousData?.pages?.[0]?.bookReviewList?.[0];
      if (firstItem) {
        tempId = firstItem.bookReviewId + 1;
      } else {
        tempId = 0;
      }
      
      const tempReview: ReviewItem = {
        bookReviewId: tempId,
        description: newReview.description,
        rate: newReview.rate,
        authorInfo: {
          nickname: currentUser.nickname,
          profileImageUrl: currentUser.profileImageUrl
        },
      };
      
      qc.setQueryData(buildReviewsKey({ meetingId, size }), (old: InfiniteData<ReviewListResponseResult>) => {
        
        return { ...old, pages: [ { ...old.pages[0], bookReviewList: [tempReview, ...old.pages[0].bookReviewList] }, ...old.pages.slice(1) ] } 
      });
      
      return { previousData };
    },

    onError: (_error, _newReview, context) => {
      qc.setQueryData(buildReviewsKey({ meetingId, size }), context?.previousData);
    },
    
    onSettled: () => {
      qc.invalidateQueries({ queryKey: buildReviewsKey({ meetingId, size }) });
    },
  });
}