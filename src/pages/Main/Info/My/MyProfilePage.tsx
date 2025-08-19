import React, { useEffect, useMemo, useState } from "react";
import { Camera } from "lucide-react";
import { useMyProfileQuery, useUpdateMyProfile } from "../../../../hooks/My/useMember";
import { BOOK_CATEGORIES } from "../../../../types/dto";
import { uploadImage } from "../../../../apis/imageApi";

type CategoryEntry = { id: number; name: string };

const MyProfilePage = () => {
  const { data: me, isLoading, isError } = useMyProfileQuery(); 
  const { mutate: updateProfile, isPending } = useUpdateMyProfile();

  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [tempBio, setTempBio] = useState("");
  const [tempKeywords, setTempKeywords] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [tempProfileImage, setTempProfileImage] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [useDefaultImage, setUseDefaultImage] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 변경 여부 감지
  const isChanged =
    tempBio !== bio ||
    JSON.stringify(tempKeywords) !== JSON.stringify(me?.categories?.map((c) => c.name)) ||
    tempProfileImage !== profileImage ||
    useDefaultImage;

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setPendingFile(file);
    setUseDefaultImage(false);

    // ✅ 미리보기 즉시 반영
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setTempProfileImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectDefaultImage = () => {
    if (!isEditing) return;
    setUseDefaultImage(true);
    setPendingFile(null);
    setTempProfileImage("/assets/basic_profile.png"); 
  };

  const handleKeywordToggle = (keyword: string) => {
    if (!isEditing) return;
    setTempKeywords((prev) =>
      prev.includes(keyword) ? prev.filter((k) => k !== keyword) : [...prev, keyword]
    );
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      let imgUrl: string | null | undefined = undefined;

      if (useDefaultImage) {
        imgUrl = null; // 기본 이미지로 리셋 (백엔드에서 null 처리)
      } else if (pendingFile) {
        imgUrl = await uploadImage(pendingFile); // 서버 업로드
      } else {
        imgUrl = profileImage ?? null;
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
            setIsEditing(false);
            setPendingFile(null);
            setUseDefaultImage(false);
          },
          onSettled: () => setIsSaving(false),
        }
      );
    } catch {
      setIsSaving(false);
      alert("이미지 업로드 실패");
    }
  };

  //  로딩 상태
  if (isLoading) return <div className="p-10">불러오는 중...</div>;

  //  에러 상태 (로그인 필요)
  if (isError) {
    return (
      <div className="p-10 text-red-500">
        프로필 정보를 불러올 수 없습니다. (로그인이 필요합니다)
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      <main className="w-full py-10">
        <div className="w-full px-4 sm:px-6 md:px-10">
          <h1 className="text-2xl font-bold mb-8">프로필 편집</h1>

          <div className="flex flex-wrap gap-10 mb-10 w-full">
            {/* 프로필 이미지 */}
            <div className="flex flex-col items-center gap-3 min-w-[212px] mx-auto lg:mx-0">
              <div className="relative">
                <div
                  className="w-[212px] h-[212px] rounded-full overflow-hidden flex items-center justify-center border cursor-pointer"
                  style={{ borderColor: "#EAE5E2", backgroundColor: "#F4F2F1" }}
                >
                  {tempProfileImage ? (
                    <img src={tempProfileImage} alt="프로필" className="w-full h-full object-cover" />
                  ) : (
                    <img
                      src="/assets/basic_profile.png"
                      alt="기본 프로필"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {isEditing && (
                  <label
                    className="absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center border cursor-pointer"
                    style={{ backgroundColor: "#F4F2F1", borderColor: "#EAE5E2" }}
                  >
                    <Camera size={20} className="text-gray-600" />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                )}
              </div>

              <p className="text-lg font-semibold text-[#2C2C2C] text-center">{nickname}</p>

              {/* 기본 이미지 사용 버튼 */}
              {isEditing && (
                <button
                  onClick={handleSelectDefaultImage}
                  className="px-5 py-1 text-white text-sm rounded-full bg-[#90D26D] hover:bg-[#7bb95b] cursor-pointer"
                >
                  기본 이미지 사용
                </button>
              )}

              {/* 수정 / 수정완료 버튼 */}
              {isEditing ? (
                <button
                  onClick={handleSave}
                  disabled={isPending || isSaving}
                  className="px-5 py-1 bg-[#90D26D] text-white rounded-full hover:bg-[#7bb95b] disabled:opacity-60 cursor-pointer"
                >
                  {isSaving ? "저장 중..." : "수정 완료"}
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-1 bg-[#90D26D] text-white rounded-full hover:bg-[#7bb95b] cursor-pointer"
                >
                  수정하기
                </button>
              )}
            </div>

            {/* 소개글 + 키워드 */}
            <div className="flex-1 flex flex-col gap-6 w-full">
              {/* 소개글 */}
              <div className="w-full">
                <h2 className="text-lg font-semibold text-[#2C2C2C] mb-2">소개글</h2>
                {isEditing ? (
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
                    className="rounded-lg p-3 w-full cursor-pointer"
                    style={{
                      minHeight: "200px",
                      backgroundColor: "#F4F2F1",
                      border: "1px solid #F4F2F1",
                    }}
                  >
                    {bio || "소개글을 입력하세요 (최대 30자)"}
                  </div>
                )}
                {/* 글자수 카운트 + 오류문구 */}
                <div className="flex justify-between mt-1">
                  <p className="text-sm text-[#8D8D8D]">{tempBio.length}/30</p>
                  {isChanged && isEditing && (
                    <p className="text-sm text-[#FF8045]">수정내용을 저장해주세요!</p>
                  )}
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
                      disabled={!isEditing}
                      onClick={() => handleKeywordToggle(keyword)}
                      className={`px-3 py-1 rounded-full border 
                        ${
                          tempKeywords.includes(keyword)
                            ? "bg-[#F8FFEF] text-[#3D4C35] border-[#90D26D] cursor-pointer"
                            : "bg-[#EEEEEE] text-[#5C5C5C] border-gray-300 cursor-pointer"
                        } ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
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