import { useNavigate, useParams } from 'react-router-dom'
import React, { useState } from 'react';
export interface ShelfBookTheme {
  id: string   
  userid : string        
  profileUrl: string   
  nickname: string     
  theme: string      
}



export default function ThemeDetailPage() {
  const navigate = useNavigate();

  const { prefix, bookId } = useParams<{ prefix: string; bookId: string }>()


  // 발제 더미 데이터
  const dummyShelfBook = { id: '1124', title: '넥서스', term: 7, tag: '인문학', author: '유발 하라리', translator: '출판 장비', coverUrl: '/assets/covers/nexus.jpg', average_score: 4.3 }
  const [dummyShelfBookThemes, setThemes] = useState<ShelfBookTheme[]>([
    { id: '1', userid: '1001', profileUrl: '/assets/avatars/user1.png', nickname: 'alice', theme: 'AI와 인간의 공존에 대해 심도 있게 토론했습니다.' },
    { id: '2', userid: '1002', profileUrl: '/assets/avatars/user2.png', nickname: 'bob', theme: '역사적 관점에서 본 미래 예측 세션.' },
    { id: '3', userid: '1003', profileUrl: '/assets/avatars/user3.png', nickname: 'carol', theme: '비인간 지능의 윤리적 쟁점에 대해 30분간 리뷰했습니다. 주요 키워드는 책임, 자율성, 투명성이었습니다.' },
    { id: '4', userid: '1004', profileUrl: '/assets/avatars/user4.png', nickname: 'luke', theme: '책 속 사례를 활용한 워크숍 진행.' },
  ])

  const [isAdding, setIsAdding] = useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null);
  const myId = '1004' //임시로 내 ID 설정

  function handleSend() {

  const newTheme = inputRef.current?.value.trim();
    if (!newTheme) {
      alert('발제를 입력해주세요');
      return;
    }
    setIsAdding(false); // 발제 추가 모드 종료
    dummyShelfBookThemes.push({
      id: '555',
      userid: '1004', 
      profileUrl: '/assets/avatars/user1.png', 
      nickname: 'luke', 
      theme: newTheme,
      });

    console.log("발제 추가 후:", dummyShelfBookThemes);
  }

  return (
    <div className="flex h-screen">
      {/* 사이드바 자리*/}
      <div className="w-[264px] bg-[#F1F8EF] flex flex-col items-center justify-center gap-[45px] opacity-100">
          <span>사이드바 자리</span>
      </div>
      {/* 메인 */}
      <div className="absolute top-[30px] left-[305px] right-[34px] ">

        {/* 상단 뒤로가기 영역 */}
        <div onClick={() => navigate(-1)} className="flex items-center h-[38px] gap-[3px] cursor-pointer mb-[44px]">
          {/* 1) 왼쪽 아이콘 영역 (30px) */}
          <div className="w-[30px] h-full flex items-center justify-center">
            <img src="/assets/material-symbols_arrow-back-ios.svg" className="w-[30px] h-[30px]"/>
          </div>

          {/* 2) 책 이름 */}
          <span className="font-[Pretendard] font-bold text-[28px] leading-[135%]">
            {dummyShelfBook.title}
          </span>
        </div>

          {/* 발제 영역 */}
          <div className="mt-[64px] flex flex-col">

            <span className= "mb-[22px] text-[18px] font-[Pretendard] font-medium leading-[135%] text-black">발제</span>

            {/* 스크롤 되는 영역 */}
            <div className= "flex flex-col overflow-y-auto h-[calc(100vh-179px)] overscroll-none " style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>

              {/* 발제 리스트 */}
              <div className="flex flex-col gap-[12px]">
                {dummyShelfBookThemes.map(theme => (
                  <div key={theme.id} className="flex bg-[#F4F2F1] shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)] items-center">
                    <div className= "ml-[12px] flex gap-[19px] items-center w-[222px] flex-shrink-0 my-[10px] " >
                      <img src= "/assets/ix_user-profile-filled.svg" className="w-[48px] h-[48px] rounded-full object-cover" />
                      <div className="font-semibold text-[15px] text-gray-800 mb-1">{theme.nickname}</div>
                    </div>
                    
                    {/* 발제 내용 */}
                    <p className="font-pretendard text-sm font-medium leading-[145%] tracking-[-0.014px] text-[var(--Gray-1,#2C2C2C)] [font-feature-settings:'case' on] my-[20px] mr-[20px]">{theme.theme}</p>
                    
                    {/* 내 글인 경우 글쓰기/삭제 버튼 */}
                      {theme.userid === myId && (
                        <div className="ml-auto flex gap-[9px] mr-[25px]">
                          <button onClick={() => {/* TODO: edit action */}}>
                            <img src="/assets/글쓰기.svg" className="w-6 h-6" alt="글쓰기" />
                          </button>
                          <button onClick={() => {/* TODO: delete action */}}>
                            <img src="/assets/삭제.svg" className="w-6 h-6" alt="삭제" />
                          </button>
                        </div>
                      )}
                  </div>
                  ))}
              </div>    

              {/* 발제 추가 영역 */}
              {isAdding && (
              <div className="mt-[11px] flex shadow rounded-2xl bg-[#F4F2F1] border-2 border-[var(--sub-color-2-brown,#EAE5E2)] items-center w-full">
                {/* 1) 프로필 + 닉네임 */}
                <div className="ml-[12px] flex gap-[19px] items-center w-[222px] flex-shrink-0 my-[10px]">
                  <img src="/assets/ix_user-profile-filled.svg" className="w-[48px] h-[48px] rounded-full object-cover" alt="내 프로필" />
                  <div className="font-semibold text-[15px] text-gray-800 mb-1">luke</div>
                </div>
                {/* 2) 입력창 */}
                <div className="flex-1 border-b-2 border-[var(--sub-color-2-brown,#EAE5E2)] mr-[20px]">
                  <input  type="text" placeholder="발제를 입력해 주세요" ref={inputRef} className="w-full text-[14px] text-gray-700 leading-snug my-[10px] bg-transparent focus:outline-none"
                  />
                </div>
                {/* 3) 전송 버튼 */}
                <button onClick={handleSend} className="mr-[15px] hover:cursor-pointer">
                  <img src="/assets/등록.svg" className="w-[24px] h-[24px]" alt="전송" />
                </button>
              </div>
            )}


              {/* 발제 추가 버튼 */}
                <button onClick={() => setIsAdding(true)} className="flex justify-center items-center mx-auto w-[58px] h-[58px] p-[18px] rounded-[39.5px] bg-[#F6F3F0] hover:bg-[#E0DAD4] transition mt-[29px] mb-[100px]">
                  <img src="/assets/ic_round-plus.svg" className="w-[34px] h-[34px]" />
                </button>          
            </div>
          </div>


      </div>
    </div>
  )
}
