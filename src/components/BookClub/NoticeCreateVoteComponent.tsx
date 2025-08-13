import { useRef, useState, useEffect} from "react";
import type { CreateVoteRequest} from "../../types/Notice/clubNoticeCreate";

interface Props {
  formRef: React.RefObject<CreateVoteRequest>;
}

export default function NoticeCreateVoteComponent({ formRef }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [duplication, setDuplication] = useState(formRef.current?.duplication ?? false);
  const [anonymity, setAnonymity] = useState(formRef.current?.anonymity ?? false);
  const [important, setImportant] = useState(formRef.current?.important ?? false);
  const [deadLine, setDeadLine] = useState(formRef.current?.deadline ?? "");
  
  const [items, setItems] = useState<string[]>([]);
  const [visibleCount, setVisibleCount] = useState<number>(2);

  const addItem = () => {
    if (visibleCount >= 5) return;
    setVisibleCount(c => Math.min(5, c + 1));
  };

  const removeItem = (idx: number) => {
    // 최소 2개는 유지
    if (visibleCount <= 2) return;
    // 가운데를 지우면 뒤를 앞으로 당겨서 빈칸 압축
    setItems(prev => {
      const next = [...prev];
      for (let i = idx; i < visibleCount - 1; i++) next[i] = next[i + 1];
      next[visibleCount - 1] = ""; // 마지막 칸 비우기
      return next;
    });
    setVisibleCount(c => Math.max(2, c - 1));
  };

  const updateItem = (idx: number, value: string) => {
    setItems(prev => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const openPicker = () => {
    inputRef.current?.showPicker?.();
    inputRef.current?.focus();
  };
  useEffect(() => {
      const f = formRef.current;
      setDuplication(f?.duplication ?? false);
      setAnonymity(f?.anonymity ?? false);
      setImportant(f?.important ?? false);
      setDeadLine(f?.deadline ?? "");
  
      const arr = [f?.item1 ?? "", f?.item2 ?? "",  f?.item3 ?? "",  f?.item4 ?? "",  f?.item5 ?? "",];
      
      setItems(arr);
      let last = -1;
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i].trim() !== "") {
          last = i;
          break;
        }
      }
      setVisibleCount(Math.max(2, last + 1));
  }, []);

  useEffect(() => {
    if (!formRef.current) return;
    const f = formRef.current;
    [f.item1, f.item2, f.item3, f.item4, f.item5] = items;
  }, [items, formRef]);
  
  

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="m-5 flex flex-col gap-4 rounded-2xl">
          {Array.from({ length: visibleCount }).map((_, i) => (
            <div key={i} className="flex h-16 bg-[var(--Gray7,#EEE)] items-center rounded-2xl px-5 py-3">
              <input className=" flex-1  outline-none font-pretendard text-[18px] font-medium leading-[135%] text-[var(--Gray-1,#2C2C2C)] placeholder:text-[var(--Gray-3,#B2B2B2)]" value={items[i] ?? ""}
                onChange={(e) => updateItem(i, e.target.value)}
                placeholder={`투표 항목 ${i + 1} 입력`} />

              { visibleCount > 2 && (
                <button type="button" onClick={() => removeItem(i)} className="shrink-0 w-6 h-6 grid place-items-center">
                  <img src="/src/assets/icons/Mask_group.svg" alt="" className="w-6 h-6" />
                </button>
              )}
            </div>
          ))}

          {visibleCount < 5 && (
            <button type="button" onClick={addItem} className="flex items-center justify-center w-full flex h-16 bg-[var(--Gray7,#EEE)] rounded-2xl text-center font-pretendard text-[18px] font-medium leading-[135%] text-[var(--Gray-1,#2C2C2C)]">+ 항목 추가 </button>
          )}
      </div>

      <div>
        <label className="flex items-center gap-5 px-5 py-[10px] ">
          <input type="checkbox" checked={duplication} className={`w-6 h-6 appearance-none cursor-pointer bg-center bg-no-repeat bg-contain  border-none ${duplication ? "bg-[url('/src/assets/icons/subway_cercle-8.svg')]": "bg-[url('/src/assets/icons/Ellipse57.svg')]"}`} 
          onChange={(e) =>{setDuplication(e.target.checked)
          formRef.current.duplication = e.target.checked; }} />
          
          <span className="text-[18px] font-medium font-pretendar text-[#2C2C2C] ">복수선택</span>
        </label>

        <label className="flex items-center gap-5 px-5 py-[10px]">
          <input type="checkbox" checked={anonymity} className={`w-6 h-6 appearance-none cursor-pointer bg-center bg-no-repeat bg-contain  border-none ${anonymity ? "bg-[url('/src/assets/icons/subway_cercle-8.svg')]": "bg-[url('/src/assets/icons/Ellipse57.svg')]"}`} 
          onChange={(e) =>{setAnonymity(e.target.checked)
          formRef.current.anonymity = e.target.checked; }} />
          
          <span className="text-[18px] font-medium font-pretendar text-[#2C2C2C] ">익명투표</span>
        </label>

        <label className="flex items-center gap-5 px-5 py-[10px]">
          <input type="checkbox" checked={important} className={`w-6 h-6 appearance-none cursor-pointer bg-center bg-no-repeat bg-contain  border-none ${important ? "bg-[url('/src/assets/icons/subway_cercle-8.svg')]": "bg-[url('/src/assets/icons/Ellipse57.svg')]"}`} 
          onChange={(e) =>{setImportant(e.target.checked)
          formRef.current.important = e.target.checked; }} />
          
          <span className="text-[18px] font-medium font-pretendar text-[#2C2C2C] ">중요여부</span>
        </label>
        
        <label className="flex items-center gap-3 px-5 py-2 cursor-pointer" onClick={(e) => {if (e.target !== inputRef.current) openPicker();}}>
        <img src="/src/assets/icons/일정.svg" className="w-6 h-6"/>

        <input ref={inputRef} type="datetime-local" value={deadLine} onChange={(e) => {
          formRef.current.deadline = e.target.value;
          setDeadLine(e.target.value); // 부모로 값 전달
        }}
            className="ml-2 text-[18px] font-medium font-pretendard leading-[135%] text-[var(--Gray-1,#2C2C2C)] border-none outline-none bg-transparent [&::-webkit-calendar-picker-indicator]:hidden"/>
        </label>
      </div>
    </div>
  )
}
