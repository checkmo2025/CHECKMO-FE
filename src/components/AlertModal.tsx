//import React from "react";

type AlertModalProps = {
  message: string;
  onConfirm?: () => void;
  onClose: () => void;
};

const AlertModal = ({ message, onConfirm, onClose }: AlertModalProps) => {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-xl shadow-md border border-[#C4E8B2] w-[350px] px-6 py-4 text-center">
        <div className="text-[#2C2C2C] font-medium text-sm mb-3">
          {message}
        </div>
        {/* 버튼이 둘 다 필요한 경우만 네/취소 표시 */}
        {onConfirm ? (
          <div className="flex justify-center items-center text-sm font-semibold">
            <button
              onClick={onConfirm}
              className="text-[#8D8D8D] w-1/2 py-1 hover:underline"
            >
              네
            </button>
            <div className="w-[1px] h-4 bg-[#E5E5E5]" />
            <button
              onClick={onClose}
              className="text-[#488328] w-1/2 py-1 hover:underline"
            >
              취소
            </button>
          </div>
        ) : (
          <button
            onClick={onClose}
            className="text-[#488328] font-bold text-sm mt-2 hover:underline"
          >
            확인
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertModal;
