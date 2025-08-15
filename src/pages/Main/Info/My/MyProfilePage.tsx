import React, { useEffect, useMemo, useState } from "react";
import { Camera } from "lucide-react";

// API/훅/타입
import { useMyProfileQuery, useUpdateMyProfile } from "../../../../hooks/My/useMember";
import { BOOK_CATEGORIES } from "../../../../types/dto";
import { uploadImage } from "../../../../apis/imageApi";

type CategoryEntry = { id: number; name: string };

const MyProfilePage = () => {
  // ===== 서버 데이터 =====
  const { data: me, isLoading } = useMyProfileQuery();
  const { mutate: updateProfile, isPending } = useUpdateMyProfile();

  // ===== 로컬 상태 =====
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState("");
  const [tempKeywords, setTempKeywords] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [tempProfileImage, setTempProfileImage] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [useDefaultImage, setUseDefaultImage] = useState(false); // 기본 이미지 여부

  // 카테고리 정규화
  const CATEGORY_ENTRIES: CategoryEntry[] = useMemo(() => {
    if (Array.isArray(BOOK_CATEGORIES)) {
      return (BOOK_CATEGORIES as any[]).map((c: any) => ({
        id: Number(c.id),
        name: String(c.name),
      }));
    }
    return Object.entries(BOOK_CATEGORIES as Record<string, string>).map(([id, name]) => ({
      id: Number(id),
      name: String(name),
    }));
  }, []);

  const NAME_TO_ID = useMemo(
    () => new Map(CATEGORY_ENTRIES.map((e) => [e.name, e.id] as const)),
    [CATEGORY_ENTRIES]
  );
  const keywords: string[] = useMemo(() => CATEGORY_ENTRIES.map((e) => e.name), [CATEGORY_ENTRIES]);

  // 최초 로드 시 서버 값으로 초기화
  useEffect(() => {
    if (!me) return;
    setNickname(me.nickname ?? "");
    const desc = me.description ?? "";
    setBio(desc);
    setTempBio(desc);
    setProfileImage(me.profileImageUrl ?? null);
    setTempProfileImage(me.profileImageUrl ?? null);
    const names = (me.categories ?? []).map((c: { id: number; name: string }) => c.name);
    setTempKeywords(names);
  }, [me]);

  // ===== 이벤트 핸들러 =====
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setPendingFile(file);
    setUseDefaultImage(false); // 새 이미지 선택 시 기본이미지 해제

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setTempProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectDefaultImage = () => {
    setUseDefaultImage(true);
    setPendingFile(null);
    setTempProfileImage(null);
  };

  const handleKeywordToggle = (keyword: string) => {
    setTempKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    );
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      let imgUrl: string | null | undefined = undefined;

      if (useDefaultImage) {
        imgUrl = null; // 기본 이미지
      } else if (pendingFile) {
        imgUrl = await uploadImage(pendingFile);
      } else {
        imgUrl = profileImage ?? null; // 기존 이미지 유지
      }

      const categoryIds = tempKeywords
        .map((name) => NAME_TO_ID.get(name))
        .filter((v): v is number => typeof v === "number");

      updateProfile(
        { description: tempBio.trim(), imgUrl, categoryIds },
        {
          onSuccess: (updated) => {
            setBio(updated.description ?? "");
            setProfileImage(updated.profileImageUrl ?? null);
            setIsEditingBio(false);
            setPendingFile(null);
            setUseDefaultImage(false);
          },
          onError: (e) => {
            alert(e?.message || "프로필 저장에 실패했습니다.");
          },
          onSettled: () => setIsSaving(false),
        }
      );
    } catch (err: any) {
      setIsSaving(false);
      alert(err?.message || "이미지 업로드에 실패했습니다.");
    }
  };

  if (isLoading) {
    return <div className="p-10 text-[#2C2C2C]">불러오는 중...</div>;
  }

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      <main className="w-full py-10">
        <div className="w-full px-4 sm:px-6 md:px-10">
          <h1 className="text-2xl font-bold mb-8 text-[#2C2C2C]">프로필 편집</h1>

          <div className="flex flex-wrap gap-10 mb-10 w-full">
            {/* 프로필 이미지 */}
            <div className="flex flex-col items-center gap-3 min-w-[212px] mx-auto lg:mx-0">
              <div className="relative">
                <div
                  className="w-[212px] h-[212px] rounded-full overflow-hidden flex items-center justify-center border cursor-pointer"
                  style={{ borderColor: "#EAE5E2", backgroundColor: "#F4F2F1" }}
                  onClick={handleSelectDefaultImage}
                >
                  {useDefaultImage ? (
                    <span className="text-gray-400 text-3xl">+</span> // 기본 이미지
                  ) : tempProfileImage ? (
                    <img src={tempProfileImage} alt="프로필" className="w-full h-full object-cover" />
                  ) : profileImage ? (
                    <img src={profileImage} alt="프로필" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400 text-3xl">+</span>
                  )}
                </div>
                {/* 이미지 업로드 버튼 */}
                <label
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center border cursor-pointer"
                  style={{ backgroundColor: "#F4F2F1", borderColor: "#EAE5E2" }}
                >
                  <Camera size={20} className="text-gray-600" />
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>
              <p className="text-lg font-semibold text-[#2C2C2C] text-center">{nickname}</p>
              <button
                onClick={handleSave}
                disabled={isPending || isSaving}
                className="px-5 py-1 bg-[#90D26D] text-white rounded-full hover:bg-[#7bb95b] disabled:opacity-60"
              >
                {isPending || isSaving ? "저장 중..." : "편집 완료"}
              </button>
            </div>

            {/* 소개글 + 키워드 */}
            <div className="flex-1 flex flex-col gap-6 w-full">
              {/* 소개글 */}
              <div className="w-full">
                <h2 className="text-lg font-semibold text-[#2C2C2C] mb-2">소개글</h2>
                {isEditingBio ? (
                  <textarea
                    value={tempBio}
                    onChange={(e) => e.target.value.length <= 30 && setTempBio(e.target.value)}
                    className="rounded-lg p-3 text-[#5C5C5C] w-full resize-none"
                    style={{
                      minHeight: "200px",
                      backgroundColor: "#F4F2F1",
                      border: "1px solid #F4F2F1",
                      outline: "none",
                    }}
                    placeholder="소개글을 입력하세요 (최대 30자)"
                  />
                ) : (
                  <div
                    onClick={() => setIsEditingBio(true)}
                    className="rounded-lg p-3 cursor-pointer w-full"
                    style={{
                      minHeight: "200px",
                      backgroundColor: "#F4F2F1",
                      border: "1px solid #F4F2F1",
                    }}
                  >
                    {bio || "소개글을 입력하세요 (최대 30자)"}
                  </div>
                )}
                <div className="flex justify-end mt-1">
                  <p className="text-sm text-[#8D8D8D]">{tempBio.length}/30</p>
                </div>
              </div>

              <hr style={{ borderColor: "#EAE5E2" }} />

              {/* 키워드 선택 */}
              <section className="w-full">
                <h2 className="text-lg font-semibold text-[#2C2C2C] mb-2">키워드 선택</h2>
                <div
                  className="border rounded-lg p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full"
                  style={{ borderColor: "#EAE5E2" }}
                >
                  {keywords.map((keyword: string) => (
                    <button
                      key={keyword}
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