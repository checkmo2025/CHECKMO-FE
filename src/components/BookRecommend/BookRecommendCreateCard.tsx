import { useState } from "react";
import type { BookDto } from "../../types/dto";
import StarSelector from "./StarSelector";
import Modal from "../Modal";
import ActionButton from "./ActionButton";

interface BookRecommendCreateCardProps {
  bookInfo: BookDto;
}

const BookRecommendCreateCard = ({
  bookInfo,
}: BookRecommendCreateCardProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState<string | undefined>(
    undefined
  );
  const [modalButtons, setModalButtons] = useState<
    {
      label: string;
      onClick: () => void;
      variant?: "primary" | "outline" | "danger";
    }[]
  >([]); // zustand 같은 상태 관리 툴로 교체 할 예정

  // 실제 등록 처리
  const doSubmit = () => {
    // TODO: API 호출
    console.log({ rating, content });
    setModalTitle("등록이 완료되었습니다!");
    setModalContent(undefined);
    setModalButtons([
      { label: "돌아가기", onClick: () => setModalOpen(false) },
    ]);
    setModalOpen(true);
  };

  // 확인 모달에서 "등록하기" 클릭 시, 호출
  const openConfirmModal = () => {
    setModalTitle("등록하시겠습니까?");
    setModalButtons([
      { label: "등록하기", variant: "outline", onClick: onConfirm },
      { label: "취소하기", onClick: () => setModalOpen(false) },
    ]);
    setModalOpen(true);
  };

  const onConfirm = () => {
    // 유효성 검사
    if (!rating || !content.trim()) {
      setModalTitle("입력 오류");
      setModalContent("별점과 추천 이유를 모두 입력해 주세요.");
      setModalButtons([{ label: "확인", onClick: () => setModalOpen(false) }]);
      return;
    }
    doSubmit();
  };

  return (
    <>
      <div className="mx-auto mt-2 p-4">
        <h1 className=" text-3xl font-bold">{bookInfo.title}</h1>
        <p className="mt-6 mb-4 text-sm text-gray-500">
          {bookInfo.author}
          {" | "}
          {bookInfo.publisher}
          {" | "}
          {/* {format(new Date(bookInfo.createdAt), "yyyy.MM.dd")} */}
        </p>

        <section className="flex h-2/3 min-h-[500px]">
          <div className="w-1/3 min-w-[300px] rounded-xl overflow-hidden">
            <img
              // src={bookInfo.imgUrl}
              src="/chess.png"
              alt={bookInfo.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="ml-8 flex flex-col flex-start w-2/3 min-w-[300px]">
            <label className="block mb-2 font-semibold">별점 선택</label>
            <div className="flex items-center">
              <StarSelector value={rating} onChange={setRating} size={20} />
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
      <div className="flex justify-end mr-4">
        <ActionButton onClick={openConfirmModal} label="등록하기" />
      </div>
      <Modal
        isOpen={modalOpen}
        title={modalTitle}
        content={modalContent}
        buttons={modalButtons}
        onBackdrop={() => setModalOpen(false)}
      />
    </>
  );
};

export default BookRecommendCreateCard;
