// src/components/common/ChipToggleGroup.tsx
import React from 'react';

export interface ChipToggleGroupProps {
  options: string[];
  selected: string[];
  onToggle: (item: string) => void;
}

export function ChipToggleGroup({
  options,
  selected,
  onToggle,
}: ChipToggleGroupProps): React.ReactElement {
  return (
    <div className="flex flex-wrap gap-x-[19.9px] gap-y-[11.43px]">
      {options.map((opt) => {
        const isOn = selected.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
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
