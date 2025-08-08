import { useNavigate, useParams } from 'react-router-dom'
import React, { useState, useRef } from 'react'
import { getStarIcon } from './getStarIcon'

export interface ScoreItem {
  id: string
  userid: string
  profileUrl: string
  nickname: string
  score: number
  comment: string
}

export default function ScoreDetailPage() {
  const navigate = useNavigate()
  const { prefix, bookId } = useParams<{ prefix: string; bookId: string }>()

  const currentUserId = '1004'


  // 스코어 더미 데이터
  const dummyShelfBook = { id: '1124', title: '넥서스', userid: currentUserId }
  const [scores, setScores] = useState<ScoreItem[]>([
    { id: '1', userid: '1001', profileUrl: '/assets/avatars/user1.png', nickname: 'alice', score: 4.5, comment: 'AI와 인간의 공존 토론, 흥미로웠어요.' },
    { id: '2', userid: '1002', profileUrl: '/assets/avatars/user2.png', nickname: 'bob', score: 3, comment: '역사적 관점 세션, 재미있었지만 짧았어요.' },
    { id: '3', userid: '1003', profileUrl: '/assets/avatars/user3.png', nickname: 'carol', score: 5, comment: '윤리적 쟁점 리뷰가 인상 깊었습니다.' },
    { id: '4', userid: currentUserId, profileUrl: '/assets/avatars/user4.png', nickname: 'luke', score: 4, comment: '워크숍 진행, 유익했어요.' },
    { id: '1', userid: '1001', profileUrl: '/assets/avatars/user1.png', nickname: 'alice', score: 4.5, comment: 'AI와 인간의 공존 토론, 흥미로웠어요.' },
    { id: '2', userid: '1002', profileUrl: '/assets/avatars/user2.png', nickname: 'bob', score: 3, comment: '역사적 관점 세션, 재미있었지만 짧았어요.' },
    { id: '3', userid: '1003', profileUrl: '/assets/avatars/user3.png', nickname: 'carol', score: 5, comment: '윤리적 쟁점 리뷰가 인상 깊었습니다.' },
    { id: '4', userid: currentUserId, profileUrl: '/assets/avatars/user4.png', nickname: 'luke', score: 4, comment: '워크숍 진행, 유익했어요.' },
    { id: '1', userid: '1001', profileUrl: '/assets/avatars/user1.png', nickname: 'alice', score: 4.5, comment: 'AI와 인간의 공존 토론, 흥미로웠어요.AI와 인간의 공존 토론, 흥미로웠어요.AI와 인간의 공존 토론, 흥미로웠어요.AI와 인간의 공존 토론, 흥미로웠어요.AI와 인간의 공존 토론, 흥미로웠어요.AI와 인간의 공존 토론, 흥미로웠어요.AI와 인간의 공존 토론, 흥미로웠어요.AI와 인간의 공존 토론, 흥미로웠어요.' },
    { id: '2', userid: '1002', profileUrl: '/assets/avatars/user2.png', nickname: 'bob', score: 3, comment: '역사적 관점 세션, 재미있었지만 짧았어요.' },
    { id: '3', userid: '1003', profileUrl: '/assets/avatars/user3.png', nickname: 'carol', score: 5, comment: '윤리적 쟁점 리뷰가 인상 깊었습니다.' },
    { id: '4', userid: currentUserId, profileUrl: '/assets/avatars/user4.png', nickname: 'luke', score: 4, comment: '워크숍 진행, 유익했어요.' },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const [newScore, setNewScore] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const ta = e.currentTarget;
    ta.style.height = 'auto';               // 높이 리셋
    ta.style.height = ta.scrollHeight + 'px'; // 내용에 맞게 늘리기
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      // 탭 문자 삽입
      ta.value = ta.value.slice(0, start) + '\t' + ta.value.slice(end);
      // 커서 위치 복원
      ta.selectionStart = ta.selectionEnd = start + 1;
    }
  };


  const handleSend = () => {
    const text = inputRef.current?.value.trim()
    if (!text) return
    const newItem: ScoreItem = {
      id: crypto.randomUUID(),
      userid: currentUserId,
      profileUrl: '/assets/avatars/user4.png',
      nickname: 'luke',
      score: newScore,
      comment: text,
    }
    setScores(prev => [...prev, newItem])
    setIsAdding(false)
    if (inputRef.current) inputRef.current.value = ''
    setNewScore(0)
  }

  return (
    <div className="flex h-screen">
      {/* 메인 */}
      <div className="absolute top-[30px] left-[305px] right-[34px] ">

        {/* 상단 뒤로가기 영역 */}
        <div onClick={() => navigate(-1)} className="flex items-center mb-4 cursor-pointer gap-[3px]">

          <img src="/assets/material-symbols_arrow-back-ios.svg" className="w-[30px] h-[30px] h-full flex items-center justify-center" />

          <h1 className="font-[Pretendard] font-bold text-[28px] leading-[135%]">
            {dummyShelfBook.title}
          </h1>
        </div>

        {/* 한줄평 영역 */}
        <div className="mt-[64px] flex flex-col">

          <span className= "mb-[22px] text-[18px] font-[Pretendard] font-medium leading-[135%] text-black">한줄평</span>

          {/* 스크롤 되는 영역*/}
          <div className= "flex flex-col overflow-y-auto h-[calc(100vh-179px)] overscroll-none " style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>

            {/* 한줄평 리스트 */}
            <div className="flex flex-col gap-[12px]">
              
            {scores.map(item => (
              <div key={item.id} className="flex py-3 bg-[#F4F2F1] shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)]">
                <div className="flex items-center justify-between h-[48px] w-[270px] flex-none ml-[12px] mr-[34px]">
                    <img src="/assets/ix_user-profile-filled.svg" className="w-[48px] h-[48px] rounded-full object-cover"/>
                    <div className="flex-1 ml-[19px]  font-semibold text-[15px] text-gray-800">  {item.nickname} </div>
                    
                    <div className="flex justify-end items-center ">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <img key={i} src={getStarIcon(item.score, i)} className="w-[20px] h-[20px]"
                          />
                          ))}
                    </div>
                </div>
                
                {/* 한줄평 내용 영역 */}
                <p className="flex items-center font-pretendard text-sm font-medium leading-[145%] tracking-[-0.014px] text-[var(--Gray-1,#2C2C2C)] [font-feature-settings:'case' on] mr-[20px] whitespace-pre-wrap">{item.comment}</p>
                
                {/* 내 글인 경우 수정/삭제 버튼 영역 */}
                {item.userid === currentUserId && (
                  <div className="ml-auto flex gap-[9px] mr-[25px] flex-shrink-0">
                    <button onClick={() => {/* TODO: edit */}}>
                      <img src="/assets/글쓰기.svg" className="w-6 h-6" alt="글쓰기" />
                    </button>
                    <button onClick={() => {/* TODO: delete */}}>
                      <img src="/assets/삭제.svg" className="w-6 h-6" alt="삭제" />
                    </button>
                  </div>
                )}
              </div>
            ))}
            
            {/* 한줄평 추가 영역 */}
            {isAdding && (
              <div className="flex py-3 shadow rounded-2xl bg-[#F4F2F1] border-2 border-[var(--sub-color-2-brown,#EAE5E2)]  w-full">
                {/* 프로필 + 닉네임 영역 + 별점선택 */}
                <div className = "flex items-center justify-between h-[48px] w-[270px] flex-none ml-[12px] mr-[34px]">
                  <img
                      src="/assets/ix_user-profile-filled.svg"
                      className="w-[48px] h-[48px] rounded-full object-cover"
                      alt="내 프로필" />
                  <div className="flex-1 ml-[19px]  font-semibold text-[15px] text-gray-800">luke</div>

                  <div className="flex justify-end items-center">
                    {[0,1,2,3,4].map(i => (
                      <img key={i} src={getStarIcon(newScore, i)} className="w-[20px] h-[20px] cursor-pointer" onClick={() => {
                        setNewScore(prev => prev === i+1 ? i + 0.5 : i + 1)
                      }} />
                    ))}
                  </div>
                </div>



                {/* 한줄평 입력 영역 */}
                <div className="flex-1 mr-[20px] min-h-[48px] flex items-center ">
                  <textarea ref={inputRef} type="text" rows={1} placeholder="한줄평을 입력해 주세요" onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    className="flex items-center w-full text-[14px]  leading-snug bg-transparent focus:outline-none overflow-hidden resize-none min-h-[20px] py-2 border-b-2 border-[var(--sub-color-2-brown,#EAE5E2)]" />
                </div>

                <button onClick={handleSend} className="h-12 w-6 mr-[15px] hover:cursor-pointer">
                  <img src="/assets/등록.svg" className="w-6 h-6" />
                </button>
              </div>
            )}
            <button onClick={() => setIsAdding(true)} className="flex justify-center items-center mx-auto w-[58px] h-[58px] p-[18px] rounded-[39.5px] bg-[#F6F3F0] hover:bg-[#E0DAD4] transition mt-[29px] mb-[100px]">
              <img src="/assets/ic_round-plus.svg" className="w-[34px] h-[34px] flex-shrink-0" />
            </button>
          </div>


          </div>
          
        </div>
      </div>
    </div>
  )
}
