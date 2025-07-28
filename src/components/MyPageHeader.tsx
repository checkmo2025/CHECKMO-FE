import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";

type MyPageHeaderProps = {
  title: string;
};

const MyPageHeader = (props: MyPageHeaderProps) => {
  const { title } = props;
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate("/");
  };

  return (
    <>
      <header className="flex justify-between items-center px-10 py-6 bg-white border-b border-gray-200">
        <h1 className="text-2xl font-bold text-[#2C2C2C]">{title}</h1>
        <div className="flex items-center gap-3 text-m">
          <button
            className="text-[#2C2C2C] hover:text-[#90D26D]"
            onClick={() => navigate("/mypage/myprofile")}
          >
            프로필 편집
          </button>
          <span className="text-[#90D26D]">|</span>
          <button
            className="text-[#2C2C2C] hover:text-[#90D26D]"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      </header>

      {/* 최상단으로 분리해서 렌더링 */}
      {showLogoutModal && (
        <AlertModal
          message="정말 로그아웃 하시겠습니까?"
          onConfirm={handleConfirmLogout}
          onClose={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};

export default MyPageHeader;