import {
    useState,
    useCallback,
    useEffect,
    useMemo,
    type KeyboardEvent,
    type ChangeEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import {
    useUpdateClubMeeting,
    useMeetingDetail,
} from "../../hooks/useClubMeeting";
import type { MeetingFormState, UpdateClubMeeting } from "../../types/clubMeeting";
import { NonProfileHeader } from "../../components/NonProfileHeader";
import { formatDateForInput } from "../../utils/formatDate";
import { useGetBookDetail } from "../../hooks/BookSearch/useBookSearch";

const MeetingEditPage = () => {
    const navigate = useNavigate();
    const { bookclubId, meetingId } = useParams<{
        bookclubId: string;
        meetingId: string;
    }>();
    const clubId = Number(bookclubId ?? 0);
    const meetId = Number(meetingId ?? 0);
    const [successModalOpen, setSuccessModalOpen] = useState(false);
    const [formState, setFormState] = useState<MeetingFormState>({
        tag: "",
        generation: "",
        meetingTime: "",
        location: "",
        title: "",
        content: "",
    });

    const { data: meetingDetailResult, isLoading: isDetailLoading } =
        useMeetingDetail(meetId);

    const isbnFromMeeting = useMemo(() => {
        const id = meetingDetailResult?.meetingInfo?.bookInfo?.bookId;
        return id != null ? String(id) : "";
    }, [meetingDetailResult]);

    const { data: bookDetail, isLoading: isBookLoading } = useGetBookDetail(isbnFromMeeting);
    useEffect(() => {
        if (!meetingDetailResult) return;
        const {
            tag,
            generation,
            meetingTime,
            location,
            title,
            content,
        } = meetingDetailResult.meetingInfo;

        setFormState({
            tag,
            generation: `${generation}기`,
            meetingTime: formatDateForInput(meetingTime),
            location,
            title,
            content,
        });
    }, [meetingDetailResult]);

    const [modal, setModal] = useState({ isOpen: false, message: "" });
    const showAlert = (message: string) => setModal({ isOpen: true, message });
    const closeModal = () => setModal({ isOpen: false, message: "" });

    const { mutate: updateMeeting, isPending } = useUpdateClubMeeting(meetId);

    const handleFormChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        const processedValue = name === "tag" ? value.slice(0, 6) : value;
        setFormState((prev) => ({ ...prev, [name]: processedValue }));
    };

    const handleTextareaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const target = e.currentTarget;
            const start = target.selectionStart;
            const end = target.selectionEnd;
            const newValue =
                formState.content.substring(0, start) +
                "\t" +
                formState.content.substring(end);
            setFormState((prev) => ({ ...prev, content: newValue }));
            requestAnimationFrame(() => {
                target.selectionStart = target.selectionEnd = start + 1;
            });
        }
    };

    const handleSuccessConfirm = () => {
        setSuccessModalOpen(false);
        navigate(`/bookclub/${clubId}/meeting/${meetId}`);
    };

    const handleSubmit = useCallback(() => {
        if (!clubId || !meetId) return showAlert("유효하지 않은 모임입니다.");

        const { title, tag, generation, meetingTime, location } = formState;
        if (!title.trim()) return showAlert("제목을 입력해주세요.");
        if (!tag.trim()) return showAlert("종류(태그)를 입력해주세요.");
        if (!generation.trim()) return showAlert("기수를 입력해주세요.");
        if (!meetingTime) return showAlert("날짜/시간을 선택해주세요.");
        if (!location.trim()) return showAlert("장소를 입력해주세요.");

        const payload: UpdateClubMeeting = {
            tag: tag.trim(),
            title: title.trim(),
            meetingTime: new Date(meetingTime).toISOString(),
            location: location.trim(),
            content: formState.content.trim(),
            generation: Number(generation.replace(/\D/g, "")) || 0,
        };

        updateMeeting(payload, {
            onSuccess: () => {
                setSuccessModalOpen(true);
            },
            onError: (err) => {
                console.error(err);
                showAlert("모임 수정에 실패했습니다. 다시 시도해주세요.");
            },
        });
    }, [clubId, meetId, formState, updateMeeting]);

    if (isDetailLoading || (isbnFromMeeting && isBookLoading)) {
        return <div>로딩 중...</div>;
    }

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
                title="수정이 완료되었습니다."
                buttons={[{ label: "확인", onClick: handleSuccessConfirm }]}
                onBackdrop={handleSuccessConfirm}
            />

            <NonProfileHeader title={"모임 수정하기"} />

            {bookDetail && (
                <div className="flex border-2 border-[var(--sub-color-2-brown,#EAE5E2)] rounded-2xl bg-white shadow-sm min-w-[700px]">
                    <div className="flex-1 flex p-[10px] gap-[20px]">
                        <div className="w-[136px] h-[192px] rounded-2xl overflow-hidden bg-gray-200 flex items-center justify-center">
                            <img
                                src={bookDetail.imgUrl}
                                alt={bookDetail.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 flex flex-col">
                            <div className="flex items-start gap-[5px] mb-4">
                                <img src="/assets/책 제목.svg" className="w-6 h-6" />
                                <div className="flex gap-[10px] items-center">
                                    <h2 className="font-[Pretendard] font-medium text-[18px] leading-[135%]">
                                        {bookDetail.title}
                                    </h2>
                                </div>
                            </div>
                            <span className="font-[Pretendard] font-semibold text-[12px] text-[#8D8D8D]">
                                {bookDetail.author}
                                {bookDetail.publisher ? ` | 출판 ${bookDetail.publisher}` : ""}
                            </span>
                            {bookDetail.description && (
                                <p className="font-[Pretendard] font-semibold text-[12px] mt-5">
                                    {bookDetail.description}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-5 min-w-[700px]">
                <label className="font-medium text-[18px] px-[6.5px]">
                    기수
                </label>
                <div
                    className="flex items-center h-[53px] py-[10px] px-[10px] rounded-2xl 
             bg-[var(--Color-4,#F4F2F1)] my-3 border-2 border-transparent
             hover:border-[#BFAB96] focus-within:border-[#A6917E] transition"
                >
                    <input
                        type="text"
                        name="generation"
                        placeholder="ex. 7기"
                        className="text-[18px] mx-[14px]  font-medium bg-transparent outline-none flex-1"
                        value={formState.generation}
                        onChange={handleFormChange}
                    />
                </div>


                <label className="font-medium text-[18px] px-[6.5px]">
                    종류
                </label>
                <div
                    className="flex items-center h-[53px] py-[10px] px-[10px] rounded-2xl 
             bg-[var(--Color-4,#F4F2F1)] my-3 border-2 border-transparent
             hover:border-[#BFAB96] focus-within:border-[#A6917E] transition"
                >
                    <input
                        type="text"
                        name="tag"
                        placeholder="최대 6글자로 입력해주세요."
                        className="text-[18px] mx-[14px]  font-medium bg-transparent outline-none flex-1"
                        value={formState.tag}
                        maxLength={6}
                        onChange={handleFormChange}
                    />
                </div>

                <label className="font-medium text-[18px] px-[6.5px]">
                    날짜
                </label>
                <div
                    className="flex items-center h-[53px] py-[10px] px-[17px] rounded-2xl 
             bg-[var(--Color-4,#F4F2F1)] my-3 border-2 border-transparent
             hover:border-[#BFAB96] focus-within:border-[#A6917E] transition"
                >
                    <img src="/assets/일정.svg" className="w-6 h-6" />
                    <input
                        type="datetime-local"
                        name="meetingTime"
                        value={formState.meetingTime}
                        onChange={handleFormChange}
                        className="text-[18px] mx-[14px]  font-medium bg-transparent outline-none flex-1"
                    />
                </div>

                <label className="font-medium text-[18px] px-[6.5px]">
                    장소
                </label>
                <div
                    className="flex items-center h-[53px] py-[10px] px-[10px] rounded-2xl 
             bg-[var(--Color-4,#F4F2F1)] my-3 border-2 border-transparent
             hover:border-[#BFAB96] focus-within:border-[#A6917E] transition"
                >
                    <img src="/assets/bx_map.svg" className="w-6 h-6" />
                    <input
                        type="text"
                        name="location"
                        placeholder="홍익대학교"
                        className="text-[18px] mx-[14px]  font-medium bg-transparent outline-none flex-1"
                        value={formState.location}
                        onChange={handleFormChange}
                    />
                </div>
            </div>

            <div
                className="w-full px-5 pb-5 pt-2 border-[#EAE5E2] border-2 rounded-2xl transition
                   hover:border-[#BFAB96] focus-within:border-[#A6917E] my-9 md:min-w-[700px]"
            >
                <input
                    type="text"
                    name="title"
                    value={formState.title}
                    onChange={handleFormChange}
                    placeholder="제목을 입력해주세요."
                    className="w-full h-[48px] border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-500  font-medium"
                />

                <textarea
                    name="content"
                    value={formState.content}
                    onChange={handleFormChange}
                    onKeyDown={handleTextareaKeyDown}
                    placeholder="내용을 자유롭게 입력해주세요."
                    className="mt-5 w-full min-h-[300px]  text-base outline-none leading-snug resize-none"
                />

                <div className="flex items-center justify-end gap-4 w-full">
                    <button
                        type="button"
                        disabled={isPending}
                        className="w-[105px] h-[35px] text-[12px] rounded-[16px] flex items-center justify-center font-[Pretendard] bg-[var(--button-brown,#A6917E)] text-white disabled:opacity-60 transition-colors duration-200 hover:bg-[#907E66]"
                        onClick={handleSubmit}
                    >
                        {isPending ? "수정 중…" : "수정하기"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MeetingEditPage;