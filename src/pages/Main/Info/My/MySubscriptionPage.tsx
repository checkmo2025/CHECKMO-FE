import { useState, useRef, useCallback } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { useNavigate } from "react-router-dom";
import {
  useUnfollowMember,
  useRemoveFollower,
} from "../../../../hooks/My/useMember";
import {
  useMyFollowerInfinite,
  useMyFollowingInfinite,
} from "../../../../hooks/My/useMemberInfinite";
import Modal from "../../../../components/Modal";
import type { FollowItem, FollowResponse } from "../../../../types/My/member";

const MySubscriptionPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"followers" | "following">("followers");

  // 에러 모달 상태
  const [errorModal, setErrorModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

  // 무한스크롤 팔로워
  const {
    data: followerPages,
    fetchNextPage: fetchNextFollower,
    hasNextPage: hasNextFollower,
    isFetchingNextPage: followerLoading,
    isError: followerError,
  } = useMyFollowerInfinite();

  // 무한스크롤 팔로잉
  const {
    data: followingPages,
    fetchNextPage: fetchNextFollowing,
    hasNextPage: hasNextFollowing,
    isFetchingNextPage: followingLoading,
    isError: followingError,
  } = useMyFollowingInfinite();

  // 언팔로우 & 팔로워 삭제 훅
  const unfollowMutation = useUnfollowMember();
  const removeFollowerMutation = useRemoveFollower();

  const handleProfileClick = (userId: string) => {
    navigate(`/info/others/${userId}`);
  };

  const handleUnfollow = (nickname: string) => {
    unfollowMutation.mutate(nickname, {
      onError: (err: any) => {
        if (err?.response?.status === 400) {
          setErrorModal({
            open: true,
            message: "잘못된 요청입니다. 다시 시도해주세요.",
          });
        }
      },
    });
  };

  const handleRemoveFollower = (nickname: string) => {
    removeFollowerMutation.mutate(nickname, {
      onError: (err: any) => {
        if (err?.response?.status === 400) {
          setErrorModal({
            open: true,
            message: "잘못된 요청입니다. 다시 시도해주세요.",
          });
        }
      },
    });
  };

  // IntersectionObserver
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (activeTab === "followers" && hasNextFollower) fetchNextFollower();
          if (activeTab === "following" && hasNextFollowing) fetchNextFollowing();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [activeTab, hasNextFollower, hasNextFollowing, fetchNextFollower, fetchNextFollowing]
  );

  // 리스트 합치기
    const followerList: FollowItem[] =
    followerPages?.pages.flatMap((p: FollowResponse) => p.followList) ?? [];

    const followingList: FollowItem[] =
    followingPages?.pages.flatMap((p: FollowResponse) => p.followList) ?? [];


  /** 구독 중(팔로잉) 리스트 렌더 */
  const renderFollowingList = () => {
    if (followingError) {
      return <p className="text-center text-red-500">구독 목록을 불러오는데 실패했습니다. (로그인이 필요합니다)</p>;
    }

    return (
      <section className="bg-white border border-[#EAE5E2] rounded-[16px] flex flex-col">
        {followingList.map((user, idx) => (
          <div
            key={user.nickname}
            ref={idx === followingList.length - 1 ? lastElementRef : null}
            className="flex justify-between items-center px-8 py-5 cursor-pointer hover:bg-[#FAFAFA]"
            onClick={() => handleProfileClick(user.nickname)}
          >
            <div className="flex items-center gap-3">
              <img
                src={user.profileImageUrl || "/assets/basic_profile.png"}
                alt={`${user.nickname} 프로필`}
                className="rounded-full w-9 h-9 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/assets/basic_profile.png";
                }}
              />
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
        {!hasNextFollowing && followingList.length > 0 && (
          <p className="text-center text-gray-400 py-4">더 이상 사용자 없음</p>
        )}
      </section>
    );
  };

  /** 구독자(팔로워) 리스트 렌더 */
  const renderFollowerList = () => {
    if (followerError) {
      return <p className="text-center text-red-500">구독자 목록을 불러오는데 실패했습니다.</p>;
    }

    return (
      <section className="bg-white border border-[#EAE5E2] rounded-[16px] flex flex-col">
        {followerList.map((user, idx) => (
          <div
            key={user.nickname}
            ref={idx === followerList.length - 1 ? lastElementRef : null}
            className="flex justify-between items-center px-8 py-5 cursor-pointer hover:bg-[#FAFAFA]"
            onClick={() => handleProfileClick(user.nickname)}
          >
            <div className="flex items-center gap-3">
              <img
                src={user.profileImageUrl || "/assets/basic_profile.png"}
                alt={`${user.nickname} 프로필`}
                className="rounded-full w-9 h-9 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/assets/basic_profile.png";
                }}
              />
              <p className="text-[#2C2C2C] text-[18px] font-medium">{user.nickname}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveFollower(user.nickname);
              }}
              className="px-3 py-1 rounded-full text-[13px] font-medium text-white bg-[#90D26D] hover:bg-[#7bb95b]">
              삭제
            </button>
          </div>
        ))}
        {followerLoading && <p className="text-center text-gray-400 py-4">불러오는 중...</p>}
        {!hasNextFollower && followerList.length > 0 && (
          <p className="text-center text-gray-400 py-4">더 이상 사용자 없음</p>
        )}
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
                  ? "text-[#2C2C2C] border-[#90D26D] cursor-pointer"
                  : "text-gray-400 border-transparent cursor-pointer"
              }`}
              onClick={() => setActiveTab("followers")}
            >
              구독자
            </button>
            <button
              className={`text-[16px] font-semibold pb-1 border-b-2 ${
                activeTab === "following"
                  ? "text-[#2C2C2C] border-[#90D26D] cursor-pointer"
                  : "text-gray-400 border-transparent cursor-pointer"
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

      {/* 400 에러 모달 */}
      <Modal
        isOpen={errorModal.open}
        title={`요청 오류\n${errorModal.message}`}
        buttons={[
          {
            label: "확인",
            onClick: () => setErrorModal({ open: false, message: "" }),
            variant: "primary",
          },
        ]}
        onBackdrop={() => setErrorModal({ open: false, message: "" })}
      />
    </div>
  );
};

export default MySubscriptionPage;