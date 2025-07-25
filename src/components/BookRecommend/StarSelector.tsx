// import { useState, useRef, useCallback } from "react";
// import { FaStar } from "react-icons/fa";

// interface StarSelectorProps {
//   value: number; // 0.0 ~ 5.0
//   onChange: (v: number) => void; // 변경 시 콜백
//   size?: number; // 아이콘 크기(px)
//   className?: string; // Tailwind 추가 클래스
// }

// const StarSelector = ({
//   value,
//   onChange,
//   size = 24,
//   className = "",
// }: StarSelectorProps) => {
//   const [hoverValue, setHoverValue] = useState<number | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   // 마우스 위치 → 0.5 간격 별점
//   const calcHalfStep = useCallback((clientX: number) => {
//     const rect = containerRef.current!.getBoundingClientRect();
//     const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
//     return Math.round(pct * 10) / 2; // (pct*5) 반올림 ⇒ 0.5 간격
//   }, []);

//   const handleMouseMove = (e: React.MouseEvent) =>
//     setHoverValue(calcHalfStep(e.clientX));

//   const handleMouseLeave = () => setHoverValue(null);

//   const handleClick = (e: React.MouseEvent) =>
//     onChange(calcHalfStep(e.clientX));

//   const display = hoverValue ?? value;
//   const fillPercent = (display / 5) * 100;
//   const iconClass = `w-[${size}px] h-[${size}px] shrink-0`;

//   return (
//     <div className={`inline-block ${className}`}>
//       <div
//         ref={containerRef}
//         className="relative cursor-pointer select-none leading-none"
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         onClick={handleClick}
//       >
//         {/* 회색(빈) 별 */}
//         <div className="flex text-gray-300 space-x-1">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <FaStar key={`bg-${i}`} className={iconClass} />
//           ))}
//         </div>

//         {/* 노란(채움) 별 */}
//         <div
//           className="absolute top-0 left-0 flex overflow-hidden text-yellow-400 space-x-1"
//           style={{ width: `${fillPercent}%` }}
//         >
//           {Array.from({ length: 5 }).map((_, i) => (
//             <FaStar key={`fg-${i}`} className={iconClass} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StarSelector;

import { useState, useRef, useCallback } from "react";
import { FaStar } from "react-icons/fa";

interface StarSelectorProps {
  value: number; // 0.0 ~ 5.0
  onChange: (v: number) => void; // 변경 콜백
  size?: number; // 아이콘 크기(px)
  className?: string;
}

const StarSelector = ({
  value,
  onChange,
  size = 24,
  className = "",
}: StarSelectorProps) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  /** 마우스 위치 → 0.5 스텝 스냅 */
  const calcHalfStep = useCallback((clientX: number) => {
    const rect = containerRef.current!.getBoundingClientRect();
    const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    return Math.round(pct * 10) / 2; // 0.5 단위
  }, []);

  const handleMouseMove = (e: React.MouseEvent) =>
    setHoverValue(calcHalfStep(e.clientX));

  const handleMouseLeave = () => setHoverValue(null);

  const handleClick = (e: React.MouseEvent) =>
    onChange(calcHalfStep(e.clientX));

  const display = hoverValue ?? value;

  // 각 별의 채움 퍼센트를 계산 (0~1 사이)
  const starPercents = Array.from({ length: 5 }).map((_, idx) => {
    const remain = display - idx; // 현재 별에 남은 점수
    if (remain >= 1) return 100; // 꽉 참
    if (remain <= 0) return 0; // 비어 있음
    return remain * 100; // 부분 채움 (예: 0.5 → 50%)
  });

  const iconClass = `w-[${size}px] h-[${size}px] shrink-0`;

  return (
    <div className={`inline-block ${className}`}>
      <div
        ref={containerRef}
        className="relative cursor-pointer select-none leading-none flex space-x-1"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {starPercents.map((percent, i) => (
          <div key={i} className="relative">
            {/* 배경(빈) 별 */}
            <FaStar className={`${iconClass} text-gray-300`} />
            {/* 채움(앞) 별 - 개별 클리핑 */}
            <div
              className="absolute top-0 left-0 overflow-hidden text-yellow-400"
              style={{ width: `${percent}%`, height: "100%" }}
            >
              <FaStar className={iconClass} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarSelector;
