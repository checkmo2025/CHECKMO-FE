import { useState, useRef, useEffect } from 'react';

interface NoticeCreateDropdownProps {
  onSelectNoticeType: (type: 'general' | 'vote') => void;
  className?: string;
}

export default function NoticeCreateDropdown({ 
  onSelectNoticeType, 
  className = '' 
}: NoticeCreateDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200); // 200ms 지연으로 실수로 닫히는 것 방지
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleSelectType = (type: 'general' | 'vote') => {
    onSelectNoticeType(type);
    setIsOpen(false);
  };

    return (
    <div 
      ref={dropdownRef} 
      className={`relative ${className}`}
    >
      {/* 버튼 컨테이너 */}
      <div 
        className="w-[204px] absolute right-0 flex justify-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* 메인 버튼 */}
        <button 
          className="w-full h-[48px] bg-[#F6F3F0] rounded-[100px]
          font-medium text-[18px] text-[#2C2C2C]
          cursor-pointer
          hover:bg-[#EDE8E3] transition-colors duration-200
          flex items-center justify-center
          "
        >
          + 새 공지 작성하기
        </button>

        {/* 호버 메뉴 */}
        {isOpen && (
          <div className="absolute top-[55px] left-1/2 transform -translate-x-1/2 w-[155px] bg-white border-[2px] border-[#EAE5E2] rounded-[16px]">
          <div className="p-[10px] h-[108px] font-medium text-[18px] text-[#BBBBBB]">
            <button
              onClick={() => handleSelectType('general')}
              className="w-full h-[44px] border-b-[2px] border-[#EAE5E2] flex justify-center items-center
              cursor-pointer hover:text-[#2C2C2C] transition-colors duration-200"
            >
              일반 공지
            </button>
            <button
              onClick={() => handleSelectType('vote')}
              className="w-full h-[44px] flex justify-center items-center
              cursor-pointer hover:text-[#2C2C2C] transition-colors duration-200"
            >
              투표 공지
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}