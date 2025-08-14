import { useState } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { useNavigate } from "react-router-dom";
import {
  useMyFollowingQuery,
  useUnfollowMember, 
} from "../../../../hooks/My/useMember";

const MySubscriptionPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");

  // 구독 목록 조회 
  const { data, isFetching, isError } = useMyFollowingQuery(null);

  // 언팔로우 훅 사용
  const unfollowMutation = useUnfollowMember();

  const handleProfileClick = (nickname: string) => {
    navigate(`/info/others/${nickname}`);
  };

  const handleUnfollow = (nickname: string) => {
    unfollowMutation.mutate(nickname);
  };

  const renderFollowingList = () => {
    if (isError) {
      return <p className="text-center text-red-500">구독 목록을 불러오는데 실패했습니다.</p>;
    }

    if (!data) return null;

    return (
      <section className="bg-white border border-[#EAE5E2] rounded-[16px] flex flex-col">
        <div className="flex-1 overflow-y-auto divide-y divide-[#EAE5E2] hide-scrollbar">
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}
          </style>

          {data.followList.map((user) => (
            <div
              key={user.nickname}
              className="flex justify-between items-center px-8 py-5 cursor-pointer hover:bg-[#FAFAFA]"
              onClick={() => handleProfileClick(user.nickname)}
            >
              <div className="flex items-center gap-3">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt={`${user.nickname} 프로필`}
                    className="rounded-full w-9 h-9 object-cover"
                  />
                ) : (
                  <div className="bg-gray-300 rounded-full w-9 h-9" />
                )}
                <p className="text-[#2C2C2C] text-[18px] font-medium">{user.nickname}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (user.following) {
                    handleUnfollow(user.nickname); // ✅ 구독 해제 실행
                  }
                }}
                className={`px-3 py-1 rounded-full text-[13px] font-medium text-white ${
                  user.following
                    ? "bg-[#90D26D] hover:bg-[#7bb95b]"
                    : "bg-[#8D8D8D] hover:bg-[#aaa]"
                }`}
              >
                {user.following ? "삭제" : "구독"}
              </button>
            </div>
          ))}

          {isFetching && <p className="text-center text-gray-400 py-4">불러오는 중...</p>}
          {!data.hasNext && !isFetching && (
            <p className="text-center text-gray-400 py-4">더 이상 사용자 없음</p>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="flex w-full h-screen bg-[#FAFAFA] overflow-hidden">
      <MyPageHeader title="내 구독" />
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
            {activeTab === "following" && renderFollowingList()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MySubscriptionPage;