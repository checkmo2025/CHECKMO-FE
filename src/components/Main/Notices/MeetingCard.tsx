interface Props {
  title: string;
  date: string;
  book: string;
  imageUrl: string;
}

const MeetingCard = ({ title, date, book, imageUrl }: Props) => (
  <div className="rounded-[1rem] border-2 border-[#EAE5E2] bg-white w-[17.875rem] p-[1.5rem] flex flex-col gap-7">
    <div className="flex justify-between items-start">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-6 h-6 bg-gray-200 rounded-full" />
          <span className="text-lg font-medium text-gray-700">{title}</span>
        </div>
        <div className="text-xs text-gray-700">다음 모임 날짜 : {date}</div>
        <div className="text-xs text-gray-700">다음 모임 책 : {book}</div>
      </div>
      <div className="flex flex-col items-end">
        <div className="bg-[#90D26D] px-4 py-2 rounded-2xl text-xs text-white font-semibold">
          모임
        </div>
        <img
          src="/src/assets/icons/shortcut.png"
          className="w-4 h-4 mt-2"
          alt="shortcut"
        />
      </div>
    </div>
    <img
      src={imageUrl}
      alt="모임 이미지"
      className="w-[16.375rem] h-[14.5rem] object-cover rounded-[1rem]"
    />
  </div>
);

export default MeetingCard;
