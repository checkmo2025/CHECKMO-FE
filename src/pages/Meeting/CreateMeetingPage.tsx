import React from 'react'
import { useState } from 'react';
import BookSearch from '../../components/Search/BookSearch';
import type { SearchBook, Action } from '../../types/BookSearchdto';
import { useNavigate } from 'react-router-dom';
import { ChipToggleGroup } from '../../components/CreateClub/ChipToggleGroup';
import { BOOK_CATEGORIES } from '../../types/dto';

import type {CreateMeetingRequest} from '../../types/Meeting/CreateMeetingdto';

export default function CreateMeetingPage() {
  const navigate = useNavigate();

  const [isSelected, setIsSelected]     = useState(false);
  const BOOK_CATEGORY_OPTIONS = Object.values(BOOK_CATEGORIES);

  const [selectedBook, setSelectedBook] = useState<SearchBook | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [generation, setgeneration] = useState<string>('');
  const [meetingTime, setMeetingTime] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  

  const actions: Action[] = [
    {
      label: "선택하기",
      onClick: (book: SearchBook) => {
        setSelectedBook(book);
        setIsSelected(true);
      },
      className: "bg-[var(--button-brown,#A6917E)] text-white",
    },
  
  ];

  function setDateValue(value: string): void {
    // value는 "2025-08-01T14:20" 형식의 문자열
    console.log("Selected date and time:", value);
    setMeetingTime(value);
  }
  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue =
        content.substring(0, start) + "\t" + content.substring(end);
      setContent(newValue);
      // 커서를 탭 뒤로 이동
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      });
    }
  };

  return (
    <div className = "mx-10 mt-15">
        <div onClick={() => navigate(-1)} className="flex items-center h-[38px] gap-[3px] cursor-pointer">
          <img src="/assets/material-symbols_arrow-back-ios.svg" className="w-6 h-6 "/>
          <span className="font-[Pretendard] font-bold text-[26px] leading-[135%]">
            모임 생성하기
          </span>
        </div>

      {!isSelected && (
        <BookSearch SearchResultHeight = {290} actions={actions}/>
      )}

      {isSelected && (
        <div className="flex border-2 border-[var(--sub-color-2-brown,#EAE5E2)] rounded-2xl bg-[var(--White,#FFF)] shadow-sm mt-9"> 
                  {/* 좌측 */}
                    <div className="flex-1 flex p-[10px] gap-[20px]">
                      {/* 썸네일 */}
                      <div className="w-[136px] h-[192px] rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
                        <img
                          src={selectedBook.imgUrl}
                          alt={selectedBook.title}
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
                            <h2 className="font-[Pretendard] font-medium text-[18px] leading-[135%]">{selectedBook.title}</h2>
                          </div>
                        </div>
                        {/* 출판사*/}
                        <span className="font-[Pretendard] font-semibold text-[12px] text-[#8D8D8D]">{selectedBook.author} | 출판 {selectedBook.publisher}</span>
                        {/* 요약 */}
                        <p className="font-[Pretendard] font-semibold text-[12px] mt-5">{selectedBook.description}</p>
                      </div>
                    </div>
            {/* 우측: 버튼 영역 */}
            <div className="flex flex-col items-center p-[10px] gap-[10px]">
              <div>
              </div>
              <button
                className="w-[105px] h-[35px] text-[12px] py-[5px] px-[12px] rounded-[16px] flex items-center justify-center font-[Pretendard] font-medium text-[12px] leading-[145%] bg-[var(--button-brown,#A6917E)] text-white">선택됨
              </button>
              <button onClick={() => { setIsSelected(false); setSelectedBook(null);}}  
                className="w-[105px] h-[35px] text-[12px] py-[5px] px-[12px] rounded-[16px] flex items-center justify-center font-[Pretendard] font-medium text-[12px] leading-[145%] bg-[var(--button-brown,#FFF] text-black border-[1.5px] border-[var(--sub-color-1-brown,#BFAB96)]">변경하기
              </button>
            </div>

          </div>
        
      )}

      <div className="mt-5">
        <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
          기수
        </label>
        <div className="flex items-center h-[53px] py-[10px] px-[10px] rounded-2xl bg-[var(--Color-4,#F4F2F1)] mt-3">
          <input type="text" placeholder="ex. 7기"  
          className=" text-[18px] mx-[14px] font-pretendard font-medium bg-transparent outline-none flex-1 leading-[135%] tracking-[-0.1%] text-[var(--Gray-1,#2C2C2C)] ]"
          value={generation}
          onChange={e => setgeneration(e.target.value)}
          />
        </div>
      </div>

      
      <div className="mt-5">
        <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
          종류
        </label>
        <div className="mt-[16px] max-w-[400px] flex-1 justify-center items-center  ">
           <ChipToggleGroup
             options={BOOK_CATEGORY_OPTIONS}
             selected={selectedCategories}
             onToggle={(cat) => {
             setSelectedCategories(prev => prev[0] === cat ? []  : [cat] );
            }}/>
        </div>
      </div>

      
      <div className="mt-5">
          <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
            날짜
          </label>
          <div className="flex items-center h-[53px] py-[10px] px-[17px] rounded-2xl bg-[var(--Color-4,#F4F2F1)] mt-3">
          <img src="/assets/일정.svg" className="w-6 h-6"/>
          <input
            type="datetime-local"
            value={meetingTime}                /* ex: "2025-08-01T14:20" */
            onChange={e => setDateValue(e.target.value)}
            className="text-[18px] mx-[14px] font-pretendard font-medium bg-transparent outline-none flex-1 leading-[135%] tracking-[-0.1%] text-[var(--Gray-1,#2C2C2C)] ]"
          />
        </div>
      </div>
      
      <div className="mt-5">
        <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
          장소
        </label>
        <div className="flex items-center h-[53px] py-[10px] px-[10px] rounded-2xl bg-[var(--Color-4,#F4F2F1)] mt-3">
          <img src="/assets/bx_map.svg" className="w-6 h-6"/>
          <input type="text" placeholder="홍익대학교"  
          className=" text-[18px] mx-[14px] font-pretendard font-medium bg-transparent outline-none flex-1 leading-[135%] tracking-[-0.1%] text-[var(--Gray-1,#2C2C2C)] ]"
          value={location}
          onChange={e => setLocation(e.target.value)}
          />
        </div>
      </div>

      <div className="w-fullflex flex-col items-center p-5 gap-[20px] border-2 border-[var(--sub-color-2-brown,#EAE5E2)] rounded-[16px] bg-white mt-9">
        <input type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목을 입력해주세요."
        className=" w-full h-[48px] border-0 border-b-2 border-gray-300 focus:outline-none focus:border-b-2 focus:border-gray-500 font-pretendard font-medium"
        />
      
        <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleTextareaKeyDown}
        placeholder="내용을 자유롭게 입력해주세요."
        className=" mt-5 w-full flex-1 min-h-[300px] font-pretendard text-base outline-none focus:outline-none  overflow-hidden leading-snug resize-none"
        />

        <div className="flex items-center justify-end gap-4 w-full">
          <button className = "w-[105px] h-[35px] text-[12px] py-[5px] px-[12px] rounded-[16px] flex items-center justify-center font-[Pretendard] font-medium text-[12px] leading-[145%] bg-[var(--button-brown,#FFF] border-[1.5px] border-[var(--sub-color-1-brown,#BFAB96)]"
        onClick={() => {
          //TODO-임시저장
        }}>
        임시저장
        </button>

        {/* Axios API요청은 화이팅! 이거 BE분들한테 response에 새로생성된 모임ID넣어달라해야 이동하는게 구현이 될 거 같습니다 */}
        <button className = "w-[105px] h-[35px] text-[12px] py-[5px] px-[12px] rounded-[16px] flex items-center justify-center font-[Pretendard] font-medium text-[12px] leading-[145%] bg-[var(--button-brown,#A6917E)] text-white" onClick={() => {
          console.log({
            title: title,      
            meetingTime: meetingTime,
            location: location,
            content: content,
            generation: generation,
            category: selectedCategories[0],              
            bookinfo: selectedBook,
          });
          navigate('/meeting/1'); // 임시로 1번 모임으로 이동
        }}>                  
        버튼
        </button>
        </div>
      </div>
    </div>

  )
}
