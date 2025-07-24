import React from "react";

type AlertModalProps = {
  message: string;
  onClose: () => void;
};

const AlertModal = ({ message, onClose }: AlertModalProps) => {
  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white rounded-xl shadow-md border border-[#C4E8B2] w-[350px] px-6 py-4 text-center">
        <div className="text-[#2C2C2C] font-medium text-sm mb-3">
          {message}
        </div>
        <button
          onClick={onClose}
          className="text-[#488328] font-bold text-sm hover:underline"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
