import { axiosInstance } from '../axiosInstance';
import type {ReviewListRequest, ReviewListResponseResult,
  ReviewCreateRequest, ReviewCreateResponseResult,
  ReviewUpdateRequest,ReviewUpdateResponseResult
} from '../../types/Shelf/Shelfreview';

// 1) 리뷰 목록 조회 (GET)
export function fetchShelfReviews(req: ReviewListRequest): Promise<ReviewListResponseResult> {
  const { meetingId, cursorId, size } = req;
  return axiosInstance.get(`/meetings/${meetingId}/reviews`,{
      params: { cursorId, size }
    }
  );
}

// 2) 리뷰 생성 (POST)
export function createShelfReview(meetingId: number, req: ReviewCreateRequest): Promise<ReviewCreateResponseResult> {
  const {description, rate} = req;
  return axiosInstance.post(
    `/meetings/${meetingId}/reviews`,
    { 
    description: description, 
    rate: rate 
    }
  );
}

// 3) 리뷰 수정 (PATCH)
export function updateShelfReview(meetingId: number, req: ReviewUpdateRequest ): Promise<ReviewUpdateResponseResult> {
  const {reviewId, description, rate} = req;
  return axiosInstance.patch(
    `/meetings/${meetingId}/reviews/${reviewId}`,
    { 
    description: description, 
    rate: rate 
    }
  );
}

// 4) 리뷰 삭제 (DELETE)
export function deleteShelfReview(meetingId: number, reviewId: number): Promise<null> {
  return axiosInstance.delete(
    `/meetings/${meetingId}/reviews/${reviewId}`
  ).then(() => null);
}
