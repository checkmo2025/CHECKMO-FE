import React, { useState } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { Heart, Siren } from "lucide-react";
import { useNavigate } from "react-router-dom";

type MyPageProps = {};

type Story = {
  id: number;
  title: string;
  content: string;
  liked: boolean;
  likes: number;
};

const MyPage = (props: MyPageProps) => {
  const navigate = useNavigate();

  const [stories, setStories] = useState<Story[]>(
    [1, 2, 3].map((id) => ({
      id,
      title: "나는 나이든 왕자다",
      content:
        "어린 왕자는 비행기 추락으로 사막에 불시착한 조종사가 어린 왕자를 만나 그의 이야기를 들으며 시작됩니다. 어린 왕자는 자신의 고향인 소행성 B-612에서 아름다운 장미와 함께 살다가 세상에 대한 호기심으로 여행을 떠납니다...",
      liked: false,
      likes: 12,
    }))
  );

  const toggleLike = (id: number) => {
    setStories((prev) =>
      prev.map((story) =>
        story.id === id
          ? {
              ...story,
              liked: !story.liked,
              likes: story.liked ? story.likes - 1 : story.likes + 1,
            }
          : story
      )
    );
  };

  const handleReport = (title: string) => {
    alert(`'${title}' 글이 신고되었습니다.`);
  };

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      <main className="flex-1">
        <MyPageHeader title="마이페이지" />

        <div className="px-10 py-8 space-y-10">
          {/* 프로필 상단 */}
          <div className="w-full bg-white rounded-[12px] px-4 md:px-6 py-4 mb-5 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#DADADA] rounded-full"></div>
                <p className="text-[16px] sm:text-[18px] font-semibold text-[#2C2C2C]">hy_0716</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["사회", "경제", "인문", "과학"].map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-[#90D26D] text-white text-[12px] sm:text-[13px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full bg-[#EFF5ED] mt-2 rounded-[8px] px-4 sm:px-5 py-3 text-[#5C5C5C] text-[15px] sm:text-[16px] font-medium">
              책을 아는가? 나는 모른다!
            </div>
          </div>

          {/* 내 모임, 내 구독, 내 알림 */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 내 모임 */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-[#2C2C2C]">내 모임</h2>
                <button
                  onClick={() => navigate("/mypage/group")}
                  className="text-sm text-[#8D8D8D] hover:underline"
                >
                  전체보기
                </button>
              </div>
              <div className="bg-white rounded-xl border border-[#EAE5E2] p-5 shadow-sm min-h-[424px]">
                <ul className="divide-y divide-[#EAE5E2]">
                  {["북적북적", "꽁꽁아 책읽자", "독서를 하자"].map((name, idx) => (
                    <li key={idx} className="py-3">
                      <p className="text-[#2C2C2C] text-[15px]">{name}</p>
                      <p className="text-[13px] text-[#8D8D8D] mt-1">새 공지 1건</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 내 구독 */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-[#2C2C2C]">내 구독</h2>
                <button
                  onClick={() => navigate("/mypage/subscription")}
                  className="text-sm text-[#8D8D8D] hover:underline"
                >
                  전체보기
                </button>
              </div>
              <div className="bg-white rounded-xl border border-[#EAE5E2] p-5 shadow-sm min-h-[424px]">
                <div className="grid grid-cols-2 gap-3">
                  {["팔로잉", "팔로워"].map((label) => (
                    <div key={label}>
                      <p className="text-[#90D26D] text-[13px] mb-2">{label}</p>
                      {[1, 2, 3, 4, 5].map((idx) => (
                        <div
                          key={`${label}-${idx}`}
                          className="bg-[#F4F2F1] rounded-lg px-3 py-2 mb-2 flex items-center gap-2"
                        >
                          <div className="w-6 h-6 rounded-full bg-[#DADADA]"></div>
                          <p className="text-[#2C2C2C] text-[14px] flex-1 text-center">닉네임</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 내 알림 */}
            <div className="relative">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-bold text-[#2C2C2C]">내 알림</h2>
                <button
                  onClick={() => navigate("/mypage/notification")}
                  className="text-sm text-[#8D8D8D] hover:underline"
                >
                  전체보기
                </button>
              </div>
              <div className="bg-white rounded-xl border border-[#EAE5E2] p-5 shadow-sm min-h-[424px]">
                <ul className="divide-y divide-[#EAE5E2]">
                  {[1, 2, 3, 4, 5].map((idx) => (
                    <li key={idx} className="flex justify-between items-center py-3">
                      <div>
                        <p className="text-[#2C2C2C] text-[14px]">
                          이현서님이 팔로우했습니다.
                        </p>
                        <p className="text-[12px] text-[#8D8D8D] mt-1">2025-05-21 13:05</p>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-[#90D26D]"></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 내 책 이야기 */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#2C2C2C]">내 책 이야기</h2>
              <button
                onClick={() => navigate("/mypage/story")}
                className="text-sm text-[#8D8D8D] hover:underline"
              >
                전체보기
              </button>
            </div>
            <div className="space-y-4">
              {stories.map((story) => (
                <div
                  key={story.id}
                  className="flex gap-4 bg-white rounded-xl border border-[#EAE5E2] px-5 py-4 shadow-sm"
                >
                  <div className="w-32 h-40 rounded-md bg-gray-200 flex-shrink-0"></div>

                  <div className="flex-1 ml-4 relative">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-gray-300"></div>
                      <p className="text-[#2C2C2C] text-[14px]">hy</p>
                    </div>
                    <p className="text-[#2C2C2C] text-[16px] font-semibold mb-1">
                      {story.title}
                    </p>
                    <p className="text-[#2C2C2C] text-[14px] overflow-hidden text-ellipsis line-clamp-3">
                      {story.content}
                    </p>

                    <div className="flex justify-end gap-5 mt-4">
                      <button
                        onClick={() => toggleLike(story.id)}
                        className={`flex items-center gap-1 text-sm ${
                          story.liked ? "text-[#90D26D]" : "text-[#2C2C2C]"
                        }`}
                      >
                        <Heart size={20} />
                        <span>{story.likes}</span>
                      </button>
                      <button
                        onClick={() => handleReport(story.title)}
                        className="flex items-center gap-1 text-[#2C2C2C] hover:text-[#90D26D] text-sm"
                      >
                        <Siren size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MyPage;