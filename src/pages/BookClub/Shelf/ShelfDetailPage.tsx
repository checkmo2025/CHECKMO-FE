import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ShelfBook } from './ShelfHomePage'
import { useState } from 'react'


function getRandomThemes(themes: ShelfBookTheme[], count: number) {
  const shuffled = [...themes].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function getRandomScores(scores: ShelfBookScore[], count: number) {
  const shuffled = [...scores].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
export function getStarIcon(average_score: number, i: number) {
    if (average_score >= i + 1) {
      return "/assets/material-symbols_star-rounded.svg" // 꽉 찬 별
    } else if (average_score >= i + 0.5) {
      return "/assets/uim_star-half-alt.svg" // 반만 찬 별
    } else {
      return "/assets/material-symbols_star-emptyrounded.svg" // 빈 별
    }
  }

export interface ShelfBookTheme {
  id: string           
  profileUrl: string   
  nickname: string     
  theme: string      
}

export interface ShelfBookScore {
  id: string 
  profileUrl: string          
  nickname: string    
  score: number       
  comment: string    
}
export default function ShelfDetailPage() {
  const navigate = useNavigate();
  const { BookClubID, bookId } = useParams<{ id: string; bookId: string }>()
  console.log(BookClubID, bookId);
  // 책장 더미 데이터
  const dummyShelfBook = { id: '1124', title: '넥서스', term: 7, tag: '인문학', author: '유발 하라리', translator: '출판 장비', coverUrl: '/assets/covers/nexus.jpg', average_score: 4.3 }
  const dummyRecommandment : String = '이 책은 인류의 미래와 AI의 역할에 대한 깊은 통찰을 제공합니다. 유발 하라리의 독창적인 시각으로, 인간과 AI의 공존 가능성을 탐구하며, 독자에게 새로운 관점을 제시합니다. 이 책을 통해 우리는 기술과 인간의 관계를 재조명할 수 있습니다.이 책은 인류의 미래와 AI의 역할에 대한 깊은 통찰을 제공합니다. 유발 하라리의 독창적인 시각으로, 인간과 AI의 공존 가능성을 탐구하며, 독자에게 새로운 관점을 제시합니다. 이 책을 통해 우리는 기술과 인간의 관계를 재조명할 수 있습니다'
  const dummyShelfBookThemes: ShelfBookTheme[] = [
  { id: '1124', profileUrl: '/assets/avatars/user1.png', nickname: 'alice', theme: 'AI와 인간의 공존에 대해 토론했어요.길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 ' },
  { id: '1242', profileUrl: '/assets/avatars/user2.png', nickname: 'bob', theme: '역사적 관점에서 본 미래 예측 세션길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 .' },
  { id: '3124', profileUrl: '/assets/avatars/user3.png', nickname: 'carol', theme: '비인간 지능의 윤리적 쟁점 리뷰.길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 ' },
  { id: '441',  profileUrl: '/assets/avatars/user4.png', nickname: 'dave', theme: '책 속 사례를 활용한 워크숍 진행길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 .' },
  { id: '145',  profileUrl: '/assets/avatars/user5.png', nickname: 'eve', theme: '핵심 개념 요약과 퀴즈 세션.' },
  { id: '1246', profileUrl: '/assets/avatars/user6.png', nickname: 'frank', theme: '관련 논문 리뷰와 발표.' },
  { id: '1247', profileUrl: '/assets/avatars/user7.png', nickname: 'grace', theme: '심화 질문을 나누는 자유 토론.' },
  ]
  const dummyShelfBookScores: ShelfBookScore[] = [
  { id: '1124', profileUrl: '/assets/avatars/user1.png', nickname: 'alice', score: 4.5, comment: '정말 흥미롭고 유익했어요!' },
  { id: '1242', profileUrl: '/assets/avatars/user2.png', nickname: 'bob',   score: 3.0, comment: '조금 어려웠지만 배울 점이 많았습니다.길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 ' },
  { id: '3124', profileUrl: '/assets/avatars/user3.png', nickname: 'carol', score: 5.0, comment: '최고의 독서 경험이었어요!길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 ' },
  { id: '441',  profileUrl: '/assets/avatars/user4.png', nickname: 'dave',  score: 4.0, comment: '핵심 포인트가 잘 정리되어 있어 좋았습니다.길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 길이늘리기 ' },
  { id: '145',  profileUrl: '/assets/avatars/user5.png', nickname: 'eve',   score: 2.5, comment: '좀 더 사례가 필요했어요.' },
  { id: '1246', profileUrl: '/assets/avatars/user6.png', nickname: 'frank', score: 3.5, comment: '전체적으로 균형 잡힌 내용입니다.' },
  { id: '1247', profileUrl: '/assets/avatars/user7.png', nickname: 'grace', score: 4.0, comment: '다양한 시각을 접할 수 있어 좋았어요.' },
  ]

  const [randomThemes] = useState(() => getRandomThemes(dummyShelfBookThemes, 3))
  const [randomScores] = useState(() => getRandomScores(dummyShelfBookScores, 3))


  // 나중에 리팩토링해서 별점관리 따로 할 것!
  const [newRating, setNewRating] = useState<number>(0)

  const inputRef = React.useRef<HTMLInputElement>(null);
  
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
      
      function handleSend() {
          // 리팩토링 후 API연결할 것 
      }
    

  return (
    <div className="flex h-screen">
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


        {/* 컨텐츠 자리 */}
         <div className="overflow-y-auto h-[calc(100vh-117px)] overscroll-none " style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {/*책 추천*/}
          <div className="flex h-[300px] gap-[30px]">

            {/* 좌측 */}
            <div className="w-[200px] h-full ">
              <img src={dummyShelfBook.coverUrl} className="w-full h-full object-cover" />
            </div>

            {/* 우측: */}
            <div className="w-[calc(100%-230px)] h-[300px] flex flex-col  ">
              <h1 className="font-[Pretendard] font-semibold text-[20px] leading-[135%] text-black">{dummyShelfBook.title}</h1>

              <h2 className=" mb-[40px] font-[Pretendard] font-medium text-[12px] leading-[145%] text-[var(--Gray4,#8D8D8D)]">{dummyShelfBook.author} | {dummyShelfBook.translator}</h2>

              {/* 남은 공간 전체 */}
              <p className="font-[Pretendard] font-normal h-full text-[14px] leading-[145%] tracking-[-0.012px] text-[var(--Gray1,#2C2C2C)]">
                {dummyRecommandment}
              </p>

              <div className="mt-[10px] flex gap-[8px] ">
                    <span className="px-[20px] py-[2px] text-[12px] rounded-full bg-[#90D26D] text-white">
                      {dummyShelfBook.term}기
                    </span>
                    <span className="px-[20px] py-[2px] text-[12px] rounded-full bg-[#90D26D] text-white">
                      {dummyShelfBook.tag}
                    </span>
              </div>
            </div>
          </div>

          {/* 발제 영역 */}
          <div className="mt-[64px] flex flex-col">

            <span className= "mb-[22px] text-[18px] font-[Pretendard] font-medium leading-[135%] text-black">발제</span>

            {/* 발제 리스트 */}
            <div className="flex flex-col gap-[22px] ">
              {randomThemes.map((theme) => (
                <div key={theme.id} className="py-3 flex shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)]">
                  <div className= "flex h-[48px] ml-[12px] gap-[19px] items-center w-[222px] flex-shrink-0" >
                    <img src= "/assets/ix_user-profile-filled.svg" className="w-[48px] h-[48px] rounded-full object-cover" />
                    <div className="font-semibold text-[15px] text-gray-800">{theme.nickname}</div>
                  </div>
                  
                  <div className="flex items-center font-pretendard text-sm font-medium leading-[145%] tracking-[-0.014px] text-[var(--Gray-1,#2C2C2C)] [font-feature-settings:'case' on] mr-[20px] whitespace-pre-wrap">{theme.theme}</div>

                </div>
              ))}
            </div>

            <div className="mt-[11px] mr-[8px] flex justify-end">
              <button onClick={() => navigate(`${location.pathname}/theme`)} className="text-[14px] font-medium text-[var(--button-brown,#969696) leading-[145%] hover:cursor-pointer">
                +더보기
              </button>
            </div>


          </div>

          {/* 한줄평*/}
          <div className="mt-[64px] flex flex-col mb-[73px]">
            <span className="mb-[22px] text-[18px] font-[Pretendard] font-medium leading-[135%] text-black">한줄평</span>

            {/* 한줄평 리스트 */}
            <div className="flex flex-col gap-[22px]">
              {randomScores.map((score) => (
                <div key={score.id}  className="flex py-3 shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)]">

                      <div className="flex items-center justify-between h-[48px] w-[270px] flex-none] ml-[12px] mr-[34px]">

                        <img src="/assets/ix_user-profile-filled.svg" className="w-[48px] h-[48px] rounded-full object-cover"/>

                        <div className="flex-1 ml-[19px]  font-semibold text-[15px] text-gray-800">  {score.nickname} </div>

                        <div className="flex justify-end items-center ">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <img key={i} src={getStarIcon(score.score, i)} className="w-[20px] h-[20px]"
                          />
                          ))}
                      </div>
                      

                    </div>

                    <div className="flex-1 flex items-center font-pretendard text-sm font-medium leading-[145%] tracking-[-0.014px]  break-words mr-[20px] whitespace-pre-wrap">
                      {score.comment}
                    </div>

                </div>
              ))}
            </div>
            
            <div className="mt-[22px] flex shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)] py-[8px]">
              <div className = "flex items-center justify-between h-[48px] w-[270px] flex-none ml-[12px] mr-[34px]">
                {/* 1) 프로필 + 닉네임 */}
                    <img
                    src="/assets/ix_user-profile-filled.svg"
                    className="w-[48px] h-[48px] rounded-full object-cover"
                    alt="내 프로필"
                  />
                  <div className="flex-1 ml-[19px]  font-semibold text-[15px] text-gray-800">
                    luke
                  </div>

                {/* 2) 별점 영역 클릭 1개 / 한번 더 클릭 반개*/}
                <div className="flex justify-end items-center">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      src={getStarIcon(newRating, i)}
                      className="w-[20px] h-[20px] cursor-pointer"
                      onClick={() => {
                        setNewRating(prev => prev === i+1 ? i + 0.5 : i + 1)
                      }}
                    />
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

            {/* +더보기 버튼 */}
             <div className="mt-[11px] mr-[8px] flex justify-end">
              <button onClick={() => navigate(`${location.pathname}/score`)} className="text-[14px] font-medium text-[var(--button-brown,#969696) leading-[145%] hover:cursor-pointer">
                +더보기
              </button>
            </div>




          </div>

        </div>
      </div>
    </div>
  )
}
