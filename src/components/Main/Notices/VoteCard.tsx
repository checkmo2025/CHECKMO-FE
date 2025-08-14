interface Props {
  title: string;
  date: string;
  imageUrl: string;
  book: string;
}

const VoteCard = ({ title, date }: Props) => (
  <div className="rounded-[1rem] border-2 border-[#EAE5E2] bg-white w-[17.875rem] p-6 flex flex-col gap-7">
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
          <span className="text-lg font-semibold text-gray-800">{title}</span>
        </div>
        <div className="text-xs text-gray-700">모임 날짜 : {date}시</div>
        <div className="text-xs text-gray-700">모임 장소 : 홍대 9번출구</div>
        <div className="text-xs text-gray-700">뒷풀이 장소 : 반주시대</div>
      </div>
      <div className="flex flex-col items-end">
        <div className="bg-[#FF8045] px-4 py-2 rounded-2xl text-xs text-white font-semibold">
          투표
        </div>
        <img
          src="/src/assets/icons/shortcut.png"
          className="w-4 h-4 mt-2"
          alt="shortcut"
        />
      </div>
    </div>

    {/* 투표 박스 */}
    <div className="border border-[#EAE5E2] rounded-xl px-4 py-4 flex flex-col gap-3">
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={`vote-${title}`}
          className="accent-[#FF8045]"
        />
        <span className="text-sm text-gray-700">참여</span>
      </label>
      <div className="border-t border-[#EAE5E2]" />

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={`vote-${title}`}
          className="accent-[#FF8045]"
        />
        <span className="text-sm text-gray-700">토론만 참여</span>
      </label>
      <div className="border-t border-[#EAE5E2]" />

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          name={`vote-${title}`}
          className="accent-[#FF8045]"
        />
        <span className="text-sm text-gray-700">불참</span>
      </label>

      <button className="bg-[#FF8045] text-white text-xs font-semibold rounded-full px-4 py-2 mt-4 self-end">
        투표 하기
      </button>
    </div>
  </div>
);

export default VoteCard;
