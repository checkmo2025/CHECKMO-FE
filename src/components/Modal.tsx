// components/Modal.tsx
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "danger";

interface ModalButton {
  /** 버튼에 표시될 텍스트 */
  label: string;
  /** 클릭 시 실행될 함수 */
  onClick: () => void;
  /** 스타일 */
  variant?: ButtonVariant;
}

interface ModalProps {
  isOpen: boolean;
  title: ReactNode;
  content?: ReactNode;
  buttons: ModalButton[]; // 버튼 배열(개수·순서 자유)
  onBackdrop?: () => void; // 바깥 영역 클릭 시
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-[#90D26D] text-white hover:bg-[#7EB95E]",
  outline: "border border-emerald-300 text-emerald-600 hover:bg-emerald-50",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const Modal = ({ isOpen, title, content, buttons, onBackdrop }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onBackdrop}
    >
      <div
        className="bg-white rounded-lg p-6 w-[90%] max-w-md flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
          {title}
        </h2>

        {content && (
          <p className="text-sm text-gray-800 text-center mb-6 whitespace-pre-wrap">
            {content}
          </p>
        )}

        <div className="w-full space-y-2">
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
