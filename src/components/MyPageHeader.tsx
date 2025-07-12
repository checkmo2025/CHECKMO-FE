import React from "react";
import { useNavigate } from "react-router-dom"; 

interface MyPageHeaderProps {
  title: string;
}

const MyPageHeader: React.FC<MyPageHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-10 py-6 bg-white border-b border-gray-200">
      {/* 마이페이지 텍스트 */}
      <h1 className="text-2xl font-bold text-[#2C2C2C]">{title}</h1>

      {/* 프로필 영역 */}
      <div className="flex items-center gap-3">
        {/* 프로필 편집 / 로그아웃 */}
        <div className="flex items-center gap-3 text-m">
          <button
            className="text-[#2C2C2C] hover:text-[#90D26D]"
            onClick={() => navigate("/mypage/myprofile")} 
          >
            프로필 편집
          </button>
          <span className="text-[#90D26D]">|</span>
          <button className="text-[#2C2C2C] hover:text-[#90D26D]">로그아웃</button>
        </div>
      </div>
    </header>
  );
};

export default MyPageHeader;

