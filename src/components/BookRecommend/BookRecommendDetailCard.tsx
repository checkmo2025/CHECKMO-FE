import { useNavigate } from "react-router-dom";
import type { RecommendationDto } from "../../types/bookRecommend";
import ActionButton from "./ActionButton";
import StarRating from "./StarRating";

interface BookRecommendDetailCardProps {
  clubId: number;
  recommendDetail: RecommendationDto;
  onDelete: () => void; // 삭제 버튼 클릭 시 호출될 함수
}

const BookRecommendDetailCard = ({
  clubId,
  recommendDetail,
  onDelete,
}: BookRecommendDetailCardProps) => {
  const navigate = useNavigate();
  const { id, title, content, rate, tag, bookInfo, authorInfo, staff, author } =
    recommendDetail;

  // 배포용 error 방지 코드 (미사용 변수 방지)
  console.log(title, staff);

  const tags = tag.split(",").map((t) => t.trim()).filter(Boolean);

  const handleEdit = () => {
    navigate(`/bookclub/${clubId}/recommend/${id}/edit`, {
      state: { recommendDetail },
    });
  };

  return (
    <div className="mt-2 px-4 sm:px-6 md:px-8 py-2">
      <h1 className="font-bold text-2xl sm:text-3xl">{bookInfo.title}</h1>
      <p className="mt-3 sm:mt-4 mb-4 text-xs sm:text-sm text-gray-500">
        {bookInfo.author}
      </p>
      <section className="flex flex-col md:flex-row md:gap-8 gap-6 mt-2 md:mt-4">
        <div className="w-full md:w-1/3 mx-auto md:mx-0 rounded-lg overflow-hidden max-w-[600px]">
          <div className="w-full aspect-[3/4] bg-white">
            <img
              src={bookInfo.imgUrl}
              alt={bookInfo.title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1 min-h-0 md:ml-2">
          <div className="flex-grow overflow-visible md:overflow-y-auto md:pr-4 md:max-h-[62vh]">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-0.5 sm:px-4 sm:py-1 rounded-full bg-[#90D26D] text-[11px] sm:text-xs font-normal text-white"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center my-3 sm:my-4 gap-2 sm:gap-3">
              <img
                src={authorInfo.profileImageUrl}
                alt={authorInfo.nickname}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover bg-gray-200"
              />
              <div>
                <p className="font-semibold text-sm sm:text-base">{authorInfo.nickname}</p>
                <p className="text-[10px] sm:text-xs text-gray-500">건전한가즈앗코치</p>
              </div>
            </div>
            <p className="text-[13px] sm:text-sm text-gray-800 leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </div>
          <div className="flex-shrink-0 pt-4">
            <div className="mb-3 sm:mb-4 flex items-center">
              <StarRating rate={rate} />
            </div>

            {author && (
              <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                <ActionButton
                  onClick={handleEdit}
                  label="수정하기"
                  className="w-full sm:w-auto px-6 sm:px-7.5 py-2 bg-[#A6917D] text-white text-xs border-2 border-[#A6917D] rounded-2xl hover:bg-[#907E66] transition"
                />
                <ActionButton
                  onClick={onDelete}
                  label="삭제하기"
                  className="w-full sm:w-auto px-6 sm:px-7.5 py-2 bg-white text-black text-xs border-2 border-[#A6917D] rounded-2xl hover:bg-gray-200 transition"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookRecommendDetailCard;
