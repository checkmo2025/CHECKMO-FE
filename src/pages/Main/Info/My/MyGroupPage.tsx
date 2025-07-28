import React, { useState, useEffect } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../../../components/AlertModal";

type MyGroupPageProps = {};

type Group = {
  id: number;
  name: string;
  description: string;
  profileImage?: string;
};

const MyGroupPage = (props: MyGroupPageProps) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);

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

  const handleGroupClick = (id: number) => {
    navigate(`/group/${id}`);
  };

  const confirmLeaveGroup = () => {
    if (selectedGroupId !== null) {
      setGroups(prev => prev.filter(group => group.id !== selectedGroupId));
      setSelectedGroupId(null);
    }
    setShowModal(false);
  };

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      {/* 메인 영역 */}
      <main className="flex-1">
        <MyPageHeader title="내 모임" />

        <div className="px-4 md:px-10 py-8 space-y-4 flex flex-col items-center">
          {groups.map((group) => (
            <div
              key={group.id}
              className="w-full flex flex-col md:flex-row justify-between bg-white border border-[#EAE5E2] rounded-[16px] px-4 md:px-6 py-4 shadow-sm cursor-pointer hover:bg-[#FAFAFA]"
              onClick={() => handleGroupClick(group.id)}
            >
              {/* 왼쪽: 프로필 사진 + 텍스트 */}
              <div className="flex gap-4 md:gap-6">
                <div className="bg-gray-200 rounded-[16px] overflow-hidden w-[80px] h-[80px] md:w-[119px] md:h-[119px] flex-shrink-0" />

                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex gap-2 mb-2 md:mb-3">
                      <span className="min-w-[48px] md:min-w-[54px] h-[22px] md:h-[24px] rounded-[15px] bg-[#90D26D] text-white text-[12px] md:text-[13px] flex items-center justify-center px-2">
                        7기
                      </span>
                      <span className="min-w-[48px] md:min-w-[54px] h-[22px] md:h-[24px] rounded-[15px] bg-[#90D26D] text-white text-[12px] md:text-[13px] flex items-center justify-center px-2">
                        사회
                      </span>
                    </div>
                    <p className="text-[#2C2C2C] text-[16px] md:text-[18px] font-semibold break-keep">
                      {group.name}
                    </p>
                    <p className="text-[#5C5C5C] text-[13px] md:text-[14px] break-words">
                      {group.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* 오른쪽: 탈퇴 버튼 */}
              <div className="flex justify-end md:items-end mt-4 md:mt-0">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedGroupId(group.id);
                    setShowModal(true);
                  }}
                  className="text-[#5C5C5C] border border-[#EAE5E2] rounded-full hover:bg-[#90D26D] hover:text-white w-[90px] md:w-[105px] h-[32px] md:h-[35px] text-sm mt-auto"
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

      {/* 탈퇴 확인 모달 */}
      {showModal && (
        <AlertModal
          message="정말 탈퇴 하시겠습니까?"
          onConfirm={confirmLeaveGroup}
          onClose={() => {
            setShowModal(false);
            setSelectedGroupId(null);
          }}
        />
      )}
    </div>
  );
};

export default MyGroupPage;
