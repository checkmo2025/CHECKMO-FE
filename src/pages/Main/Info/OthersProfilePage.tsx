import { useState, useEffect } from "react";
import { Heart, Siren } from "lucide-react";
import AlertModal from "../../../components/AlertModal";
import { useParams } from "react-router-dom";
import { getOtherProfile, followMember, getTargetBookStories } from "../../../apis/otherApi";
import { toggleBookStoryLike } from "../../../apis/BookStory/bookstories"; 
import type { OtherProfile } from "../../../types/other";
import type { BookStoryResponseDto } from "../../../types/bookStories";

const OthersProfilePage = () => {
  const [books, setBooks] = useState<BookStoryResponseDto[]>([]);
  const [profile, setProfile] = useState<OtherProfile | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  const { userId } = useParams<{ userId: string }>();

  /** 다른 사람 프로필 + 책이야기 불러오기 */
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        const data = await getOtherProfile(userId);
        setProfile(data);
        setIsSubscribed(data.following);

        const storyData = await getTargetBookStories(data.nickname);
        setBooks(storyData.bookStoryResponses);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
      }
    })();
  }, [userId]);

  /** 구독 버튼 클릭 → API 호출 */
  const handleSubscribe = async () => {
    if (!profile) return;
    try {
      await followMember(profile.nickname);
      setIsSubscribed(true);
    } catch (err) {
      console.error("구독 요청 실패:", err);
      alert("구독에 실패했습니다. 다시 시도해주세요.");
    }
  };

  /** 좋아요 토글 (API + UI) */
  const toggleLike = async (id: number) => {
    try {
      await toggleBookStoryLike(id); // API 호출
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.bookStoryId === id
            ? {
                ...book,
                likedByMe: !book.likedByMe,
                likes: book.likedByMe ? book.likes - 1 : book.likes + 1,
              }
            : book
        )
      );
    } catch (err) {
      console.error("좋아요 요청 실패:", err);
      alert("좋아요 처리에 실패했습니다.");
    }
  };

  /** 신고 모달 */
  const openReportModal = () => setShowReportModal(true);
  const handleReportConfirm = () => {
    setShowReportModal(false);
    alert("신고 사유 작성 폼으로 이동 예정입니다.");
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFA] overflow-x-hidden">
      <main className="flex-grow w-full px-4 md:px-8 py-10">
        {/* 프로필 영역 */}
        <div className="w-full bg-white rounded-[12px] p-4 mb-5">
          <div className="flex justify-between items-center mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              {profile?.profileImageUrl ? (
                <img
                  src={profile.profileImageUrl}
                  alt={`${profile.nickname} 프로필`}
                  className="w-[40px] h-[40px] rounded-full object-cover"
                />
              ) : (
                <div className="w-[40px] h-[40px] bg-gray-300 rounded-full" />
              )}
              <p className="text-[18px] font-semibold text-[#2C2C2C]">
                {profile?.nickname ?? userId}님
              </p>
              <button
                className={`px-2 py-1 rounded-full text-[12px] font-medium text-white ${
                  isSubscribed
                    ? "bg-[#A6917D]"
                    : "bg-[#90D26D] hover:bg-[#7bb95b] cursor-pointer"
                }`}
                onClick={handleSubscribe}
                disabled={isSubscribed}
              >
                {isSubscribed ? "구독중" : "구독"}
              </button>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0 flex-wrap">
              {profile?.categories.map((cat) => (
                <button
                  key={cat.id}
                  className="px-3 py-1 rounded-full bg-[#90D26D] text-white text-[12px] font-medium"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full h-[56px] bg-[#EFF5ED] rounded-[8px] flex items-center px-4 text-[#5C5C5C] text-[18px] font-medium">
            {profile?.description ?? "소개글이 없습니다."}
          </div>
        </div>

        {/* 책 이야기 리스트 */}
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-[18px] font-medium text-[#2C2C2C]">
            {profile?.nickname ?? userId}님의 책 이야기
          </h2>
        </div>

        <div className="w-full space-y-4">
          {books.map((book) => (
            <div
              key={book.bookStoryId}
              className="flex bg-white rounded-[12px] border border-[#EAE5E2] p-6"
            >
              {/* 책 이미지 */}
              {book.bookInfo?.imgUrl ? (
                <img
                  src={book.bookInfo.imgUrl}
                  alt={book.bookInfo.title}
                  className="w-[176px] h-[248px] rounded-[16px] object-cover flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = "";
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="w-[176px] h-[248px] bg-[#E0E0E0] rounded-[16px] flex-shrink-0" />
              )}

              <div className="flex flex-col justify-between ml-6 w-full">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    {book.authorInfo.profileImageUrl ? (
                      <img
                        src={book.authorInfo.profileImageUrl}
                        alt={`${book.authorInfo.nickname} 프로필`}
                        className="w-[24px] h-[24px] rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-[24px] h-[24px] bg-gray-300 rounded-full" />
                    )}
                    <p className="text-[14px] text-[#8D8D8D]">
                      {book.authorInfo.nickname}
                    </p>
                  </div>

                  <h3 className="text-[20px] font-semibold text-[#2C2C2C] mb-3">
                    {book.bookStoryTitle}
                  </h3>

                  <p
                    className="text-[14px] text-[#5C5C5C] mb-4 line-clamp-4"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {book.description}
                  </p>
                </div>

                <div className="flex items-center gap-5 mt-auto ml-[20px]">
                  <div
                    className={`flex items-center gap-1 text-sm cursor-pointer ${
                      book.likedByMe ? "text-[#90D26D]" : "text-[#2C2C2C]"
                    } hover:text-[#90D26D]`}
                    onClick={() => toggleLike(book.bookStoryId)}
                  >
                    <Heart size={24} />
                    <span>{book.likes}</span>
                  </div>
                  <div
                    className="flex items-center gap-1 text-[#2C2C2C] hover:text-[#90D26D] text-sm cursor-pointer"
                    onClick={openReportModal}
                  >
                    <Siren size={26} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showReportModal && (
        <AlertModal
          message="해당 책이야기를 신고하시겠습니까?"
          onConfirm={handleReportConfirm}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
};

export default OthersProfilePage;
