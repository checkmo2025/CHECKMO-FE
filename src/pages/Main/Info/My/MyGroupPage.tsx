import { useState } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { useNavigate } from "react-router-dom";
import AlertModal from "../../../../components/AlertModal";
import { useMyClubsQuery, useLeaveClub } from "../../../../hooks/My/useMember"; 
import type { ClubItem } from "../../../../types/My/member";

const MyGroupPage = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false); 
  const [showResultModal, setShowResultModal] = useState(false);  
  const [showErrorModal, setShowErrorModal] = useState(false); // 에러 모달
  const [errorMessage, setErrorMessage] = useState("");         // 에러 메시지
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({});
  const [isLeaving, setIsLeaving] = useState(false); 
  const navigate = useNavigate();

  // 첫 페이지 호출
  const { data, isFetching, isError, refetch } = useMyClubsQuery(null);

  // 탈퇴 훅
  const leaveClubMutation = useLeaveClub();

  const handleGroupClick = (id: number) => {
    navigate(`/shelf/${id}`);
  };

  // 탈퇴 실행
  const confirmLeaveGroup = () => {
    if (!selectedGroupId || isLeaving) return; // 이미 요청 중이면 중단
    setIsLeaving(true);

    leaveClubMutation.mutate(selectedGroupId, {
      onSuccess: () => {
        setIsLeaving(false);
        setSelectedGroupId(null);
        setShowConfirmModal(false);
        setShowResultModal(true); // 성공 모달
        refetch();
      },
      onError: (error: any) => {
        setIsLeaving(false);
        setSelectedGroupId(null);
        setShowConfirmModal(false);

        const code = error?.response?.data?.code;
        const message = error?.response?.data?.message;

        if (code === "CLUB_4019") {
          setErrorMessage(message || "운영진은 클럽을 탈퇴할 수 없습니다.");
        } else {
          setErrorMessage(message || "탈퇴에 실패했습니다.");
        }
        setShowErrorModal(true);
      },
    });
  };

  // 이미지 경로 처리 함수
  const getImageUrl = (url: string | null) => {
    if (!url) return null;
    return url.startsWith("http")
      ? url
      : `${import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
  };

  if (isError) {
    return <div className="p-6 text-red-500">모임 목록을 불러오는데 실패했습니다.</div>;
  }

  return (
    <div className="flex w-full h-screen bg-[#FAFAFA] overflow-hidden">
      <MyPageHeader title="내 모임" />

      <div className="flex-1 flex flex-col pt-[96px] overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 md:px-10 py-8 space-y-4 flex flex-col items-center">
            {data?.clubList?.map((group: ClubItem) => {
              const imgUrl = getImageUrl(group.profileImageUrl);
              const isErrorImage = errorImages[group.clubId] || !imgUrl;

              return (
                <div
                  key={group.clubId}
                  className="w-full flex flex-col md:flex-row justify-between bg-white border border-[#EAE5E2] rounded-[16px] px-4 md:px-6 py-4 shadow-sm cursor-pointer hover:bg-[#FAFAFA]"
                  onClick={() => handleGroupClick(group.clubId)}
                >
                  {/* 왼쪽: 프로필 사진 + 텍스트 */}
                  <div className="flex gap-4 md:gap-6">
                    <div className="bg-gray-200 rounded-[16px] overflow-hidden w-[80px] h-[100px] md:w-[119px] md:h-[119px] flex-shrink-0 flex items-center justify-center">
                      {!isErrorImage ? (
                        <img
                          src={imgUrl!}
                          alt={group.name}
                          className="w-full h-full object-cover"
                          onError={() =>
                            setErrorImages((prev) => ({ ...prev, [group.clubId]: true }))
                          }
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between">
                      <div>
                        <div className="flex gap-2 mb-2 md:mb-3">
                          <span className="min-w-[48px] md:min-w-[54px] h-[22px] md:h-[24px] rounded-[15px] bg-[#90D26D] text-white text-[12px] md:text-[13px] flex items-center justify-center px-2">
                            7기
                          </span>
                          {group.category.map((cat, idx) => (
                            <span
                              key={idx}
                              className="min-w-[48px] md:min-w-[54px] h-[22px] md:h-[24px] rounded-[15px] bg-[#90D26D] text-white text-[12px] md:text-[13px] flex items-center justify-center px-2"
                            >
                              {cat}
                            </span>
                          ))}
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
                        setSelectedGroupId(group.clubId);
                        setShowConfirmModal(true);
                      }}
                      disabled={isLeaving} // 요청 중이면 버튼 비활성화
                      className={`text-[#5C5C5C] border border-[#EAE5E2] rounded-full w-[90px] md:w-[105px] h-[32px] md:h-[35px] text-sm mt-auto 
                        ${isLeaving ? "opacity-50 cursor-not-allowed" : "hover:bg-[#90D26D] hover:text-white"}`}
                    >
                      탈퇴하기
                    </button>
                  </div>
                </div>
              );
            })}

            {isFetching && (
              <p className="text-center text-gray-400">불러오는 중...</p>
            )}
          </div>
        </main>
      </div>

      {/* 확인 모달 */}
      {showConfirmModal && (
        <AlertModal
          message="정말 탈퇴 하시겠습니까?"
          onConfirm={confirmLeaveGroup}
          onClose={() => {
            setShowConfirmModal(false);
            setSelectedGroupId(null);
          }}
        />
      )}

      {/* 결과 모달 */}
      {showResultModal && (
        <AlertModal
          message="탈퇴되었습니다."
          onConfirm={() => setShowResultModal(false)}
          onClose={() => setShowResultModal(false)} 
        />
      )}

      {/* 에러 모달 */}
      {showErrorModal && (
        <AlertModal
          message={errorMessage}
          onConfirm={() => setShowErrorModal(false)}
          onClose={() => setShowErrorModal(false)}
        />
      )}
    </div>
  );
};

export default MyGroupPage;
