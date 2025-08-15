import { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useMyProfileQuery } from "../hooks/My/useMember";
import { useHeaderData } from "../hooks/useHeader";

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

  // ✅ 모든 페이지에서 알림 5개 불러오기
  const { notifications, notiLoading } = useHeaderData(5);

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

  return (
    <header
      className={`${
        customClassName ?? "fixed left-[264px] right-0 top-3 h-[56px] lg:px-13 px-4 md:px-8 "
      } bg-white flex justify-between items-center z-50`}
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
          className="relative w-8 h-8 flex justify-center items-center shrink-0"
          disabled={notiLoading}
        >
          <FaBell size={32} color="#90D26D" />
          {!notiLoading && unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-[4px] rounded-full text-[11px] bg-[#90D26D] text-white flex items-center justify-center">
              {unreadCount}
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
              <ul className="space-y-2">
                {notifications!.map((n, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center px-[10px] py-[8px] hover:bg-[#F1F8EF] rounded-[12px]"
                  >
                    <div className="flex flex-col">
                      <span className="text-[#2C2C2C] text-[14px] font-medium leading-[145%]">
                        {n.message}
                      </span>
                      <span className="text-[#8D8D8D] text-[12px] font-normal leading-[145%]">
                        {n.time}
                      </span>
                    </div>
                    <div className="w-[15px] h-[15px] bg-[#90D26D] rounded-full flex-shrink-0" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* 프로필 */}
        <div
          onClick={() => navigate("/mypage/myprofile")}
          className="flex gap-2 md:gap-3 items-center min-w-0 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-gray-300 flex items-center justify-center">
            {me?.profileImageUrl ? (
              <img
                src={me.profileImageUrl}
                alt={me?.nickname ? `${me.nickname}의 프로필` : "기본 프로필"}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <span className="text-gray-400 text-lg">+</span>
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
