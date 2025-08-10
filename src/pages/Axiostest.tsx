

import { useState } from 'react';

import { useShelfHome } from '../hooks/Shelf/useShelfHome';
import type { TopicListRequest } from "../types/Shelf/Shelftopics";
import { useTopicList } from '../hooks/Shelf/useTopicList';
import { useTopicCreate } from '../hooks/Shelf/useTopicCreate';
import { useTopicUpdate } from '../hooks/Shelf/useTopicUpdate';
import { useTopicDelete } from '../hooks/Shelf/useTopicDelete';
import { useReviewInfinite } from '../hooks/Shelf/useReviewInfinite';
import type { ReviewListRequest } from "../types/Shelf/Shelfreview";

import { useReviewCreate } from '../hooks/Shelf/useReviewCreate';
import { useReviewUpdate } from '../hooks/Shelf/useReviewUpdate';
import { useReviewDelete } from '../hooks/Shelf/useReviewDelete';
import ReviewSection from '../components/Shelf/ReviewSection';

export default function AxiosTest() {
  // 테스트용 Request DTO
  const req: TopicListRequest = {
    meetingId: 1,
    cursorId: 110,
    size: 100,
  };
  // 주요 훅 사용
  // const { data, isLoading, isError, error } = useTopicList(req);
  // 선택된 topicId 상태
  const [selectedId, setSelectedId] = useState<number>(null);
  const createMut = useTopicCreate(req); 
  const updateMut = useTopicUpdate(req);
  const deleteMut = useTopicDelete(req);


  const reviewReq: ReviewListRequest = {
    meetingId: 1,
    cursorId: 202,
    size:      5,
  };
  const { data, isLoading, isError, error} =  useReviewInfinite(reviewReq)

  const [selectedReviewId, setSelectedReviewId] = useState<number>(null);
  const createReviewMut = useReviewCreate(reviewReq);
  const updateReviewMut = useReviewUpdate(reviewReq);
  const deleteReviewMut = useReviewDelete(reviewReq);
   

  // 핸들러 함수
  const handleCreate = () => {
    createMut.mutate({description: "1"});
  };

  const handleUpdate = () => {
    if (selectedId === null) return;
    updateMut.mutate({topicId : selectedId, description: "!?!?!?!??!"});
  };

  const handleDelete = () => {
    if (selectedId === null) return;
    deleteMut.mutate(selectedId);
  };

  const handleCreateReview = () => {
    createReviewMut.mutate({ description: "새 리뷰!", rate: 3 });
  };

  const handleUpdateReview = () => {
    if (selectedReviewId === null) return;
    updateReviewMut.mutate({ reviewId: selectedReviewId, description: "수정 리뷰!", rate: 3 });
  };

  const handleDeleteReview = () => {
    if (selectedReviewId === null) return;
    deleteReviewMut.mutate(selectedReviewId);
  };

  if (isLoading ) return <p>Loading list...</p>;
  if (isError ) return <p className="text-red-500">Error: {error?.message}</p>;

  return (
    <div>

      <ReviewSection meetingId={Number(1)} currentUser={{ nickname: "dd", profileImageUrl: "!!" }} size={5} />

    </div>
  )};