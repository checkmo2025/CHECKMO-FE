import { useState, useEffect } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import type { NotificationItem, NotificationResponse } from "../../../../types/My/member";
import { getMyNotifications, readNotification } from "../../../../apis/My/memberApi";

const MyNotificationPage = () => {
  const [todayList, setTodayList] = useState<NotificationItem[]>([]);
  const [yesterdayList, setYesterdayList] = useState<NotificationItem[]>([]);
  const [weekList, setWeekList] = useState<NotificationItem[]>([]);

  // 날짜 분류 함수
  const groupNotificationsByDate = (list: NotificationItem[]) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayArr: NotificationItem[] = [];
    const yesterdayArr: NotificationItem[] = [];
    const weekArr: NotificationItem[] = [];

    list.forEach((n) => {
      const created = new Date(n.createdAt);
      const diffTime = today.getTime() - created.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);

      if (
        created.getFullYear() === today.getFullYear() &&
        created.getMonth() === today.getMonth() &&
        created.getDate() === today.getDate()
      ) {
        todayArr.push(n);
      } else if (
        created.getFullYear() === yesterday.getFullYear() &&
        created.getMonth() === yesterday.getMonth() &&
        created.getDate() === yesterday.getDate()
      ) {
        yesterdayArr.push(n);
      } else if (diffDays <= 7) {
        weekArr.push(n);
      }
    });

    setTodayList(todayArr);
    setYesterdayList(yesterdayArr);
    setWeekList(weekArr);
  };

  // 알림 목록 가져오기
  const fetchNotifications = async () => {
    try {
      const res: NotificationResponse = await getMyNotifications(null);
      groupNotificationsByDate(res.notifications);
    } catch (err) {
      console.error("알림 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // 알림 읽음 처리
  const handleNotificationClick = async (n: NotificationItem) => {
    if (!n.read) {
      try {
        await readNotification(n.notificationId);
        fetchNotifications(); // 다시 불러오기
      } catch (err) {
        console.error("알림 읽음 처리 실패:", err);
      }
    }
  };

  // 알림 텍스트 변환
  const getNotificationText = (n: NotificationItem) => {
    switch (n.notificationType) {
      case "FOLLOW":
        return "님이 구독했습니다.";
      case "LIKE":
        return "님이 책 이야기에 좋아요를 눌렀습니다.";
      case "COMMENT":
        return "님이 댓글을 남겼습니다.";
      case "JOIN_CLUB":
        return "님이 클럽에 가입했습니다.";
      default:
        return "";
    }
  };

  // 알림 렌더링 공통
  const renderList = (list: NotificationItem[]) => {
    if (list.length === 0) {
      return <p className="text-center text-gray-400 py-4">알림이 없습니다.</p>;
    }

    return list.map((n, idx, arr) => (
      <div
        key={n.notificationId}
        className={`flex justify-between items-center px-6 py-4 cursor-pointer ${
          idx !== arr.length - 1 ? "border-b border-[#EAE5E2]" : ""
        }`}
        onClick={() => handleNotificationClick(n)}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-[15px] h-[15px] rounded-full ${
              n.read ? "bg-gray-300" : "bg-[#90D26D]"
            }`}
          />
          <div>
            <p className="text-[14px] text-[#2C2C2C]">
              {n.senderNickname}{" "}
              <span className="font-medium">{getNotificationText(n)}</span>
            </p>
            <p className="text-[12px] text-[#8D8D8D]">
              {new Date(n.createdAt).toLocaleString("ko-KR")}
            </p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex w-full h-screen bg-[#FAFAFA] overflow-hidden">
      <MyPageHeader title="내 알림" />
      <div className="flex-1 flex flex-col pt-[88px] overflow-hidden">
        <main className="flex-1 overflow-y-auto">
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
            <div className="bg-white rounded-[8px]">{renderList(todayList)}</div>

            {/* 어제 */}
            <section>
              <h3 className="text-[20px] font-semibold text-[#2C2C2C] mb-4">어제</h3>
              <div className="bg-white rounded-[8px]">{renderList(yesterdayList)}</div>
            </section>

            {/* 최근 7일 */}
            <section>
              <h3 className="text-[20px] font-semibold text-[#2C2C2C] mb-4">최근 7일</h3>
              <div className="bg-white rounded-[8px]">{renderList(weekList)}</div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyNotificationPage;