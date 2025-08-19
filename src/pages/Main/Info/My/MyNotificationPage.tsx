import { useState, useEffect } from "react"; 
import MyPageHeader from "../../../../components/MyPageHeader";
import Modal from "../../../../components/Modal"; 
import type { NotificationItem, NotificationResponse } from "../../../../types/My/member";
import { getMyNotifications, readNotification } from "../../../../apis/My/memberApi";

const MyNotificationPage = () => {
  const [todayList, setTodayList] = useState<NotificationItem[]>([]);
  const [yesterdayList, setYesterdayList] = useState<NotificationItem[]>([]);
  const [weekList, setWeekList] = useState<NotificationItem[]>([]);
  const [isError, setIsError] = useState(false);
  const [showSettingModal, setShowSettingModal] = useState(false); 
  const [errorModal, setErrorModal] = useState<{ open: boolean; message: string }>({
    open: false,
    message: "",
  });

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

  const fetchNotifications = async () => {
    try {
      const res: NotificationResponse = await getMyNotifications(null);
      groupNotificationsByDate(res.notifications);
      setIsError(false);
    } catch (err: any) {
      console.error("알림 불러오기 실패:", err);
      // 400, 404는 모달로 처리
      if (err?.response?.status === 400) {
        setErrorModal({
          open: true,
          message: "잘못된 요청입니다. 다시 시도해주세요.",
        });
      } else if (err?.response?.status === 404) {
        setErrorModal({
          open: true,
          message: "알림 정보를 찾을 수 없습니다.",
        });
      } else {
        // 나머지는 기존 에러 처리
        setIsError(true);
      }
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationClick = async (n: NotificationItem) => {
    if (!n.read) {
      try {
        await readNotification(n.notificationId);
        fetchNotifications();
      } catch (err) {
        console.error("알림 읽음 처리 실패:", err);
      }
    }
  };

  const getNotificationText = (item: NotificationItem) => {
    switch (item.notificationType) {
      case "LIKE":
        return `${item.senderNickname} 님이 내 책이야기에 좋아요를 눌렀습니다.`;
      case "FOLLOW":
        return `${item.senderNickname} 님이 팔로잉을 시작했습니다.`;
      case "JOIN_CLUB":
        return `${item.targetName}에 가입되셨습니다.`;
      default:
        return "새로운 알림이 있습니다.";
    }
  };

  const renderList = (list: NotificationItem[]) => {
    if (list.length === 0) {
      return <p className="text-center text-gray-400 py-4">알림이 없습니다.</p>;
    }

    return list.map((n, idx, arr) => (
      <div
        key={n.notificationId}
        className={`flex justify-between items-center px-6 py-4 cursor-pointer hover:bg-[#FAFAFA] ${
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
            <p className="text-[14px] text-[#2C2C2C]">{getNotificationText(n)}</p>
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
      {/* 최상단 에러 메시지 */}
      {isError && (
        <div className="p-6">
          <p className="text-red-500">
            내 알림 정보를 불러오는데 실패했습니다. (로그인이 필요합니다)
          </p>
        </div>
      )}

      <div className="flex-1 flex flex-col pt-[88px] overflow-hidden">
        {!isError && (
          <main className="flex-1 overflow-y-auto">
            <div className="px-10 py-8 space-y-8">
              <MyPageHeader title="내 알림" />

              {/* 오늘 */}
              <div className="flex justify-between items-center">
                <h3 className="text-[20px] font-semibold text-[#2C2C2C]">오늘</h3>
                <button
                  className="text-[#8D8D8D] text-sm hover:underline cursor-pointer"
                  onClick={() => setShowSettingModal(true)} 
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
        )}
      </div>

      {/* 알림 설정 모달 */}
      <Modal
        isOpen={showSettingModal}
        title={
          <>
            알림 설정
            <br />
            <span className="text-sm text-[#2C2C2C]">
              알림 설정 기능은 추후 개발 예정입니다.
            </span>
          </>
        }
        buttons={[
          {
            label: "확인",
            onClick: () => setShowSettingModal(false),
            variant: "primary",
          },
        ]}
      />

      {/* 에러 모달 (400 / 404) */}
      <Modal
        isOpen={errorModal.open}
        title={errorModal.message || "알림 오류"}
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

export default MyNotificationPage;