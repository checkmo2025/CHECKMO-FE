import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Trash2, Edit2, AlertCircle, Check, X } from "lucide-react";
import backIcon from "../../../assets/icons/backIcon.png";
import { axiosInstance } from "../../../apis/axiosInstance";
import type { BookStoryResponseDto } from "../../../types/bookStories";
import likeIcon from "../../../assets/icons/heart_empty.png";
import likedIcon from "../../../assets/icons/heart_filled.png";
import {
  deleteBookStory,
  updateBookStory,
  toggleBookStoryLike,
} from "../../../apis/BookStory/bookstories";
import Modal, { type ModalButton } from "../../../components/Modal";

export default function BookStoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();

  const [story, setStory] = useState<BookStoryResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: BookStoryResponseDto = await axiosInstance.get(
          `/book-stories/${storyId}`
        );

        setStory(data);
        setEditTitle(data.bookStoryTitle);
        setEditDescription(data.description);
        setLiked(data.likedByMe);
        setLikeCount(data.likes);
      } catch (err: any) {
        console.error(err);
        setError("책 이야기 조회에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!story) return <div>해당 스토리를 찾을 수 없습니다.</div>;

  const { bookStoryTitle, authorInfo, description, bookInfo, writtenByMe } =
    story;
  const isMyStory = writtenByMe;

  const handleDelete = async () => {
    if (!storyId) return;
    try {
      await deleteBookStory(Number(storyId));
      setIsModalOpen(false);
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("삭제 실패했습니다.");
    }
  };

  const handleEditSave = async () => {
    if (!storyId) return;
    try {
      await updateBookStory(Number(storyId), { description: editDescription });
      setStory({
        ...story!,
        bookStoryTitle: editTitle,
        description: editDescription,
      });
      setIsEditing(false);
      alert("수정되었습니다.");
    } catch (err) {
      console.error(err);
      alert("수정 실패했습니다.");
    }
  };

  const handleEditCancel = () => {
    setEditTitle(bookStoryTitle);
    setEditDescription(description);
    setIsEditing(false);
  };

  // 좋아요 / 취소
  const handleLike = async () => {
    if (!storyId) return;
    try {
      await toggleBookStoryLike(Number(storyId));
      setLiked((prev) => !prev);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("좋아요 실패", err);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  const modalButtons: ModalButton[] = [
    {
      label: "삭제하기",
      variant: "outline",
      onClick: handleDelete,
    },
    {
      label: "취소하기",
      variant: "primary",
      onClick: () => setIsModalOpen(false),
    },
  ];

  return (
    <div>
      <div className="pt-10 pl-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-lg font-semibold mb-4"
          type="button"
        >
          <img src={backIcon} alt="뒤로가기" className="w-5 h-5" />
          {bookStoryTitle}
        </button>
      </div>

      <div className="pl-10 mt-12 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <img
            src={authorInfo.profileImageUrl}
            alt={authorInfo.nickname}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-base font-semibold">{authorInfo.nickname}</span>
        </div>

        <div className="flex gap-8">
          <div className="w-64 h-80 rounded-xl bg-gray-200 overflow-hidden">
            {bookInfo.imgUrl ? (
              <img
                src={bookInfo.imgUrl}
                alt={bookInfo.title}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                이미지 없음
              </div>
            )}
          </div>

          <div className="flex flex-col flex-1 h-80">
            {isEditing ? (
              <>
                <input
                  className="text-2xl font-semibold mb-4 border border-gray-300 p-1"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <textarea
                  className="flex-1 p-2 border border-gray-300 rounded"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-semibold mb-4">
                  {bookStoryTitle}
                </h1>
                <p className="text-sm leading-relaxed whitespace-pre-line mb-6">
                  {description}
                </p>
              </>
            )}
            <div className="flex-grow" />

            <div className="flex items-center justify-between text-gray-400 text-xs">
              <div>
                도서 : {bookInfo.title} | {bookInfo.author}
              </div>
              <div className="flex items-center gap-4">
                {isMyStory ? (
                  <>
                    {isEditing ? (
                      <>
                        <button
                          className="cursor-pointer"
                          onClick={handleEditSave}
                        >
                          <Check size={16} />
                        </button>
                        <button
                          className="cursor-pointer"
                          onClick={handleEditCancel}
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="cursor-pointer"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <Trash2 size={16} />
                        </button>
                        <button
                          className="cursor-pointer"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit2 size={16} />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div
                      className="flex items-center gap-1 text-sm text-gray-600 cursor-pointer"
                      onClick={handleLike}
                    >
                      <img
                        src={liked ? likedIcon : likeIcon}
                        alt="좋아요"
                        className="w-[19px] h-[]19px] cursor-pointer"
                      />
                      <span>{likeCount}</span>
                    </div>
                    <button>
                      <AlertCircle size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={isModalOpen}
        title={"삭제 하시겠습니까 ?\n한 번 삭제되면, 복구는 불가합니다."}
        buttons={modalButtons}
        onBackdrop={() => setIsModalOpen(false)}
      />
    </div>
  );
}
