import React from 'react';
import { useMemo } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import backIcon from "../../assets/icons/backIcon.png";
import MeetingNoticeContent from '../../components/BookClub/MeetingNoticeContent';
import GeneralNoticeContent from '../../components/BookClub/GeneralNoticeContent';
import VoteNoticeContent from '../../components/BookClub/VoteNoticeContent';
import { useMeetingNoticeDetail } from '../../hooks/BookClub/useMeetingNoticeDetail';
import { useGeneralNoticeDetail } from '../../hooks/BookClub/useGeneralNoticeDetail';
import { useVoteNoticeDetail } from '../../hooks/BookClub/useVoteNoticeDetail';

export default function NoticeDetailPage(): React.ReactElement {
  const navigate = useNavigate();
  const { bookclubId, noticeId } = useParams<{ bookclubId: string; noticeId: string }>();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') ?? 'general';
  const numericClubId = useMemo(() => Number(bookclubId) || 0, [bookclubId]);
  const numericNoticeId = useMemo(() => Number(noticeId) || 0, [noticeId]);

  const { data: meetingInfo, isLoading: meetingLoading, isError: meetingError, error: meetingErr } = useMeetingNoticeDetail(numericClubId, numericNoticeId);
  const { data: generalInfo, isLoading: generalLoading, isError: generalError, error: generalErr } = useGeneralNoticeDetail(numericClubId, numericNoticeId);
  const { data: voteInfo, isLoading: voteLoading, isError: voteError, error: voteErr } = useVoteNoticeDetail(numericClubId, numericNoticeId);

  return (
    <div className="mt-[30px] ml-[51px]">
      <div className="flex items-center mb-[25px]">
        <button 
          onClick={() => navigate(-1)}
          className="w-[24px] h-[24px] mr-[3px] cursor-pointer"
        >
          <img src={backIcon} alt="back" />
        </button>
        <h1 className="font-pretendard font-semibold text-[24px] leading-[135%] tracking-[-0.1%] text-[#2c2c2c]">
          공지사항
        </h1>
      </div>

      <div className=" overflow-y-auto h-[calc(100vh-100px)] w-full">
        {(type === 'meeting' ? meetingLoading : type === 'vote' ? voteLoading : generalLoading) && (
          <div className="w-full h-[120px] flex items-center justify-center">
            <p className="text-[#969696]">로딩 중…</p>
          </div>
        )}
        {(type === 'meeting' ? meetingError : type === 'vote' ? voteError : generalError) && (
          <p className="text-red-500">Error: {(type === 'meeting' ? meetingErr : type === 'vote' ? voteErr : generalErr)?.message}</p>
        )}
        {!meetingLoading && !voteLoading && !generalLoading && (
          <>
            {type === 'meeting' && meetingInfo && (
              <MeetingNoticeContent data={meetingInfo} />
            )}
            {type === 'general' && generalInfo && (
              <GeneralNoticeContent data={generalInfo} />
            )}
            {type === 'vote' && voteInfo && (
              <VoteNoticeContent
                data={voteInfo}
                registerBackBlocker={(register) => {
                  // 버튼 클릭 시 차단 처리
                  const onTryBack = () => {
                    const blocked = register();
                    if (!blocked) navigate(-1);
                  };
                  window.addEventListener('try-go-back', onTryBack);
                  return () => window.removeEventListener('try-go-back', onTryBack);
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}