import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BookRecommendCreateCard from "../../components/BookRecommend/BookRecommendCreateCard";
import { NonProfileHeader } from "../../components/NonProfileHeader";
import { useGetBookInfo, useCreateRecommend } from "../../hooks/useRecommend";
import type { PostRecommendDto } from "../../types/bookRecommend";
import Modal from "../../components/Modal";

const BookRecommendCreatePage = () => {
  const { bookclubId, bookId } = useParams<{
    bookclubId: string;
    bookId: string;
  }>();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: createRecommend } = useCreateRecommend(parseInt(bookclubId!));

  const { data: bookInfo, isLoading, isError, error } = useGetBookInfo(bookId!);

  const handleSubmit = (data: {
    title: string;
    content: string;
    rating: number;
    tag: string;
  }) => {
    if (!bookInfo) return;

    const postData: PostRecommendDto = {
      title: data.title,
      content: data.content,
      rate: data.rating,
      bookDetail: bookInfo,
      tag: data.tag,
    };

    createRecommend(postData, {
      onSuccess: () => {
        setIsModalOpen(true);
      },
    });
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate(`/bookclub/${bookclubId}/recommend`);
  };

  if (isLoading) {
    return <div>책 정보를 불러오는 중...</div>;
  }

  if (isError) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <div className="mx-10 pt-[80px]">
      <div className="w-full fixed top-0 bg-white z-10">
        <NonProfileHeader title="책 추천하기" />
      </div>
      {bookInfo && (
        <BookRecommendCreateCard bookInfo={bookInfo} onSubmit={handleSubmit} />
      )}
      <Modal
        isOpen={isModalOpen}
        onBackdrop={handleModalConfirm}
        title="등록이 완료되었습니다!"
        buttons={[
          {
            label: "돌아가기",
            onClick: handleModalConfirm,
            variant: "primary",
          },
        ]}
      />
    </div>
  );
};

export default BookRecommendCreatePage;
