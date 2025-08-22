import { useState, useRef, useCallback } from "react";
import MyPageHeader from "../../../../components/MyPageHeader";
import { useNavigate } from "react-router-dom";
import Modal from "../../../../components/Modal"; 
import { useLeaveClub } from "../../../../hooks/My/useMember";
import { useMyClubsInfinite } from "../../../../hooks/My/useClubsInfinite"; 
import type { ClubItem } from "../../../../types/My/member";

const MyGroupPage = () => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({});
  const [isLeaving, setIsLeaving] = useState(false);
  const navigate = useNavigate();

  // 무한 스크롤 쿼리
  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useMyClubsInfinite();

  const leaveClubMutation = useLeaveClub();

  // IntersectionObserver Ref (타입 수정)
  const observerRef = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const handleGroupClick = (id: number) => {
    navigate(`/bookclub/${id}/home`);
  };

  const confirmLeaveGroup = () => {
    if (!selectedGroupId || isLeaving) return;
    setIsLeaving(true);

    leaveClubMutation.mutate(selectedGroupId, {
      onSuccess: () => {
        setIsLeaving(false);
        setSelectedGroupId(null);
        setShowConfirmModal(false);
        setShowResultModal(true);
      },
      onError: (error: any) => {
        setIsLeaving(false);
        setSelectedGroupId(null);
        setShowConfirmModal(false);

        const code = error?.response?.data?.code;
        const message = error?.response?.data?.message;
        const status = error?.response?.status;

        if (code === "CLUB_4019") {
          setErrorMessage(message || "운영진은 클럽을 탈퇴할 수 없습니다.");
        } else if (status === 400) {
          setErrorMessage(message || "잘못된 요청입니다.");
        } else if (status === 403) {
          setErrorMessage(message || "본인만 탈퇴할 수 있습니다.");
        } else if (status === 404) {
          setErrorMessage(message || "존재하지 않는 독서 모임입니다.");
        } else {
          setErrorMessage(message || "탈퇴에 실패했습니다.");
        }
        setShowErrorModal(true);
      },
    });
  };

  const getImageUrl = (url: string | null) => {
    if (!url) return null;
    return url.startsWith("http")
      ? url
      : `${import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "")}/${url.replace(/^\//, "")}`;
  };

  if (isError) {
    return <div className="p-6 text-red-500">모임 목록을 불러오는데 실패했습니다.</div>;
  }

  // page 타입 지정
  const clubList =
    data?.pages.flatMap((page: { clubList: ClubItem[] }) => page.clubList) ?? [];

  return (
    <div className="flex w-full h-screen bg-[#FAFAFA] overflow-hidden">
      <MyPageHeader title="내 모임" />

      <div className="flex-1 flex flex-col pt-[96px] overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="px-4 md:px-10 py-8 flex flex-col items-center min-h-full">
            {/* case1: 모임이 없을 때 */}
            {clubList.length === 0 ? (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-gray-400">모임이 없습니다.</p>
              </div>
            ) : (
              <div className="w-full space-y-4 flex flex-col">
                {clubList.map((group: ClubItem, idx: number) => {
                  const imgUrl = getImageUrl(group.profileImageUrl);
                  const isErrorImage = errorImages[group.clubId] || !imgUrl;
                  const isLast = idx === clubList.length - 1;

                  return (
                    <div
                      key={group.clubId}
                      ref={isLast ? lastElementRef : null} // 마지막 요소에 observer 연결
                      className="w-full flex flex-col md:flex-row justify-between bg-white border border-[#EAE5E2] rounded-[16px] px-4 md:px-6 py-4 shadow-sm cursor-pointer transition-transform duration-300 transform hover:shadow-lg hover:scale-105"
                      onClick={() => handleGroupClick(group.clubId)}
                    >
                      <div className="flex gap-4 md:gap-6">
                        <div className="bg-gray-200 rounded-[16px] overflow-hidden w-[80px] h-[100px] md:w-[119px] md:h-[119px] flex-shrink-0 flex items-center justify-center">
                          <img
                            src={
                              !isErrorImage
                                ? imgUrl!
                                : "/assets/basic_bookclub_image.png"
                            }
                            alt={group.name}
                            className="w-full h-full object-cover"
                            loading="lazy" 
                            onError={(e) => {
                              e.currentTarget.src = "/assets/basic_bookclub_image.png"; 
                              setErrorImages((prev) => ({ ...prev, [group.clubId]: true }));
                            }}
                          />
                        </div>

                        <div className="flex flex-col justify-between">
                          <div>
                            <div className="flex gap-2 mb-2 md:mb-3">
                              {group.category.map((cat: string, idx: number) => (
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

                      <div className="flex justify-end md:items-end mt-4 md:mt-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGroupId(group.clubId);
                            setShowConfirmModal(true);
                          }}
                          disabled={isLeaving}
                          className={`text-[#5C5C5C] border border-[#EAE5E2] rounded-full w-[90px] md:w-[105px] h-[32px] md:h-[35px] text-sm mt-auto 
                            ${isLeaving ? "opacity-50 cursor-not-allowed" : "hover:bg-[#90D26D] hover:text-white cursor-pointer"}`}
                        >
                          탈퇴하기
                        </button>
                      </div>
                    </div>
                  );
                })}

                {isFetchingNextPage && (
                  <p className="text-center text-gray-400">불러오는 중...</p>
                )}

                {!hasNextPage && (
                  <div className="w-full mt-4 flex justify-center">
                    <p className="text-gray-400">더 이상 모임이 없습니다.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* 모달들 */}
      <Modal
        isOpen={showConfirmModal}
        title="정말 탈퇴 하시겠습니까?"
        buttons={[
          { label: "탈퇴", onClick: confirmLeaveGroup, variant: "danger" },
          {
            label: "취소",
            onClick: () => {
              setShowConfirmModal(false);
              setSelectedGroupId(null);
            },
            variant: "outline",
          },
        ]}
        onBackdrop={() => {
          setShowConfirmModal(false);
          setSelectedGroupId(null);
        }}
      />

      <Modal
        isOpen={showResultModal}
        title="탈퇴되었습니다."
        buttons={[{ label: "확인", onClick: () => setShowResultModal(false), variant: "primary" }]}
        onBackdrop={() => setShowResultModal(false)}
      />

      <Modal
        isOpen={showErrorModal}
        title={errorMessage}
        buttons={[{ label: "확인", onClick: () => setShowErrorModal(false), variant: "primary" }]}
        onBackdrop={() => setShowErrorModal(false)}
      />
    </div>
  );
};

export default MyGroupPage;