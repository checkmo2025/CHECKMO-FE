import { useState } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { useNavigate } from "react-router-dom";
import {
  useMyFollowingQuery,
  useMyFollowerQuery,
  useUnfollowMember,
  useRemoveFollower,
} from "../../../../hooks/My/useMember";

const MySubscriptionPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");

  // 구독 중(팔로잉) 목록
  const { data: followingData, isFetching: followingLoading, isError: followingError } =
    useMyFollowingQuery(null);

  // 구독자(팔로워) 목록
  const { data: followerData, isFetching: followerLoading, isError: followerError } =
    useMyFollowerQuery(null);

  // 언팔로우 & 팔로워 삭제 훅
  const unfollowMutation = useUnfollowMember();
  const removeFollowerMutation = useRemoveFollower();

  const handleProfileClick = (userId: string) => {
    navigate(`/info/others/${userId}`);
  };

  const handleUnfollow = (nickname: string) => {
    unfollowMutation.mutate(nickname);
  };

  const handleRemoveFollower = (nickname: string) => {
    removeFollowerMutation.mutate(nickname);
  };

  /** 구독 중(팔로잉) 리스트 렌더 */
  const renderFollowingList = () => {
    if (followingError) {
      return <p className="text-center text-red-500">구독 목록을 불러오는데 실패했습니다.</p>;
    }
    if (!followingData) return null;

    return (
      <section className="bg-white border border-[#EAE5E2] rounded-[16px] flex flex-col">
        <div className="flex-1 overflow-y-auto divide-y divide-[#EAE5E2] hide-scrollbar">
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}
          </style>

          {followingData.followList.map((user) => (
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
                    handleUnfollow(user.nickname);
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

          {followingLoading && <p className="text-center text-gray-400 py-4">불러오는 중...</p>}
          {!followingData.hasNext && !followingLoading && (
            <p className="text-center text-gray-400 py-4">더 이상 사용자 없음</p>
          )}
        </div>
      </section>
    );
  };

  /** 구독자(팔로워) 리스트 렌더 */
  const renderFollowerList = () => {
    if (followerError) {
      return <p className="text-center text-red-500">구독자 목록을 불러오는데 실패했습니다.</p>;
    }
    if (!followerData) return null;

    return (
      <section className="bg-white border border-[#EAE5E2] rounded-[16px] flex flex-col">
        <div className="flex-1 overflow-y-auto divide-y divide-[#EAE5E2] hide-scrollbar">
          <style>
            {`
              .hide-scrollbar::-webkit-scrollbar { display: none; }
              .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}
          </style>

          {followerData.followList.map((user) => (
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
                  handleRemoveFollower(user.nickname);
                }}
                className="px-3 py-1 rounded-full text-[13px] font-medium text-white bg-[#90D26D] hover:bg-[#7bb95b]"
              >
                삭제
              </button>
            </div>
          ))}

          {followerLoading && <p className="text-center text-gray-400 py-4">불러오는 중...</p>}
          {!followerData.hasNext && !followerLoading && (
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
            {activeTab === "following" ? renderFollowingList() : renderFollowerList()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MySubscriptionPage;