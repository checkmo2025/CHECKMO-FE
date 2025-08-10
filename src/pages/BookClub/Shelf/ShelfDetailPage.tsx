import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useShelfDetail } from '../../../hooks/Shelf/useShelfDetail'

import type { ShelfDetailRequest, TopicItem } from '../../../types/Shelf/Shelfdetail'
import ReviewSection from '../../../components/Shelf/ReviewSection'

export default function ShelfDetailPage() {
  const navigate = useNavigate();
  const { ShelfmeetingId } = useParams<{ ShelfmeetingId: string }>()
  const [Mynickname, setMynickname] = useState<string>('')
  const [MyUrl, setUrl] = useState<string>('')

  const Req: ShelfDetailRequest ={
    meetingId : Number(ShelfmeetingId),
  }
  const { data : ShelfDetail, isLoading, isError, error} =  useShelfDetail(Req)
  const topics = ShelfDetail?.topicList.topics

  useEffect(() => {
    setMynickname('oz')
    setUrl('/assets/ix_user-profile-filled.svg')
  }, []) 

  if (isLoading) return <div className = "font-[Pretendard] font-semibold text-[16px] text-[#8D8D8D]">로딩 중…</div>
  if (!ShelfDetail || isError) return <p className="text-red-500">Error: {error?.message} </p>;

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
              <Link to={`${location.pathname}/topic`} state={{ bookTitle: ShelfDetail.bookDetailInfo.title }} className="text-[14px] font-medium text-[var(--button-brown,#969696) leading-[145%] hover:cursor-pointer">
                +더보기
              </Link>
            </div>
          </div>


          {/* 한줄평 */}
          <ReviewSection meetingId={Number(ShelfmeetingId)} currentUser={{ nickname: Mynickname, profileImageUrl: MyUrl }} size={5} />
          
        </div>
      </div>
    </div>
  )
}
