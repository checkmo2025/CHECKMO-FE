import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/icons/backIcon.png";

const mockMembers = [
  {
    id: 1,
    username: "yujin",
  },
  {
    id: 2,
    username: "deogi",
  },
  {
    id: 3,
    username: "jiwoo",
  },
  {
    id: 4,
    username: "yujin",
  },
  {
    id: 5,
    username: "deogi",
  },
  {
    id: 6,
    username: "jiwoo",
  },
];

const MemberAdminPage = () => {
  const navigate = useNavigate();

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
          <span className="ml-2 text-lg font-semibold">회원 관리</span>
        </div>
      </div>

      {/* 멤버 리스트 */}
      <ul className="space-y-4">
        {mockMembers.map((member, idx) => (
          <li
            key={idx}
            style={{ borderBottom: "1px solid #EAE5E2" }}
            className="flex items-center justify-between pb-4"
          >
            {/* 유저 정보 */}
            <div className="flex items-center">
              <FaUserCircle className="text-3xl text-gray-400 mr-4" />
              <span className="font-medium text-gray-800">
                {member.username}
              </span>
            </div>

            {/* 버튼들 */}
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#EFF5ED] text-[#367216] border border-[#90D26D] hover:bg-[#90D26D] hover:text-white ">
                운영진 역할 부여
              </button>
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#EFF5ED] text-[#367216] border border-[#90D26D] hover:bg-[#90D26D] hover:text-white">
                삭제하기
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberAdminPage;
