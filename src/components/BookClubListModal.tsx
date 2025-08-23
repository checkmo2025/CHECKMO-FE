import { useEffect, useRef } from "react";
import type { ClubDto } from "../apis/Main/clubs";

type Props = {
  isOpen: boolean;
  clubs: ClubDto[];
  onClose: () => void;
  onSelect: (clubId: number) => void;
};

const BookClubListModal = ({ isOpen, clubs, onClose, onSelect }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute left-[15rem] top-40 w-48 max-h-60 overflow-y-auto bg-white border border-gray-200 shadow-lg rounded-md z-50"
    >
      <ul className="flex flex-col">
        {clubs.map((club) => (
          <li
            key={club.clubId}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[0.8rem]"
            onClick={() => onSelect(club.clubId)}
          >
            {club.clubName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookClubListModal;
