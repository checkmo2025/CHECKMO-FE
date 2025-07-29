import React from 'react';
import type { AnnouncementProps, VoteOption } from '../../types/announcement';
import { BOOK_CATEGORIES } from '../../types/dto';

// 카테고리 ID를 이름으로 변환하는 함수
const getCategoryName = (categoryId: number): string => {
  return BOOK_CATEGORIES[categoryId as keyof typeof BOOK_CATEGORIES] || '기타';
};

interface VoteNoticeContentProps {
  data: AnnouncementProps;
}

export default function VoteNoticeContent({ data }: VoteNoticeContentProps): React.ReactElement {
  const [selectedVotes, setSelectedVotes] = React.useState<string[]>([]);

  const handleVoteSubmit = () => {
    if (selectedVotes.length === 0) {
      alert('투표할 항목을 선택해주세요.');
      return;
    }

    if (data.onVoteSubmit) {
      data.onVoteSubmit(selectedVotes);
    }
    
    alert(`투표 완료: ${selectedVotes.join(', ')}`);
  };

  const handleVoteChange = (value: string) => {
    setSelectedVotes(prev => {
      return prev.includes(value) 
        ? prev.filter(v => v !== value)
        : [...prev, value];
    });
  };

  return (
    <div>
      {/* 상단 영역 */}
      <div className="w-[552px] flex gap-[32px] mb-[36px]">
        {/* 왼쪽: 책 이미지 */}
        <div className="flex-shrink-0">
          <img
            src={data.imageUrl}
            alt="book cover"
            className="w-[200px] h-[292px] object-cover"
          />
        </div>

        {/* 오른쪽: 정보 */}
        <div className="flex-1 relative">
          {/* 책 제목 */}
          <div className="flex items-center justify-between mb-[6px]">
            <h2 className="font-pretendard font-semibold text-[20px] leading-[135%] tracking-[-0.1%] text-[#000000]">
              {data.book}
            </h2>
          </div>

          {/* 책 정보 */}
          <div className="mb-[20px]">
            <p className="font-pretendard font-normal text-[14px] leading-[145%] tracking-[-0.1%] text-[#8D8D8D]">
              {data.bookAuthor} 지음 | 출판 {data.bookPublisher}
            </p>
          </div>

          {/* 책 설명 */}
          <div className="flex items-center justify-between">
            <p className="font-pretendard font-normal text-[14px] leading-[135%] tracking-[-0.1%] text-[#000000]">
              {data.bookDescription}
            </p>
          </div>

          {/* 태그 */}
          <div className="absolute bottom-[0px] flex flex-wrap gap-[8px]">
            {/* 기수 태그 */}
            {data.generation && (
              <span className="inline-flex items-center justify-center min-w-[54px] px-[18px] h-[24px] bg-[#90D26D] text-white rounded-[15px] font-pretendard font-medium text-[12px] leading-[145%] tracking-[-0.1%]">
                {data.generation}기
              </span>
            )}
            
            {/* 독서 카테고리 태그 */}
            {data.categories?.map((categoryId: number) => (
              <span 
                key={categoryId}
                className="inline-flex items-center justify-center min-w-[54px] px-[16.5px] h-[24px] bg-[#90D26D] text-white rounded-[15px] font-pretendard font-medium text-[12px] leading-[145%] tracking-[-0.1%]"
              >
                {getCategoryName(categoryId)}
              </span>
            ))}
          </div>
        </div>
      </div>

      
      {/* 하단 */}
      <div className="w-[1080px] min-h-[622px] p-[20px] border-[2px] border-[#EAE5E2] rounded-[16px] mb-[36px]">
        <div className="w-full h-[57px] border-b-[2px] border-[#EEEEEE] mb-[20px]">
          <h3 className="pt-[10px] pb-[20px] pl-[23.5px] font-pretendard font-semibold text-[20px] leading-[145%] tracking-[-0.1%] text-[#000000] ">
            제목란
          </h3>
        </div>
        
        {/* 투표 마감일 */}
        {data.voteDeadline && (
          <p className="px-[20px] py-[10px] font-pretendard font-medium text-[18px] leading-[180%] tracking-[-0.1%] text-[#2c2c2c] mb-[20px]">
            {data.voteDeadline.year}년 {data.voteDeadline.month}월 {data.voteDeadline.date}일 ({data.voteDeadline.day}) {data.voteDeadline.hour}:{data.voteDeadline.minute} 까지
          </p>
        )}
        
        {/* 설명 */}
        <p className="px-[20px] py-[10px] font-pretendard font-medium text-[18px] leading-[180%] tracking-[-0.1%] text-[#2c2c2c] whitespace-pre mb-[20px]">
          {data.description}
        </p>

        {/* 투표 섹션 */}
        <div className="w-full px-[40px] mt-[20px]">
          <form>
            {data.voteOptions?.map((option: VoteOption) => (
              <label 
                key={option.value} 
                className="flex items-center w-full p-4 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={option.value}
                  checked={selectedVotes.includes(option.value)}
                  onChange={() => handleVoteChange(option.value)}
                  className="appearance-none w-[24px] h-[24px] bg-[#EEEEEE] bg-transparent border-2 border-[#BBBBBB] rounded-full cursor-pointer mr-[12px] transition-all duration-200 checked:bg-[#90D26D] checked:border-[#90D26D] flex-shrink-0 aspect-square"
                />
                <div className="bg-[#EEEEEE] w-[933px] h-[64px] rounded-[16px] p-[20px]">
                  <span className="font-pretendard font-medium text-[18px] leading-[145%] tracking-[-0.1%] text-[#2C2C2C]">
                    {option.label}
                  </span>
                </div>
              </label>
            ))}
            
            <div className="flex items-center justify-end mt-[16px]">
              {/* 버튼 부분은 디자인 나오면 수정 */}
              <button
                type="button"
                onClick={handleVoteSubmit}
                disabled={selectedVotes.length === 0}
                className="w-[100px] h-[35px] bg-[#FF8045] text-white rounded-[15px] font-pretendard font-semibold text-[12px] leading-[145%] tracking-[-0.1%] whitespace-nowrap cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                투표하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 