// import { useState, useEffect } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { useEditRecommend } from "../../hooks/useRecommend";
// import Header from "../../components/Header";
// import StarSelector from "../../components/BookRecommend/StarSelector";
// import ActionButton from "../../components/BookRecommend/ActionButton";
// import Modal from "../../components/Modal";
// import type { ModalButton } from "../../components/Modal";

// const BookRecommendEditPage = () => {
//   const { bookclubId, recommendId } = useParams<{
//     bookclubId: string;
//     recommendId: string;
//   }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const numericClubId = Number(bookclubId);
//   const numericRecommendId = Number(recommendId);
//   const initialData = location.state?.recommendDetail;

//   const [content, setContent] = useState("");
//   const [rate, setRate] = useState(0);
//   const [tag, setTag] = useState("");
//   const [title, setTitle] = useState("");

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalTitle, setModalTitle] = useState("");
//   const [modalButtons, setModalButtons] = useState<ModalButton[]>([]);

//   const { mutate: editRecommend } = useEditRecommend(
//     numericClubId,
//     numericRecommendId
//   );

//   useEffect(() => {
//     if (initialData) {
//       setTitle(initialData.title);
//       setContent(initialData.content);
//       setRate(initialData.rate);
//       setTag(initialData.tag);
//     } else {
//       // 초기 데이터가 없으면 상세 페이지로 돌려보냄
//       navigate(`/bookclub/${numericClubId}/recommend/${numericRecommendId}`);
//     }
//   }, [initialData, navigate, numericClubId, numericRecommendId]);

//   const closeModal = () => setIsModalOpen(false);

//   // 1. 수정 확인 모달 열기
//   const openConfirmModal = () => {
//     setModalTitle("수정하시겠습니까?");
//     setModalButtons([
//       {
//         label: "수정하기",
//         onClick: handleConfirmEdit,
//         variant: "primary",
//       },
//       { label: "취소하기", onClick: closeModal, variant: "outline" },
//     ]);
//     setIsModalOpen(true);
//   };

//   // 2. 확인 모달에서 '수정' 클릭 시 실행
//   const handleConfirmEdit = () => {
//     editRecommend(
//       { title, content, rate, tag },
//       {
//         onSuccess: () => {
//           setModalTitle("수정이 완료되었습니다!");
//           setModalButtons([
//             {
//               label: "돌아가기",
//               onClick: () => {
//                 closeModal();
//                 navigate(
//                   `/bookclub/${numericClubId}/recommend/${numericRecommendId}`
//                 );
//               },
//             },
//           ]);
//           setIsModalOpen(true); // 성공 모달 열기
//         },
//         onError: (error) => {
//           setModalTitle("수정이 실패했습니다!");
//           setModalButtons([{ label: "확인", onClick: closeModal }]);
//           setIsModalOpen(true); // 실패 모달 열기
//         },
//       }
//     );
//   };

//   const handleCancel = () => {
//     navigate(-1);
//   };

//   if (!initialData) return <div>데이터를 불러오는 중...</div>;

//   const { bookInfo } = initialData;

//   return (
//     <>
//       <div className="flex flex-col h-screen ml-5 mr-10">
//         <Header pageTitle="추천 도서 수정" />
//         <div className="flex-grow overflow-y-auto mt-4">
//           <section className="flex-grow flex flex-col md:flex-row md:space-x-8 min-h-0">
//             <div className="w-full md:w-1/3 h-48 md:h-full flex-shrink-0 mb-4 md:mb-0">
//               <img
//                 src={bookInfo.imgUrl}
//                 alt={bookInfo.title}
//                 className="w-full h-full object-contain rounded-lg"
//               />
//             </div>

//             <div className="flex flex-col flex-1 min-h-0">
//               <div className="flex-grow flex flex-col space-y-4 pr-2">
//                 <div>
//                   <label className="font-semibold">제목</label>
//                   <input
//                     type="text"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>
//                 <div>
//                   <label className="font-semibold">태그</label>
//                   <input
//                     type="text"
//                     value={tag}
//                     onChange={(e) => setTag(e.target.value)}
//                     className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                   />
//                 </div>

//                 <label className="block mb-2 font-semibold">별점 선택</label>
//                 <div className="flex items-center">
//                   <StarSelector value={rate} onChange={setRate} size={20} />
//                 </div>

//                 <div className="flex flex-col flex-grow">
//                   <label className="font-semibold">추천 내용</label>
//                   <textarea
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
//                   />
//                 </div>
//               </div>

//               <div className="flex flex-col mt-10 sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
//                 <ActionButton
//                   onClick={openConfirmModal} // 수정 확인 모달 열기
//                   label="수정완료"
//                   className="w-full sm:w-auto px-7.5 py-2 bg-[#A6917D] text-white text-xs border-2 border-[#A6917D] rounded-2xl hover:bg-[#907E66] transition"
//                 />
//                 <ActionButton
//                   onClick={handleCancel}
//                   label="수정취소"
//                   className="w-full sm:w-auto px-7.5 py-2 bg-white text-black text-xs border-2 border-[#A6917D] rounded-2xl hover:bg-gray-200 transition"
//                 />
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//       <Modal
//         isOpen={isModalOpen}
//         title={modalTitle}
//         buttons={modalButtons}
//         onBackdrop={closeModal}
//       />
//     </>
//   );
// };

// export default BookRecommendEditPage;
// pages/BookRecommend/BookRecommendEditPage.tsx

import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
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
  const [infoButtons, setInfoButtons] = useState<
    {
      label: string;
      onClick: () => void;
      variant?: "primary" | "outline" | "danger";
    }[]
  >([]);

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
          userProfile={{
            username: "오즈",
            bio: "re_turnto_oz",
          }}
          notifications={[]}
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
