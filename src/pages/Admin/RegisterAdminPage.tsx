
import backIcon from "../../assets/icons/backIcon.png";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const dummyProfiles = [
  {
    id: 1,
    name: "북적북적",
    description: "대학생 연합 독서토론 동아리입니다. 환영합니다.",
  },
  {
    id: 2,
    name: "책마을",
    description: "책을 사랑하는 사람들이 모인 커뮤니티입니다.",
  },
  {
    id: 3,
    name: "지혜나무",
    description: "성장을 위한 독서모임입니다.",
  },
];

const RegisterAdminPage = () => {
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
          <span className="ml-2 text-lg font-semibold">신청 관리</span>
        </div>
      </div>

      {/* 프로필 카드 목록 */}
      {dummyProfiles.map((profile) => (
        <div key={profile.id} className="p-4 mb-2">
          <div className="flex justify-between">
            <div className="flex items-center mb-2">
              <FaUserCircle className="text-5xl text-gray-300 mr-4" />
              <div>
                <p className="text-lg font-semibold">{profile.name}</p>
              </div>
            </div>

            {/* 세팅 버튼들 */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#EFF5ED] border border-[#90D26D] text-[#367216] hover:bg-[#90D26D] hover:text-white">
                프로필 방문하기
              </button>
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#EFF5ED] border border-[#90D26D] text-[#367216] hover:bg-[#90D26D] hover:text-white">
                승인하기
              </button>
              <button className="px-4 py-1.5 rounded-full text-sm bg-[#EFF5ED] border border-[#90D26D] text-[#367216] hover:bg-[#90D26D] hover:text-white">
                삭제하기
              </button>
            </div>
          </div>
          <p className="bg-[#EFF5ED] text-sm text-[#5C5C5C] p-3 rounded">
            {profile.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RegisterAdminPage;
