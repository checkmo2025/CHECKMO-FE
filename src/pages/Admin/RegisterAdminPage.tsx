
import backIcon from "../../assets/icons/backIcon.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useClubgetMembers } from "../../hooks/BookClub/useClubgetMembers";
import type { ClubMember } from "../../types/Club/GetClubMembers";

const RegisterAdminPage = () => {
  const navigate = useNavigate();
  const { bookclubId } = useParams<{ bookclubId: string }>();
  const [Member, setMember] = useState<ClubMember[]>([]);

  const { data: Result, fetchNextPage, hasNextPage, isFetchingNextPage, } = useClubgetMembers({
    clubId: Number(bookclubId),
    status: 'PENDING',
    size: 20
  });

  useEffect(() => {
    console.log(Result);
    if (!Result) { return; }
    const List = Result.pages.flatMap(page => page.clubMembers);
    setMember(List);
  }, [Result]);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="mt-[30px] px-8">
      {/* 상단 바 */}
      <div className="flex justify-between items-center mb-9">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate(`/bookclub/${bookclubId}/admin`)}
        >
          <img
            src={backIcon}
            alt="back"
            className="w-6 h-6 cursor-pointer"
          />
          <span className="ml-2 text-[var(--Gray-1,#2C2C2C)] font-['Pretendard'] text-[24px] font-bold leading-[135%]">신청 관리</span>
        </div>
      </div>

      {/* 프로필 카드 목록 */}
      {Member.map((member) => (
        <div key={member.clubMemberId} className="px-4 mb-10 ">
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <img src={member.basicInfo.profileImageUrl || "https://via.placeholder.com/40"} alt="profile" className="w-12 h-12 rounded-full mr-4" />
              <div>
                <p className="text-lg font-semibold">{member.basicInfo.nickname}</p>
              </div>
            </div>

            {/* 세팅 버튼들 */}
            <div className="flex items-center gap-3">
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
          <p className="bg-[#EFF5ED] text-18 font-Pretend text-[#5C5C5C] rounded-[16px] flex h-14 py-2.5 px-5 items-center ">
            {member.joinMessage || "가입 메시지가 없습니다."}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RegisterAdminPage;
