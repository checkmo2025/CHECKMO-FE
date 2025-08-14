import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AlertModal from "./AlertModal";
import { useLogout } from "../hooks/useAuth"; 
import { useQueryClient } from "@tanstack/react-query";

type MyPageHeaderProps = {
  title: string;
};

const MyPageHeader = ({ title }: MyPageHeaderProps) => {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // 서버 로그아웃 API와 연동되는 훅
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        // 1. 로컬 토큰 삭제
        localStorage.clear();

        // 2. React Query 캐시 초기화
        qc.clear();

        // 3. 모달 닫기
        setShowLogoutModal(false);

        // 4. 로그인 페이지로 이동
        window.location.replace("/");
      },
      onError: (e) => {
        setShowLogoutModal(false);
        alert(e?.message || "로그아웃에 실패했습니다.");
      },
    });
  };

  return (
    <>
      <header className="fixed top-0 left-[264px] right-0 z-50 px-10 py-6 bg-white border-b border-gray-200 w-[calc(100%-264px)] flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#2C2C2C]">{title}</h1>
        <div className="flex items-center gap-3 text-m">
          <button
            className="text-[#2C2C2C] hover:text-[#90D26D] cursor-pointer"
            onClick={() => navigate("/mypage/myprofile")}
          >
            프로필 편집
          </button>
          <span className="text-[#90D26D]">|</span>
          <button
            className="text-[#2C2C2C] hover:text-[#90D26D] cursor-pointer disabled:opacity-60"
            onClick={handleLogout}
            disabled={isPending}
          >
            {isPending ? "로그아웃 중..." : "로그아웃"}
          </button>
        </div>
      </header>

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
