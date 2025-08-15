// src/pages/BookClub/Club/EditPage.tsx
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChipToggleGroup } from "../../../components/CreateClub/ChipToggleGroup";
import Header from "../../../components/Header";
import { BOOK_CATEGORIES, PARTICIPANT_TYPES } from "../../../types/dto";
import { useClubDetail } from "../../../hooks/BookClub/useClubDetail";
import { useUpdateClub } from "../../../hooks/useUpdateClub";
import { useUploadImage } from "../../../hooks/useUploadImage";
import { useIsStaff } from "../../../hooks/BookClub/useIsStaff";
import { useClubNameValidation } from "../../../hooks/useClubNameValidation";

// 카테고리 옵션 (문자열 배열로 변환)
const BOOK_CATEGORY_OPTIONS = Object.values(BOOK_CATEGORIES);

// 참여자 유형 옵션 (문자열 배열로 변환)
const PARTICIPANT_TYPE_OPTIONS = Object.values(PARTICIPANT_TYPES);

// 카테고리 이름을 ID로 변환하는 함수
const getCategoryId = (categoryName: string): number => {
  const entry = Object.entries(BOOK_CATEGORIES).find(
    ([, name]) => name === categoryName
  );
  return entry ? parseInt(entry[0]) : 1;
};

// 카테고리 ID를 이름으로 변환하는 함수
const getCategoryName = (categoryId: number): string => {
  return BOOK_CATEGORIES[categoryId as keyof typeof BOOK_CATEGORIES] || "기타";
};

// 참여자 유형 키를 이름으로 변환하는 함수
const getParticipantName = (participantKey: string): string => {
  return (
    PARTICIPANT_TYPES[participantKey as keyof typeof PARTICIPANT_TYPES] ||
    "기타"
  );
};

// 참여자 유형 이름을 키로 변환하는 함수
const getParticipantKey = (participantName: string): string => {
  const entry = Object.entries(PARTICIPANT_TYPES).find(
    ([_, name]) => name === participantName
  );
  return entry ? entry[0] : "STUDENT";
};

