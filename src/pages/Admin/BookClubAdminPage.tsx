import { FaUserCircle } from "react-icons/fa";
import backIcon from "../../assets/icons/backIcon.png";
import { useNavigate, useParams } from "react-router-dom";

const BookClubAdminPage = () => {
  const navigate = useNavigate();
  const bookclubId = useParams();

  return (
    <div className="p-6">
      {/* 상단 바 */}
      <div className="flex justify-between items-center mb-6">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <img
            src={backIcon}
            alt="back"
            className="w-[20px] h-[20px] cursor-pointer"
          />
          <span className="ml-2 text-lg font-semibold">관리하기</span>
          <button className="ml-2 text-sm text-gray-500 underline">
            독서모임 편집
          </button>
        </div>
      </div>

      {/* 프로필 카드 */}
      <div className=" p-4 mb-2">
        <div className="flex justify-between">
          <div className="flex items-center mb-2">
            <FaUserCircle className="text-5xl text-gray-300 mr-4" />
            <div>
              <p className="text-lg font-semibold">북적북적</p>
            </div>
          </div>
          {/* 태그들 */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["사회", "사회", "사회", "사회"].map((tag, index) => (
              <span
                key={index}
                style={{ backgroundColor: "#90D26D" }}
                className="text-white font-bold px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="bg-green-50 text-sm text-gray-700 p-3 rounded">
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
          onClick={() => navigate(`/bookclub/${bookclubId}/admin/resister`)}
        >
          가입 관리
        </button>
      </div>
    </div>
  );
};

export default BookClubAdminPage;
