import React, { useState, useEffect } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";

interface Notification {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

const MyNotificationPage: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 더미 데이터 생성
  const generateDummyNotifications = (pageNum: number): Notification[] => {
    const dummy: Notification[] = [];
    for (let i = 0; i < 5; i++) {
      const id = (pageNum - 1) * 5 + i + 1;
      dummy.push({
        id,
        sender: `이현서님이 hy님`,
        content: id % 2 === 0 ? "구독했습니다." : "책 이야기를 좋아했습니다.",
        timestamp: `2025.05.${21 - pageNum} ${13 + i}:05`,
        isRead: false,
      });
    }
    return dummy;
  };

  // 데이터 로드
  useEffect(() => {
    loadMoreNotifications(page);
  }, [page]);

  const loadMoreNotifications = (pageNum: number) => {
    const newNotifications = generateDummyNotifications(pageNum);
    setNotifications((prev) => [...prev, ...newNotifications]);

    if (pageNum >= 3) setHasMore(false); // 3페이지까지만
  };

  // 무한 스크롤
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

  // 알림 클릭 시 읽음 표시만 변경
  const handleNotificationClick = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === notification.id ? { ...n, isRead: true } : n
      )
    );
  };

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      {/* 사이드바 */}
      <aside className="hidden md:block w-[264px] bg-[#F1F8EF] border-r border-gray-200"></aside>

      {/* 메인 영역 */}
      <main className="flex-1">
        <MyPageHeader title="내 알림" />

        <div className="px-10 py-8 space-y-8">
          {/* 오늘 헤더 + 알림 설정 */}
          <div className="flex justify-between items-center">
            <h3 className="text-[20px] font-semibold text-[#2C2C2C]">오늘</h3>
            <button
              className="text-[#8D8D8D] text-sm hover:underline"
              onClick={() => alert("알림 설정 페이지로 이동 예정")}
            >
              알림 설정
            </button>
          </div>

          {/* 오늘 알림 */}
          <div className="bg-white rounded-[8px]">
            {notifications.filter((n) => n.id <= 3).map((n, index, arr) => (
              <div
                key={n.id}
                className={`flex justify-between items-center px-6 py-4 cursor-pointer ${
                  index !== arr.length - 1 ? "border-b border-[#EAE5E2]" : ""
                }`}
                onClick={() => handleNotificationClick(n)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-[15px] h-[15px] rounded-full ${
                      n.isRead ? "bg-gray-300" : "bg-[#90D26D]"
                    }`}
                  ></div>
                  <div>
                    <p className="text-[14px] text-[#2C2C2C]">
                      {n.sender}{" "}
                      <span className="font-medium">{n.content}</span>
                    </p>
                    <p className="text-[12px] text-[#8D8D8D]">{n.timestamp}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 어제 */}
          <section>
            <h3 className="text-[20px] font-semibold text-[#2C2C2C] mb-4">
              어제
            </h3>
            <div className="bg-white rounded-[8px]">
              {notifications.filter((n) => n.id > 3 && n.id <= 6).map((n, index, arr) => (
                <div
                  key={n.id}
                  className={`flex justify-between items-center px-6 py-4 cursor-pointer ${
                    index !== arr.length - 1 ? "border-b border-[#EAE5E2]" : ""
                  }`}
                  onClick={() => handleNotificationClick(n)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-[15px] h-[15px] rounded-full ${
                        n.isRead ? "bg-gray-300" : "bg-[#90D26D]"
                      }`}
                    ></div>
                    <div>
                      <p className="text-[14px] text-[#2C2C2C]">
                        {n.sender}{" "}
                        <span className="font-medium">{n.content}</span>
                      </p>
                      <p className="text-[12px] text-[#8D8D8D]">{n.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 최근 7일 */}
          <section>
            <h3 className="text-[20px] font-semibold text-[#2C2C2C] mb-4">
              최근 7일
            </h3>
            <div className="bg-white rounded-[8px]">
              {notifications.filter((n) => n.id > 6).map((n, index, arr) => (
                <div
                  key={n.id}
                  className={`flex justify-between items-center px-6 py-4 cursor-pointer ${
                    index !== arr.length - 1 ? "border-b border-[#EAE5E2]" : ""
                  }`}
                  onClick={() => handleNotificationClick(n)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-[15px] h-[15px] rounded-full ${
                        n.isRead ? "bg-gray-300" : "bg-[#90D26D]"
                      }`}
                    ></div>
                    <div>
                      <p className="text-[14px] text-[#2C2C2C]">
                        {n.sender}{" "}
                        <span className="font-medium">{n.content}</span>
                      </p>
                      <p className="text-[12px] text-[#8D8D8D]">{n.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 끝 알림 */}
          {!hasMore && (
            <p className="text-center text-gray-400 mt-6">
              더 이상 알림이 없습니다.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyNotificationPage;