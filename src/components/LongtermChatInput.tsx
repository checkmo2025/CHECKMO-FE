import React, { useRef } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
  placeholder?: string;
  buttonIconSrc?: string;
  className?: string;
}

const LongtermChatInput = ({ onSend, placeholder, buttonIconSrc, className }: ChatInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    adjustHeight();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      ta.value = ta.value.slice(0, start) + '\t' + ta.value.slice(end);
      ta.selectionStart = ta.selectionEnd = start + 1;
      adjustHeight();
    }
  };

  const handleSendClick = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const text = ta.value.trim();
    if (!text) return;
    onSend(text);
    ta.value = '';
    adjustHeight();
  };

  return (
    <div className={`flex-1 mr-[20px] min-h-[48px] flex items-center ${className}`}>
      <textarea
        ref={textareaRef}
        rows={1}
        placeholder={placeholder}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="flex items-center w-full text-[14px] leading-snug bg-transparent focus:outline-none overflow-hidden resize-none min-h-[24px] pt-2 py-2 border-b-2 border-[var(--sub-color-2-brown,#EAE5E2)]"
      />
      <button
        onClick={handleSendClick}
        className="h-12 w-6 ml-2 hover:cursor-pointer"
      >
        <img src={buttonIconSrc} className="w-[36px] h-[36px]" />
      </button>
    </div>
  );
};

export default LongtermChatInput;