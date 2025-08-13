import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';

import type { TopicItem, TopicListRequest, TopicCreateRequest, TopicUpdateRequest} from '../../../types/Shelf/Shelftopics';
import { useTopicInfinite } from '../../../hooks/Shelf/useTopicInfinite';
import { useTopicCreate } from '../../../hooks/Shelf/useTopicCreate';
import LongtermChatInput from '../../../components/LongtermChatInput';
import { useTopicUpdate } from '../../../hooks/Shelf/useTopicUpdate';
import { useTopicDelete } from '../../../hooks/Shelf/useTopicDelete';
import Modal, { type ModalButton } from '../../../components/Modal';

export default function ThemeDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ShelfmeetingId } = useParams<{ ShelfmeetingId: string }>()
  const { bookTitle } = location.state as { bookTitle: string };
  const [Mynickname, setMynickname] = useState<string>('')
  const [MyUrl, setUrl] = useState<string>('')

  const [TopicList, setTopicList] = useState<TopicItem[]>([]);
  const [editingTopicId, setEditingTopicId] = useState<number | null>(null);
  const [editingInitialText, setEditingInitialText] = useState<string>('');
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState('');
  const infoButtons: ModalButton[] = [
    {
      label: '돌아가기',
      onClick: () => setInfoOpen(false),
    },
  ];

  const Req: TopicListRequest = { meetingId : Number(ShelfmeetingId), size: 5}
  const {  data: TopicResult,  fetchNextPage,  hasNextPage,  isFetchingNextPage,} = useTopicInfinite(Req);

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
  
  useEffect(() => {
    if (TopicResult) {
      const allTopics = TopicResult.pages.flatMap(
        (page) => page.topics,
      );
      setTopicList(allTopics);
    }
  }, [TopicResult]);
  
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


  function Checkdescription(description: string) {
    if (description == '') {
      setInfoTitle('발제를 입력해주세요.');
      setInfoOpen(true);
      return false;
    } else if (description.length > 255) {
      setInfoTitle('발제는 255자 이내로 입력해주세요.');
      setInfoOpen(true);
      return false;
    }
    return true;
  }
  //create
  const createTopicMut = useTopicCreate({ meetingId: Number(ShelfmeetingId), size: 5, currentUser: { nickname: Mynickname, profileImageUrl: MyUrl } });
  function handleSend(description: string) {
    if(Checkdescription(description) === false) return false;
    const payload: TopicCreateRequest = { description };
    createTopicMut.mutate(payload);
    return true
  };

  //update
  const updateMut = useTopicUpdate({ meetingId: Number(ShelfmeetingId), size: 5 } as TopicListRequest);
  const startEdit = (topic: TopicItem) => {
      setEditingTopicId(topic.topicId);
      setEditingInitialText(topic.content);
    };

    function handleUpdate(newDescription: string) {
      if(Checkdescription(newDescription) === false) return false;
      const payload: TopicUpdateRequest = { topicId: editingTopicId!, description: newDescription };
      updateMut.mutate(payload);

      setEditingTopicId(null);
      setEditingInitialText('');
      return true
    };

  //delete
  const deleteMut = useTopicDelete({ meetingId: Number(ShelfmeetingId), size: 5 } as TopicListRequest);
    const handleDelete = (topicId: number) => {
      deleteMut.mutate(topicId);
    };


  return (
    <div className="flex h-screen">
      {/* 메인 */}
      <div className="absolute top-[30px] left-[305px] right-[34px]" >

        {/* 상단 뒤로가기 영역 */}
        <div onClick={() => navigate(-1)} className="flex items-center h-[38px] gap-[3px] cursor-pointer mb-[30px]">
          {/* 1) 왼쪽 아이콘 영역 (30px) */}
          <div className="w-[30px] h-full flex items-center justify-center">
            <img src="/assets/material-symbols_arrow-back-ios.svg" className="w-[30px] h-[30px]"/>
          </div>

          {/* 2) 책 이름 */}
          <span className="font-[Pretendard] font-bold text-[28px] leading-[135%]">
            {bookTitle}
          </span>
        </div>

          {/* 발제 영역 */}
          <div className=" flex flex-col overflow-y-auto h-[calc(100vh-140px)] overscroll-none" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <span className= "mt-[34px] mb-[22px] text-[18px] font-[Pretendard] font-medium leading-[135%] text-black">발제</span>

            {/* 등록 영역 */}
            <div className=" py-2 flex shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)] mb-3">
              <div className="flex-shrink-0 items-center w-[222px] h-[48px] ml-[12px] flex gap-[19px] mr-[15px]">
                <img src={MyUrl} className="w-[48px] h-[48px] rounded-full object-cover"  alt="프로필"/>
                <div className="flex-1 font-semibold text-[15px] text-gray-800">
                  {Mynickname}
                </div>
              </div>
              <LongtermChatInput  onSend={handleSend}  placeholder={'발제를 입력해 주세요'} buttonIconSrc="/assets/등록.svg"  className=""/>
            </div>
            
            {/* 발제 리스트 */}
            <div className="flex flex-col gap-3">
              {TopicList.map((Topic: TopicItem) => (
                <div key={Topic.topicId} className="flex py-2 flex shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)]">
                    <div className= "flex-shrink-0 items-center w-[222px] h-[48px] ml-[12px] flex gap-[19px] mr-[15px] " >
                      <img src= {Topic.authorInfo.profileImageUrl || '/assets/ix_user-profile-filled.svg'} className="w-[48px] h-[48px] rounded-full object-cover" />
                      <div className="font-semibold text-[15px] text-gray-800 mb-1">{Topic.authorInfo.nickname}</div>
                    </div>
                    
                    {/* 발제 내용 */}
                    <div className="flex-1 flex items-center font-pretendard text-sm font-medium leading-[145%] tracking-[-0.014px] text-[var(--Gray-1,#2C2C2C)] [font-feature-settings:'case' on] mr-[20px]  whitespace-pre-wrap">
                      {editingTopicId === Topic.topicId ? ( <LongtermChatInput onSend={handleUpdate}  placeholder={'발제를 수정해주세요'}   buttonIconSrc="/assets/등록.svg" initialValue={editingInitialText} className=""/>
                      ) : (Topic.content)}
                    </div>

                    {editingTopicId !== Topic.topicId && Topic.authorInfo.nickname === Mynickname && (
                      <div className="ml-auto flex gap-[9px] mr-[25px] flex-shrink-0">
                        {editingTopicId === Topic.topicId ? (
                          <button onClick={() => { setEditingTopicId(null); setEditingInitialText(''); }} >
                            <img src="/assets/취소.svg" className="w-6 h-6" alt="취소"/>
                          </button>)
                          : (
                          <div className="flex gap-[9px]">
                            <button onClick={() => startEdit(Topic)}>
                              <img src="/assets/글쓰기.svg" className="w-6 h-6" alt="수정"/>
                            </button>
                            <button onClick={() => handleDelete(Topic.topicId)}>
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
          
      </div>
      <Modal
        isOpen={infoOpen}
        title={infoTitle}
        buttons={infoButtons}
        onBackdrop={() => setInfoOpen(false)}
      />
    </div>
  )
}
