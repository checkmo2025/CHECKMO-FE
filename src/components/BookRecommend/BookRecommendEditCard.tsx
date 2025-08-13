import { useEffect, useState } from "react";
import StarSelector from "./StarSelector";
import ActionButton from "./ActionButton";
import Modal from "../Modal";
import type { BookDetail } from "../../types/bookRecommend";

type EditForm = {
  title: string;
  content: string;
  rate: number;
  tag: string;
};

interface BookRecommendEditCardProps {
  bookInfo: BookDetail;
  defaultValues: EditForm;
  onSubmit: (data: EditForm) => void;
  onCancel: () => void;
}

const BookRecommendEditCard = ({
  bookInfo,
  defaultValues,
  onSubmit,
  onCancel,
}: BookRecommendEditCardProps) => {
  const [title, setTitle] = useState(defaultValues.title);
  const [rate, setRate] = useState(defaultValues.rate);
  const [content, setContent] = useState(defaultValues.content);
  const [tag, setTag] = useState(defaultValues.tag);

  // 확인/알림 모달 (카드 내부에서 확인 처리)
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalButtons, setModalButtons] = useState<
    {
      label: string;
      onClick: () => void;
      variant?: "primary" | "outline" | "danger";
    }[]
  >([]);

  // defaultValues가 바뀌면 폼 초기화
  useEffect(() => {
    setTitle(defaultValues.title);
    setRate(defaultValues.rate);
    setContent(defaultValues.content);
    setTag(defaultValues.tag);
  }, [defaultValues]);

  const openConfirm = () => {
    setModalTitle("수정하시겠습니까?");
    setModalButtons([
      { label: "수정하기", variant: "primary", onClick: handleConfirmEdit },
      {
        label: "취소하기",
        variant: "outline",
        onClick: () => setModalOpen(false),
      },
    ]);
    setModalOpen(true);
  };

  const handleConfirmEdit = () => {
    const processedTag = tag
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .join(",");

    if (
      !title.trim() ||
      !content.trim() ||
      !processedTag ||
      rate === undefined ||
      rate === null
    ) {
      setModalTitle("제목, 별점, 내용, 태그를 모두 입력해 주세요.");
      setModalButtons([{ label: "확인", onClick: () => setModalOpen(false) }]);
      return;
    }

    setModalOpen(false);
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      rate,
      tag: processedTag,
    });
  };

  return (
    <>
      <div className="mt-2 p-4">
        <h1 className="text-3xl font-bold min-w-[650px]">{bookInfo.title}</h1>
        <p className="mt-6 mb-4 text-sm text-gray-500">{bookInfo.author}</p>

        <section className="flex h-2/3 min-h-[500px] flex-col md:flex-row">
          <div className="min-w-[350px] rounded-xl overflow-hidden">
            <img
              src={bookInfo.imgUrl}
              alt={bookInfo.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col w-2/3 min-w-[300px]  ml-8 mt-6 md:mt-0">
            <label className="block mb-2 font-semibold">제목</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="추천 제목을 입력해주세요."
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <label className="block mt-6 mb-2 font-semibold">태그</label>
            <input
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="태그를 입력해주세요. (쉼표로 구분)"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <label className="block mt-6 mb-2 font-semibold">별점 선택</label>
            <div className="flex items-center">
              <StarSelector value={rate} onChange={setRate} size={20} />
            </div>

            <label className="block mt-6 mb-2 font-semibold">
              책 소개 및 추천 이유 작성
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 작성해주세요."
              className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </section>
      </div>

      <div className="flex flex-col mt-10 my-8 md:flex-row md:justify-end md:space-x-2 space-y-2 md:space-y-0 mr-4">
        <ActionButton
          onClick={openConfirm}
          label="수정완료"
          className="w-full sm:w-auto px-7.5 py-2 bg-[#A6917D] text-white text-xs border-2 border-[#A6917D] rounded-2xl hover:bg-[#907E66] transition"
        />
        <ActionButton
          onClick={onCancel}
          label="수정취소"
          className="w-full sm:w-auto px-7.5 py-2 bg-white text-black text-xs border-2 border-[#A6917D] rounded-2xl hover:bg-gray-200 transition"
        />
      </div>

      {/* 카드 내부 확인/알림 모달 */}
      <Modal
        isOpen={modalOpen}
        title={modalTitle}
        buttons={modalButtons}
        onBackdrop={() => setModalOpen(false)}
      />
    </>
  );
};

export default BookRecommendEditCard;
