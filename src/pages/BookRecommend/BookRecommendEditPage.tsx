import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Modal, { type ModalButton } from "../../components/Modal";
import BookRecommendEditCard from "../../components/BookRecommend/BookRecommendEditCard";
import { useEditRecommend } from "../../hooks/useRecommend";

const BookRecommendEditPage = () => {
  const { bookclubId, recommendId } = useParams<{
    bookclubId: string;
    recommendId: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();

  const clubId = Number(bookclubId);
  const recId = Number(recommendId);
  const initialData = location.state?.recommendDetail;

  // 성공/실패 알림 모달 (페이지 레벨)
  const [infoOpen, setInfoOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState("");
  const [infoButtons, setInfoButtons] = useState<ModalButton[]>([]);

  const { mutate: editRecommend } = useEditRecommend(clubId, recId);

  useEffect(() => {
    // 초기 데이터가 없으면 상세 페이지로 복귀
    if (!initialData) {
      navigate(`/bookclub/${clubId}/recommend/${recId}`);
    }
  }, [initialData, navigate, clubId, recId]);

  const defaultValues = useMemo(
    () =>
      initialData
        ? {
          title: initialData.title,
          content: initialData.content,
          rate: initialData.rate,
          tag: initialData.tag,
        }
        : { title: "", content: "", rate: 0, tag: "" },
    [initialData]
  );

  const handleSubmit = (form: {
    title: string;
    content: string;
    rate: number;
    tag: string;
  }) => {
    editRecommend(form, {
      onSuccess: () => {
        setInfoTitle("수정이 완료되었습니다!");
        setInfoButtons([
          {
            label: "돌아가기",
            onClick: () => {
              setInfoOpen(false);
              navigate(`/bookclub/${clubId}/recommend/${recId}`);
            },
          },
        ]);
        setInfoOpen(true);
      },
      onError: () => {
        setInfoTitle("수정에 실패했습니다.");
        setInfoButtons([{ label: "확인", onClick: () => setInfoOpen(false) }]);
        setInfoOpen(true);
      },
    });
  };

  const handleCancel = () => navigate(-1);

  if (!initialData) return <div>데이터를 불러오는 중...</div>;

  const { bookInfo } = initialData;

  return (
    <>
      <div className="flex flex-col h-screen ml-5 mr-10">
        <Header
          pageTitle={"추천 도서 수정"}
          customClassName="mx-3 mb-5 mt-[30px]"
        />
        <div className="flex-grow overflow-y-auto">
          <BookRecommendEditCard
            bookInfo={bookInfo}
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>

      <Modal
        isOpen={infoOpen}
        title={infoTitle}
        buttons={infoButtons}
        onBackdrop={() => setInfoOpen(false)}
      />
    </>
  );
};

export default BookRecommendEditPage;
