import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../../../components/Header'

import { useShelfHome } from '../../../hooks/Shelf/useShelfHome';
import type { ShelfHomeRequest, BookShelfInfo, } from '../../../types/Shelf/Shelfhome'

function getStarIcon(average_score: number, i: number) {
    if (average_score >= i + 1) {
      return "/assets/material-symbols_star-rounded.svg" // 꽉 찬 별
    } else if (average_score >= i + 0.5) {
      return "/assets/uim_star-half-alt.svg" // 반만 찬 별
    } else {
      return "/assets/material-symbols_star-emptyrounded.svg" // 빈 별
    }
}

export default function ShelfHomePage() {
  const { bookclubId } = useParams<{ bookclubId: string }>();
  const [ShelfList, setShelfList] = useState<BookShelfInfo[]>([]);

  const [Cursor, setCursor]  = useState<number | null | undefined>(null);
  const [Generation, setGeneration] = useState<number | undefined>(undefined);
  const [maxGeneration, setMaxGeneration] = useState<number>(0);

  const Req : ShelfHomeRequest = {
      clubId: Number(bookclubId), 
      cursorId: Cursor,
      size: 9,
      generation: Generation
  }
  const { data : result, isLoading, isError, error} =  useShelfHome(Req)

  const hasNext = result?.hasNext 
  const nextCursor = result?.nextCursor

  useEffect(() => {
    if (!result){return;}
    const Newshelf = result.bookShelfInfoList
    if (!Newshelf.length) return;

    if (Generation === undefined){
      setMaxGeneration(Newshelf[0].meetingInfo.generation)
      setGeneration( Newshelf[0].meetingInfo.generation)
      return;
    } 
    else {
      setShelfList(prev => [...prev, ...Newshelf]);
    }


  }, [result]);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNext || isLoading) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCursor(nextCursor);
        }
      }
    );
    const el = loadMoreRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasNext, isLoading, nextCursor]);

  if ( isError ) return <p className="text-red-500">Error: {error?.message}</p>;

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
                value={Generation ?? 1}
                onChange={e => {
                    setShelfList([])
                    setGeneration(Number(e.target.value))
                    setCursor(null)
                  }}
                className="
                  appearance-none
                  block w-full h-[24px]
                  px-[18px]
                  font-[Pretendard] text-[12px] text-white
                  bg-[#90D26D] rounded-2xl
                  focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white
                "
              >
               
                {Array.from({ length: maxGeneration }, (_, i) => (
                  <option className= "text-[#BBB] bg-[#EEE]" key={i} value={i + 1}>{i + 1}기</option>
                ))}
              </select>
              <img
                src="/assets/ep_arrow-up-bold.svg"
                className="pointer-events-none w-[12px] h-[12px]
                          absolute top-1/2 right-[12px] -translate-y-1/2"/>
           </div>
          </div>
              {/* 책장 리스트 */}
              <div className="grid grid-cols-3 gap-x-[12px] gap-y-[24px] overflow-y-auto h-[calc(100vh-171px)] overscroll-none "  style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
                {ShelfList.map((Shelf) => (
              <Link key={Shelf.meetingInfo.meetingId} to={`${location.pathname}/${Shelf.meetingInfo.meetingId}`} className="flex min-w-90 h-[260px] p-[20px] items-center gap-[20px] rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)] bg-[var(--White,#FFF)] hover:shadow-lg transition-shadow block">
                  {/* 왼쪽 */}
                  <div className="w-[156px] flex-shrink-0 h-full rounded-2xl overflow-hidden bg-gray-200">
                    <img
                      src={Shelf.bookInfo.imgUrl}
                      alt={Shelf.bookInfo.bookId}
                      className="w-full h-full object-cover"
                    />
                  </div>

                {/* 오른쪽: 남은 공간을 모두 차지 */}
                <div className="flex flex-col h-full flex-1 min-h-0 overflow-hidden">

                  {/* 1) 제목 */}
                  <p className="flex-1 min-w-0 flex-none h-[17px] text-[14px] font-[Pretendard] font-semibold  leading-[135%] text-[var(--Gray1,#2C2C2C)] truncate ">
                    {Shelf.bookInfo.title}
                  </p>
                  {/* 2) 저자 · 번역자 */}
                  <p className="flex-1 min-w-0 flex-none h-[17px] text-[12px] text-[#8D8D8D] font-[Pretendard] font-medium leading-[145%] truncate ">
                    {Shelf.bookInfo.author} 지음
                  </p>
                  {/* 3) term, tag  (10px 아래 여백) */}
                  <div className="flex mt-[10px] gap-2 ">
                    <p className="flex-shrink-0 h-6 w-[54px] text-[12px] rounded-full bg-[#90D26D] flex items-center justify-center text-[12px]  text-white">
                      {Shelf.meetingInfo.generation}기
                    </p>
                    <p className="flex-shrink-0 h-6 w-[54px] text-[12px] rounded-full bg-[#90D26D] flex items-center justify-center text-[12px]  text-white">
                      {Shelf.meetingInfo.tag}
                    </p>
                  </div>

                {/* 링크 3개 */}
                <div className="mt-[24px] flex flex-col">
                  <Link to={`${location.pathname}/${Shelf.meetingInfo.meetingId}/theme`} className="block" onClick={(e) => { e.stopPropagation();}}>
                    <div className=" w-[128px] h-[24px] border-b-[1px] border-[var(--sub-color-2-brown,#EAE5E2)] flex items-center justify-between">
                      <span className="text-[12px] font-[Pretendard] font-medium leading-[145%] text-[#2C2C2C] items-center">
                        발제</span>
                      <img src="/assets/바로가기.svg" className="w-[24px] h-[24px]"/>
                    </div>
                  </Link>
                  <div  className="block">
                    <Link to={`${location.pathname}/${Shelf.meetingInfo.meetingId}/score`} className="block" onClick={(e) => { e.stopPropagation();}}>
                      <div className=" w-[128px] h-[24px] border-b-[1px] border-[var(--sub-color-2-brown,#EAE5E2)] flex items-center justify-between">
                      <span className="text-[12px] font-[Pretendard] font-medium leading-[145%] text-[#2C2C2C] items-center">
                        한줄평</span>
                      <img src="/assets/바로가기.svg" className="w-[24px] h-[24px]"/>
                    </div>
                    </Link>
                  </div>
                  <Link to={`${location.pathname}/${Shelf.meetingInfo.meetingId}/afterread`} className="block">
                    <div className=" w-[128px] h-[24px] border-b-[1px] border-[var(--sub-color-2-brown,#EAE5E2)] flex items-center justify-between">
                      <span className="text-[12px] font-[Pretendard] font-medium leading-[145%] text-[#2C2C2C] items-center">
                        독서 후 활동</span>
                      <img src="/assets/바로가기.svg" className="w-[24px] h-[24px]"/>
                    </div>
                  </Link>
                </div>
                  {/* 7) 평점별 별 아이콘 */}
                  <div className="mt-[20px] flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const src = getStarIcon(Shelf.meetingInfo.averageRate, i);
                      return <img key={i} src={src} alt="star" className="w-[24px] h-[24px]" />;
                    })}
                  </div>
                </div>

            </Link>
            ))}
            {isLoading && <div className = "font-[Pretendard] font-semibold text-[16px] text-[#8D8D8D]">추가 불러오는 중…</div>}
            <div ref={loadMoreRef} style={{ height: 1 }} />
            <div className ="h-20"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

