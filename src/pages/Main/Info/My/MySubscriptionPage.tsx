import React, { useState, useEffect } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  nickname: string;
  isFollowing: boolean;
};

const MySubscriptionPage = () => {
  const navigate = useNavigate();
  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");

  useEffect(() => {
    const storedFollowers = JSON.parse(localStorage.getItem("followers") || "[]"); // 백엔드랑 연동할때 수정, localstorage 파일 따로 안 만듦
    const storedFollowing = JSON.parse(localStorage.getItem("following") || "[]"); 

    if (storedFollowers.length > 0) setFollowers(storedFollowers);
    if (storedFollowing.length > 0) setFollowing(storedFollowing);
    if (storedFollowers.length === 0 || storedFollowing.length === 0) {
      fetchData(1);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    if (page > 1) fetchData(page);
  }, [page]);

  const fetchData = (pageNum: number) => {
    const newFollowers: User[] = Array.from({ length: 5 }, (_, idx) => ({
      id: 100 + (pageNum - 1) * 5 + idx, // 100~114
      nickname: `닉네임 ${100 + (pageNum - 1) * 5 + idx}`,
      isFollowing: true,
    }));

    const newFollowing: User[] = Array.from({ length: 5 }, (_, idx) => ({
      id: (pageNum - 1) * 5 + idx + 1, // 1~15
      nickname: `닉네임 ${(pageNum - 1) * 5 + idx + 1}`,
      isFollowing: true,
    }));

    const updatedFollowers = [...followers, ...newFollowers];
    const updatedFollowing = [...following, ...newFollowing];

    setFollowers(updatedFollowers);
    setFollowing(updatedFollowing);
    localStorage.setItem("followers", JSON.stringify(updatedFollowers));
    localStorage.setItem("following", JSON.stringify(updatedFollowing));

    if (pageNum >= 3) setHasMore(false);
  };

  const toggleFollow = (
    list: User[],
    setList: React.Dispatch<React.SetStateAction<User[]>>,
    id: number,
    key: string
  ) => {
    const updated = list.map((user) =>
      user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
    );
    setList(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  const handleProfileClick = (id: number) => {
    navigate(`/info/others/${id}`);
  };

  const renderList = (
  list: User[],
  setList: React.Dispatch<React.SetStateAction<User[]>>,
  key: string
) => (
  <section className="bg-white border border-[#EAE5E2] rounded-[16px] flex flex-col h-[600px]">
    {/* 스크롤바는 숨기되, 스크롤은 가능하게 처리 */}
    <div
      className="flex-1 overflow-y-scroll divide-y divide-[#EAE5E2]"
      style={{
        scrollbarWidth: "none",      // Firefox
        msOverflowStyle: "none",     // IE, Edge
      }}
    >
      <style>
        {`
          /* Webkit 브라우저용 스크롤바 숨김 */
          section div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      {list.map((user) => (
        <div
          key={user.id}
          className="flex justify-between items-center px-8 py-5 cursor-pointer hover:bg-[#FAFAFA]"
          onClick={() => handleProfileClick(user.id)}
        >
          <div className="flex items-center gap-3">
            <div className="bg-gray-300 rounded-full w-9 h-9" />
            <p className="text-[#2C2C2C] text-[18px] font-medium">{user.nickname}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFollow(list, setList, user.id, key);
            }}
            className={`px-3 py-1 rounded-full text-[13px] font-medium text-white ${
              user.isFollowing
                ? "bg-[#90D26D] hover:bg-[#7bb95b]"
                : "bg-[#8D8D8D] hover:bg-[#aaa]"
            }`}
          >
            {user.isFollowing ? "삭제" : "구독"}
          </button>
        </div>
      ))}
    </div>
  </section>
);

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      <main className="flex-1">
        <MyPageHeader title="내 구독" />

        {/* 탭 선택 */}
        <div className="flex px-10 pt-8 gap-8">
          <button
            className={`text-[16px] font-semibold pb-1 border-b-2 ${
              activeTab === "followers"
                ? "text-[#2C2C2C] border-[#90D26D]"
                : "text-gray-400 border-transparent"
            }`}
            onClick={() => setActiveTab("followers")}
          >
            구독자
          </button>
          <button
            className={`text-[16px] font-semibold pb-1 border-b-2 ${
              activeTab === "following"
                ? "text-[#2C2C2C] border-[#90D26D]"
                : "text-gray-400 border-transparent"
            }`}
            onClick={() => setActiveTab("following")}
          >
            구독 중
          </button>
        </div>

        <div className="px-10 pt-6 pb-12">
          {activeTab === "followers"
            ? renderList(followers, setFollowers, "followers")
            : renderList(following, setFollowing, "following")}
        </div>
      </main>
    </div>
  );
};

export default MySubscriptionPage;