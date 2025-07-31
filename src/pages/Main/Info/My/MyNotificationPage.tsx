import { useState, useEffect, useRef, useCallback } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";

type Notification = {
  id: string; 
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
};

const MyNotificationPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const generateDummyNotifications = (pageNum: number): Notification[] => {
    const dummy: Notification[] = [];
    const baseTime = Date.now(); 

    for (let i = 0; i < 5; i++) {
      const id = `${pageNum}-${i}-${baseTime}`;
      dummy.push({
        id,
        sender: `이현서님이 hy님`,
        content: i % 2 === 0 ? "구독했습니다." : "책 이야기를 좋아했습니다.",
        timestamp: `2025.05.${21 - pageNum} ${13 + i}:05`,
        isRead: false,
      });
    }
    return dummy;
  };

  const loadMoreNotifications = async () => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    await new Promise((res) => setTimeout(res, 500)); // 지연

    const newNotifications = generateDummyNotifications(page);
    setNotifications((prev) => [...prev, ...newNotifications]);
    setPage((prev) => prev + 1);

    if (page >= 3) setHasMore(false); // 총 3페이지까지만
    setIsFetching(false);
  };

  useEffect(() => {
    loadMoreNotifications();
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreNotifications();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetching, hasMore]
  );

  const handleNotificationClick = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      <main className="flex-1">
        <MyPageHeader title="내 알림" />

        <div className="px-10 py-8 space-y-8">
          {/* 오늘 */}
          <div className="flex justify-between items-center">
            <h3 className="text-[20px] font-semibold text-[#2C2C2C]">오늘</h3>
            <button
              className="text-[#8D8D8D] text-sm hover:underline"
              onClick={() => alert("알림 설정 페이지로 이동 예정")}
            >
              알림 설정
            </button>
          </div>

          <div className="bg-white rounded-[8px]">
            {notifications.filter((n, i) => i < 3).map((n, idx, arr) => (
              <div
                key={n.id}
                className={`flex justify-between items-center px-6 py-4 cursor-pointer ${
                  idx !== arr.length - 1 ? "border-b border-[#EAE5E2]" : ""
                }`}
                onClick={() => handleNotificationClick(n)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-[15px] h-[15px] rounded-full ${
                      n.isRead ? "bg-gray-300" : "bg-[#90D26D]"
                    }`}
                  />
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
            <h3 className="text-[20px] font-semibold text-[#2C2C2C] mb-4">어제</h3>
            <div className="bg-white rounded-[8px]">
              {notifications.filter((_, i) => i >= 3 && i < 6).map((n, idx, arr) => (
                <div
                  key={n.id}
                  className={`flex justify-between items-center px-6 py-4 cursor-pointer ${
                    idx !== arr.length - 1 ? "border-b border-[#EAE5E2]" : ""
                  }`}
                  onClick={() => handleNotificationClick(n)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-[15px] h-[15px] rounded-full ${
                        n.isRead ? "bg-gray-300" : "bg-[#90D26D]"
                      }`}
                    />
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
            <h3 className="text-[20px] font-semibold text-[#2C2C2C] mb-4">최근 7일</h3>
            <div className="bg-white rounded-[8px]">
              {notifications.filter((_, i) => i >= 6).map((n, idx, arr) => (
                <div
                  key={n.id}
                  ref={idx === arr.length - 1 ? lastElementRef : null}
                  className={`flex justify-between items-center px-6 py-4 cursor-pointer ${
                    idx !== arr.length - 1 ? "border-b border-[#EAE5E2]" : ""
                  }`}
                  onClick={() => handleNotificationClick(n)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-[15px] h-[15px] rounded-full ${
                        n.isRead ? "bg-gray-300" : "bg-[#90D26D]"
                      }`}
                    />
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

          {/* 상태 메시지 */}
          {isFetching && (
            <p className="text-center text-gray-400">불러오는 중...</p>
          )}
          {!hasMore && !isFetching && (
            <p className="text-center text-gray-400 mt-4">
              더 이상 알림이 없습니다.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyNotificationPage;