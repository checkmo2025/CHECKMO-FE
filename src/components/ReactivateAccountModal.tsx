type ReactivateAccountModalProps = {
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ReactivateAccountModal = ({
  email,
  onConfirm,
  onCancel,
}: ReactivateAccountModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-xl border-[3px] border-[#C4E8B2] shadow-lg flex flex-col items-center px-10"
        style={{ width: "658px", height: "442.99px" }}
      >
        {/* 이미지 */}
        <img
          src="/assets/character-logo.png"
          alt="복구 캐릭터"
          className="w-30 h-30 mt-16 mb-14"
        />

        {/* 텍스트 */}
        <p className="text-center text-[18px] text-[#2C2C2C] font-medium mb-10">
          <span className="text-[#488328] font-semibold">{email}</span>
          <span className="ml-1">계정을 다시 복구하시겠습니까?</span>
        </p>

        {/* 버튼 */}
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="w-[150px] h-[50px] bg-[#90D26D] text-white font-bold rounded-md hover:opacity-90 transition"
          >
            네
          </button>
          <button
            onClick={onCancel}
            className="w-[150px] h-[50px] border border-[#90D26D] text-[#90D26D] font-bold rounded-md bg-white hover:bg-[#f1f8ef] transition"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReactivateAccountModal;