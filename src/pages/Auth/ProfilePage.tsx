import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, ChevronUp, Camera } from "lucide-react";
import AuthLeftPanel from "../../components/AuthLeftPanel";
import { useSubmitAdditionalInfo, useCheckNickname } from "../../hooks/useAuth";
import { BOOK_CATEGORIES } from "../../types/dto";
import { getNicknameError } from "../../utils/validators";
import { useQueryClient } from "@tanstack/react-query";
import { getMyProfile } from "../../apis/My/memberApi";
import { QK } from "../../hooks/useHeader";
import { uploadImage } from "../../apis/imageApi";

const ProfilePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const qc = useQueryClient();

  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem("nickname"));
    const blockedPaths = ["/", "/signup", "/profile"];

    if (isLoggedIn && blockedPaths.includes(location.pathname)) {
      (async () => {
        try {
          const profile = await getMyProfile();
          qc.setQueryData(QK.me, profile);
        } catch (err) {
          console.error("프로필 불러오기 실패:", err);
        }
        navigate("/home", { replace: true });
      })();
    }
  }, [location.pathname, navigate, qc]);

  const [step, setStep] = useState(1);

  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [nicknameMessage, setNicknameMessage] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);

  const [categoryError, setCategoryError] = useState("");
  const [imageError, setImageError] = useState("");

  const { mutate: requestCheckNickname, isPending: isChecking } = useCheckNickname();
  const { mutate: submitInfo, isPending } = useSubmitAdditionalInfo();

  const CATEGORY_LIST = Object.entries(BOOK_CATEGORIES).map(([id, name]) => ({
    id: Number(id),
    name,
  }));

  const toggleCategory = (id: number) => {
    setSelectedCategoryIds((prev) => {
      const picked = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 15
        ? [...prev, id]
        : prev;
      return picked;
    });
    setCategoryError("");
  };

  // 프로필 이미지 업로드
  const uploadProfileImage = async (): Promise<string> => {
    if (useDefaultImage) {
      return "/assets/basic_profile.png"; // 기본 이미지 사용
    }
    if (!profileFile) return "";
    setIsUploading(true);
    try {
      const imgUrl = await uploadImage(profileFile);
      return imgUrl;
    } finally {
      setIsUploading(false);
    }
  };

  const handleCheckNickname = () => {
    const trimmed = nickname.trim();
    if (!trimmed) {
      setIsNicknameAvailable(null);
      setNicknameError("닉네임을 입력해주세요.");
      return;
    }
    if (trimmed.length > 6) {
      setIsNicknameAvailable(null);
      setNicknameError("닉네임은 최대 6글자입니다.");
      return;
    }

    const err = getNicknameError(trimmed);
    if (err) {
      setIsNicknameAvailable(null);
      setNicknameError(err);
      return;
    }

    requestCheckNickname(trimmed, {
      onSuccess: (exists) => {
        if (exists) {
          setIsNicknameAvailable(false);
          setNicknameError("이미 존재하는 닉네임입니다!");
          setNicknameMessage("");
        } else {
          setIsNicknameAvailable(true);
          setNicknameError("");
          setNicknameMessage("사용 가능한 닉네임입니다.");
        }
      },
      onError: () => {
        setIsNicknameAvailable(null);
        setNicknameError("닉네임 확인에 실패했습니다.");
        setNicknameMessage("");
      },
    });
  };

  const handleNext = async () => {
    if (step !== 1) return;

    let hasError = false;

    // 이미지 체크
    if (!useDefaultImage && !profileFile) {
      setImageError("기본 이미지를 선택해주세요!");
      hasError = true;
    } else {
      setImageError("");
    }

    // 닉네임 체크
    if (!nickname.trim()) {
      setNicknameError("닉네임을 입력해주세요.");
      hasError = true;
    } else if (nickname.trim().length > 6) {
      setNicknameError("닉네임은 최대 6글자입니다.");
      hasError = true;
    } else if (isNicknameAvailable !== true) {
      setNicknameError("닉네임 중복 확인을 완료해주세요.");
      hasError = true;
    }

    // 카테고리 체크
    if (selectedCategoryIds.length < 1) {
      setCategoryError("카테고리를 1개 이상 선택해주세요!");
      hasError = true;
    } else {
      setCategoryError("");
    }

    if (hasError) return;

    let imgUrl = "";
    try {
      imgUrl = await uploadProfileImage();
    } catch (e: any) {
      alert(e?.message || "이미지 업로드에 실패했습니다.");
      return;
    }

    submitInfo(
      {
        nickname: nickname.trim(),
        description: bio.trim(),
        imgUrl,
        categoryIds: selectedCategoryIds,
      },
      {
        onSuccess: () => setStep(2),
        onError: (err: any) => {
          const code = err?.response?.data?.code;
          if (code === "MEMBER_406") {
            navigate("/home", { replace: true });
            return;
          }
          alert("프로필 저장에 실패했습니다.");
        },
      }
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUseDefaultImage(false);
    setProfileFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setProfileImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setImageError("");
  };

  const canProceed =
    isNicknameAvailable === true && !isPending && !isUploading;

  const goToClubSearch = () => navigate("/searchClub");
  const goToCreateClub = () => navigate("/createClub");
  const goToHomePage = () => navigate("/home");

  return (
    <div className="flex h-screen font-sans">
      <div className="hidden xl:flex">
        <AuthLeftPanel />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center w-full min-h-screen px-6 py-20">
          <div className="text-center mb-10">
            <img
              src="/assets/checkmo_font_logo.png"
              alt="책모 로고"
              className="mx-auto w-[100px] h-auto"
            />
            {step === 1 ? (
              <p className="text-[#2C2C2C] font-semibold mt-5">
                프로필을 입력해주세요.
              </p>
            ) : (
              <p className="text-[#2C2C2C] font-semibold mt-5">
                회원이 되신 것을 환영합니다! <br /> 참여중인 독서 모임이 있으신가요?
              </p>
            )}
          </div>

          <div className="w-full max-w-md space-y-10">
            {step === 1 && (
              <>
                {/* 프로필 이미지 */}
                <div className="relative w-32 h-32 mx-auto mb-3">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-3 border-[#367216] flex items-center justify-center bg-[#F7FFE9]">
                    {profileImagePreview ? (
                      <img
                        src={profileImagePreview}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        style={
                          profileImagePreview.includes("basic_profile.png")
                            ? { transform: "scale(1.2)" }
                            : {}
                        }
                        onError={(e) => {
                          e.currentTarget.src = "/assets/basic_profile.png";
                          e.currentTarget.style.transform = "scale(1.2)";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#F8FFEF]" />
                    )}
                  </div>

                  {/* 업로드 버튼 */}
                  <label
                    htmlFor="profileImageInput"
                    className="absolute bottom-[-10px] right-[-10px] w-9 h-9 rounded-full bg-[#90D26D] flex items-center justify-center text-white cursor-pointer shadow-md"
                  >
                    <Camera size={18} />
                  </label>
                  <input
                    id="profileImageInput"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* 기본 이미지 사용 버튼 */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setUseDefaultImage(true);
                      setProfileFile(null);
                      setProfileImagePreview("/assets/basic_profile.png");
                      setImageError("");
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      useDefaultImage
                        ? "bg-[#90D26D] text-white cursor-pointer"
                        : "bg-[#EFF5ED] text-[#2C2C2C] cursor-pointer"
                    }`}
                  >
                    기본 이미지 사용
                  </button>
                </div>

                {/* 에러 메시지 */}
                {imageError && (
                  <p className="text-[#FF8045] text-sm text-center mt-2">
                    {imageError}
                  </p>
                )}

                {/* 닉네임 */}
                <div className="mt-6 mb-4">
                  <label className="block mb-1 text-[#2C2C2C] font-semibold">
                    닉네임
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="영어 소문자/숫자/특수문자 (최대 6자)"
                      value={nickname}
                      onChange={(e) => {
                        setNickname(e.target.value);
                        setIsNicknameAvailable(null);
                        setNicknameMessage("");
                        if (e.target.value.length > 6) {
                          setNicknameError("닉네임은 최대 6글자입니다.");
                        } else {
                          setNicknameError("");
                        }
                      }}
                      className="w-full border-b border-[#DADFE3] px-2 py-2 focus:outline-none"
                    />
                    <button
                      onClick={handleCheckNickname}
                      type="button"
                      disabled={
                        isChecking ||
                        isNicknameAvailable === true ||
                        nickname.length > 6
                      }
                      className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-[12px] font-semibold
                          ${
                            isChecking
                              ? "bg-[#90D26D] text-white opacity-70 cursor-not-allowed"
                              : isNicknameAvailable === true
                              ? "bg-[#EFF5ED] text-[#90D26D] cursor-not-allowed"
                              : nickname && nickname.length <= 6
                              ? "bg-[#90D26D] text-white cursor-pointer"
                              : "bg-[#EFF5ED] text-[#90D26D] cursor-not-allowed"
                          }`}
                      style={{ width: "70px", height: "28px" }}
                    >
                      {isChecking ? "확인 중..." : "중복 확인"}
                    </button>
                  </div>
                  {nicknameError && (
                    <p className="mt-2 text-[#FF8045] text-sm">{nicknameError}</p>
                  )}
                  {nicknameMessage && (
                    <p className="mt-2 text-sm font-medium text-[#90D26D]">
                      {nicknameMessage}
                    </p>
                  )}
                </div>

                {/* 소개 */}
                <div className="mb-5">
                  <label className="block mb-1 text-[#2C2C2C] font-semibold">
                    소개
                  </label>
                  <input
                    type="text"
                    placeholder="50자 이내 (공란 가능)"
                    value={bio}
                    maxLength={50}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full border-b border-[#DADFE3] px-2 py-2 focus:outline-none"
                  />
                </div>

                {/* 카테고리 */}
                <div className="mb-6">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  >
                    <span className="block mb-3 text-[#2C2C2C] font-semibold">
                      관심 독서 카테고리 (최소 1개)
                    </span>
                    {isCategoryOpen ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isCategoryOpen ? "max-h-[400px] mt-3" : "max-h-0"
                    }`}
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {CATEGORY_LIST.map((c) => {
                        const picked = selectedCategoryIds.includes(c.id);
                        const limitReached =
                          selectedCategoryIds.length >= 15 && !picked;
                        return (
                          <button
                            key={c.id}
                            onClick={() => toggleCategory(c.id)}
                            disabled={limitReached}
                            className={`w-full min-w-[90px] h-10 rounded-full text-sm font-medium transition 
                              ${
                                picked
                                  ? "bg-[#F8FFEF] text-[#90D26D] border border-[#90D26D] cursor-pointer"
                                  : "bg-[#e6e4e4] text-[#8D8D8D] cursor-pointer"
                              }`}
                          >
                            {c.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  {categoryError && (
                    <p className="mt-2 text-[#FF8045] text-sm">{categoryError}</p>
                  )}
                </div>

                {/* 다음 버튼 */}
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`w-full py-3 rounded transition 
                    ${
                      canProceed
                        ? "bg-[#90D26D] text-white hover:opacity-90 cursor-pointer"
                        : "bg-[#EFF5ED] text-[#8D8D8D] cursor-not-allowed"
                    }`}
                >
                  {isPending || isUploading ? "저장 중..." : "다음"}
                </button>
              </>
            )}

            {step === 2 && (
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full border-2 border-[#49863c] flex items-center justify-center overflow-hidden bg-[#F0FBE3] mb-4">
                  {profileImagePreview ? (
                    <img
                      src={profileImagePreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 text-sm">
                      기본
                    </div>
                  )}
                </div>
                <h2 className="text-lg font-bold text-[#2C2C2C] mb-2">
                  {nickname}
                </h2>
                <p className="text-gray-500 text-center text-sm mb-6">
                  {bio ? bio : "소개글이 없습니다."}
                </p>

                <button
                  onClick={goToClubSearch}
                  className="w-full bg-[#90D26D] text-white py-2 rounded mb-4 transition hover:opacity-90 cursor-pointer"
                >
                  모임 검색하기
                </button>
                <button
                  onClick={goToCreateClub}
                  className="w-full bg-[#90D26D] text-white py-2 rounded mb-4 transition hover:opacity-90 cursor-pointer"
                >
                  모임 생성하기
                </button>
                <button
                  onClick={goToHomePage}
                  className="w-full bg-[#90D26D] text-white py-2 rounded mb-3 transition hover:opacity-90 cursor-pointer"
                >
                  모임 없이 이용하기
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;