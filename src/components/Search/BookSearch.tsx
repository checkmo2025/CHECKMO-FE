// BookSearch.tsx
import  { useState, useEffect, useRef } from 'react'
import type { Action } from '../../types/BookSearchdto';
import type { SearchBook } from '../../types/BookSearchdto';
import type { BookSearchProps } from '../../types/BookSearchdto';
import { useBookSearch } from '../../hooks/BookSearch/useBookSearch';
import { useDebounce } from '../../hooks/useDebounce';

export default function BookSearch({SearchResultHeight, actions }: BookSearchProps) {

  
  const [Searchbooks, setSearchBooks] = useState<SearchBook[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const debouncedTerm = useDebounce(searchTerm, 500);

  // 새로운 내용일 시 페이지 초기화
  useEffect(() => { setPage(1); }, [debouncedTerm]);

  
  const { data, isFetching } = useBookSearch(debouncedTerm, page);
  const booksOnPage = data?.bookInfoDetailResponseList;
  const hasNext = data?.hasNext;

  
  useEffect(() => {
    
    if (!data){return;}
    if (page === 1) {
      setSearchBooks(booksOnPage);
    } else {
      setSearchBooks(prev => [...prev, ...booksOnPage]);
      console.log('추가된 책:', Searchbooks);
    }
  }, [booksOnPage, page]);


  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasNext || isFetching) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage(p => p + 1);
        }
      }
    );
    const el = loadMoreRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasNext, isFetching]);

  return (
    <div className=" flex flex-col flex-1">
        
        {actions?.[0]?.label === '추천하기' && (
        <p className="absolute font-[Pretendard] font-medium text-[18px] text-black ">
          인상 깊은 책을 모임원들에게 추천해주세요!
        </p>
      )}
      <div className ="h-9"></div>
      {SearchResultHeight === 290 && (
        <p className="font-[Pretendard] font-medium text-[18px] text-black pb-4">
          책 등록
        </p>
      )}
      {/* 검색창 */}
      <div className="flex items-center h-[53px] py-[10px] px-[17px] rounded-2xl bg-[var(--Color-4,#F4F2F1)]">
        <img
          src="/assets/material-symbols_search-rounded.svg"
          className="w-[33px] h-[33px] "
        />
        <input type="text" placeholder="검색하기 (도서명, 작가, 출판사)"  
        className=" text-[18px] mx-[14px] font-pretendard font-medium bg-transparent outline-none flex-1 leading-[135%] tracking-[-0.1%] text-[var(--Gray-1,#2C2C2C)] ]"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 검색 결과 리스트 (스크롤은 내부에서만, 바는 숨김) */}
      {Searchbooks.length > 0 && (
      <div className="mt-[42px] mx-5 flex flex-col overflow-y-auto space-y-6" 
      style={{ msOverflowStyle: 'none', height: `calc(100vh - ${SearchResultHeight}px)`, scrollbarWidth: 'none' }}>
                {Searchbooks.map((SearchBook) => (
                  <div className="flex border-2 border-[var(--sub-color-2-brown,#EAE5E2)] rounded-2xl bg-[var(--White,#FFF)] shadow-sm"> 
                  {/* 좌측 */}
                    <div className="flex-1 flex p-[10px] gap-[20px]">
                      {/* 썸네일 */}
                      <div className="w-[136px] h-[192px] rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
                        <img
                          src={SearchBook.imgUrl}
                          alt={SearchBook.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* 텍스트 그룹 컨테이너 */}
                      <div className="flex-1 flex flex-col ">
                        {/* 아이콘 + 제목/저자 */}
                        <div className="flex items-start gap-[5px] mb-4">
                          <img
                            src="/assets/책 제목.svg"
                            className="w-6 h-6"
                          />
                          <div className="flex gap-[10px] items-center">
                            <h2 className="font-[Pretendard] font-medium text-[18px] leading-[135%]">{SearchBook.title}</h2>
                          </div>
                        </div>
                        {/* 출판사*/}
                        <span className="font-[Pretendard] font-semibold text-[12px] text-[#8D8D8D]">{SearchBook.author} | 출판 {SearchBook.publisher}</span>
                        {/* 요약 */}
                        <p className="font-[Pretendard] font-semibold text-[12px] mt-5">{SearchBook.description}</p>
                      </div>
                    </div>
            {/* 우측: 버튼 영역 */}
            <div className="flex flex-col items-center p-[10px] gap-[10px]">
              {actions?.map((action : Action, i) => (
                <button key={i} onClick={() => action.onClick(SearchBook)} className={` w-[105px] h-[35px] text-[12px] py-[5px] px-[12px] rounded-[16px] flex items-center justify-center font-[Pretendard] font-medium text-[12px] leading-[145%] ${action.className ?? ''}`}>
                  {action.iconUrl && <img src={action.iconUrl} alt={action.label} className="w-4 h-4 mr-[9px] " />}
                  {action.label}
                </button>
              ))}
            </div>

          </div>
        ))}
        {isFetching && <div className = "font-[Pretendard] font-semibold text-[16px] text-[#8D8D8D]">추가 불러오는 중…</div>}
        <div ref={loadMoreRef} style={{ height: 1 }} />
        <div className ="mb-10"></div>
      </div>
      ) }
      
      
    </div>
  )
}
