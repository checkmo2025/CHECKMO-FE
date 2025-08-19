import { useState, useCallback, type KeyboardEvent, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BookSearch from "../../components/Search/BookSearch";
import Modal from "../../components/Modal";
import type { SearchBook, Action } from "../../types/BookSearchdto";
import { useCreateClubMeeting } from "../../hooks/useClubMeeting";
import type { CreateClubMeeting } from "../../types/clubMeeting";
import { NonProfileHeader } from "../../components/NonProfileHeader";

type MeetingFormState = {
  tag: string;
  generation: string;
  meetingTime: string;
  location: string;
  title: string;
  content: string;
};

const MeetingCreatePage = () => {
  const navigate = useNavigate();
  const { bookclubId } = useParams<{ bookclubId: string }>();
  const clubId = Number(bookclubId ?? 0);

  const [isSelected, setIsSelected] = useState(false);
  const [selectedBook, setSelectedBook] = useState<SearchBook | null>(null);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [createdMeetingId, setCreatedMeetingId] = useState<number | null>(null);

  // 폼 상태를 하나의 객체로 관리
  const [formState, setFormState] = useState<MeetingFormState>({
    tag: "",
    generation: "",
    meetingTime: "",
    location: "",
    title: "",
    content: "",
  });

  // 모달 상태
  const [modal, setModal] = useState({ isOpen: false, message: "" });

  const showAlert = (message: string) => setModal({ isOpen: true, message });
  const closeModal = () => setModal({ isOpen: false, message: "" });

  // 생성 훅
  const { mutate: createMeeting, isPending } = useCreateClubMeeting(clubId);

  // 폼 입력 변경을 처리하는 공통 핸들러
  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const processedValue = name === "tag" ? value.slice(0, 6) : value;
    setFormState((prev) => ({ ...prev, [name]: processedValue }));
  };

  const actions: Action[] = [
    {
      label: "선택하기",
      onClick: (book: SearchBook) => {
        setSelectedBook(book);
        setIsSelected(true);
      },
      className: "bg-[var(--button-brown,#A6917E)] text-white",
    },
  ];

  // textarea에서 Tab 입력 처리(들여쓰기)
  const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue =
        formState.content.substring(0, start) +
        "	" +
        formState.content.substring(end);
      setFormState((prev) => ({ ...prev, content: newValue }));
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + 1;
      });
    }
  };

  const handleSuccessConfirm = () => {
    setSuccessModalOpen(false);
    const navigateTo = createdMeetingId
      ? `/bookclub/${clubId}/meeting/${createdMeetingId}`
      : `/bookclub/${clubId}/meeting`;
    navigate(navigateTo);
  };

  const handleSubmit = useCallback(() => {
    if (!clubId) return showAlert("유효하지 않은 클럽입니다.");
    if (!isSelected || !selectedBook) return showAlert("책을 먼저 선택하세요.");

    const { title, tag, generation, meetingTime, location } = formState;
    if (!title.trim()) return showAlert("제목을 입력해주세요.");
    if (!tag.trim()) return showAlert("종류(태그)를 입력해주세요.");
    if (!generation.trim()) return showAlert("기수를 입력해주세요.");
    if (!meetingTime) return showAlert("날짜/시간을 선택해주세요.");
    if (!location.trim()) return showAlert("장소를 입력해주세요.");

    const payload: CreateClubMeeting = {
      tag: tag.trim(),
      title: title.trim(),
      meetingTime: new Date(meetingTime).toISOString(),
      location: location.trim(),
      content: formState.content.trim(),
      generation: Number(generation.replace(/\D/g, "")) || 0,
      bookInfo: {
        isbn: selectedBook.isbn,
        title: selectedBook.title,
        author: selectedBook.author,
        imgUrl: selectedBook.imgUrl,
        publisher: selectedBook.publisher,
        description: selectedBook.description,
      },
    };

    createMeeting(payload, {
      onSuccess: (data: any) => {
        const createdId = data?.result?.meetingId ?? data?.meetingId;
        setCreatedMeetingId(createdId ?? null);
        setSuccessModalOpen(true);
      },
      onError: (err) => {
        console.error(err);
        showAlert("모임 생성에 실패했습니다. 다시 시도해주세요.");
      },
    });
  }, [clubId, isSelected, selectedBook, formState, createMeeting]);

  return (
    <div className="mx-10">
      <Modal
        isOpen={modal.isOpen}
        title={modal.message}
        buttons={[{ label: "확인", onClick: closeModal }]}
        onBackdrop={closeModal}
      />
      <Modal
        isOpen={successModalOpen}
        title="등록이 완료되었습니다."
        buttons={[{ label: "확인", onClick: handleSuccessConfirm }]}
        onBackdrop={handleSuccessConfirm}
      />

      <NonProfileHeader title={"모임 생성하기"} />

      {!isSelected && (
        <div className="min-w-[700px]">
          <BookSearch SearchResultHeight={290} actions={actions} />
        </div>
      )}

      {isSelected && selectedBook && (
        <div className="flex border-2 border-[var(--sub-color-2-brown,#EAE5E2)] rounded-2xl bg-white shadow-sm mt-9 min-w-[700px]">
          <div className="flex-1 flex p-[10px] gap-[20px]">
            <div className="w-[136px] h-[192px] rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
              <img
                src={selectedBook.imgUrl}
                alt={selectedBook.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex items-start gap-[5px] mb-4">
                <img src="/assets/책 제목.svg" className="w-6 h-6" />
                <div className="flex gap-[10px] items-center">
                  <h2 className="font-[Pretendard] font-medium text-[18px] leading-[135%]">
                    {selectedBook.title}
                  </h2>
                </div>
              </div>
              <span className="font-[Pretendard] font-semibold text-[12px] text-[#8D8D8D]">
                {selectedBook.author} | 출판 {selectedBook.publisher}
              </span>
              <p className="font-[Pretendard] font-semibold text-[12px] mt-5">
                {selectedBook.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center p-[10px] gap-[10px]">
            <button
              type="button"
              className="w-[105px] h-[35px] text-[12px] rounded-[16px] flex items-center justify-center font-[Pretendard] font-medium bg-[var(--button-brown,#A6917E)] text-white"
            >
              선택됨
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSelected(false);
                setSelectedBook(null);
              }}
              className="w-[105px] h-[35px] text-[12px] rounded-[16px] flex items-center justify-center font-[Pretendard] font-medium bg-white text-black border-[1.5px] border-[var(--sub-color-1-brown,#BFAB96)]"
            >
              변경하기
            </button>
          </div>
        </div>
      )}

      <div className="mt-5 min-w-[700px]">
        <label className="font-pretendard font-medium text-[18px] px-[6.5px]">
          기수
        </label>
        <div className="flex items-center h-[53px] py-[10px] px-[10px] rounded-2xl bg-[var(--Color-4,#F4F2F1)] mt-3">
          <input
            type="text"
            name="generation"
            placeholder="ex. 7기"
            className="text-[18px] mx-[14px] font-pretendard font-medium bg-transparent outline-none flex-1"
            value={formState.generation}
            onChange={handleFormChange}
          />
        </div>
      </div>

      <div className="mt-5 min-w-[700px]">
        <label className="font-pretendard font-medium text-[18px] px-[6.5px]">
          종류
        </label>
        <div className="flex items-center h-[53px] py-[10px] px-[10px] rounded-2xl bg-[var(--Color-4,#F4F2F1)] mt-3">
          <input
            type="text"
            name="tag"
            placeholder="최대 6글자로 입력해주세요."
            className="text-[18px] mx-[14px] font-pretendard font-medium bg-transparent outline-none flex-1"
            value={formState.tag}
            maxLength={6}
            onChange={handleFormChange}
          />
        </div>
      </div>

      <div className="mt-5 min-w-[700px]">
        <label className="font-pretendard font-medium text-[18px] px-[6.5px]">
          날짜
        </label>
        <div className="flex items-center h-[53px] py-[10px] px-[17px] rounded-2xl bg-[var(--Color-4,#F4F2F1)] mt-3">
          <img src="/assets/일정.svg" className="w-6 h-6" />
          <input
            type="datetime-local"
            name="meetingTime"
            value={formState.meetingTime}
            onChange={handleFormChange}
            className="text-[18px] mx-[14px] font-pretendard font-medium bg-transparent outline-none flex-1"
          />
        </div>
      </div>

      <div className="mt-5 min-w-[700px]">
        <label className="font-pretendard font-medium text-[18px] px-[6.5px]">
          장소
        </label>
        <div className="flex items-center h-[53px] py-[10px] px-[10px] rounded-2xl bg-[var(--Color-4,#F4F2F1)] mt-3">
          <img src="/assets/bx_map.svg" className="w-6 h-6" />
          <input
            type="text"
            name="location"
            placeholder="홍익대학교"
            className="text-[18px] mx-[14px] font-pretendard font-medium bg-transparent outline-none flex-1"
            value={formState.location}
            onChange={handleFormChange}
          />
        </div>
      </div>

      <div className="w-full flex flex-col items-center p-5 gap-[20px] border-2 border-[var(--sub-color-2-brown,#EAE5E2)] rounded-[16px] bg-white my-9 min-w-[700px]">
        <input
          type="text"
          name="title"
          value={formState.title}
          onChange={handleFormChange}
          placeholder="제목을 입력해주세요."
          className="w-full h-[48px] border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-500 font-pretendard font-medium"
        />

        <textarea
          name="content"
          value={formState.content}
          onChange={handleFormChange}
          onKeyDown={handleTextareaKeyDown}
          placeholder="내용을 자유롭게 입력해주세요."
          className="mt-5 w-full min-h-[300px] font-pretendard text-base outline-none leading-snug resize-none"
        />

        <div className="flex items-center justify-end gap-4 w-full">
          <button
            type="button"
            className="w-[105px] h-[35px] text-[12px] rounded-[16px] flex items-center justify-center font-[Pretendard] bg-white border-[1.5px] border-[var(--sub-color-1-brown,#BFAB96)] transition-colors duration-200 hover:bg-[#F4F2F1]"
            onClick={() => showAlert("임시저장 기능은 추후 구현 예정입니다.")}
          >
            임시저장
          </button>

          <button
            type="button"
            disabled={isPending}
            className="w-[105px] h-[35px] text-[12px] rounded-[16px] flex items-center justify-center font-[Pretendard] bg-[var(--button-brown,#A6917E)] text-white disabled:opacity-60 transition-colors duration-200 hover:bg-[#907E66]"
            onClick={handleSubmit}
          >
            {isPending ? "생성 중…" : "생성하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetingCreatePage;