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
  const typeParam = searchParams.get('type');
  const type = (typeParam === 'meeting' || typeParam === 'vote' || typeParam === 'general') ? typeParam : 'general';
  const numericClubId = useMemo(() => Number(bookclubId), [bookclubId]);
  const numericNoticeId = useMemo(() => Number(noticeId), [noticeId]);
  const hasValidIds = Number.isFinite(numericClubId) && Number.isFinite(numericNoticeId) && numericClubId > 0 && numericNoticeId > 0;

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
        {!hasValidIds ? (
          <div className="w-full h-[120px] flex items-center justify-center">
            <p className="text-red-500">유효하지 않은 공지입니다.</p>
          </div>
        ) : (
          <>
            {(type === 'meeting' ? meetingLoading : type === 'vote' ? voteLoading : generalLoading) && (
              <div className="w-full h-[120px] flex items-center justify-center">
                <p className="text-[#969696]">로딩 중…</p>
              </div>
            )}
            {(type === 'meeting' ? meetingError : type === 'vote' ? voteError : generalError) && (
              <p className="text-red-500">Error: {(type === 'meeting' ? meetingErr : type === 'vote' ? voteErr : generalErr)?.message}</p>
            )}
            {!(type === 'meeting' ? meetingLoading : type === 'vote' ? voteLoading : generalLoading) && !(type === 'meeting' ? meetingError : type === 'vote' ? voteError : generalError) && (
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
          </>
        )}
      </div>
    </div>
  );
}