export default function EditClubPage(): React.ReactElement {
  const navigate = useNavigate();
  const { bookclubId } = useParams<{ bookclubId: string }>();
  const numericClubId = useMemo(() => Number(bookclubId ?? 0), [bookclubId]);
  const { data: club, isLoading: isClubLoading } = useClubDetail(numericClubId);
  const updateClubMutation = useUpdateClub(numericClubId);
  const uploadImageMutation = useUploadImage();
  const { data: isStaff, isLoading: isStaffLoading } =
    useIsStaff(numericClubId);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    []
  );
  const [clubName, setClubName] = useState("");
  const [clubDescription, setClubDescription] = useState("");
  const [activityArea, setActivityArea] = useState("");
  const [instaLink, setInstaLink] = useState("");
  const [kakaoLink, setKakaoLink] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibility, setVisibility] = useState<"공개" | "비공개" | null>(null);
  const [originalClubName, setOriginalClubName] = useState(""); // 원본 클럽명 저장
  const categoryKey = useMemo(
    () => (club?.category || []).join(","),
    [club?.category]
  );
  const participantKey = useMemo(
    () => (club?.participantTypes || []).join(","),
    [club?.participantTypes]
  );

  const {
    isValidating,
    isDuplicate,
    checkClubName,
    hasManualCheck,
    resetValidation,
  } = useClubNameValidation();
  const isNameChanged = useMemo(
    () => clubName.trim() !== (originalClubName ?? "").trim(),
    [clubName, originalClubName]
  );

  // 클럽 정보 로드
  useEffect(() => {
    if (!numericClubId || Number.isNaN(numericClubId) || numericClubId <= 0) {
      alert("잘못된 접근입니다.");
      navigate("/");
      return;
    }
  }, [numericClubId, navigate]);

  // 운영진이 아니면 접근 차단 UX 처리 (백엔드에서도 차단됨)
  useEffect(() => {
    if (isStaff === false) {
      alert("이 페이지는 운영진만 접근할 수 있습니다.");
      navigate(`/bookclub/${numericClubId}/home`);
    }
  }, [isStaff, navigate, numericClubId]);

  useEffect(() => {
    if (!club) return;
    setClubName(club.name ?? "");
    setOriginalClubName(club.name ?? "");
    setClubDescription(club.description ?? "");
    setVisibility(club.open ? "공개" : "비공개");
    setActivityArea(club.region || "");
    setInstaLink(club.insta || "");
    setKakaoLink(club.kakao || "");
    setProfileImageUrl(club.profileImageUrl || "");
    const categoryNames = (club.category || [])
      .map(getCategoryName)
      .filter(Boolean);
    setSelectedCategories(categoryNames);
    const participantNames = (club.participantTypes || [])
      .map(getParticipantName)
      .filter(Boolean);
    setSelectedParticipants(participantNames);
  }, [club]);

  // 클럽 수정 핸들러
  const handleUpdateClub = async () => {
    if (!clubName.trim()) {
      alert("모임 이름을 입력해주세요.");
      return;
    }
    if (!clubDescription.trim()) {
      alert("모임 소개글을 입력해주세요.");
      return;
    }
    if (visibility === null) {
      alert("공개/비공개 여부를 선택해주세요.");
      return;
    }
    if (selectedCategories.length === 0) {
      alert("선호하는 독서 카테고리를 선택해주세요.");
      return;
    }
    if (selectedParticipants.length === 0) {
      alert("모임 참여 대상을 선택해주세요.");
      return;
    }

    setIsSubmitting(true);
    updateClubMutation.mutate(
      {
        name: clubName,
        description: clubDescription,
        open: visibility === "공개", // 서버에서 무시됨
        profileImageUrl: profileImageUrl || undefined,
        category: selectedCategories.map(getCategoryId),
        participantTypes: selectedParticipants.map(getParticipantKey),
        region: activityArea || "서울",
        insta: instaLink || undefined,
        kakao: kakaoLink || undefined,
      },
      {
        onSettled: () => setIsSubmitting(false),
      }
    );
  };

  if (isClubLoading || isStaffLoading) {
    return (
      <div className="absolute left-[315px] right-[42px] opacity-100">
        <Header pageTitle="모임 편집하기" customClassName="mt-[60px]" />
        <div className="mt-8 flex flex-col items-center justify-center h-96">
          <p className="text-lg">클럽 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute left-[315px] right-[42px] top-0 bottom-0 opacity-100 flex flex-col">
      <Header
        pageTitle="모임 편집하기"
        customClassName="mt-[30px] flex-shrink-0"
      />

      {/* 스크롤 가능한 컨텐츠 영역 */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
      >
        <div className="mt-8 flex flex-col items-center">
          {/* 모임 이름 + 중복확인 버튼 */}
          <div className="mt-[36px]">
            <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]">
              독서 모임을 입력해주세요.
            </label>
            <div className="flex flex-col mt-[16px]">
              <div className="flex gap-[12px] items-center">
                <input
                  value={clubName}
                  onChange={(e) => {
                    setClubName(e.target.value);
                    if (isNameChanged) {
                      resetValidation();
                    }
                  }}
                  className="w-[699px] h-[40px] rounded-[16px] px-[17px] py-[10px] bg-[#F4F2F1] text-[14px] text-[#2C2C2C] outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!clubName.trim()) return;
                    if (!isNameChanged) return; // 원본과 같으면 스킵
                    checkClubName(clubName);
                  }}
                  disabled={!clubName.trim() || !isNameChanged || isValidating}
                  className="w-[90px] h-[35px] ml-[19px] bg-[#90D26D] text-white rounded-[16px] text-[12px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isValidating ? "확인중" : "중복 확인"}
                </button>
              </div>
              {isDuplicate === true && (
                <p className="mt-[10px] font-pretendard font-medium text-[12px] leading-[145%] tracking-[-0.1%] text-[#FF8045]">
                  다른 이름을 입력하거나, 기수 또는 지역명을 추가해 구분해
                  주세요.
                  <br />
                  예) 독서재량 2기, 독서재량 서울, 북적북적 인문학팀
                </p>
              )}
              {isDuplicate === false && hasManualCheck && (
                <p className="mt-[10px] font-pretendard font-medium text-[12px] leading-[145%] tracking-[-0.1%] text-[#367216]">
                  사용가능한 독서 이름 입니다.
                </p>
              )}
            </div>
          </div>

          {/* 모임 소개 */}
          <div className="mt-[56px] flex flex-col">
            <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]">
              모임의 소개글을 입력해주세요.
            </label>
            <textarea
              value={clubDescription}
              onChange={(e) => setClubDescription(e.target.value)}
              placeholder="내용을 입력해주세요."
              className="w-[808px] h-[265px] rounded-[16px] border-[2px] border-[#EAE5E2] px-[20px] py-[20px] text-[14px] text-[#2C2C2C] outline-none mt-[16px] resize-none"
            />
          </div>

          {/* 프로필 사진 업로드 */}
          <div className="mt-[56px] flex flex-col items-center">
            <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] ">
              모임의 프로필 사진을 업로드 해주세요.
            </label>
            <div
              className="
              mt-[16px]
              w-[216px] h-[216px]
              bg-white rounded-[16px] border-[2px] border-[#EAE5E2]
              cursor-pointer
              flex flex-col items-center justify-center
            "
              onClick={() => fileInputRef.current?.click()}
            >
              {previewImageUrl || profileImageUrl ? (
                <img
                  src={previewImageUrl || profileImageUrl}
                  alt=""
                  className="w-full h-full object-cover rounded-[14px]"
                />
              ) : (
                <span className="text-[24px] text-gray-300">＋</span>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              className="hidden cursor-pointer"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => {
                  setPreviewImageUrl(reader.result as string);
                };
                reader.readAsDataURL(file);
                uploadImageMutation.mutate(file, {
                  onSuccess: (url) => {
                    // 업로드 완료 후 실제 이미지가 로드되면 미리보기 → 최종 URL로 전환
                    const img = new Image();
                    img.onload = () => {
                      setProfileImageUrl(url);
                      setPreviewImageUrl(null);
                    };
                    img.onerror = () => {
                      // 네트워크 지연으로 즉시 로드되지 않으면 잠시 후 전환 시도
                      setTimeout(() => {
                        setProfileImageUrl(url);
                        setPreviewImageUrl(null);
                      }, 1500);
                    };
                    img.src = `${url}?t=${Date.now()}`;
                  },
                  onError: () => {
                    setPreviewImageUrl(null);
                  },
                });
              }}
            />
            {uploadImageMutation.isPending && (
              <p className="mt-2 text-sm text-[#8D8D8D]">이미지 업로드 중...</p>
            )}
          </div>

          {/* 모임 공개 여부 */}
          <div className="mt-[56px] opacity-30">
            <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]">
              모임의 공개/비공개 여부를 알려주세요.
            </label>
            <div className="flex gap-[24px]">
              {/* 공개 버튼 - 수정 불가 */}
              <button
                type="button"
                onClick={() => {}} // 클릭해도 아무 동작 안 함
                disabled={true} // 항상 비활성화
                className={`
                w-[178px] h-[53px]
                mt-[16px] flex flex-col items-center justify-center
                rounded-[36px] py-[10px]
                cursor-not-allowed
                ${
                  visibility === "공개"
                    ? "bg-[#90D26D] text-white"
                    : "border-[1px] border-[#90D26D]"
                }
              `}
              >
                <span
                  className={`font-pretendard font-semibold text-[12px] leading-[145%] tracking-[-0.1%] text-center ${
                    visibility === "공개" ? "text-white" : "text-[#2C2C2C]"
                  }`}
                >
                  공개
                </span>
                <span
                  className={`font-pretendard font-normal text-[12px] mt-[4px] ${
                    visibility === "공개" ? "text-white" : "text-[#8D8D8D]"
                  }`}
                >
                  누구나 가입 가능
                </span>
              </button>

              {/* 비공개 버튼 - 수정 불가 */}
              <button
                type="button"
                onClick={() => {}} // 클릭해도 아무 동작 안 함
                disabled={true} // 항상 비활성화
                className={`
                w-[178px] h-[53px]
                mt-[16px] flex flex-col items-center justify-center
                rounded-[36px] py-[10px]
                cursor-not-allowed
                ${
                  visibility === "비공개"
                    ? "bg-[#90D26D] text-white"
                    : "border-[1px] border-[#90D26D]"
                }
              `}
              >
                <span
                  className={`font-pretendard font-semibold text-[12px] leading-[145%] tracking-[-0.1%] text-center ${
                    visibility === "비공개" ? "text-white" : "text-[#2C2C2C]"
                  }`}
                >
                  비공개
                </span>
                <span
                  className={`font-pretendard font-normal text-[12px] mt-[4px] ${
                    visibility === "비공개" ? "text-white" : "text-[#8D8D8D]"
                  }`}
                >
                  운영자의 승인 필요
                </span>
              </button>
            </div>
          </div>

          {/* 독서 카테고리 */}
          <div className="mt-[56px]">
            <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
              선호하는 독서 카테고리를 선택해주세요.
            </label>
            <div className="mt-[16px] max-w-[400px]">
              <ChipToggleGroup
                key={`cat-${categoryKey}`}
                options={BOOK_CATEGORY_OPTIONS}
                defaultSelected={selectedCategories}
                onChange={setSelectedCategories}
              />
            </div>
          </div>

          {/* 모임 참여 대상 */}
          <div className="mt-[56px]">
            <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
              모임 참여 대상을 선택해주세요.
            </label>
            <div className="mt-[16px] max-w-[400px]">
              <ChipToggleGroup
                key={`part-${participantKey}`}
                options={PARTICIPANT_TYPE_OPTIONS}
                defaultSelected={selectedParticipants}
                onChange={setSelectedParticipants}
              />
            </div>
          </div>

          {/* 활동 지역 */}
          <div className="mt-[56px]">
            <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
              활동 지역을 작성해주세요.
            </label>
            <div className="mt-[16px] flex flex-col gap-[16px]">
              <input
                value={activityArea}
                onChange={(e) => setActivityArea(e.target.value)}
                className="w-[393px] h-[40px] bg-[#F6F5F3] rounded-full px-[17px] py-[10px] text-[14px] text-[#2C2C2C] outline-none placeholder:text-[#BBBBBB]"
              />
            </div>
          </div>

          {/* SNS/카카오톡 링크 연동 (선택) */}
          <div className="mt-[56px]">
            <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
              SNS/카카오톡 링크 연동 (선택)
            </label>
            <div className="mt-[16px] flex flex-col gap-[16px]">
              <input
                value={instaLink}
                onChange={(e) => setInstaLink(e.target.value)}
                placeholder="인스타그램 링크"
                className="w-[393px] h-[40px] bg-[#F6F5F3] rounded-full px-[17px] py-[10px] text-[14px] text-[#2C2C2C] outline-none placeholder:text-[#BBBBBB]"
              />
              <input
                value={kakaoLink}
                onChange={(e) => setKakaoLink(e.target.value)}
                placeholder="카카오톡 링크"
                className="w-[393px] h-[40px] bg-[#F6F5F3] rounded-full px-[17px] py-[10px] text-[14px] text-[#2C2C2C] outline-none placeholder:text-[#BBBBBB]"
              />
            </div>
          </div>

          {/* 유의사항 */}
          <div className="mt-[86px] w-[393px] h-[88px] flex flex-col items-center">
            {/* 저장하기 버튼 */}
            <button
              type="button"
              onClick={handleUpdateClub}
              disabled={isSubmitting}
              className="
              w-full mt-[12px] py-[12px] bg-[#90D26D] text-white
              rounded-[16px] font-pretendard font-semibold text-[20px]
              cursor-pointer
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            >
              {isSubmitting ? "저장 중..." : "저장하기"}
            </button>
          </div>

          {/* 하단 여백 */}
          <div className="h-[100px]"></div>
        </div>
      </div>
    </div>
  );
}
