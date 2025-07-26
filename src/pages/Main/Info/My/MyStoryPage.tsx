import React, { useState } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { Pencil, Trash2, Save } from "lucide-react";

type MyStoryPageProps = {};

type Story = {
  id: number;
  author: string;
  title: string;
  content: string;
}

const MyStoryPage= (props: MyStoryPageProps) => {
  const [stories, setStories] = useState<Story[]>([
    {
      id: 1,
      author: "hy",
      title: "나는 나이든 왕자다",
      content:
        "어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.",
    },
    {
      id: 2,
      author: "hy",
      title: "나는 나이든 왕자다",
      content:
        "어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.",
    },
    {
      id: 3,
      author: "hy",
      title: "나는 나이든 왕자다",
      content:
        "어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.",
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  const handleDelete = (id: number) => {
    setStories(stories.filter((story) => story.id !== id));
  };

  const handleEdit = (story: Story) => {
    setEditingId(story.id);
    setEditContent(story.content); 
  };

  const handleSave = (id: number) => {
    setStories(
      stories.map((story) =>
        story.id === id ? { ...story, content: editContent } : story
      )
    );
    setEditingId(null);
  };

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">

      {/* 메인 영역 */}
      <main className="flex-1">
        {/* 헤더 */}
        <MyPageHeader title="내 책 이야기" />

        <div className="px-10 py-8">
          {/* 책 이야기 리스트 */}
          <div className="space-y-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className="flex gap-5 bg-white rounded-xl border border-[#EAE5E2] px-5 py-5 shadow-sm"
              >
                {/* 책 이미지 */}
                <div className="w-[176px] h-[248px] rounded-md bg-gray-200 flex-shrink-0"></div>

                {/* 내용 */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    {/* 작성자 */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-[32px] h-[32px] rounded-full bg-gray-300"></div>
                      <p className="text-[#2C2C2C] text-[20px] font-medium">
                        {story.author}
                      </p>
                    </div>

                    {/* 책 제목 (수정 불가능) */}
                    <p className="text-[#2C2C2C] text-[20px] font-semibold mb-2">
                      {story.title}
                    </p>

                    {/* 내용 요약 */}
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

                  {/* 수정/삭제 버튼 */}
                  <div className="flex gap-5 mt-6">
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="text-[#A6917D] hover:text-[#90D26D]"
                    >
                      <Trash2 size={24} />
                    </button>
                    {editingId === story.id ? (
                      <button
                        onClick={() => handleSave(story.id)}
                        className="text-[#A6917D] hover:text-[#90D26D]"
                      >
                        <Save size={24} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(story)}
                        className="text-[#A6917D] hover:text-[#90D26D]"
                      >
                        <Pencil size={24} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyStoryPage;
