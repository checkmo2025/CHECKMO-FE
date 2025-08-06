type VoteNoticeModalProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const VoteNoticeModal = ({ message, onConfirm, onCancel }: VoteNoticeModalProps) => {
  return (
    <div className="fixed inset-0 backdrop-blur-[1.5px] backdrop-brightness-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-[16px] w-[672px] h-[353px] text-center">
        <div className="text-[#000000] font-semibold text-[28px] mt-[40px] whitespace-pre-line">
          {message}
        </div>
        <div className="flex flex-col items-center justify-center gap-[15px] mt-[64px]">
          <button
            onClick={onConfirm}
            className="
              w-[393px] h-[59px]
              bg-[#EFF5ED] border-[2px] border-[#C4E8B2] text-[#367216] rounded-[16px]
              font-pretendard font-semibold text-[20px]
              hover:cursor-pointer
            "
          >
            나가기
          </button>
          <button
            onClick={onCancel}
            className="
              w-[393px] h-[59px]
              bg-[#90D26D] text-[#FFFFFF] rounded-[16px]
              font-pretendard font-semibold text-[20px]
              hover:cursor-pointer
            "
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteNoticeModal; 