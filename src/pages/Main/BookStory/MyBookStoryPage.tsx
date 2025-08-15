import { useState, useEffect } from "react";
import MyBookStoryCard from "../../../components/BookStory/MyBookStoryCard";
import { LayoutGrid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Modal, { type ModalButton } from "../../../components/Modal";
import {
  fetchBookStories,
  deleteBookStory,
} from "../../../apis/BookStory/bookstories";
import type { BookStoryResponseDto } from "../../../types/bookStories";
import { Pencil } from "lucide-react";

export default function MyBookStoryPage() {
  const [stories, setStories] = useState<BookStoryResponseDto[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState<number | null>(null);

  const nickname = localStorage.getItem("nickname") || "사용자";
  const navigate = useNavigate();

  useEffect(() => {
    const loadStories = async () => {
      setLoading(true);
      try {
        const data = await fetchBookStories({ scope: "MY" });
        setStories(data.bookStoryResponses || []);
      } catch (error) {
        console.error("내 책 이야기 조회 실패", error);
      } finally {
        setLoading(false);
      }
    };
    loadStories();
  }, []);

  const handleDelete = async () => {
    if (!selectedStoryId) return;
    try {
      await deleteBookStory(selectedStoryId);
      setStories((prev) =>
        prev.filter((s) => s.bookStoryId !== selectedStoryId)
      );
      setIsModalOpen(false);
      setSelectedStoryId(null);
    } catch (error) {
      console.error("삭제 실패", error);
      alert("삭제 실패했습니다.");
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
    <div className="absolute left-[315px] right-[42px] opacity-100">
      <Header
        pageTitle={`${nickname}님의 책 이야기`}
        customClassName="mt-[30px]"
      />
      <div className="overflow-y-auto h-[calc(100vh-80px)] w-full flex-1 pt-[30px] pl-[2px] pr-[30px] bg-[#FFFFFF]">
        <div className="flex justify-between items-center mb-6">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#A6917D] text-white text-sm font-medium cursor-pointer"
            onClick={() => navigate("/bookstory/search")}
          >
            <Pencil size={16} /> 책 이야기
          </button>
          <div className="flex gap-2">
            <button onClick={() => setViewMode("grid")}>
              <LayoutGrid
                size={20}
                className={viewMode === "grid" ? "text-black" : "text-gray-400"}
              />
            </button>
            <button onClick={() => setViewMode("list")}>
              <List
                size={20}
                className={viewMode === "list" ? "text-black" : "text-gray-400"}
              />
            </button>
          </div>
        </div>

        <div
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-2 gap-6"
              : "flex flex-col gap-4 w-full"
          }`}
        >
          {loading ? (
            <div>로딩 중...</div>
          ) : stories.length > 0 ? (
            stories.map((story) => (
              <MyBookStoryCard
                key={story.bookStoryId}
                imageUrl={story.bookInfo.imgUrl}
                title={story.bookStoryTitle}
                summary={story.description}
                bookTitle={story.bookStoryTitle}
                author={story.bookInfo.author}
                onEdit={() =>
                  navigate(`/bookstory/${story.bookStoryId}/detail`)
                }
                onDelete={() => {
                  setSelectedStoryId(story.bookStoryId);
                  setIsModalOpen(true);
                }}
                onClick={() =>
                  navigate(`/bookstory/${story.bookStoryId}/detail`)
                }
              />
            ))
          ) : (
            <div>데이터가 없습니다.</div>
          )}
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
