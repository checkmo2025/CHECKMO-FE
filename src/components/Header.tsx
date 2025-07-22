import React, { useState, useEffect, useRef } from "react";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; 

type Notification = {
  message: string;
  time: string;
};

type UserProfile = {
  username: string;
  bio: string;
};

interface HeaderProps {
  pageTitle: string;
  userProfile: UserProfile;
  notifications: Notification[];
  customClassName?: string;        // 커스텀으로 각자 페이지에서 조정 가능
}

const Header: React.FC<HeaderProps> = ({ pageTitle, userProfile, notifications, customClassName }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate(); 

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToMyPage = () => {
    navigate("/mypage"); 
  };

  return (
    <header
      className={`${
        customClassName
          ? customClassName
          : "fixed left-[264px] right-0 top-3 h-[56px]" // 기본값
      } bg-white flex justify-between items-center px-4 md:px-8 lg:px-13 z-50 shadow-sm`}
    >
      {/* 페이지 타이틀 */}
      <h1 className="font-bold text-lg md:text-xl lg:text-2xl text-[#2C2C2C]">
        {pageTitle}
      </h1>

      {/* 알림 + 프로필 */}
      <div className="flex items-center gap-3 md:gap-4 relative">
        {/* 종 아이콘 */}
        <button
          onClick={toggleModal}
          aria-label="Notifications"
          className="w-8 h-8 flex justify-center items-center shrink-0"
        >
          <FiBell size={36} color="#90D26D" />
        </button>

        {/* 알림 모달 */}
        {isModalOpen && (
          <div
            ref={modalRef}
            className="absolute right-0 top-[60px] w-[300px] bg-white border-2 border-[#C4E8B2] rounded-[16px] shadow-lg p-[20px] z-50"
          >
            <ul className="space-y-2">
              {notifications.slice(0, 5).map((notif, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center px-[10px] py-[8px] hover:bg-[#F1F8EF] rounded-[12px]"
                >
                  <div className="flex flex-col">
                    <span className="text-[#2C2C2C] text-[14px] font-medium leading-[145%]">
                      {notif.message}
                    </span>
                    <span className="text-[#8D8D8D] text-[12px] font-normal leading-[145%]">
                      {notif.time}
                    </span>
                  </div>
                  <div className="w-[15px] h-[15px] bg-[#90D26D] rounded-full flex-shrink-0" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 프로필 */}
        <div
          onClick={goToMyPage}
          className="flex gap-2 md:gap-3 items-center min-w-0 cursor-pointer"
        >
          <div className="w-10 h-10 bg-gray-300 rounded-full shrink-0" />
          <div className="flex flex-col justify-center min-w-0">
            <span className="text-sm md:text-base font-semibold text-[#2C2C2C] truncate">
              {userProfile.username}
            </span>
            <span className="text-xs md:text-sm text-[#8D8D8D] truncate">
              {userProfile.bio}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;