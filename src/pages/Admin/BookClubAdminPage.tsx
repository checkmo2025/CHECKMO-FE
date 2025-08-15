import { FaUserCircle } from "react-icons/fa";
import backIcon from "../../assets/icons/backIcon.png";
import { useNavigate, useParams } from "react-router-dom";

const BookClubAdminPage = () => {
  const navigate = useNavigate();
  const { bookclubId } = useParams();

  return (
    <div className="mt-[30px] px-8">
      {/* 상단 바 */}
      <div className="flex justify-between items-center mb-9">
        <div className="flex items-center cursor-pointer" onClick={() => navigate(`/bookclub/${bookclubId}/home`)}>
          <img
            src={backIcon}
            alt="back"
            className="w-6 h-6 cursor-pointer"
          />
          <span className="ml-2 text-[var(--Gray-1,#2C2C2C)] font-['Pretendard'] text-[24px] font-bold leading-[135%]">관리하기</span>
          <button className="flex ml-4 text-sm text-gray-500 underline">
            독서모임 편집
          </button>
        </div>
      </div>

      {/* 프로필 카드 */}
      <div className="mb-4 px-2">
        <div className="flex justify-between">
          <div className="flex items-center mb-2">
            <FaUserCircle className="text-5xl text-gray-300 mr-4" />
            <div>
              <p className="text-lg font-semibold">북적북적</p>
            </div>
          </div>
          {/* 태그들 */}
          <div className="flex items-center flex-wrap gap-2">
            {["사회", "인문", "에세이", "자기계발"].map((tag, index) => (
              <span
                key={index}
                className="flex items-center justify-center min-w-[54px] h-6 text-white font-Pretend px-3 py-1 rounded-full text-[12px] bg-[#90D26D]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 bg-green-50 text-sm text-gray-700 p-3 rounded">
          대학생 연합 독서토론 동아리입니다. 환영합니다.
        </p>
      </div>

      {/* 하단 버튼들 */}
      <div className="flex gap-3.5 justify-end px-4">
        <button
          style={{ backgroundColor: "#EFF5ED", color: "#90D26D" }}
          className=" px-4 py-2 rounded-full text-sm cursor-pointer"
          onClick={() => navigate(`/bookclub/${bookclubId}/admin/member`)}
        >
          회원 관리
        </button>
        <button
          style={{ backgroundColor: "#EFF5ED", color: "#90D26D" }}
          className=" px-4 py-2 rounded-full text-sm cursor-pointer"
          onClick={() => navigate(`/bookclub/${bookclubId}/admin/register`)}
        >
          가입 관리
        </button>
      </div>
    </div>
  );
};

export default BookClubAdminPage;
