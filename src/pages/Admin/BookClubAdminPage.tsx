import { FaUserCircle } from "react-icons/fa";
import backIcon from "../../assets/icons/backIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import { useClubDetail } from "../../hooks/BookClub/useClubDetail";

const categoryMap: Record<number, string> = {
  1: '국내도서',
  2: '소설/시/희곡',
  3: '에세이',
  4: '경제/경영',
  5: '자기계발',
  6: '인문학',
  7: '여행',
  8: '역사/문화',
  9: '사회과학',
  10: '정치/외교/국방',
  11: '컴퓨터/IT',
  12: '과학',
  13: '외국어',
  14: '예술/대중문화',
  15: '어린이 도서',
};
const BookClubAdminPage = () => {
  const navigate = useNavigate();
  const { bookclubId } = useParams();
  const { data: clubDetail } = useClubDetail(Number(bookclubId));
  console.log(clubDetail)
  if (!clubDetail) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-[30px] px-8">
      {/* 상단 바 */}
      <div className="flex items-center mb-9">
        <div className="flex items-center cursor-pointer" onClick={() => navigate(`/bookclub/${bookclubId}/home`)}>
          <img
            src={backIcon}
            alt="back"
            className="w-6 h-6 cursor-pointer"
          />
          <span className="ml-1 text-[var(--Gray-1,#2C2C2C)] font-['Pretendard'] text-[24px] font-bold leading-[135%]">관리하기</span>
          
        </div>
        <button className="flex ml-4 text-sm text-gray-500 underline"
          onClick={() => navigate(`/bookclub/${bookclubId}/edit`)}>
            독서모임 편집
        </button>
      </div>

      {/* 프로필 카드 */}
      <div className="mb-4 px-2">
        <div className="flex justify-between">
          <div className="flex items-center mb-2">
            <FaUserCircle className="text-5xl text-gray-300 mr-4" />
            <div>
              <p className="text-lg font-semibold">{clubDetail.name}</p>
            </div>
          </div>
          {/* 태그들 */}
          <div className="flex items-center flex-wrap gap-2">
            {clubDetail.category.map((tag, index) => (
              <span
                key={index}
                className="flex items-center justify-center min-w-[54px] h-6 text-white font-Pretend px-3 py-1 rounded-full text-[12px] bg-[#90D26D]"
              >
                {categoryMap[tag]}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-4 bg-green-50 text-sm text-gray-700 p-3 rounded">
          {clubDetail.description}
        </p>
      </div>

      {/* 하단 버튼들 */}
      <div className="flex gap-3.5 justify-end px-4">
        <button
          style={{ backgroundColor: "#EFF5ED", color: "#f18282ff" }}
          className=" px-4 py-2 rounded-full text-sm cursor-pointer"
          onClick={() => navigate(`/bookclub/${bookclubId}/admin/block`)}
        >
          차단 회원
        </button>
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
