

import { useState } from 'react';

import { useShelfHome } from '../hooks/Shelf/useShelfHome';
import type { TopicListRequest } from "../types/Shelf/Shelftopics";
import { useTopicList } from '../hooks/Shelf/useTopicList';
import { useTopicCreate } from '../hooks/Shelf/useTopicCreate';
import { useTopicUpdate } from '../hooks/Shelf/useTopicUpdate';
import { useTopicDelete } from '../hooks/Shelf/useTopicDelete';

import type { ReviewListRequest } from "../types/Shelf/Shelfreview";
import { useReviewList } from '../hooks/Shelf/useReviewList';
import { useReviewCreate } from '../hooks/Shelf/useReviewCreate';
import { useReviewUpdate } from '../hooks/Shelf/useReviewUpdate';
import { useReviewDelete } from '../hooks/Shelf/useReviewDelete';

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
  const { data, isLoading, isError, error} =  useReviewList(reviewReq)

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
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">Topic CRUD Test</h1>
      {/* review 선택 드롭다운 */}
      <div>
        <label htmlFor="reviewSelect" className="mr-2">Select Review:</label>
       <select
         id="reviewSelect"
         value={selectedReviewId ?? ''}
          onChange={e => setSelectedReviewId(e.target.value ? Number(e.target.value) : null)}
          className="border rounded px-2 py-1"
        >
          <option value="">-- none --</option>
          {data.bookReviewList.map(r => (
            <option key={r.bookReviewId} value={r.bookReviewId}>
              {r.bookReviewId}: {r.description} ({r.rate})
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex gap-2">
          <button onClick={handleCreateReview} className="btn" disabled={createReviewMut.isLoading}>
          {createReviewMut.isLoading ? 'Creating Review...' : 'Create Review'}
        </button>
        <button onClick={handleUpdateReview} className="btn" disabled={!selectedReviewId || updateReviewMut.isLoading}>
          {updateReviewMut.isLoading ? 'Updating Review...' : 'Update Review'}
        </button>
        <button onClick={handleDeleteReview} className="btn" disabled={!selectedReviewId || deleteReviewMut.isLoading}>
          {deleteReviewMut.isLoading ? 'Deleting Review...' : 'Delete Review'}
        </button>

      </div>
      
      <div>
        <h2 className="font-semibold">Current Reviews</h2>
        <ul className="list-disc pl-5">
          {data?.bookReviewList.map(r => (
            <li key={r.bookReviewId} className="py-1">
              <strong>{r.bookReviewId}</strong>: {r.description} (★{r.rate})
            </li>
          ))}
        </ul>
      </div>



    </div>
  )};