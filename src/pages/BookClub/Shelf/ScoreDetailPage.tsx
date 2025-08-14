import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import ReviewSection from '../../../components/Shelf/ReviewSection';

export default function ScoreDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ShelfmeetingId } = useParams<{ ShelfmeetingId: string }>();
  const [Mynickname, setMynickname] = useState<string>('');
  const [MyUrl, setUrl] = useState<string>('');

  const { bookTitle } = location.state as { bookTitle: string };

  useEffect(() => {
    const nickname = localStorage.getItem('nickname');
    const profileImageUrl = localStorage.getItem('profileImageUrl');
    if(!nickname || !profileImageUrl) {
      console.log("error처리")
      return;
    }
    setMynickname(nickname);
    setUrl(profileImageUrl);
  }, []) 

  return (
    <div className="flex h-screen">
      {/* 메인 */}
      <div className="absolute top-[30px] left-[305px] right-[34px] ">
        {/* 상단 뒤로가기 영역 */}
        <div
          onClick={() => navigate(-1)}
          className="flex items-center mb-4 cursor-pointer gap-[3px]"
        >
          <img
            src="/assets/material-symbols_arrow-back-ios.svg"
            className="w-[30px] h-[30px] h-full flex items-center justify-center"
          />
          <h1 className="font-[Pretendard] font-bold text-[28px] leading-[135%]">
            {bookTitle}
          </h1>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-100px)]"style={{ overflowY: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
          <ReviewSection
            meetingId={Number(ShelfmeetingId)}
            currentUser={{ nickname: Mynickname, profileImageUrl: MyUrl }}
            size={5}
          />
        </div>
      </div>
    </div>
  );
}
