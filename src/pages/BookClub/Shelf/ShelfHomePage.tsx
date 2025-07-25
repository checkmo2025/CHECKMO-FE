import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../../../components/Header'
export interface ShelfBook {
  id: string
  title: string
  term: number
  tag: string
  author: string
  translator?: string
  coverUrl?: string
  average_score: number
}

export default function ShelfHomePage() {
  const { BookClubID } = useParams<{ id: string }>();
  console.log(BookClubID)
  const [maxTerm, setMaxTerm] = useState(7)  // 초깃값 7기
  const [Term,setTerm] = useState(0) 
  const [shelfBooks, setShelfBooks] = useState<ShelfBook[]>([])

  // 책장 더미 데이터
  useEffect(() => {
   
  const  base: ShelfBook[] = [
  { id: '1124', title: '넥서스', term: 7, tag: '인문학', author: '유발 하라리', coverUrl: '/assets/covers/nexus.jpg', average_score: 4.3 },
  { id: '1242', title: '사피엔스', term: 5, tag: '역사', author: '유발 하라리', translator: '홍길동', coverUrl: '/assets/covers/sapiens.jpg', average_score: 3.1 },
  { id: '3124', title: '호모 데우스', term: 6, tag: '미래학', author: '유발 하라리', translator: '김철수', coverUrl: '/assets/covers/homo-deus.jpg', average_score: 4.8 },
  { id: '441', title: '21세기를 위한 21가지 제언1111111111', term: 7, tag: '사회과학', author: '유발 하라리', coverUrl: '/assets/covers/21-lessons.jpg', average_score: 4.5 },
  { id: '145', title: '총, 균, 쇠', term: 4, tag: '역사', author: '재러드 다이아몬드', translator: '이재성', coverUrl: '/assets/covers/guns-germs-steel.jpg', average_score: 4.0 },
  { id: '1246', title: '블러드라인', term: 3, tag: '가족사', author: '타워 바제스', translator: '박지연', coverUrl: '/assets/covers/bloodline.jpg', average_score: 3.7 },
  { id: '1247', title: '파친코', term: 2, tag: '소설', author: '이민진', coverUrl: '/assets/covers/pachinko.jpg', average_score: 4.2 },
  { id: '15128', title: '아웃라이어', term: 1, tag: '경영', author: '말콤 글래드웰', translator: '최형준', coverUrl: '/assets/covers/outliers.jpg', average_score: 3.9 },]
    let items = Array.from({ length: 5 }).flatMap(() => base)

    // 전체(0) 이면 그대로, 아니면 term === maxTerm 인 애들만 필터
    if (Term > 0) {
      items = items.filter(book => book.term === Term)
    }

    setShelfBooks(items)
    console.log('책장 데이터:', shelfBooks)
  }, [Term])
  


  function getStarIcon(average_score: number, i: number) {
    if (average_score >= i + 1) {
      return "/assets/material-symbols_star-rounded.svg" // 꽉 찬 별
    } else if (average_score >= i + 0.5) {
      return "/assets/uim_star-half-alt.svg" // 반만 찬 별
    } else {
      return "/assets/material-symbols_star-emptyrounded.svg" // 빈 별
    }
  }

  return (
    <div className="flex h-screen">
      {/* 메인 컨텐츠 자리 */}
      <div className="absolute left-[302px] right-[34px]">
        {/* 헤더 자리 */}
        <Header pageTitle={'책장'} userProfile={{
          username: 'Luke',
          bio: '아 피곤하다.'
        }} 
        notifications={[]}
        customClassName="mt-[30px]"
        />
  
        <div className="mt-[54px] flex flex-col gap-[18px]">
          {/* 타이틀과 기수 */}
          <div className="flex items-center justify-between w-full h-[24px]">
            <h1 className="font-[Pretendard] font-medium text-[18px] leading-[135%]">독서 목록</h1>

            <div className="relative w-[72px] mr-[24px]">
              <select
                value={Term}
                onChange={e => setTerm(Number(e.target.value))}
                className="
                  appearance-none
                  block w-full h-[24px]
                  px-[18px]
                  font-[Pretendard] text-[12px] text-white
                  bg-[#90D26D] rounded-2xl
                  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white
                "
              >
                <option value={0} className= "text-[#BBB] bg-[#EEE]" >전체</option>
                {Array.from({ length: maxTerm }, (_, i) => (
                  <option className= "text-[#BBB] bg-[#EEE]" key={i} value={i + 1}>{i + 1}기</option>
                ))}
              </select>
              <img
                src="/assets/ep_arrow-up-bold.svg"
                alt=""
                className="pointer-events-none w-[12px] h-[12px]
                          absolute top-1/2 right-[12px] -translate-y-1/2"
              />
           </div>
          </div>
          
          {/* 책장 리스트 */}
          <div className="grid grid-cols-3 gap-x-[12px] gap-y-[24px] overflow-y-auto h-[calc(100vh-171px)] overscroll-none "  style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {shelfBooks.map((ShelfBook, idx) => (
          <Link key={idx}  to={`${location.pathname}/${ShelfBook.id}`}  className="flex min-w-90 h-[260px] p-[20px] items-center gap-[20px] rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)] bg-[var(--White,#FFF)] hover:shadow-lg transition-shadow block">

  
              {/* 왼쪽 */}
              <div className="w-[156px] flex-shrink-0 h-full rounded-2xl overflow-hidden bg-gray-200">
                <img
                  src={ShelfBook.coverUrl}
                  alt={ShelfBook  .title}
                  className="w-full h-full object-cover"
                />
              </div>

            {/* 오른쪽: 남은 공간을 모두 차지 */}
            <div className="flex flex-col h-full flex-1 min-h-0 overflow-hidden">

              {/* 1) 제목 */}
              <p className="flex-1 min-w-0 flex-none h-[17px] text-[14px] font-[Pretendard] font-semibold  leading-[135%] text-[var(--Gray1,#2C2C2C)] truncate ">
                {ShelfBook.title}
              </p>
              {/* 2) 저자 · 번역자 */}
              <p className="flex-1 min-w-0 flex-none h-[17px] text-[12px] text-[#8D8D8D] font-[Pretendard] font-medium leading-[145%] truncate ">
                {ShelfBook.author} 지음
                {ShelfBook.translator && ` | ${ShelfBook.translator} 옮김`}
              </p>
              {/* 3) term, tag  (10px 아래 여백) */}
              <div className="flex mt-[10px] gap-2 ">
                <p className="flex-shrink-0 h-6 w-[54px] text-[12px] rounded-full bg-[#90D26D] flex items-center justify-center text-[12px]  text-white">
                  {ShelfBook.term}기
                </p>
                <p className="flex-shrink-0 h-6 w-[54px] text-[12px] rounded-full bg-[#90D26D] flex items-center justify-center text-[12px]  text-white">
                  {ShelfBook.tag}
                </p>
              </div>

            {/* 4–6) 링크 3개 (20px 아래 여백, 링크별 색상 예시) */}
            <div className="mt-[24px] flex flex-col">
          <Link to={`${location.pathname}/${ShelfBook.id}/theme`}className="block">
            <div className=" w-[128px] h-[24px] border-b-[1px] border-[var(--sub-color-2-brown,#EAE5E2)] flex items-center justify-between">
              <span className="text-[12px] font-[Pretendard] font-medium leading-[145%] text-[#2C2C2C] items-center">
                발제</span>
              <img src="/assets/바로가기.svg" className="w-[24px] h-[24px]"/>
            </div>
          </Link>
          <Link to={`${location.pathname}/${ShelfBook.id}/score`}className="block">
            <div className=" w-[128px] h-[24px] border-b-[1px] border-[var(--sub-color-2-brown,#EAE5E2)] flex items-center justify-between">
              <span className="text-[12px] font-[Pretendard] font-medium leading-[145%] text-[#2C2C2C] items-center">
                한줄평</span>
              <img src="/assets/바로가기.svg" className="w-[24px] h-[24px]"/>
            </div>
          </Link>
          <Link to={`${location.pathname}/${ShelfBook.id}/afterread`}className="block">
            <div className=" w-[128px] h-[24px] border-b-[1px] border-[var(--sub-color-2-brown,#EAE5E2)] flex items-center justify-between">
              <span className="text-[12px] font-[Pretendard] font-medium leading-[145%] text-[#2C2C2C] items-center">
                독서 후 활동</span>
              <img src="/assets/바로가기.svg" className="w-[24px] h-[24px]"/>
            </div>
          </Link>


            </div>

            {/* 7) 평점별 별 아이콘 (24px, 24px 아래 여백) */}
            <div className="mt-[20px] flex items-center">
              {Array.from({ length: 5 }).map((_, i) => {
                const src = getStarIcon(ShelfBook.average_score, i);
                return <img key={i} src={src} alt="star" className="w-[24px] h-[24px]" />;
              })}
            </div>
          </div>

      </Link>
      ))}
          </div>
        </div>
      </div>
    </div>
  )
}

