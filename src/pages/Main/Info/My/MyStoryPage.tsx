import { useState, useEffect, useRef, useCallback } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { Pencil, Trash2, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Story = {
  id: number;
  author: string;
  title: string;
  content: string;
};

const MyStoryPage = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState<Story[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchStories = async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const newStories: Story[] = Array.from({ length: 5 }, (_, idx) => {
      const id = (page - 1) * 5 + idx + 1;
      return {
        id,
        author: "hy",
        title: `나는 나이든 왕자다 ${id}`,
        content:
          "어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.".repeat(
            2
          ),
      };
    });

    setStories((prev) => [...prev, ...newStories]);
    setPage((prev) => prev + 1);
    if (page >= 5) setHasMore(false);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchStories();
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchStories();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetching, hasMore]
  );

  const handleDelete = (id: number) => {
    setStories((prev) => prev.filter((story) => story.id !== id));
  };

  const handleEdit = (story: Story) => {
    setEditingId(story.id);
    setEditTitle(story.title);
    setEditContent(story.content);
  };

  const handleSave = (id: number) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === id
          ? { ...story, title: editTitle, content: editContent }
          : story
      )
    );
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
                  key={story.id}
                  ref={idx === stories.length - 1 ? lastElementRef : null}
                  onClick={() =>
                    editingId === story.id
                      ? null
                      : navigate(`/bookstory/${story.id}/detail`)
                  }
                  className="flex gap-5 bg-white rounded-xl border border-[#EAE5E2] px-5 py-5 shadow-sm cursor-pointer"
                >
                  <div className="w-[176px] h-[248px] rounded-md bg-gray-200 flex-shrink-0" />

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-[32px] h-[32px] rounded-full bg-gray-300"></div>
                        <p className="text-[#2C2C2C] text-[20px] font-medium">
                          {story.author}
                        </p>
                      </div>

                      {editingId === story.id ? (
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full rounded px-3 py-2 text-[16px] mb-2 bg-[#FAFAFA] border border-gray-300 font-semibold"
                        />
                      ) : (
                        <p className="text-[#2C2C2C] text-[20px] font-semibold mb-2">
                          {story.title}
                        </p>
                      )}

                      {editingId === story.id ? (
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="w-full rounded px-3 py-2 text-[14px] mb-4 bg-[#FAFAFA] border border-gray-300"
                          rows={4}
                        />
                      ) : (
                        <p className="text-[#2C2C2C] text-[14px] overflow-hidden text-ellipsis line-clamp-4">
                          {story.content}
                        </p>
                      )}
                    </div>

                    <div className="flex gap-5 mt-6">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(story.id);
                        }}
                        className="text-[#A6917D] hover:text-[#90D26D]"
                      >
                        <Trash2 size={24} />
                      </button>
                      {editingId === story.id ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSave(story.id);
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

              {isFetching && (
                <p className="text-center text-gray-400">불러오는 중...</p>
              )}
              {!hasMore && !isFetching && (
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