import MyPageHeader from "../../../../components/MyPageHeader";
import { useNavigate } from "react-router-dom";
import {
  useMyProfileQuery,
  useMyClubsQuery,
  useMyFollowingQuery,
  useMyFollowerQuery,
  useMyNotificationsQuery,
} from "../../../../hooks/My/useMember";

const MyPage = () => {
  const navigate = useNavigate();

  // API 호출 (모두 cursor 기반)
  const { data: profileData } = useMyProfileQuery();
  const { data: clubData } = useMyClubsQuery(null); 
  const { data: followingData } = useMyFollowingQuery(null);
  const { data: followerData } = useMyFollowerQuery(null);
  const { data: notificationData } = useMyNotificationsQuery(null);

  // 안전한 기본값 처리
  const clubs = clubData?.clubList ?? [];
  const followingList = followingData?.followList ?? [];
  const followerList = followerData?.followList ?? [];
  const notifications = notificationData?.notifications ?? [];

  return (
    <div className="relative w-full h-screen bg-[#FAFAFA] overflow-hidden">
      <MyPageHeader title="마이페이지" />

      <main className="absolute top-[88px] left-0 right-0 bottom-0 overflow-y-auto">
        <div className="px-10 py-8 space-y-10">
          {/* 프로필 상단 */}
          <div className="w-full bg-white rounded-[12px] px-4 md:px-6 py-4 mb-5 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
              <div className="flex items-center gap-3">
                {/* 프로필 이미지 */}
                {profileData?.profileImageUrl ? (
                  <img
                    src={profileData.profileImageUrl}
                    alt="프로필"
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#DADADA] rounded-full"></div>
                )}

                {/* 닉네임 */}
                <p className="text-[16px] sm:text-[18px] font-semibold text-[#2C2C2C]">
                  {profileData?.nickname ?? ""}
                </p>
              </div>

              {/* 관심 카테고리 */}
              <div className="flex flex-wrap gap-2">
                {profileData?.categories?.map((cat) => (
                  <span
                    key={cat.id}
                    className="px-3 py-1 rounded-full bg-[#90D26D] text-white text-[12px] sm:text-[13px]"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>

            {/* 한 줄 소개 */}
            <div className="w-full bg-[#EFF5ED] mt-2 rounded-[8px] px-4 sm:px-5 py-3 text-[#5C5C5C] text-[15px] sm:text-[16px] font-medium">
              {profileData?.description ?? ""}
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
                  className="text-sm text-[#8D8D8D] hover:underline cursor-pointer"
                >
                  전체보기
                </button>
              </div>
              <div className="bg-white rounded-xl border border-[#EAE5E2] p-5 shadow-sm min-h-[424px]">
                <ul className="divide-y divide-[#EAE5E2]">
                  {clubs.slice(0, 5).map((club) => (
                    <li key={club.clubId} className="py-3">
                      <p className="text-[#2C2C2C] font-medium text-[15px]">{club.name}</p>
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
                  className="text-sm text-[#8D8D8D] hover:underline cursor-pointer"
                >
                  전체보기
                </button>
              </div>
              <div className="bg-white rounded-xl border border-[#EAE5E2] p-5 shadow-sm min-h-[424px]">
                <div className="grid grid-cols-2 gap-3">
                  {[{ label: "팔로잉", list: followingList },
                    { label: "팔로워", list: followerList }].map(({ label, list }) => (
                      <div key={label}>
                        <p className="text-[#90D26D] text-[13px] mb-3">{label}</p>
                        {list.slice(0, 5).map((member) => (
                          <div
                            key={`${label}-${member.nickname}`}
                            className="bg-[#F4F2F1] rounded-lg px-3 py-3 mb-3 flex items-center gap-2"
                          >
                            {member.profileImageUrl ? (
                              <img
                                src={member.profileImageUrl}
                                alt={`${member.nickname} 프로필`}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-[#DADADA]"></div>
                            )}
                            <p className="text-[#2C2C2C] text-[14px] flex-1 text-center">
                              {member.nickname}
                            </p>
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
                  className="text-sm text-[#8D8D8D] hover:underline cursor-pointer"
                >
                  전체보기
                </button>
              </div>
              <div className="bg-white rounded-xl border border-[#EAE5E2] p-5 shadow-sm min-h-[424px]">
                <ul className="divide-y divide-[#EAE5E2]">
                  {notifications.slice(0, 5).map((item) => (
                    <li key={item.notificationId} className="flex justify-between items-center py-3">
                      <div>
                        <p className="text-[#2C2C2C] text-[14px]">
                          {item.senderNickname}님이{" "}
                          {item.notificationType === "LIKE" && "좋아요를 눌렀습니다."}
                          {item.notificationType === "COMMENT" && "댓글을 남겼습니다."}
                          {item.notificationType === "FOLLOW" && "팔로우했습니다."}
                          {item.notificationType === "JOIN_CLUB" && "클럽에 가입했습니다"}
                       </p>
                        <p className="text-[12px] text-[#8D8D8D] mt-1">{item.createdAt}</p>
                      </div>
                      <div className="w-3 h-3 rounded-full bg-[#90D26D]"></div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MyPage;