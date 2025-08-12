// src/components/common/ChipToggleGroup.tsx
import React, { useState, useEffect } from 'react';

export interface ChipToggleGroupProps {
  options: string[];
  defaultSelected?: string[];
  onChange: (selected: string[]) => void;
}

export function ChipToggleGroup({
  options,
  defaultSelected = [],
  onChange,
}: ChipToggleGroupProps): React.ReactElement {
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  // 내부에서 토글 로직 처리
  const handleToggle = (item: string) => {
    const newSelected = selected.includes(item)
      ? selected.filter(s => s !== item)  // 제거
      : [...selected, item];              // 추가
    
    setSelected(newSelected);
    onChange(newSelected); // 부모에게 변경사항 알림
  };

  return (
    <div className="flex flex-wrap gap-x-[19.9px] gap-y-[11.43px]">
      {options.map((opt) => {
        const isOn = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => handleToggle(opt)}
            className={`
              w-[118px] h-[39px] rounded-[24px] cursor-pointer
              font-pretendard font-medium text-[11.97px] leading-[135%] tracking-[-0.1%]
              ${isOn ? 'bg-[#90D26D] text-white' : 'bg-[#F0F0F0] text-[#5A5A5A]'}
            `}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
