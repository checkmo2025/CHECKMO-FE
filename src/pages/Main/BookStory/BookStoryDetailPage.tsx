import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Trash2, Edit2, Heart, AlertCircle } from "lucide-react";
import backIcon from "../../../assets/icons/backIcon.png";
import { axiosInstance } from "../../../apis/axiosInstance";
import type { BookStoryResponseDto } from "../../../types/bookStories";

export default function BookStoryDetailPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const navigate = useNavigate();

  const [story, setStory] = useState<BookStoryResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!storyId) return;

    const fetchStory = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await axiosInstance.get<BookStoryResponseDto>(
          `/book-stories/${storyId}`
        );
        setStory(data);
      } catch (err: any) {
        console.error(err);
        setError("책 이야기 조회에 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [storyId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!story) return <div>해당 스토리를 찾을 수 없습니다.</div>;

  const {
    bookStoryTitle,
    authorInfo,
    description,
    likes,
    bookInfo,
    writtenByMe,
  } = story;
  const isMyStory = writtenByMe;

  return (
    <div>
      <div className="pt-10 pl-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-lg font-semibold mb-4"
          type="button"
        >
          <img src={backIcon} alt="뒤로가기" className="w-5 h-5" />
          {bookStoryTitle}
        </button>
      </div>

      <div className="pl-10 mt-12 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <img
            src={authorInfo.profileImageUrl}
            alt={authorInfo.nickname}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-base font-semibold">{authorInfo.nickname}</span>
        </div>

        <div className="flex gap-8">
          {/* 이미지 영역 */}
          {/* 이미지 영역 */}
          <div className="w-64 h-80 rounded-xl bg-gray-200 overflow-hidden">
            {bookInfo.imgUrl ? (
              <img
                src={bookInfo.imgUrl}
                alt={bookInfo.title}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                이미지 없음
              </div>
            )}
          </div>

          {/* 텍스트 영역*/}
          <div className="flex flex-col flex-1 h-80">
            <h1 className="text-2xl font-semibold mb-4">{bookStoryTitle}</h1>
            {!isMyStory && (
              <button
                className={`w-24 py-1 rounded-full text-sm font-semibold ${
                  authorInfo.following
                    ? "bg-brown-500 text-white"
                    : "border border-brown-500 text-brown-500"
                } mb-6`}
              >
                {authorInfo.following ? "구독 중" : "구독하기"}
              </button>
            )}

            <p className="text-sm leading-relaxed whitespace-pre-line mb-6">
              {description}
            </p>
            <div className="flex-grow" />

            {/* 하단 정보 및 아이콘 */}
            <div className="flex items-center justify-between text-gray-400 text-xs">
              <div>
                도서 : {bookInfo.title} | {bookInfo.author}
              </div>
              <div className="flex items-center gap-4">
                {isMyStory ? (
                  <>
                    <button>
                      <Trash2 size={16} />
                    </button>
                    <button>
                      <Edit2 size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Heart size={16} />
                      <span>{likes}</span>
                    </div>
                    <button>
                      <AlertCircle size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
