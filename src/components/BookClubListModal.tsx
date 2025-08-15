import type { ClubDto } from "../apis/Main/clubs";

type Props = {
  isOpen: boolean;
  clubs: ClubDto[];
  onClose: () => void;
  onSelectClub: (clubId: number) => void;
};

const BookClubListModal = ({ isOpen, clubs, onClose, onSelectClub }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl w-80 max-h-[70vh] overflow-y-auto p-6">
        <h2 className="text-xl font-bold mb-4">내 모임 선택</h2>
        <div className="flex flex-col gap-2">
          {clubs.map((club) => (
            <button
              key={club.clubId}
              onClick={() => onSelectClub(club.clubId)}
              className="w-full text-left px-4 py-2 rounded hover:bg-[#DDEED6] font-medium"
            >
              {club.clubName}
            </button>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-[#90D26D] text-white font-medium hover:bg-[#7ab35c]"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookClubListModal;
