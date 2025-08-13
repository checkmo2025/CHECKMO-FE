import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookRecommendDetailCard from "../../components/BookRecommend/BookRecommendDetailCard";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import type { ModalButton } from "../../components/Modal";
import {
  useRecommendDetail,
  useDeleteRecommend,
} from "../../hooks/useRecommend";

const BookRecommendDetailPage = () => {
  const { bookclubId, recommendId } = useParams<{
    bookclubId: string;
    recommendId: string;
  }>();
  const navigate = useNavigate();
  const numericClubId = Number(bookclubId);
  const numericRecommendId = Number(recommendId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalButtons, setModalButtons] = useState<ModalButton[]>([]);

  const { data, isLoading, isError, error } = useRecommendDetail(
    numericClubId,
    numericRecommendId
  );

  const { mutate: deleteRecommend } = useDeleteRecommend(
    numericClubId,
    numericRecommendId
  );

  const closeModal = () => setIsModalOpen(false);

  const handleConfirmDelete = () => {
    deleteRecommend(undefined, {
      onSuccess: () => {
        setModalTitle("삭제가 완료되었습니다!");
        setModalButtons([
          {
            label: "돌아가기",
            onClick: () => {
              closeModal();
              navigate(`/bookclub/${numericClubId}/recommend`);
            },
          },
        ]);
        setIsModalOpen(true);
      },
      onError: () => {
        setModalTitle("삭제 실패");
        setModalButtons([{ label: "확인", onClick: closeModal }]);
        setIsModalOpen(true);
      },
    });
  };

  const openDeleteModal = () => {
    setModalTitle(
      `정말로 삭제하시겠습니까?\n한 번 삭제되면, 복구는 불가합니다.`
    );
    setModalButtons([
      {
        label: "삭제하기",
        onClick: handleConfirmDelete,
        variant: "primary",
      },
      { label: "취소하기", onClick: closeModal, variant: "outline" },
    ]);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="flex flex-col h-screen ml-5 mr-10">
        <div className="sticky top-0 bg-white z-10">
          <Header
            pageTitle={"추천 도서 상세"}
            userProfile={{
              username: "오즈",
              bio: "re_turnto_oz",
            }}
            notifications={[]}
            customClassName="mx-3 mb-5 mt-[30px]"
          />
        </div>
        <div className="flex-grow overflow-y-auto">
          {data && (
            <BookRecommendDetailCard
              clubId={numericClubId}
              recommendDetail={data}
              onDelete={openDeleteModal} // 모달을 여는 함수를 전달
            />
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        title={modalTitle}
        buttons={modalButtons}
        onBackdrop={closeModal}
      />
    </>
  );
};

export default BookRecommendDetailPage;
