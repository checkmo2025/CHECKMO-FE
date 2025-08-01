import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rate: number;
}

const StarRating = ({ rate }: StarRatingProps) => {
  const [popularity, setPopularity] = useState(rate);

  const fillPercent = Math.min(Math.max(popularity / 5, 0), 1) * 100;
  const iconSizeClass = `w-[16px] h-[16px] shrink-0`;

  return (
    <div className="flex items-center">
      <span className="mr-2 text-lg font-semibold text-gray-700">
        {popularity.toFixed(1)}
      </span>
      <div className="relative inline-block leading-none">
        <div className="flex text-gray-300">
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className={iconSizeClass} />
          ))}
        </div>
        <div
          className="absolute top-0 left-0 flex overflow-hidden text-yellow-400"
          style={{ width: `${fillPercent}%` }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <FaStar key={i} className={iconSizeClass} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StarRating;
