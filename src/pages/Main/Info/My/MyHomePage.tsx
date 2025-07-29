import MyPageHeader from "../../../../components/MyPageHeader";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();

  const groupList = [
    "북적북적", "짱구야 책읽자", "독서를 하자", "책모", "독서좋아", "북북"
  ];
  const followingList = Array.from({ length: 10 }, (_, i) => `팔로잉-${10 - i}`);
  const followerList = Array.from({ length: 10 }, (_, i) => `팔로워-${10 - i}`);
  const notificationList = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    message: `사용자${10 - i}님이 팔로우했습니다.`,
    date: `2025-07-${29 - i} 12:${(i + 1).toString().padStart(2, "0")}`
  }));

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
                  {groupList.slice(0, 5).map((name, idx) => (
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
                  {[{ label: "팔로잉", list: followingList }, { label: "팔로워", list: followerList }].map(
                    ({ label, list }) => (
                      <div key={label}>
                        <p className="text-[#90D26D] text-[13px] mb-3">{label}</p>
                        {list.slice(0, 5).map((nickname, idx) => (
                          <div
                            key={`${label}-${idx}`}
                            className="bg-[#F4F2F1] rounded-lg px-3 py-3 mb-3 flex items-center gap-2"
                          >
                            <div className="w-6 h-6 rounded-full bg-[#DADADA]"></div>
                            <p className="text-[#2C2C2C] text-[14px] flex-1 text-center">{nickname}</p>
                          </div>
                        ))}
                      </div>
                    )
                  )}
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
                  {notificationList.slice(0, 5).map((item) => (
                    <li key={item.id} className="flex justify-between items-center py-3">
                      <div>
                        <p className="text-[#2C2C2C] text-[14px]">{item.message}</p>
                        <p className="text-[12px] text-[#8D8D8D] mt-1">{item.date}</p>
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
