import { useRef, useCallback, useState } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { Pencil, Trash2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMyBookStories } from "../../../../hooks/My/useMyBookStories";
import type { BookStoryResponseDto, BookStoriesResult } from "../../../../types/bookStories";
import { deleteBookStory, updateBookStory } from "../../../../apis/BookStory/bookstories";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";

const MyStoryPage = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useMyBookStories();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const observerRef = useRef<IntersectionObserver | null>(null);

  // 삭제
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteBookStory(id),
    onMutate: async (id: number) => {
      await qc.cancelQueries({ queryKey: ["bookStories", "MY"] });
      const prevData = qc.getQueryData<InfiniteData<BookStoriesResult>>([
        "bookStories",
        "MY",
      ]);
      qc.setQueryData<InfiniteData<BookStoriesResult>>(
        ["bookStories", "MY"],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              bookStoryResponses: page.bookStoryResponses.filter(
                (story) => story.bookStoryId !== id
              ),
            })),
          };
        }
      );
      return { prevData };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prevData) {
        qc.setQueryData(["bookStories", "MY"], ctx.prevData);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["bookStories", "MY"] });
    },
  });

  // 수정
  const updateMutation = useMutation({
    mutationFn: ({ id, description }: { id: number; description: string }) =>
      updateBookStory(id, { description }),
    onMutate: async ({ id, description }) => {
      await qc.cancelQueries({ queryKey: ["bookStories", "MY"] });
      const prevData = qc.getQueryData<InfiniteData<BookStoriesResult>>([
        "bookStories",
        "MY",
      ]);
      qc.setQueryData<InfiniteData<BookStoriesResult>>(
        ["bookStories", "MY"],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              bookStoryResponses: page.bookStoryResponses.map((story) =>
                story.bookStoryId === id ? { ...story, description } : story
              ),
            })),
          };
        }
      );
      return { prevData };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prevData) {
        qc.setQueryData(["bookStories", "MY"], ctx.prevData);
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["bookStories", "MY"] });
    },
  });

  // 무한 스크롤
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const stories =
    data?.pages
      ?.flatMap((page) => page.bookStoryResponses)
      ?.filter(
        (story, index, self) =>
          index === self.findIndex((s) => s.bookStoryId === story.bookStoryId)
      ) ?? [];

  // 삭제 버튼 클릭
  const handleDelete = (id: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteMutation.mutate(id);
    }
  };

  // 수정 모드 진입 (제목은 수정 불가)
  const handleEdit = (story: BookStoryResponseDto) => {
    setEditingId(story.bookStoryId);
    setEditContent(story.description);
  };

  // 수정 저장
  const handleSave = (id: number) => {
    updateMutation.mutate({ id, description: editContent });
    setEditingId(null);
  };

  return (
    <div className="flex w-full h-screen bg-[#FAFAFA] overflow-hidden">
      <MyPageHeader title="내 책 이야기" />
      <div className="flex-1 flex flex-col pt-[96px] overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="px-10 py-8">
            <div className="space-y-6">
              {stories.map((story, idx) => (
                <div
                  key={`${story.bookStoryId}-${idx}`}
                  ref={idx === stories.length - 1 ? lastElementRef : null}
                  onClick={() =>
                    editingId === story.bookStoryId
                      ? null
                      : navigate(`/bookstory/${story.bookStoryId}/detail`)
                  }
                  className="flex gap-5 bg-white rounded-xl border border-[#EAE5E2] px-5 py-5 shadow-sm cursor-pointer"
                >
                  {/* 책 이미지 */}
                  {story.bookInfo?.imgUrl ? (
                    <img
                      src={story.bookInfo.imgUrl}
                      alt={story.bookInfo.title || "책 이미지"}
                      className="w-[176px] h-[248px] rounded-md object-cover flex-shrink-0"
                      onError={(e) => {
                        e.currentTarget.src = "";
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-[176px] h-[248px] bg-gray-200 rounded-md flex-shrink-0" />
                  )}

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={story.authorInfo.profileImageUrl || ""}
                          alt="프로필"
                          className="w-[32px] h-[32px] rounded-full bg-gray-300"
                        />
                        <p className="text-[#2C2C2C] text-[20px] font-medium">
                          {story.authorInfo.nickname}
                        </p>
                      </div>

                      {/* 제목은 수정 불가 */}
                      <p className="text-[#2C2C2C] text-[20px] font-semibold mb-2">
                        {story.bookStoryTitle}
                      </p>

                      {editingId === story.bookStoryId ? (
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full rounded px-3 py-2 text-[14px] mb-4 bg-[#FAFAFA] border border-gray-300"
                          rows={4}
                        />
                      ) : (
                        <p className="text-[#2C2C2C] text-[14px] overflow-hidden text-ellipsis line-clamp-4">
                          {story.description}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-5 mt-6">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(story.bookStoryId);
                        }}
                        className="text-[#A6917D] hover:text-[#90D26D]"
                      >
                        <Trash2 size={24} />
                      </button>
                      {editingId === story.bookStoryId ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSave(story.bookStoryId);
                          }}
                          className="text-[#A6917D] hover:text-[#90D26D]"
                        >
                          <Save size={24} />
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(story);
                          }}
                          className="text-[#A6917D] hover:text-[#90D26D]"
                        >
                          <Pencil size={24} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {isFetchingNextPage && (
                <p className="text-center text-gray-400">불러오는 중...</p>
              )}
              {!hasNextPage && !isFetchingNextPage && (
                <p className="text-center text-gray-400 mt-4">
                  더 이상 책 이야기가 없습니다.
                </p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyStoryPage;