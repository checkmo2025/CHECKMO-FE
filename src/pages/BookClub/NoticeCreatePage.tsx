import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useRef, useEffect, use } from 'react';

import NoticeCreateVoteComponent from '../../components/BookClub/NoticeCreateVoteComponent';
import NoticeCreateNoticeComponent from '../../components/BookClub/NoticeCreateNoticeComponent';
import type {  CreateNoticeRequest,  CreateVoteRequest,} from '../../types/Notice/clubNoticeCreate';
import { useCreateNotice } from '../../hooks/ClubNotice/useCreateNotice';
import { useCreateVote } from '../../hooks/ClubNotice/useCreateVote';
import Modal, { type ModalButton } from '../../components/Modal';

export default function NoticeCreatePage() {
  const { bookclubId } = useParams<{ bookclubId: string }>();
  const navigate = useNavigate();


  const [type, setType] = useState<'poll' | 'notice'>(useLocation().state?.type || 'poll'); 

  const [startTime, setStartTime] = useState(''); // Add startTime state
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState("");
  const infoButtons: ModalButton[] = [
    {
      label: '확인',
      onClick: () => setInfoOpen(false),
    },
  ];

  const titleInputRef = useRef<HTMLInputElement>(null);
  const noticeRef = useRef<CreateNoticeRequest>({
    title: '',
    content: '',
    important: false,
  });
  const voteRef = useRef<CreateVoteRequest>({
    title: '',
    important: false,
    item1: '',
    item2: '',
    item3: '',
    item4: '',
    item5: '',
    anonymity: false,
    duplication: false,
    deadline: '',
    startTime: '',
    
  });

  const handleSaveDraft = () => {
    const draftData = {
      notice: noticeRef.current,
      vote: {
        ...voteRef.current,
        startTime
      },
    };
    localStorage.setItem('draftData', JSON.stringify(draftData));
    setInfoTitle('임시저장되었습니다.');
    setInfoOpen(true);
    
  };
  
  const { mutate: createVote } = useCreateVote(bookclubId!);
  const { mutate: createNotice } = useCreateNotice(bookclubId!);




  const handleSubmit = () => {
  if (type === 'poll') {
    if(voteRef.current.item1 === '' || voteRef.current.item2 === '' || voteRef.current.title === '' || voteRef.current.deadline === ''){
      setInfoOpen(true);
      setInfoTitle('투표항목1,2와 제목, 마감일을 모두 입력해주세요.');
      return;
    }

    voteRef.current.startTime = new Date().toISOString();
    createVote(voteRef.current, {
      onSuccess: (data) => {
          navigate(`/bookclub/${bookclubId}/notices/${data.noticeItem.id}?type=vote`);
          localStorage.removeItem('draftData');
      },
      onError: (err) => {
        setInfoOpen(true);
        setInfoTitle(err.message);  
      },
    });
  } else {
    if(noticeRef.current.title === '' || noticeRef.current.content === ''){
      setInfoOpen(true);
      setInfoTitle('공지제목과 내용을 모두 입력해주세요.');
      return;
    }
    createNotice(noticeRef.current, {
      onSuccess: (data) => {
          navigate(`/bookclub/${bookclubId}/notices/${data.noticeItem.id}`);
          localStorage.removeItem('draftData');
      },
      onError: (err) => {
        setInfoOpen(true);
        setInfoTitle(err.message);
      },
    });
  }
};

  useEffect(() => {
    const savedDraft = localStorage.getItem('draftData');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        noticeRef.current = parsedDraft.notice;
        voteRef.current = parsedDraft.vote;
        if (titleInputRef.current) {
          titleInputRef.current.value = parsedDraft.notice.title;
        }
        setStartTime(parsedDraft.vote.startTime);
      } catch (error) {
        console.error('Error parsing draft data:', error);
      }
    }
  }, []);



  return (
    <div className="absolute top-[30px] left-[305px] right-[40px] bottom-[24px] flex flex-col overflow-hidden">
      <div
        onClick={() => navigate(-1)}
        className="flex items-center h-[38px] gap-[3px] cursor-pointer mb-[44px]"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <img
            src="/assets/material-symbols_arrow-back-ios.svg"
            className="w-[30px] h-[30px]"
          />
        </div>
        <span className="font-[Pretendard] font-bold text-[24px] leading-[135%]">
          공지작성
        </span>
      </div>

      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-none scrollbar-hide"
        style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
      >
        <div className="min-h-full w-full p-5 rounded-2xl border-2 border-[#EAE5E2] bg-white shadow-sm flex flex-col">
          <div className="flex items-center px-5 pb-5 pt-[10px] border-b-2 border-solid border-b-[var(--Gray7,#EEE)]">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              className="w-full font-[Pretendard] text-[20px] font-semibold leading-[135%] border-neutral-300 focus:outline-none placeholder:text-[var(--Gray-5,var(--Gray5,#BBB))]"
              ref={titleInputRef}
              defaultValue={noticeRef.current.title}
              onChange={(e) => {
                const v = e.target.value;
                noticeRef.current.title = v;
                voteRef.current.title = v;
              }}
            />
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setType('poll')}
                aria-pressed={type === 'poll'}
                className={`h-[24px] w-[54px] rounded-full text-[12px] font-semibold transition ${
                  type === 'poll'
                    ? 'bg-[#FF8A3D] text-white shadow-sm hover:opacity-90'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                투표
              </button>
              <button
                type="button"
                onClick={() => setType('notice')}
                aria-pressed={type === 'notice'}
                className={`h-[24px] w-[54px]  rounded-full text-[12px] font-semibold transition ${
                  type === 'notice'
                    ? 'bg-[#FFC648] text-white shadow-sm hover:opacity-90'
                    : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                }`}
              >
                공지
              </button>
            </div>
          </div>

          <div className="flex-1 mt-5 flex flex-col min-h-[500px]">
            <div
              className={type === 'poll' ? 'h-full flex flex-col' : 'hidden'}
            >
              <NoticeCreateVoteComponent formRef={voteRef} />
            </div>
            <div
              className={type === 'notice' ? 'h-full flex flex-col' : 'hidden'}
            >
              <NoticeCreateNoticeComponent formRef={noticeRef} />
            </div>
          </div>
          {/* 버튼 바: 항상 카드 하단 고정 */}
          <div className="mt-auto pt-4">
            <div className="flex justify-end gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center w-[105px] h-[35px] text-[#6B6661] text-[14px] font-semibold rounded-full border-2 border-[#BFAB96] hover:bg-[#F4F2F1] active:bg-[#ECE8E4]"
                onClick={handleSaveDraft}
              >
                임시저장
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center w-[105px] h-[35px] text-white text-[14px] font-semibold leading-[135%] rounded-full bg-[#A6917D] hover:brightness-95 active:brightness-90"
                onClick={handleSubmit}
              >
                등록
              </button>
            </div>
          </div>
        </div>
        <div className="h-[60px]" />
      </div>
      <Modal
        isOpen={infoOpen}
        title={infoTitle}
        buttons={infoButtons}
        onBackdrop={() => setInfoOpen(false)}
      />
    </div>
  );
}
