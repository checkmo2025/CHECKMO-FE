import { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useMyProfileQuery } from "../hooks/My/useMember";
import { useHeaderData, TYPE_TEXT } from "../hooks/useHeader";
import type { NotificationPreviewItem } from "../types/header";

interface HeaderProps {
  pageTitle: string;
  customClassName?: string;
  isAdmin?: boolean;
  showManageButton?: boolean;
  manageLabel?: string;
  manageTo?: string;
  onClickManage?: () => void;
  manageButtonClassName?: string;
}

const Header = ({
  pageTitle,
  customClassName,
  isAdmin = false,
  showManageButton = false,
  manageLabel = "모임 관리하기",
  manageTo: propManageTo,
  onClickManage,
  manageButtonClassName = "text-sm md:text-base text-[#8D8D8D] hover:text-[#2C2C2C] underline underline-offset-2 decoration-[#C4E8B2]",
}: HeaderProps) => {
  const navigate = useNavigate();
  const { bookclubId } = useParams();

  const manageTo =
    propManageTo ?? (bookclubId ? `/bookclub/${bookclubId}/home` : "/club/manage");

  // 프로필
  const { data: me, isPending: profilePending } = useMyProfileQuery();

  // 알림 (항상 최대 5개 유지)
  const { notifications, notiLoading, markAsRead } = useHeaderData(5);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications?.length ?? 0;

  const goManage = () => {
    if (onClickManage) onClickManage();
    else navigate(manageTo);
  };

  // 알림 메시지 변환
  const renderMessage = (n: NotificationPreviewItem) => {
    if (n.notificationType === "JOIN_CLUB") {
      return `${n.targetName}에 가입되셨습니다.`;
    }
    const action = TYPE_TEXT[n.notificationType] ?? "";
    return `${n.senderNickname ?? ""} 님이 ${action}`;
  };

  // 알림 클릭 시 → 읽음 처리 후 redirect
  const handleNotificationClick = (n: NotificationPreviewItem) => {
    markAsRead(n.notificationId); // 읽음 처리
    if (n.redirectPath) {
      navigate(n.redirectPath);
      setIsModalOpen(false);
    }
  };

  return (
    <header
      className={`
        w-full
        mt-[30px] pb-[30px] bg-white flex justify-between items-center
        border-b border-gray-200
        ${customClassName ?? ""}
      `}
    >
      {/* 타이틀 + 관리 버튼 */}
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-[#2C2C2C]">
          {pageTitle}
        </h1>
        {isAdmin && showManageButton && (
          <button type="button" onClick={goManage} className={manageButtonClassName}>
            {manageLabel}
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 md:gap-4 relative">
        {/* 종 아이콘 + 배지 */}
        <button
          onClick={() => setIsModalOpen((p) => !p)}
          aria-label="Notifications"
          className="relative w-8 h-8 flex justify-center items-center shrink-0 cursor-pointer"
          disabled={notiLoading}
        >
          <FaBell size={32} color="#90D26D" />
          {!notiLoading && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-[4px] rounded-full text-[11px] bg-[#90D26D] text-white flex items-center justify-center cursor-pointer">
              {unreadCount >= 5 ? "5+" : unreadCount}
            </span>
          )}
        </button>

        {/* 알림 모달 */}
        {isModalOpen && (
          <div
            ref={modalRef}
            className="absolute right-0 top-[60px] w-[300px] bg-white border-2 border-[#C4E8B2] rounded-[16px] shadow-lg p-[20px] z-50"
          >
            {notiLoading ? (
              <div className="text-sm text-[#8D8D8D]">알림 불러오는 중...</div>
            ) : unreadCount === 0 ? (
              <div className="text-sm text-[#8D8D8D]">알림이 존재하지 않습니다.</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {notifications!.map((n) => (
                  <li
                    key={n.notificationId}
                    onClick={() => handleNotificationClick(n)}
                    className="flex justify-between items-center px-[10px] py-[12px] hover:bg-[#F1F8EF] rounded-[12px] cursor-pointer"
                  >
                    <div className="flex flex-col">
                      <span className="text-[#2C2C2C] text-[14px] font-medium leading-[145%]">
                        {renderMessage(n)}
                      </span>
                      <span className="text-[#8D8D8D] text-[12px] font-normal leading-[145%] mt-1">
                        {n.createdAt}
                      </span>
                    </div>
                    {!n.read && (
                      <div className="w-[15px] h-[15px] bg-[#90D26D] rounded-full flex-shrink-0" />
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* 프로필 */}
        <div
          onClick={() => navigate("/mypage")}
          className="flex gap-2 md:gap-3 items-center min-w-0 cursor-pointer rounded-[8px] hover:bg-[#EEEEEE] px-3 py-2"
        >
          <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-white flex items-center justify-center">
            {me?.profileImageUrl ? (
              <img
                src={me.profileImageUrl}
                alt={me?.nickname ? `${me.nickname}의 프로필` : "기본 프로필"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/basic_profile.png";
                }}
              />
            ) : (
              <img
                src="/assets/basic_profile.png"
                alt="기본 프로필"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-center gap-3">
              <span className="text-sm md:text-base font-semibold text-[#2C2C2C] truncate">
                {me?.nickname || (profilePending ? "불러오는 중..." : "")}
              </span>
            </div>
            <span className="text-xs md:text-sm text-[#8D8D8D] truncate">
              {me?.description ?? ""}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;