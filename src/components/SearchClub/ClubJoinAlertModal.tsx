type ClubAlertModalProps = {
  message: string;
  onClose: () => void;
};

const ClubAlertModal = ({ message, onClose }: ClubAlertModalProps) => {
  return (
    <div className="fixed inset-0 backdrop-blur-[1.5px] backdrop-brightness-70 flex items-center justify-center">
      <div className="bg-white rounded-[16px] w-[764px] h-[312px] text-center">
        <div className="text-[#000000] font-semibold text-[28px] mt-[71px]">
          {message}
        </div>
        <button
          onClick={onClose}
          className="
            w-[390px] h-[59px] mt-[72px]
            bg-[#90D26D] text-white rounded-[16px]
            font-pretendard font-semibold text-[16px]
            hover:cursor-pointer
          "
        >
          돌아가기
        </button>
      </div>
    </div>
  );
};

export default ClubAlertModal; 