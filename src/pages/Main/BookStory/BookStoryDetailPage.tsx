import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";
import backIcon from "../../../assets/icons/backIcon.png";
import { axiosInstance } from "../../../apis/axiosInstance";
import type { BookStoryResponseDto } from "../../../types/bookStories";
import likeIcon from "../../../assets/icons/heartEmpty.png";
import likedIcon from "../../../assets/icons/heartFilled.png";
import {
  deleteBookStory,
  updateBookStory,
  toggleBookStoryLike,
} from "../../../apis/BookStory/bookstories";
import { toggleUserSubscription } from "../../../apis/User/user";
import Modal, { type ModalButton } from "../../../components/Modal";
import noProfileImage from "../../../assets/images/userImage.png";
import checkerImage from "../../../assets/images/checker.png";
import reportIcon from "../../../assets/icons/report3.png";
import editIcon from "../../../assets/icons/edit.png";
import editHoverIcon from "../../../assets/icons/editHover.png";
import deleteIcon from "../../../assets/icons/delete.png";
import deleteHoverIcon from "../../../assets/icons/deleteHover.png";
import { NonProfileHeader } from "../../../components/NonProfileHeader";

export default function BookStoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();

  const [story, setStory] = useState<BookStoryResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [isSubscribed, setIsSubscribed] = useState(false);

  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isEditHovered, setIsEditHovered] = useState(false);

  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: BookStoryResponseDto = await axiosInstance.get(
          `/book-stories/${storyId}`
        );
        console.log(data);

        setStory(data);
        setEditDescription(data.description);
        setLiked(data.likedByMe);
        setLikeCount(data.likes);
        setIsSubscribed(data.authorInfo.following);
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
      navigate(-1); // 이전 페이지(원래 있던 페이지)로 이동
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
        description: editDescription,
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert("수정 실패했습니다.");
    }
  };

  const handleEditCancel = () => {
    setEditDescription(description);
    setIsEditing(false);
  };

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

  const handleToggleSubscription = async () => {
    if (!authorInfo?.nickname) return;
    try {
      await toggleUserSubscription(authorInfo.nickname, isSubscribed);
      setIsSubscribed((prev) => !prev);
    } catch (err) {
      console.error("구독 처리에 실패했습니다.", err);
      alert("구독 처리에 실패했습니다.");
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
      <div className="pl-10">
        <NonProfileHeader title={bookStoryTitle} />
      </div>
      
      <div className="pl-4 mt-12 max-w-5xl mx-auto">
        <div
          className="flex items-center gap-2 w-fit cursor-pointer p-1 rounded-lg transition-colors duration-300 hover:bg-[#EEE] mb-6"
          onClick={() => {
            if (isMyStory) {
              navigate("/mypage/myprofile");
            } else {
              navigate(`/info/others/${authorInfo.nickname}`);
            }
          }}
        >
          <img
            src={authorInfo.profileImageUrl || noProfileImage}
            alt={authorInfo.nickname}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-base font-semibold pr-1">
            {authorInfo.nickname}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-8">
          <div className="w-full sm:w-64 h-80 rounded-xl bg-gray-200 overflow-hidden flex-shrink-0">
            <img
              src={bookInfo.imgUrl || checkerImage}
              alt={bookInfo.title}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col flex-1 h-80">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-semibold">{bookStoryTitle}</h1>
              {!isMyStory && (
                <button
                  onClick={handleToggleSubscription}
                  className={`w-[4.6rem] h-[2rem] px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                    isSubscribed
                      ? "bg-[#A6917D] text-white hover:bg-[#8c7a69]"
                      : "bg-white text-[#A6917D] border border-[#A6917D] hover:bg-[#A6917D] hover:text-white"
                  }`}
                >
                  {isSubscribed ? "구독 중" : "구독"}
                </button>
              )}
            </div>

            {isEditing ? (
              <textarea
                className="flex-1 p-2 border border-gray-300 rounded"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-line mb-6">
                {description}
              </p>
            )}

            <div className="flex-grow" />

            <div className="flex flex-col items-end text-gray-400 text-xs gap-[1rem]">
              <div className="text-right">
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
                          <Check size={18} />
                        </button>
                        <button
                          className="cursor-pointer"
                          onClick={handleEditCancel}
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="cursor-pointer"
                          onClick={() => setIsModalOpen(true)}
                          onMouseEnter={() => setIsDeleteHovered(true)}
                          onMouseLeave={() => setIsDeleteHovered(false)}
                        >
                          <img
                            src={isDeleteHovered ? deleteHoverIcon : deleteIcon}
                            alt="삭제"
                            className="w-6 h-6"
                          />
                        </button>
                        <button
                          className="cursor-pointer"
                          onClick={() => setIsEditing(true)}
                          onMouseEnter={() => setIsEditHovered(true)}
                          onMouseLeave={() => setIsEditHovered(false)}
                        >
                          <img
                            src={isEditHovered ? editHoverIcon : editIcon}
                            alt="수정"
                            className="w-6 h-6"
                          />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div
                      className="flex items-center gap-1 sm:gap-2 text-sm text-gray-600 cursor-pointer"
                      onClick={handleLike}
                    >
                      <img
                        src={liked ? likedIcon : likeIcon}
                        alt="좋아요"
                        className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer"
                      />
                      <span>{likeCount}</span>
                    </div>
                    <button>
                      <img
                        src={reportIcon}
                        alt="신고"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        title={"삭제 하시겠습니까 ?\n한 번 삭제되면, 복구는 불가합니다."}
        buttons={modalButtons}
        onBackdrop={() => setIsModalOpen(false)}
      />
    </div>
  );
}
