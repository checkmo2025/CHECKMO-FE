import React, { useState, useEffect } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  nickname: string;
  isFollowing: boolean; 
}

const MySubscriptionPage: React.FC = () => {
  const navigate = useNavigate();

  const [following, setFollowing] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 더미 데이터 로드 (무한 스크롤)
  const fetchData = (pageNum: number) => {
    const newFollowing: User[] = Array.from({ length: 5 }, (_, idx) => ({
      id: (pageNum - 1) * 5 + idx + 1,
      nickname: `닉네임 ${((pageNum - 1) * 5) + idx + 1}`,
      isFollowing: true,
    }));
    const newFollowers: User[] = Array.from({ length: 5 }, (_, idx) => ({
      id: (pageNum - 1) * 5 + idx + 100,
      nickname: `닉네임 ${((pageNum - 1) * 5) + idx + 100}`,
      isFollowing: true,
    }));

    setFollowing((prev) => [...prev, ...newFollowing]);
    setFollowers((prev) => [...prev, ...newFollowers]);

    if (pageNum >= 3) setHasMore(false); 
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

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

  // 팔로우/언팔로우 토글
  const toggleFollow = (
    list: User[],
    setList: React.Dispatch<React.SetStateAction<User[]>>,
    id: number
  ) => {
    setList(
      list.map((user) =>
        user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
      )
    );
  };

  // 프로필 클릭 시 이동
  const handleProfileClick = (id: number) => {
    navigate(`/info/others/${id}`);
  };

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      {/* 사이드바 */}
      <aside className="hidden md:block w-[264px] bg-[#F1F8EF] border-r border-gray-200"></aside>

      {/* 메인 영역 */}
      <main className="flex-1">
        <MyPageHeader title="내 구독" />

        <div className="px-10 py-8 flex justify-center gap-8">
          {/* 팔로잉 */}
          <div className="flex flex-col gap-5">
            <h2 className="text-[20px] font-semibold text-[#2C2C2C] px-2">
              팔로잉
            </h2>
            <section
              className="bg-white border border-[#EAE5E2] rounded-[16px] flex flex-col"
              style={{ width: "535px", height: "600px" }}
            >
              <div className="flex-1 overflow-y-auto divide-y divide-[#EAE5E2]">
                {following.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center px-8 py-5 cursor-pointer hover:bg-[#FAFAFA]"
                    onClick={() => handleProfileClick(user.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="bg-gray-300 rounded-full"
                        style={{ width: "36px", height: "36px" }}
                      ></div>
                      <p className="text-[#2C2C2C] text-[18px] font-medium">{user.nickname}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollow(following, setFollowing, user.id);
                      }}
                      className={`px-3 py-1 rounded-full text-[13px] font-medium text-white ${
                        user.isFollowing
                          ? "bg-[#90D26D] hover:bg-[#7bb95b]"
                          : "bg-[#8D8D8D] hover:bg-[#D9D9D9]"
                      }`}
                    >
                      {user.isFollowing ? "삭제" : "구독"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 팔로워 */}
          <div className="flex flex-col gap-5">
            <h2 className="text-[20px] font-semibold text-[#2C2C2C] px-2">
              팔로워
            </h2>
            <section
              className="bg-white border border-[#EAE5E2] rounded-[16px] flex flex-col"
              style={{ width: "535px", height: "600px" }}
            >
              <div className="flex-1 overflow-y-auto divide-y divide-[#EAE5E2]">
                {followers.map((user) => (
                  <div
                    key={user.id}
                    className="flex justify-between items-center px-8 py-5 cursor-pointer hover:bg-[#FAFAFA]"
                    onClick={() => handleProfileClick(user.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="bg-gray-300 rounded-full"
                        style={{ width: "36px", height: "36px" }}
                      ></div>
                      <p className="text-[#2C2C2C] text-[18px] font-medium">{user.nickname}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollow(followers, setFollowers, user.id);
                      }}
                      className={`px-3 py-1 rounded-full text-[13px] font-medium text-white ${
                        user.isFollowing
                          ? "bg-[#90D26D] hover:bg-[#7bb95b]"
                          : "bg-gray-400 hover:bg-gray-500"
                      }`}
                    >
                      {user.isFollowing ? "삭제" : "구독"}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MySubscriptionPage;
