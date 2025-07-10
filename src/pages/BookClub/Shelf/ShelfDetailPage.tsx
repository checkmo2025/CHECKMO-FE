import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { ShelfBook } from './ShelfHomePage'

function getRandomThemes(themes: ShelfBookTheme[], count: number) {
  const shuffled = [...themes].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

function getRandomScores(scores: ShelfBookScore[], count: number) {
  const shuffled = [...scores].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
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
  const { prefix, bookId } = useParams<{ prefix: string; bookId: string }>()
  console.log("prefix:", prefix);
  console.log("bookId:", bookId);
  // 책장 더미 데이터
  const dummyShelfBook = { id: '1124', title: '넥서스', term: 7, tag: '인문학', author: '유발 하라리', translator: '출판 장비', coverUrl: '/assets/covers/nexus.jpg', average_score: 4.3 }
  const dummyRecommandment : String = '이 책은 인류의 미래와 AI의 역할에 대한 깊은 통찰을 제공합니다. 유발 하라리의 독창적인 시각으로, 인간과 AI의 공존 가능성을 탐구하며, 독자에게 새로운 관점을 제시합니다. 이 책을 통해 우리는 기술과 인간의 관계를 재조명할 수 있습니다.'
  const dummyShelfBookThemes: ShelfBookTheme[] = [
  { id: '1124', profileUrl: '/assets/avatars/user1.png', nickname: 'alice', theme: 'AI와 인간의 공존에 대해 토론했어요.길이늘리기길이늘리기길이늘리기길이늘리기길이늘리기길이늘리기길이늘리기길이늘리기길이늘리기길이늘리기길이늘리기길이늘리리기길이늘리기길이늘리기길이늘리기길이늘리기길이늘리기' },
  { id: '1242', profileUrl: '/assets/avatars/user2.png', nickname: 'bob', theme: '역사적 관점에서 본 미래 예측 세션.' },
  { id: '3124', profileUrl: '/assets/avatars/user3.png', nickname: 'carol', theme: '비인간 지능의 윤리적 쟁점 리뷰.' },
  { id: '441',  profileUrl: '/assets/avatars/user4.png', nickname: 'dave', theme: '책 속 사례를 활용한 워크숍 진행.' },
  { id: '145',  profileUrl: '/assets/avatars/user5.png', nickname: 'eve', theme: '핵심 개념 요약과 퀴즈 세션.' },
  { id: '1246', profileUrl: '/assets/avatars/user6.png', nickname: 'frank', theme: '관련 논문 리뷰와 발표.' },
  { id: '1247', profileUrl: '/assets/avatars/user7.png', nickname: 'grace', theme: '심화 질문을 나누는 자유 토론.' },
  ]
  const dummyShelfBookScores: ShelfBookScore[] = [
  { id: '1124', profileUrl: '/assets/avatars/user1.png', nickname: 'alice', score: 4.5, comment: '정말 흥미롭고 유익했어요!' },
  { id: '1242', profileUrl: '/assets/avatars/user2.png', nickname: 'bob',   score: 3.0, comment: '조금 어려웠지만 배울 점이 많았습니다.' },
  { id: '3124', profileUrl: '/assets/avatars/user3.png', nickname: 'carol', score: 5.0, comment: '최고의 독서 경험이었어요!' },
  { id: '441',  profileUrl: '/assets/avatars/user4.png', nickname: 'dave',  score: 4.0, comment: '핵심 포인트가 잘 정리되어 있어 좋았습니다.' },
  { id: '145',  profileUrl: '/assets/avatars/user5.png', nickname: 'eve',   score: 2.5, comment: '좀 더 사례가 필요했어요.' },
  { id: '1246', profileUrl: '/assets/avatars/user6.png', nickname: 'frank', score: 3.5, comment: '전체적으로 균형 잡힌 내용입니다.' },
  { id: '1247', profileUrl: '/assets/avatars/user7.png', nickname: 'grace', score: 4.0, comment: '다양한 시각을 접할 수 있어 좋았어요.' },
  ]

  const randomThemes = getRandomThemes(dummyShelfBookThemes, 3)
  const randomScores = getRandomScores(dummyShelfBookScores, 3)

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
            <img src="/assets/icon-back.svg" className="w-[30px] h-[30px]"/>
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

          `{/* 발제 영역 */}
          <div className="mt-[64px] flex flex-col">

            <span className= "mb-[22px] text-[18px] font-[Pretendard] font-medium leading-[135%] text-black">발제</span>

            {/* 발제 리스트 */}
            <div className="flex flex-col gap-[22px] ">
              {randomThemes.map((theme) => (
                <div key={theme.id} className="flex  shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)] items-center">
                  <div className= "ml-[12px] flex gap-[19px] items-center w-[222px] flex-shrink-0 my-[10px] " > 
                    <img src={theme.profileUrl}  className="w-[48px] h-[48px] bg-gray-100 rounded-full object-cover" />
                    <div className="font-semibold text-[15px] text-gray-800 mb-1">{theme.nickname}</div>
                  </div>
                  
                  <div>
                    <div className="text-[14px] text-gray-700 leading-snug break-words my-[20px] mx-[15px]">{theme.theme}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 한줄평 3개 */}
          <div className="mt-[64px] flex-col items-center justify-between h-[300px] bg-gray-100">

          </div>  
        </div>
      </div>
    </div>
  )
}
