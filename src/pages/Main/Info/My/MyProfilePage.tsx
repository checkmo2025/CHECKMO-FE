import React, { useState } from "react";
import { Camera } from "lucide-react";

const keywords = [
  "국내 도서", "소설/시/희곡", "에세이", "정치/경제", "자기계발",
  "인문학", "여행", "역사/문화", "사회과학", "정치/외교/군사",
  "컴퓨터/IT", "과학", "의학", "예술/대중문화", "어린이도서"
];

const MyProfilePage: React.FC = () => {
  const [nickname] = useState("hy_0716");
  const [bio, setBio] = useState("책을 아는가? 나는 모른다!");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(["예술/대중문화", "국내 도서", "여행"]);
  const [tempBio, setTempBio] = useState(bio);
  const [tempKeywords, setTempKeywords] = useState<string[]>(selectedKeywords);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [tempProfileImage, setTempProfileImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setTempProfileImage(reader.result); 
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleKeywordToggle = (keyword: string) => {
    if (tempKeywords.includes(keyword)) {
      setTempKeywords(tempKeywords.filter((k) => k !== keyword));
    } else {
      setTempKeywords([...tempKeywords, keyword]);
    }
  };

  const handleSave = () => {
    setBio(tempBio);
    setSelectedKeywords(tempKeywords);
    setProfileImage(tempProfileImage);
    setIsEditingBio(false);
  };

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      {/* 사이드바 */}
      <aside className="hidden md:block w-[264px] bg-[#F1F8EF] border-r border-gray-200"></aside>

      {/* 메인 영역 */}
      <main className="flex justify-center py-10 w-full">
        <div className="max-w-[1200px] w-full">
          {/* 헤더와 동일한 위치에 맞춘 제목 */}
          <h1 className="text-2xl font-bold mb-8 text-[#2C2C2C] px-10">
            프로필 편집
          </h1>

          <div className="flex gap-16 mb-10">
            {/* 프로필 이미지 */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <div
                  className="w-[212px] h-[212px] rounded-full overflow-hidden flex items-center justify-center border"
                  style={{ borderColor: "#EAE5E2", backgroundColor: "#F4F2F1" }}
                >
                  {tempProfileImage ? (
                    <img src={tempProfileImage} alt="프로필" className="w-full h-full object-cover" />
                  ) : profileImage ? (
                    <img src={profileImage} alt="프로필" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-3xl">+</span>
                  )}
                </div>
                <label
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center border cursor-pointer"
                  style={{ backgroundColor: "#F4F2F1", borderColor: "#EAE5E2" }}
                >
                  <Camera size={20} className="text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-lg font-semibold text-[#2C2C2C]">{nickname}</p>
              <button
                onClick={handleSave}
                className="px-5 py-1 bg-[#90D26D] text-white rounded-full hover:bg-[#7bb95b]"
              >
                편집 완료
              </button>
            </div>

            {/* 소개글 + 키워드 선택 */}
            <div className="flex-1 flex flex-col gap-6">
              {/* 소개글 */}
              <div>
                <h2 className="text-lg font-semibold text-[#2C2C2C] mb-2">소개글</h2>
                {isEditingBio ? (
                  <textarea
                    value={tempBio}
                    onChange={(e) => {
                      if (e.target.value.length <= 30) setTempBio(e.target.value);
                    }}
                    style={{
                      height: "279px",
                      width: "100%",
                      backgroundColor: "#F4F2F1",
                      border: "1px solid #F4F2F1", 
                      outline: "none"
                    }}
                    className="rounded-lg p-3 text-[#5C5C5C]"
                    placeholder="소개글을 입력하세요 (최대 30자)"
                  />
                ) : (
                  <div
                    onClick={() => setIsEditingBio(true)}
                    style={{
                      height: "279px",
                      width: "100%",
                      backgroundColor: "#F4F2F1",
                      border: "1px solid #F4F2F1"
                    }}
                    className="rounded-lg p-3 cursor-pointer"
                  >
                    {bio || "소개글을 입력하세요 (최대 30자)"}
                  </div>
                )}
                {/* 글자수 표시 */}
                <div className="flex justify-end w-full mt-1">
                  <p className="text-sm text-[#8D8D8D]">{tempBio.length}/30</p>
                </div>
              </div>

              {/* 구분선 */}
              <hr style={{ borderColor: "#EAE5E2", width: "100%" }} />

              {/* 키워드 선택 */}
              <section>
                <h2 className="text-lg font-semibold text-[#2C2C2C] mb-2">키워드 선택</h2>
                <div
                  style={{
                    height: "279px",
                    width: "100%",
                    borderColor: "#EAE5E2"
                  }}
                  className="border rounded-lg p-5 grid grid-cols-3 gap-3"
                >
                  {keywords.map((keyword, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleKeywordToggle(keyword)}
                      className={`px-3 py-1 rounded-full border 
                        ${
                          tempKeywords.includes(keyword)
                            ? "bg-[#F8FFEF] text-[#3D4C35] border-[#90D26D]"
                            : "bg-[#EEEEEE] text-[#5C5C5C] border-gray-300"
                        }`}
                    >
                      {keyword}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfilePage;
