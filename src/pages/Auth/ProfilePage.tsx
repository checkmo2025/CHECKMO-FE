// 다른 페이지랑 라우트 필요
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Camera } from "lucide-react";
import AuthLeftPanel from "../../components/AuthLeftPanel";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); 
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const categories = [
    "국내 도서", "소설/시/희곡", "에세이", "경제/경영", "자기계발", "인문학",
    "여행", "역사/문화", "사회과학", "과학", "참고서/수험서", "컴퓨터/IT",
    "외국어", "예술/대중문화", "기타"
  ];

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!nickname.trim()) {
        alert("닉네임을 입력해주세요.");
        return;
      }
      setStep(2); 
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  //   버튼 라우트 > 추후 합칠 때 수정
  const goToClubSearch = () => navigate("/club-search");
  const goToCreateClub = () => navigate("/create-club");
  const goToHomePage = () => navigate("/home");

  return (
    <div className="flex h-screen font-sans">
      {/* Left Panel */}
      <AuthLeftPanel />

      {/* Right Panel */}
      <div className="w-3/5 flex justify-center items-center relative">
        <div className="w-[80%] max-w-md">
          {/* 공통 타이틀 */}
          <div className="text-center mb-6">
            <h1 className="text-[#90D26D] text-3xl font-bold mb-3">책모</h1>
            {step === 1 ? (
              <p className="text-gray-600 font-semibold">프로필을 입력해주세요.</p>
            ) : (
              <p className="text-gray-600 font-semibold">
                회원이 되신 것을 환영합니다! <br />
                참여중인 독서 모임이 있으신가요?
              </p>
            )}
          </div>

          {/* Step 1: 프로필 입력 */}
          {step === 1 && (
            <>
              {/* 프로필 이미지 */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div
                  className="w-32 h-32 rounded-full border-2 border-[#49863c] flex items-center justify-center overflow-hidden bg-[#F0FBE3]"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : null}
                </div>
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

              {/* 닉네임 */}
              <div className="mb-5">
                <label className="block mb-1 text-gray-700 text-m font-semibold">닉네임</label>
                <input
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none"
                />
              </div>

              {/* 소개 */}
              <div className="mb-5">
                <label className="block mb-1 text-gray-700 text-m font-semibold">소개</label>
                <input
                  type="text"
                  placeholder="20자 이내"
                  value={bio}
                  maxLength={20}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none"
                />
              </div>

              {/* 관심 독서 카테고리 */}
              <div className="mb-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                >
                  <span className="block mb-3 text-gray-700 text-m font-semibold">
                    관심 독서 카테고리
                  </span>
                  {isCategoryOpen ? (
                    <ChevronUp className="text-gray-600" size={18} />
                  ) : (
                    <ChevronDown className="text-gray-600" size={18} />
                  )}
                </div>

                {isCategoryOpen && (
                  <div className="grid grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={`w-full min-w-[90px] h-10 rounded-full text-sm font-medium border transition
                          ${
                            selectedCategories.includes(category)
                              ? "bg-[#F8FFEF] text-[#90D26D] border-[#90D26D]"
                              : "bg-[#e6e4e4] text-[#8D8D8D] border-[#8D8D8D]"
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 다음 버튼 */}
              <button
                onClick={handleNext}
                className="w-full bg-[#90D26D] text-white py-3 rounded transition hover:opacity-90"
              >
                다음
              </button>
            </>
          )}

          {/* Step 2: 모임 선택 */}
          {step === 2 && (
            <div className="flex flex-col items-center">
              {/* 프로필 이미지 */}
              <div
                className="w-32 h-32 rounded-full border-2 border-[#49863c] flex items-center justify-center overflow-hidden bg-[#F0FBE3] mb-4"
              >
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              {/* 닉네임 */}
              <h2 className="text-lg font-bold text-gray-800 mb-2">{nickname}</h2>
              {/* 소개 */}
              <p className="text-gray-500 text-center text-sm mb-6">
                {bio ? bio : "소개글이 없습니다."}
              </p>

              {/* 모임 선택 버튼들 */}
              <button
                onClick={goToClubSearch}
                className="w-full bg-[#90D26D] text-white py-2 rounded mb-3 transition hover:opacity-90"
              >
                모임 검색하기
              </button>
              <button
                onClick={goToCreateClub}
                className="w-full bg-[#90D26D] text-white py-2 rounded mb-3 transition hover:opacity-90"
              >
                모임 생성하기
              </button>
              <button
                onClick={goToHomePage}
                className="w-full bg-[#90D26D] text-white py-2 rounded mb-3 transition hover:opacity-90"
              >
                모임 없이 이용하기
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;