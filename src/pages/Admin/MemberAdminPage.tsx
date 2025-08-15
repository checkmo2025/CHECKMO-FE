import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../assets/icons/backIcon.png";
import { useEffect, useState } from "react";
import type { ClubMember } from "../../types/Club/GetClubMembers";
import { useClubgetMembers } from "../../hooks/BookClub/useClubgetMembers";

const MemberAdminPage = () => {
  const navigate = useNavigate();
  const { bookclubId } = useParams<{ bookclubId: string }>();
  const [Member, setMember] = useState<ClubMember[]>([]);

  const {  data: Result,  fetchNextPage,  hasNextPage,  isFetchingNextPage,} =  useClubgetMembers({
      clubId: Number(bookclubId),
      status: 'ALL',
      size: 20
  });
  useEffect(() => {
      if (!Result){return;}
      const List = Result.pages.flatMap(page => page.clubMembers);
      const filteredList = List.filter(member =>
        member.clubMemberStatus !== 'PENDING' && member.clubMemberStatus !== 'BLOCKED'
      );
      setMember(filteredList);
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
          <span className="ml-2 text-[var(--Gray-1,#2C2C2C)] font-['Pretendard'] text-[24px] font-bold leading-[135%]">회원 관리</span>
        </div>
      </div>

      {/* 멤버 리스트 */}
      <ul className="space-y-4 px-4">
        {Member?.map((member) => (
          <li
            key={member.clubMemberId}
            style={{ borderBottom: "1px solid #EAE5E2" }}
            className="flex items-center justify-between pb-4"
          >
            {/* 유저 정보 */}
            <div className="flex items-center">
              <img src = {member.basicInfo.profileImageUrl || "https://via.placeholder.com/40"} alt="profile" className="w-12 h-12 rounded-full mr-4" />
              <span className="font-['Pretendard'] text-[18px] font-semibold leading-[135%] text-gray-800">
                {member.basicInfo.nickname}
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
