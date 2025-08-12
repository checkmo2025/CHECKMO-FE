import { useState, useRef,useEffect } from "react";
import type { CreateNoticeRequest} from "../../types/Notice/clubNoticeCreate"

interface Props {
  formRef: React.RefObject<CreateNoticeRequest>;
}

export default function NoticeCreateNoticeComponent({ formRef }: Props) {
  const [Important, setImportant] = useState(formRef.current?.important ?? false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  
  useEffect(() => {
    setImportant(formRef.current?.important ?? false);
    if (formRef.current?.content) {
      contentRef.current!.value = formRef.current.content;
    }
  }, []);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <label className="flex items-center gap-5 px-5 py-[10px] mb-5">
        <input type="checkbox" className={`w-6 h-6 appearance-none cursor-pointer bg-center bg-no-repeat bg-contain border-none ${ Important ? "bg-[url('/src/assets/icons/subway_cercle-8.svg')]": "bg-[url('/src/assets/icons/Ellipse57.svg')]"}`} 
        checked={Important}
        onChange={(e) =>{setImportant(e.target.checked)
        formRef.current.important = e.target.checked; }} />
        
        <span className="text-[18px] font-medium font-pretendar text-[#2C2C2C] ">중요여부</span>
      </label>
      
      <textarea
        placeholder="내용을 입력해주세요."
        defaultValue={formRef.current.content}
        ref={contentRef}
        onChange={(e) => {formRef.current.content = e.target.value; }}
        onInput={(e) => {
          e.currentTarget.style.height = "auto"; // 줄였을 때 다시 계산
          e.currentTarget.style.height = `${Math.max(e.currentTarget.scrollHeight, 400)}px`;
        }}
        className="w-full min-h-[400px] resize-none overflow-hidden p-4
                  font-pretendard text-[14px] font-medium leading-[145%] tracking-[-0.014px]
                  text-[var(--Gray-1,#2C2C2C)] rounded-2xl outline-none"
      />
    </div>
  );
}