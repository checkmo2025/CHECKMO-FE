import { useState } from "react";
import { Heart, Siren } from "lucide-react";
import Modal from "../../../components/Modal"; 
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getOtherProfile,
  followMember,
  getTargetBookStories,
} from "../../../apis/otherApi";
import { toggleBookStoryLike } from "../../../apis/BookStory/bookstories";
import type { OtherProfile } from "../../../types/other";
import type { BookStoryResponseDto } from "../../../types/bookStories";

const OthersProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const [showReportModal, setShowReportModal] = useState(false);
  const [showReportCompleteModal, setShowReportCompleteModal] = useState(false);

  /** 다른 사람 프로필 불러오기 */
  const {
    data: profile,
    isError: isProfileError,
  } = useQuery<OtherProfile, Error>({
    queryKey: ["otherProfile", userId],
    queryFn: () => getOtherProfile(userId!),
    enabled: !!userId,
  });

  /** 책 이야기 불러오기 */
  const {
    data: booksData,
    isError: isBooksError,
  } = useQuery<{ bookStoryResponses: BookStoryResponseDto[] }, Error>({
    queryKey: ["targetBookStories", profile?.nickname],
    queryFn: () => getTargetBookStories(profile!.nickname),
    enabled: !!profile?.nickname,
  });

  /** 구독하기 mutation */
  const followMutation = useMutation({
    mutationFn: (nickname: string) => followMember(nickname),
    onSuccess: async () => {
      // 다른 사람 프로필 새로고침
      await qc.invalidateQueries({ queryKey: ["otherProfile", userId] });
      // 내 팔로잉 목록(내 구독) 새로고침
      await qc.invalidateQueries({ queryKey: ["myFollowing"] });
    },
  });

  /** 좋아요 mutation */
  const likeMutation = useMutation({
    mutationFn: (id: number) => toggleBookStoryLike(id),
    onSuccess: (_, id) => {
      qc.setQueryData<{ bookStoryResponses: BookStoryResponseDto[] }>(
        ["targetBookStories", profile?.nickname],
        (old) =>
          old
            ? {
                bookStoryResponses: old.bookStoryResponses.map((b) =>
                  b.bookStoryId === id
                    ? {
                        ...b,
                        likedByMe: !b.likedByMe,
                        likes: b.likedByMe ? b.likes - 1 : b.likes + 1,
                      }
                    : b
                ),
              }
            : old
      );
    },
  });

  /** 신고 모달 */
  const openReportModal = () => setShowReportModal(true);
  const handleReportConfirm = () => {
    setShowReportModal(false);
    setShowReportCompleteModal(true);
  };

  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFA] overflow-x-hidden">
      <main className="flex-grow w-full px-4 md:px-8 py-10">
        {/* 로그인 안된 경우 → 상단에 빨간 문구 */}
        {isProfileError || isBooksError ? (
          <div className="w-full bg-white rounded-[12px] p-4 mb-5 text-center">
            <p className="text-red-500 text-[16px] font-medium">
              다른 사람 프로필 정보를 불러오는데 실패했습니다. (로그인이 필요합니다)
            </p>
          </div>
        ) : (
          <>
            {/* 프로필 영역 */}
            {profile && (
              <div className="w-full bg-white rounded-[12px] p-4 mb-5">
                <div className="flex justify-between items-center mb-2 flex-wrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={profile.profileImageUrl || "/assets/basic_profile.png"}
                      alt={`${profile.nickname} 프로필`}
                      className="w-[40px] h-[40px] rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/assets/basic_profile.png";
                      }}
                    />
                    <p className="text-[18px] font-semibold text-[#2C2C2C]">
                      {profile.nickname ?? userId}님
                    </p>
                    <button
                      className={`px-3 py-1 rounded-full text-[14px] font-medium
                       ${
                          profile.following
                            ? "bg-[#A6917D] text-white" 
                            : "bg-white text-[#A6917D] border border-[#A6917D] hover:bg-[#f7f4f2] cursor-pointer" 
                        }`}
                      onClick={() =>
                        !profile.following && followMutation.mutate(profile.nickname)
                      }
                      disabled={profile.following}
                    >
                      {profile.following ? "구독 중" : "구독"}
                    </button>
                  </div>
                  <div className="flex gap-2 mt-2 md:mt-0 flex-wrap">
                    {profile.categories.map((cat) => (
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
                  {profile.description ?? "소개글이 없습니다."}
                </div>
              </div>
            )}

            {/* 책 이야기 리스트 */}
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="text-[18px] font-medium text-[#2C2C2C]">
                {profile?.nickname ?? userId}님의 책 이야기
              </h2>
            </div>

            <div className="w-full space-y-4">
              {booksData?.bookStoryResponses.map((book) => (
                <div
                  key={book.bookStoryId}
                  className="flex bg-white rounded-[12px] border border-[#EAE5E2] p-6 transition-transform duration-300 transform hover:shadow-lg hover:scale-103 cursor-pointer"
                  onClick={() =>
                    navigate(`/bookstory/${book.bookStoryId}/detail`)
                  }
                >
                  {/* 책 이미지 */}
                  <img
                    src={book.bookInfo?.imgUrl || "/assets/basic_book_image.png"}
                    alt={book.bookInfo?.title || "기본 책 이미지"}
                    className="w-[176px] h-[248px] rounded-[16px] object-cover flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/basic_book_image.png";
                    }}
                  />

                  <div className="flex flex-col justify-between ml-6 w-full">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={
                            book.authorInfo.profileImageUrl ||
                            "/assets/basic_profile.png"
                          }
                          alt={`${book.authorInfo.nickname} 프로필`}
                          className="w-[24px] h-[24px] rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/assets/basic_profile.png";
                          }}
                        />
                        <p className="text-[14px] text-[#8D8D8D]">
                          {book.authorInfo.nickname}
                        </p>
                      </div>

                      <h3 className="text-[20px] font-semibold text-[#2C2C2C] mb-3">
                        {book.bookStoryTitle}
                      </h3>

                      <p className="text-[14px] text-[#5C5C5C] mb-4 line-clamp-4">
                        {book.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-5 mt-auto ml-[20px]">
                      {/* 좋아요 버튼 */}
                      <div
                        className="flex items-center gap-1.5 text-sm cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          likeMutation.mutate(book.bookStoryId);
                        }}
                      >
                        <Heart
                          size={24}
                          fill={book.likedByMe ? "#FF6B6B" : "none"}
                          stroke={book.likedByMe ? "#FF6B6B" : "currentColor"}
                        />
                        <span
                          className="min-w-[10px] text-center text-[#2C2C2C]"
                        >
                          {book.likes}
                        </span>
                      </div>

                      {/* 신고 버튼 */}
                      <div
                        className="flex items-center gap-1 text-[#2C2C2C] hover:text-[#90D26D] text-sm cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          openReportModal();
                        }}
                      >
                        <Siren size={26} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* 신고 모달 */}
      <Modal
        isOpen={showReportModal}
        title="해당 책이야기를 신고하시겠습니까?"
        buttons={[
          {
            label: "신고",
            onClick: handleReportConfirm,
            variant: "danger",
          },
          {
            label: "취소",
            onClick: () => setShowReportModal(false),
            variant: "outline",
          },
        ]}
        onBackdrop={() => setShowReportModal(false)}
      />

      {/* 신고 완료 모달 */}
      <Modal
        isOpen={showReportCompleteModal}
        title="신고 기능은 추후 개발 예정입니다."
        buttons={[
          {
            label: "확인",
            onClick: () => setShowReportCompleteModal(false),
            variant: "primary",
          },
        ]}
      />
    </div>
  );
};

export default OthersProfilePage;