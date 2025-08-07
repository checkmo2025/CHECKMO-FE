import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [isFetching, setIsFetching] = useState(false);
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");

  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchData = async (pageNum: number) => {
    setIsFetching(true);
    await new Promise((res) => setTimeout(res, 500));

    const newFollowers: User[] = Array.from({ length: 3 }, (_, idx) => {
      const id = 1000 + (pageNum - 1) * 3 + idx;
      return {
        id,
        nickname: `닉네임 ${id}`,
        isFollowing: true,
      };
    });

    const newFollowing: User[] = Array.from({ length: 3 }, (_, idx) => {
      const id = 2000 + (pageNum - 1) * 3 + idx;
      return {
        id,
        nickname: `닉네임 ${id}`,
        isFollowing: true,
      };
    });

    setFollowers((prev) => [...prev, ...newFollowers]);
    setFollowing((prev) => [...prev, ...newFollowing]);

    if (pageNum >= 3) setHasMore(false);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetching, hasMore]
  );

  useEffect(() => {
    if (page > 1) fetchData(page);
  }, [page]);

  const toggleFollow = (
    list: User[],
    setList: React.Dispatch<React.SetStateAction<User[]>>,
    id: number
  ) => {
    const updated = list.map((user) =>
      user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
    );
    setList(updated);
  };

  const handleProfileClick = (id: number) => {
    navigate(`/info/others/${id}`);
  };

  const renderList = (
    list: User[],
    setList: React.Dispatch<React.SetStateAction<User[]>>
  ) => (
    <section className="bg-white border border-[#EAE5E2] rounded-[16px] flex flex-col">
      <div
        className="flex-1 max-h-[500px] overflow-y-auto divide-y divide-[#EAE5E2] hide-scrollbar"
      >
        <style>
          {`
            .hide-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .hide-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>

        {list.map((user, idx) => (
          <div
            key={user.id}
            ref={idx === list.length - 1 ? lastElementRef : null}
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
                toggleFollow(list, setList, user.id);
              }}
              className={`px-3 py-1 rounded-full text-[13px] font-medium text-white ${
                user.isFollowing ? "bg-[#90D26D] hover:bg-[#7bb95b]" : "bg-[#8D8D8D] hover:bg-[#aaa]"
              }`}
            >
              {user.isFollowing ? "삭제" : "구독"}
            </button>
          </div>
        ))}
        {isFetching && <p className="text-center text-gray-400 py-4">불러오는 중...</p>}
        {!hasMore && !isFetching && <p className="text-center text-gray-400 py-4">더 이상 사용자 없음</p>}
      </div>
    </section>
  );

   return (
   <div className="flex w-full h-screen bg-[#FAFAFA] overflow-hidden">
     {/* 헤더는 고정 */}
     <MyPageHeader title="내 구독" />

     {/* 헤더 높이 제외한 나머지를 따로 감싸서 스크롤 */}
     <div className="flex-1 flex flex-col pt-[88px] overflow-hidden">
       <main className="flex-1 overflow-y-auto">
         {/* 탭 */}
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

         {/* 리스트 */}
         <div className="px-10 pt-6 pb-12">
           {activeTab === "followers"
             ? renderList(followers, setFollowers)
             : renderList(following, setFollowing)}
         </div>
       </main>
    </div>
  </div>
);
};

export default MySubscriptionPage;
