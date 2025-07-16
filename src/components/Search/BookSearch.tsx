// BookSearch.tsx
import React from 'react'


export interface Book {
  id: string
  title: string
  author: string
  summary1: string
  summary2: string
  coverUrl?: string
}

export interface Action {
  label: string
  onClick: (book: Book) => void
  className?: string
  iconUrl?: string
}


interface BookSearchProps {
  actions?: Action[]
}

export default function BookSearch({ actions }: BookSearchProps) {
  // API로 받아온다고 가정한 더미 데이터
  const books: Book[] = Array.from({ length: 10 }, (_, i) => ({
    id: `${i + 1}`,
    title: '넥서스',
    author: '유발 하라리',
    summary1: (<>사피엔스 호모 데우스 유발 하라리 6년 만의 신작<br/>출간 즉〈뉴욕타임스〉〈선데이타임스〉아마존 베스트셀러</>),
    summary2: (<>비인간 지능의 위협과 우리의 미래에 대한 경고<br/>“AI는 우리 종의 역사뿐만 아니라<br/>모든 생명체의 진화 경로를 바꿀지도 모른다.”<br/><br/>
글로벌 베스트셀러 『사피엔스』 『호모 데우스』 『21세기를 위한 21가지 제언』으로 우리 시대 가장 중요한 사상가의 반열에 오른 유발 하라리 교수가 압도적...</>),
  }))

  return (
    <div className="px-6 flex flex-col flex-1">
      
       {actions?.[0]?.label === '추천하기' && (
        <p className="font-[Pretendard] font-medium text-[18px] text-black mb-5">
          인상 깊은 책을 모임원들에게 추천해주세요!
        </p>
      )}

      {/* 검색창 */}
      <div className=" flex items-center h-[53px] py-[10px] px-[17px] rounded-2xl bg-[var(--Color-4,#F4F2F1)]">
        <img
          src="/assets/material-symbols_search-rounded.svg"
          className="w-[33px] h-[33px] "
        />
        <input type="text" placeholder="검색하기 (도서명, 작가)"  className=" text-[18px] mx-[14px] font-[Pretendard] font-medium bg-transparent outline-none flex-1 leading-[135%] text-[var(--Gray-1,#2C2C2C)] ]"
        />
      </div>

      {/* 검색 결과 리스트 (스크롤은 내부에서만, 바는 숨김) */}
      <div className="mt-6 flex flex-col overflow-y-auto space-y-6 pr-2 h-[calc(100vh-248px)] overscroll-none" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
>
        {books.map((book, idx) => (
  <div key={idx} className="flex w-full border-2 border-[var(--sub-color-2-brown,#EAE5E2)] rounded-2xl bg-[var(--White,#FFF)] shadow-sm">

    {/* 좌측 */}
    <div className="flex-1 flex p-[10px] gap-[20px]">
      {/* 썸네일 */}
      <div className="w-[136px] h-[192px] rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 텍스트 그룹 컨테이너 */}
      <div className="flex-1 flex flex-col ">
        {/* 그룹 1: 아이콘 + 제목/저자 */}
        <div className="flex items-start gap-[5px]">
          <img
            src="/assets/책 제목.svg"
            className="w-6 h-6"
          />
          <div className="flex gap-[10px] items-center">
            <h2 className="font-[Pretendard] font-medium text-[18px] leading-[135%]">{book.title}</h2>
            <span className="font-[Pretendard] font-semibold text-[12px] text-[#8D8D8D] ">{book.author}</span>
          </div>
        </div>

        {/* 그룹 2: summary1 */}
        
        <p className="font-[Pretendard] font-semibold text-[12px] mt-3 ">{book.summary1}</p>

        {/* 그룹 3: summary2 */}
        <p className=" font-[Pretendard] font-semibold text-[12px] text-[var(--Gray-1,#5C5C5C)] mt-[38px]">{book.summary2}</p>
      </div>
    </div>

    {/* 우측: 버튼 영역 */}
    <div className="flex flex-col items-center p-[10px] gap-[10px]">
      {actions?.map((action, i) => (
        <button key={i} onClick={() => action.onClick(book)} className={` w-[105px] h-[35px] text-[12px] py-[5px] px-[12px] rounded-[16px] flex items-center justify-center font-[Pretendard] font-medium text-[12px] leading-[145%] ${action.className ?? ''}`}>
          {action.iconUrl && <img src={action.iconUrl} alt={action.label} className="w-4 h-4 mr-[9px] " />}
          {action.label}
        </button>
      ))}
    </div>

  </div>
))}


      </div>
    </div>
  )
}
