import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShelfDetail } from '../../../hooks/Shelf/useShelfDetail';
import { useReviewList } from '../../../hooks/Shelf/useReviewList'
import { useReviewCreate } from '../../../hooks/Shelf/useReviewCreate'
import type { ShelfDetailRequest, TopicItem } from '../../../types/Shelf/Shelfdetail'
import type { ReviewListRequest, ReviewItem, ReviewCreateRequest, ReviewCreateResponse } from '../../../types/Shelf/Shelfreview'
import LongtermChatInput from '../../../components/LongtermChatInput'
import { getStarIcon } from './getStarIcon'

export default function ShelfDetailPage() {
  const navigate = useNavigate();
  const { ShelfmeetingId } = useParams<{ ShelfmeetingId: string }>()
  const [Cursor, setCursor]  = useState<number | null | undefined>(null)
  const [ReviewList, setReviewList] = useState<ReviewItem[]>([])
  const [newRating, setNewRating] = useState<number>(0)
  const [Mynickname, setMynickname] = useState<string>('')
  const [MyUrl, setUrl] = useState<string>('')

  const Req: ShelfDetailRequest ={
    meetingId : Number(ShelfmeetingId),
  }
  const ReviewReq : ReviewListRequest = {
    meetingId: Number(ShelfmeetingId),
    cursorId: Cursor,
    size: 5,
  }

  const { data : ShelfDetail, isLoading, isError, error} =  useShelfDetail(Req)
  const { data : ReviewResult, isLoading : ReviewisLoading, isError : ReviewisError, error : Reviewerror} =  useReviewList(ReviewReq)


  const topics = ShelfDetail?.topicList.topics
  const hasNext = ReviewResult?.hasNext 
  const nextCursor = ReviewResult?.nextCursor

  useEffect(() => {
    setMynickname('oz')
    setUrl('/assets/ix_user-profile-filled.svg')
  }, []) //단 한 번만 실행

  useEffect(() => {
    if (!ReviewResult){return;}
    setReviewList(prev => [...prev, ...ReviewResult.bookReviewList]);
    console.log(ReviewResult)
  }, [ReviewResult]);

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

  const createReviewMut = useReviewCreate(ReviewReq);
  function handleSend(description: string) {
    if (newRating <= 1) { alert('별점은 1보다 커야 합니다.');  return;} 
    else if (!description.trim()) { alert('한줄평을 입력해주세요.'); return;}

    const payload : ReviewCreateRequest = { description: description, rate: newRating}
    createReviewMut.mutate(payload);
  }

  if (isLoading) return <div className = "font-[Pretendard] font-semibold text-[16px] text-[#8D8D8D]">로딩 중…</div>
  if (!ShelfDetail || isError || ReviewisError) return <p className="text-red-500">Error: {error?.message} OR {Reviewerror?.message}</p>;
  return (
    <div className="flex h-screen">
      {/* 메인 */}
      <div className="absolute top-[30px] left-[305px] right-[34px] ">
        {/* 상단 뒤로가기 영역 */}
        <div onClick={() => navigate(-1)} className="flex items-center h-[38px] gap-[3px] cursor-pointer mb-[30px]">
          {/* 1) 왼쪽 아이콘 영역 (30px) */}
          <div className="w-[30px] h-full flex items-center justify-center">
            <img src="/assets/material-symbols_arrow-back-ios.svg" className="w-[30px] h-[30px]"/>
          </div>

          {/* 2) 책 이름 */}
          <span className="font-[Pretendard] font-bold text-[28px] leading-[135%]">
            {ShelfDetail?.bookDetailInfo.title}
          </span>
        </div>
        {/* 메인 */}
         <div className="pt-[10px] overflow-y-auto h-[calc(100vh-117px)] overscroll-none " style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {/*책 추천*/}
          <div className="flex h-[300px] gap-[30px]">
            <div className="w-[200px] h-full ">
              <img  src={ShelfDetail?.bookDetailInfo.imgUrl}
              className="w-full h-full object-cover" />
            </div>
            <div className="w-[calc(100%-230px)] h-[300px] flex flex-col  ">
              <h1 className="font-[Pretendard] font-semibold text-[20px] leading-[135%] text-black">{ShelfDetail?.bookDetailInfo.title}</h1>

              <h2 className=" mb-[40px] font-[Pretendard] font-medium text-[12px] leading-[145%] text-[var(--Gray4,#8D8D8D)]">{ShelfDetail?.bookDetailInfo.author} | {ShelfDetail?.bookDetailInfo.publisher}</h2>

              <p className="font-[Pretendard] font-normal h-full text-[14px] leading-[145%] tracking-[-0.012px] text-[var(--Gray1,#2C2C2C)]">
                {ShelfDetail?.bookDetailInfo.description}
              </p>

              <div className="mt-[10px] flex gap-[8px] ">
                    <span className="px-[20px] py-[2px] text-[12px] rounded-full bg-[#90D26D] text-white">
                      {ShelfDetail?.meetingInfo.generation}기
                    </span>
                    <span className="px-[20px] py-[2px] text-[12px] rounded-full bg-[#90D26D] text-white">
                      {ShelfDetail?.meetingInfo.tag}
                    </span>
              </div>
            </div>
          </div>
          {/* 발제 영역 */}
          <div className="mt-[64px] flex flex-col">
            <span className= "mb-[22px] text-[18px] font-[Pretendard] font-medium leading-[135%] text-black">발제</span>
            {/* 발제 리스트 */}
            <div className="flex flex-col gap-[22px] ">
              {topics!.map((topic : TopicItem) => (
                <div key={topic.topicId} className="py-2 flex shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)]">
                  <div className= "flex h-[48px] ml-[12px] gap-[19px] items-center w-[222px] flex-shrink-0" >
                    <img src= {topic.authorInfo.profileImageUrl || '/assets/ix_user-profile-filled.svg'} className="w-[48px] h-[48px] rounded-full object-cover" />
                    <div className="font-semibold text-[15px] text-gray-800">{topic.authorInfo.nickname}</div>
                  </div>
                  
                  <div className="flex items-center font-pretendard text-sm font-medium leading-[145%] tracking-[-0.014px] text-[var(--Gray-1,#2C2C2C)] [font-feature-settings:'case' on] mr-[20px] whitespace-pre-wrap">{topic.content}</div>

                </div>
              ))}
            </div>
            <div className="mt-[11px] mr-2 flex justify-end">
              <button onClick={() => navigate(`${location.pathname}/theme`)} className="text-[14px] font-medium text-[var(--button-brown,#969696) leading-[145%] hover:cursor-pointer">
                +더보기
              </button>
            </div>
          </div>
          {/* 한줄평*/}
          <div className="mt-[64px] flex flex-col mb-[73px]">

            <span className="mb-[22px] text-[18px] font-[Pretendard] font-medium leading-[135%] text-black">한줄평</span>
            {/* 등록 */}
            <div className="flex mt-[22px] py-2 shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)] w-full mb-[22px]">
              <div className = "flex items-center justify-between h-[48px] w-[270px] flex-none ml-[12px] mr-[34px]">
                <img src={MyUrl} className="w-[48px] h-[48px] rounded-full object-cover"/>
                <div className="flex-1 ml-[19px]  font-semibold text-[15px] text-gray-800"> {Mynickname}</div>
                  <div className="flex justify-end items-center">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <img
                        key={i} className="w-[20px] h-[20px] cursor-pointer"
                        src={getStarIcon(newRating, i)}
                        onClick={() => {
                          setNewRating(prev => prev === i+1 ? i + 0.5 : i + 1)
                        }}
                      />
                    ))}
                  </div>  
                </div>
               <LongtermChatInput onSend={handleSend} placeholder = "한줄평을 입력해 주세요" buttonIconSrc="/assets/등록.svg" className = ''/>
            </div>

            {/* 리스트 */}
            <div className="flex flex-col gap-[22px]">
              {ReviewList.map((Review : ReviewItem) => (
                <div key={Review.bookReviewId}  className="flex py-2 shadow rounded-2xl border-2 border-[var(--sub-color-2-brown,#EAE5E2)]">
                      <div className="flex items-center justify-between h-[48px] w-[270px] flex-none] ml-[12px] mr-[34px]">
                        <img src={Review.authorInfo.profileImageUrl || '/assets/ix_user-profile-filled.svg'} className="w-[48px] h-[48px] rounded-full object-cover"/>
                        <div className="flex-1 ml-[19px]  font-semibold text-[15px] text-gray-800">{Review.authorInfo.nickname}</div>
                        <div className="flex justify-end items-center ">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <img key={i} src={getStarIcon(Review.rate, i)} className="w-[20px] h-[20px]"/>
                          ))}
                      </div>
                  
                    </div>
                    <div className="flex-1 flex items-center font-pretendard text-sm font-medium leading-[145%] tracking-[-0.014px]  break-words mr-[20px] whitespace-pre-wrap">
                      {Review.description}
                    </div>
                    {Review.authorInfo.nickname === Mynickname && (
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
              {ReviewisLoading && <div className = "font-[Pretendard] font-semibold text-[16px] text-[#8D8D8D]">추가 불러오는 중…</div>}
              <div ref={loadMoreRef} style={{ height: 1 }} />
              <div className ="h-20"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
