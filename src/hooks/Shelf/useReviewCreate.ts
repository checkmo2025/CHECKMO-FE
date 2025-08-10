import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { createShelfReview } from '../../apis/Shelf/fetchShelfReviews';
import type { ReviewCreateRequest, ReviewCreateResponseResult,  ReviewListResponseResult,  ReviewItem,  CreateParams,} from '../../types/Shelf/Shelfreview';
import { buildReviewsKey } from '../../types/Shelf/Shelfreview';

export function useReviewCreate({ meetingId, size, currentUser }: CreateParams) {
  const qc = useQueryClient();
  
  return useMutation<ReviewCreateResponseResult, Error, ReviewCreateRequest, { previousData?: InfiniteData<ReviewListResponseResult> }>({
    mutationFn: (body) => createShelfReview(meetingId, body),
    
    onMutate: async (newReview) => {
      const key = buildReviewsKey({ meetingId, size });
      await qc.cancelQueries({ queryKey: key });

      // 이전 캐시 데이터를 보관하여 실패 시 롤백에 사용
      const previousData = qc.getQueryData<InfiniteData<ReviewListResponseResult>>(key);
      
      // 임시 ID 생성
      const firstReviewId = previousData?.pages[0].bookReviewList[0].bookReviewId ?? 0;
      const tempId = firstReviewId + 1;
      
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