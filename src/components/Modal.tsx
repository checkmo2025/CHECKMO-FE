// components/Modal.tsx
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "danger";

export interface ModalButton {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
}

interface ModalProps {
  isOpen: boolean;
  title: ReactNode;
  buttons: ModalButton[]; // 버튼 배열(개수·순서 자유)
  onBackdrop?: () => void; // 바깥 영역 클릭 시
}

const baseBtn =
  "w-full h-11 rounded-2xl text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-0";

const variantClass: Record<ButtonVariant, string> = {
  primary: `${baseBtn} bg-[#90D26D] text-white hover:bg-[#7EB95E] focus:ring-[#90D26D]`,
  outline: `${baseBtn} bg-[#EFF5ED] border-2 border-[#C4E8B2] text-[#367216] hover:bg-[#E1F0DC] focus:ring-[#90D26D]`,
  danger: `${baseBtn} bg-red-500 text-white hover:bg-red-600 focus:ring-red-500`,
};

const Modal = ({ isOpen, title, buttons, onBackdrop }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onBackdrop}
    >
      <div
        className="bg-white rounded-lg p-6 w-[90%] max-w-md flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center mt-2 mb-10">
          {title}
        </h2>

        <div className="w-2/3 space-y-2 mb-1">
          {buttons.map(({ label, onClick, variant = "primary" }, i) => (
            <button
              key={i}
              onClick={onClick}
              className={`w-full py-2 rounded-lg transition ${variantClass[variant]} text-sm`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
