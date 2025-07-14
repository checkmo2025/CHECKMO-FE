import React, { useState, useEffect } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { useNavigate } from "react-router-dom";

interface Group {
  id: number;
  name: string;
  description: string;
  profileImage?: string;
}

const MyGroupPage: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchGroups = (pageNumber: number) => {
    const newGroups: Group[] = Array.from({ length: 3 }, (_, idx) => ({
      id: (pageNumber - 1) * 3 + idx + 1,
      name: ["모임 명", "짱구야 책읽자", "독서를 하자"][idx % 3],
      description: [
        "지치지 말아요~",
        "세상에서 제일 귀여운 짱구와 책을 읽어보아요",
        "독서를 합시다.",
      ][idx % 3],
      profileImage: "",
    }));

    setGroups(prev => [...prev, ...newGroups]);

    if (pageNumber >= 2) setHasMore(false);
  };

  useEffect(() => {
    fetchGroups(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        hasMore
      ) {
        setPage(prev => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  const handleLeaveGroup = (id: number) => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      setGroups(groups.filter(group => group.id !== id));
      navigate("/");
    }
  };

  const handleGroupClick = (id: number) => {
    navigate(`/group/${id}`);
  };

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      {/* 사이드바 */}
      <aside className="hidden md:block w-[264px] bg-[#F1F8EF] border-r border-gray-200"></aside>

      {/* 메인 영역 */}
      <main className="flex-1">
        <MyPageHeader title="내 모임" />

        <div className="px-10 py-8 space-y-4 flex flex-col items-center">
          {groups.map((group) => (
            <div
              key={group.id}
              className="flex justify-between bg-white border border-[#EAE5E2] rounded-[16px] px-6 py-4 shadow-sm cursor-pointer hover:bg-[#FAFAFA]"
              style={{ width: "1080px", height: "151px" }}
              onClick={() => handleGroupClick(group.id)}
            >
              {/* 왼쪽: 프로필 사진 + 텍스트 */}
              <div className="flex gap-6">
                {/* 프로필 사진 */}
                <div
                  className="bg-gray-200 rounded-[16px] overflow-hidden"
                  style={{ width: "119px", height: "119px" }}
                ></div>

                {/* 모임 정보 */}
                <div className="flex flex-col justify-between">
                  <div>
                    {/* 뱃지 */}
                    <div className="flex gap-2 mb-3">
                      <span className="w-[54px] h-[24px] rounded-[15px] bg-[#90D26D] text-white text-[13px] flex items-center justify-center">
                        7기
                      </span>
                      <span className="w-[54px] h-[24px] rounded-[15px] bg-[#90D26D] text-white text-[13px] flex items-center justify-center">
                        사회
                      </span>
                    </div>
                    <p className="text-[#2C2C2C] text-[18px] font-semibold">{group.name}</p>
                    <p className="text-[#5C5C5C] text-[14px]">{group.description}</p>
                  </div>
                </div>
              </div>

              {/* 오른쪽: 탈퇴 버튼 */}
              <div className="flex flex-col justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLeaveGroup(group.id);
                  }}
                  className="text-[#5C5C5C] border border-[#EAE5E2] rounded-full hover:bg-[#90D26D] hover:text-[#ffffff]"
                  style={{
                    width: "105px",
                    height: "35px",
                    marginTop: "40px", 
                  }}
                >
                  탈퇴하기
                </button>
              </div>
            </div>
          ))}

          {!hasMore && (
            <p className="text-center text-gray-400 mt-6">더 이상 모임이 없습니다.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default MyGroupPage;
