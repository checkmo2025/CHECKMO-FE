import { useEffect, useRef, useState } from 'react';

import { useReviewInfinite } from '../../hooks/Shelf/useReviewInfinite';
import { useReviewCreate } from '../../hooks/Shelf/useReviewCreate';
import { useReviewUpdate } from '../../hooks/Shelf/useReviewUpdate';
import { useReviewDelete } from '../../hooks/Shelf/useReviewDelete';

import type {
  ReviewItem,
  ReviewListRequest,
  ReviewCreateRequest,
  ReviewUpdateRequest,
} from '../../types/Shelf/Shelfreview';

import LongtermChatInput from '../LongtermChatInput';
import { getStarIcon } from './getStarIcon';
import StarSelector from '../BookRecommend/StarSelector';

function Checkdescription(description: string, Rating : number) {
  if (Rating < 1) {
      alert('별점은 1점보다 크거나 같아야 합니다.');
      return;
  } else if (description == '') {
      alert('한줄평을 입력해주세요.');
      return;
  }
  else if (description.length > 100) {
    alert('한줄평은 40자 이내로 입력해주세요.');
    return;
  }
  return;
}

export default function ReviewSection({ meetingId,  currentUser,  size,}: 
  { meetingId: number;  currentUser: { nickname: string; profileImageUrl: string };  size: number;}) {

  const [newRating, setNewRating] = useState<number>(0);
  const [editRating, setEditRating] = useState<number>(0);
  const [ReviewList, setReviewList] = useState<ReviewItem[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editingInitialText, setEditingInitialText] = useState<string>('');
  const reviewReq: ReviewListRequest = { meetingId, size } as ReviewListRequest;
  const {  data: ReviewResult,  fetchNextPage,  hasNextPage,  isFetchingNextPage,} = useReviewInfinite(reviewReq);

  useEffect(() => {
    if (ReviewResult) {
      const allReviews = ReviewResult.pages.flatMap(
        (page) => page.bookReviewList,
      );
      setReviewList(allReviews);
    }
  }, [ReviewResult]);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Create
  const createReviewMut = useReviewCreate({ meetingId, size, currentUser });
  const handleSend = (description: string) => {
    Checkdescription(description, newRating);

    const payload: ReviewCreateRequest = { description, rate: newRating };
    createReviewMut.mutate(payload, {
      onSuccess: () => setNewRating(0),
    });
  };

  // Update
  const updateMut = useReviewUpdate({ meetingId, size } as ReviewListRequest);
  const startEdit = (review: ReviewItem) => {
    setEditingReviewId(review.bookReviewId);
    setEditingInitialText(review.description);
    setEditRating(review.rate);
  };

  const handleUpdate = (description: string) => {
    Checkdescription(description, editRating);

    const payload: ReviewUpdateRequest = { reviewId: editingReviewId!, description: description, rate: editRating };
    updateMut.mutate(payload, {
      onSuccess: () => {
        setEditingReviewId(null);
        setEditingInitialText('');
      },
    });
  };

  // Delete
  const deleteMut = useReviewDelete({ meetingId, size } as ReviewListRequest);
  const handleDelete = (bookReviewId: number) => {
    deleteMut.mutate(bookReviewId);
  };

  return (
    <div className="mt-[64px] flex flex-col mb-[73px]">
      <span className="mb-[22px] text-[18px] font-[Pretendard] font-medium leading-[135%] text-black">
      한줄평
      </span>

      {/* 등록 영역 */}
      <div className="flex py-2 shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)] w-full mb-3">
        <div className="flex items-center justify-between h-[48px] w-[270px] flex-none ml-[12px] mr-[34px]">
          <img
            src={currentUser.profileImageUrl}
            className="w-[48px] h-[48px] rounded-full object-cover"
            alt="프로필"
          />
          <div className="flex-1 ml-[19px] font-semibold text-[15px] text-gray-800">
            {currentUser.nickname}
          </div>
          <div className="flex justify-end items-center">
            <StarSelector value={newRating} onChange={setNewRating} size={10} />
          </div>
        </div>
        <LongtermChatInput
          onSend={handleSend}
          placeholder={'한줄평을 입력해 주세요'}
          buttonIconSrc="/assets/등록.svg"
          className=""
        />
      </div>

      {/* 리스트 영역 */}
      <div className="flex flex-col gap-3">
        {ReviewList.map((review) => (
          <div key={review.bookReviewId} className="flex py-2 shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)]">
            <div className="flex items-center justify-between h-[48px] w-[270px] flex-none ml-[12px] mr-[34px]">
              <img src={  review.authorInfo.profileImageUrl ||'/assets/ix_user-profile-filled.svg' } className="w-[48px] h-[48px] rounded-full object-cover" alt="프로필"/>
              <div className="flex-1 ml-[19px] font-semibold text-[15px] text-gray-800">
                {review.authorInfo.nickname}
              </div>

              <div>
                {/* editingReviewId가 있을 때 없을 때 2가지 경우 */}
                {editingReviewId === review.bookReviewId ? (
                  <div className="flex justify-end items-center">
                    <StarSelector value={editRating} onChange={setEditRating} size={10} />
                  </div>) : (
                    <div className="flex justify-end items-center">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <img key={i} src={getStarIcon(review.rate, i)}  className="w-[20px] h-[20px]"  alt={`${i + 1} star`}/>))}
                    </div>)} 
              </div>

            </div>
            {/* editingReviewId가 있을 때 없을 때 2가지 경우 */}
            <div className="flex-1 flex items-center font-pretendard text-sm font-medium leading-[145%] tracking-[-0.014px] break-words whitespace-pre-wrap">
              {editingReviewId === review.bookReviewId ? ( <LongtermChatInput onSend={handleUpdate}  placeholder={'한줄평을 수정해 주세요'}   buttonIconSrc="/assets/등록.svg" initialValue={editingInitialText} className=""/>
              ) : (review.description)}
            </div>

            {/* editingReviewId가 있을 때, 내 아이디가 아닐 때 2가지 경우*/}
            {editingReviewId !== review.bookReviewId && review.authorInfo.nickname === currentUser.nickname && (
              <div className="ml-auto flex gap-[9px] mr-[25px] flex-shrink-0">
                {editingReviewId === review.bookReviewId ? (
                  <button onClick={() => { setEditingReviewId(null); setEditingInitialText(''); }} >
                    <img src="/assets/취소.svg" className="w-6 h-6" alt="취소"/>
                  </button>)
                  : (
                  <div className="flex gap-[9px]">
                    <button onClick={() => startEdit(review)}>
                      <img src="/assets/글쓰기.svg" className="w-6 h-6" alt="수정"/>
                    </button>
                    <button onClick={() => handleDelete(review.bookReviewId)}>
                      <img src="/assets/삭제.svg" className="w-6 h-6" />
                    </button>
                  </div>)}
              </div>
            )}

            
          </div>
        ))}
        {isFetchingNextPage && (
          <div className="font-[Pretendard] font-semibold text-[16px] text-[#8D8D8D]">
            추가 불러오는 중…
          </div>
        )}
        <div ref={loadMoreRef} style={{ height: 1 }} />
        <div className="h-20" />
      </div>
    </div>
  );
}
