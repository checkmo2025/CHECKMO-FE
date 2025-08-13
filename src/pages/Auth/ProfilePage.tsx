import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Camera } from "lucide-react";
import AuthLeftPanel from "../../components/AuthLeftPanel";
import { useSubmitAdditionalInfo, useCheckNickname } from "../../hooks/useAuth";
import { BOOK_CATEGORIES } from "../../types/dto";
import { isValidNickname, getNicknameError } from "../../utils/validators";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // 입력값
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  // 이미지
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // (stub)

  // 닉네임 체크
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<boolean | null>(null);
  const { mutate: requestCheckNickname, isPending: isChecking } = useCheckNickname();

  const { mutate: submitInfo, isPending } = useSubmitAdditionalInfo();

  // 카테고리 리스트
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
  };

  // presigned 업로드 STUB (파일 없어도 에러 안 나게)
  const uploadProfileImage = async (): Promise<string> => {
    if (!profileFile) return ""; // 기본 이미지 사용
    setIsUploading(true);
    try {
      // TODO: presigned 붙이면 여기 교체
      // const { uploadUrl, fileUrl } = await getPresignedUrl(profileFile.name, profileFile.type);
      // await uploadToPresignedUrl(uploadUrl, profileFile, profileFile.type);
      // return fileUrl;
      return "";
    } finally {
      setIsUploading(false);
    }
  };

  // 닉네임 중복 확인
  const handleCheckNickname = () => {
    const trimmed = nickname.trim();

    if (!trimmed) {
      setIsNicknameAvailable(null);
      setNicknameMessage("닉네임을 입력해주세요. (영어 소문자/ 숫자/ 특수문자 포함 6자, 공백 불가");
      return;
    }

    // 클라 선검증: 백엔드 규칙 동일 적용 (소문자/숫자/특수문자, 최대 6자, 공백 불가)
    const err = getNicknameError(trimmed);
    if (err) {
      setIsNicknameAvailable(null);
      setNicknameMessage(`ⓘ ${err}`);
      return;
    }

    requestCheckNickname(trimmed, {
      onSuccess: (available) => {
        setIsNicknameAvailable(available);
        setNicknameMessage(available ? "사용 가능한 아이디입니다." : "ⓘ 이미 존재하는 닉네임입니다.");
      },
      onError: (err) => {
        setIsNicknameAvailable(null);
        setNicknameMessage(err.message || "닉네임 확인에 실패했습니다.");
      },
    });
  };

  // 다음 버튼 활성 조건:
  // - (이미지 업로드 선택 or 기본 이미지 선택)
  // - 닉네임 규칙 통과 + 중복확인 통과
  // - 카테고리 최소 1개
  const imageChosen = useDefaultImage || !!profileFile;
  const nickValid = isValidNickname(nickname.trim());
  const canProceed =
    imageChosen &&
    nickValid &&
    isNicknameAvailable === true &&
    selectedCategoryIds.length >= 1 &&
    !isPending &&
    !isUploading;

  const handleNext = async () => {
    if (step !== 1) return;

    if (!imageChosen) {
      alert("프로필 사진을 선택해주세요. (기본 이미지도 가능)");
      return;
    }
    if (isNicknameAvailable !== true) {
      alert("닉네임 중복 확인을 완료해주세요.");
      return;
    }
    if (selectedCategoryIds.length < 1) {
      alert("관심 독서 카테고리를 최소 1개 선택해주세요.");
      return;
    }

    let imgUrl = "";
    try {
      imgUrl = await uploadProfileImage(); // 기본 이미지면 "" 전송
    } catch (e: any) {
      alert(e?.message || "이미지 업로드에 실패했습니다.");
      return;
    }

    submitInfo(
      {
        nickname: nickname.trim(),
        description: bio.trim(), // 소개는 공란 가능, 서버에서 50자 이내 권장
        imgUrl,
        categoryIds: selectedCategoryIds,
      },
      {
        onSuccess: () => setStep(2),
        // 이미 프로필이 완성된 회원(MEMBER_406)은 성공으로 간주하고 홈으로 이동
        onError: (err: any) => {
          const code = err?.response?.data?.code;
          if (code === "MEMBER_406") {
            navigate("/home", { replace: true });
            return;
          }
          alert(err?.response?.data?.message || err?.message || "프로필 저장에 실패했습니다.");
        },
      }
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUseDefaultImage(false); // 직접 업로드면 기본 이미지 해제
    setProfileFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setProfileImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // 라우트들
  const goToClubSearch = () => navigate("/searchClub");
  const goToCreateClub = () => navigate("/createClub");
  const goToHomePage = () => navigate("/home");

  return (
    <div className="flex h-screen font-sans">
      {/* Left Panel */}
      <div className="hidden xl:flex">
        <AuthLeftPanel />
      </div>

      {/* Right Panel */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center w-full min-h-screen px-6 py-20">
          {/* 타이틀 */}
          <div className="text-center mb-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#90D26D] break-keep">책모</h1>
            {step === 1 ? (
              <p className="text-[#2C2C2C] font-semibold mt-5">프로필을 입력해주세요.</p>
            ) : (
              <p className="text-[#2C2C2C] font-semibold mt-5">
                회원이 되신 것을 환영합니다! <br />
                참여중인 독서 모임이 있으신가요?
              </p>
            )}
          </div>

          <div className="w-full max-w-md space-y-10">
            {/* Step 1 */}
            {step === 1 && (
              <>
                {/* 프로필 이미지 */}
                <div className="relative w-32 h-32 mx-auto mb-3">
                  <div className="w-32 h-32 rounded-full border-2 border-[#49863c] flex items-center justify-center overflow-hidden bg-[#F0FBE3]">
                    {profileImagePreview ? (
                      <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-[#49863c] text-sm"></div>
                    )}
                  </div>

                  {/* 업로드 버튼 */}
                  <label
                    htmlFor="profileImageInput"
                    className="absolute bottom-[-10px] right-[-10px] w-9 h-9 rounded-full bg-[#90D26D] flex items-center justify-center text-white cursor-pointer shadow-md"
                  >
                    <Camera size={18} />
                  </label>
                  <input id="profileImageInput" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>

                {/* 기본 이미지 선택 */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setUseDefaultImage(true);
                      setProfileFile(null);
                      setProfileImagePreview(null);
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      useDefaultImage ? "bg-[#90D26D] text-white cursor-pointer" : "bg-[#EFF5ED] text-[#2C2C2C] cursor-pointer"
                    }`}
                  >
                    기본 이미지 사용
                  </button>
                </div>

                {/* 닉네임 */}
                <div className="mt-6 mb-4">
                  <label className="block mb-1 text-[#2C2C2C] text-m font-semibold">닉네임</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="영어 소문자/숫자/특수문자 (최대 6자)"
                      value={nickname}
                      onChange={(e) => {
                        setNickname(e.target.value);
                        setIsNicknameAvailable(null);
                        setNicknameMessage("");
                      }}
                      className="w-full border-b border-[#DADFE3] px-2 py-2 focus:outline-none"
                    />
                    <button
                      onClick={handleCheckNickname}
                      type="button"
                      disabled={!nickValid || isChecking}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-[12px] font-semibold
                        ${nickValid ? "bg-[#90D26D] text-white cursor-pointer" : "bg-[#EFF5ED] text-[#90D26D] cursor-pointer"}`}
                      style={{ width: "70px", height: "28px", lineHeight: "17px", padding: 0 }}
                    >
                      {isChecking ? "확인 중..." : "중복 확인"}
                    </button>
                  </div>
                  {nicknameMessage && (
                    <p
                      className={`mt-3 text-sm font-medium flex items-center gap-1 ${
                        isNicknameAvailable === false
                          ? "text-[#FF8045]"
                          : isNicknameAvailable === true
                          ? "text-[#90D26D]"
                          : "text-[#FF8045]"
                      }`}
                    >
                      {nicknameMessage}
                    </p>
                  )}
                </div>

                {/* 소개 (최대 50자) */}
                <div className="mb-5">
                  <label className="block mb-1 text-[#2C2C2C] text-m font-semibold">소개</label>
                  <input
                    type="text"
                    placeholder="50자 이내 (공란 가능)"
                    value={bio}
                    maxLength={50}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full border-b border-[#DADFE3] px-2 py-2 focus:outline-none"
                  />
                </div>

                {/* 관심 독서 카테고리 */}
                <div className="mb-6">
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  >
                    <span className="block mb-3 text-[#2C2C2C] text-m font-semibold">관심 독서 카테고리 (최소 1개)</span>
                    {isCategoryOpen ? <ChevronUp className="text-gray-600" size={18} /> : <ChevronDown className="text-gray-600" size={18} />}
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isCategoryOpen ? "max-h-[400px] mt-3" : "max-h-0"
                    }`}
                  >
                    <div className="grid grid-cols-3 gap-3">
                      {CATEGORY_LIST.map((c) => {
                        const picked = selectedCategoryIds.includes(c.id);
                        const limitReached = selectedCategoryIds.length >= 15 && !picked;
                        return (
                          <button
                            key={c.id}
                            onClick={() => toggleCategory(c.id)}
                            disabled={limitReached}
                            className={`w-full min-w-[90px] h-10 rounded-full text-sm font-medium border transition ${
                              picked
                                ? "bg-[#F8FFEF] text-[#90D26D] border-[#90D26D]"
                                : "bg-[#e6e4e4] text-[#8D8D8D] border-[#8D8D8D]"
                            } ${limitReached ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            {c.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* 다음 버튼 */}
                <button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="w-full bg-[#90D26D] text-white py-3 rounded transition hover:opacity-90 disabled:opacity-60 cursor-pointer"
                >
                  {isPending || isUploading ? "저장 중..." : "다음"}
                </button>
              </>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full border-2 border-[#49863c] flex items-center justify-center overflow-hidden bg-[#F0FBE3] mb-4">
                  {profileImagePreview ? <img src={profileImagePreview} alt="Profile" className="w-full h-full object-cover" /> : <div></div>}
                </div>
                <h2 className="text-lg font-bold text-[#2C2C2C] mb-2">{nickname}</h2>
                <p className="text-gray-500 text-center text-sm mb-6">{bio ? bio : "소개글이 없습니다."}</p>

                <button onClick={goToClubSearch} className="w-full bg-[#90D26D] text-white py-2 rounded mb-4 transition hover:opacity-90 cursor-pointer">
                  모임 검색하기
                </button>
                <button onClick={goToCreateClub} className="w-full bg-[#90D26D] text-white py-2 rounded mb-4 transition hover:opacity-90 cursor-pointer">
                  모임 생성하기
                </button>
                <button onClick={goToHomePage} className="w-full bg-[#90D26D] text-white py-2 rounded mb-3 transition hover:opacity-90 cursor-pointer">
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