import { useNavigate } from "react-router-dom";
import type { RecommendationDto } from "../../types/bookRecommend";
import ActionButton from "./ActionButton";
import StarRating from "./StarRating";

interface BookRecommendDetailCardProps {
  clubId: number;
  recommendDetail: RecommendationDto;
}

const BookRecommendDetailCard = ({
  clubId,
  recommendDetail,
}: BookRecommendDetailCardProps) => {
  const navigate = useNavigate();
  const { id, title, content, rate, tag, bookInfo, authorInfo, staff, author } =
    recommendDetail;

  const handleEdit = () => {
    navigate(`/bookclub/${clubId}/recommend/${id}/edit`, {
      state: { recommendDetail },
    });
  };

  const handleDelete = () => {
    // TODO: 추후 API 호출 로직으로 대체
    console.log("삭제하기 버튼 클릭");
  };

  return (
    <div className="mt-2 p-4">
      <h1 className=" text-3xl font-bold">{bookInfo.title}</h1>
      <p className="mt-6 mb-4 text-sm text-gray-500">
        {bookInfo.author}
        {" | "}
        {bookInfo.publisher}
        {" | "}
        {/* {format(new Date(detailInfo.createdAt), "yyyy.MM.dd")} */}
      </p>

      <section className="flex flex-col md:flex-row md:space-x-8 mt-4 max-h-[75vh]">
        <div className="flex-shrink-0 md:w-1/3 mx-auto md:mx-0 h-full max-h-[75vh]">
          <img
            src={bookInfo.imgUrl}
            alt={bookInfo.title}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        <div className="flex flex-col flex-1 ml-12 mt-6 md:mt-0 md:ml-10 min-h-0">
          {/* Scrollable content area */}
          <div className="flex-grow overflow-y-auto pr-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-1 rounded-full bg-[#90D26D] text-xs font-normal text-white">
                {tag}
              </span>
            </div>

            <div className="flex items-center my-4 space-x-3">
              <img
                src={authorInfo.profileImageUrl}
                alt={authorInfo.nickname}
                className="w-10 h-10 rounded-full object-cover bg-gray-200"
              />
              <div>
                <p className="font-semibold">{authorInfo.nickname}</p>
                <p className="text-xs text-gray-500">건전한가즈앗코치</p>
              </div>
            </div>

            {/* 추천 내용 */}
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
              {content}
            </p>
          </div>

          {/* Sticky bottom part with stars and buttons */}
          <div className="flex-shrink-0 pt-4">
            <div className="mb-4 flex items-center">
              <StarRating rate={rate} />
            </div>
            {author && (
              <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                <ActionButton
                  onClick={handleEdit}
                  label="수정하기"
                  className="w-full sm:w-auto px-7.5 py-2 bg-[#A6917D] text-white text-xs border-2 border-[#A6917D] rounded-2xl hover:bg-[#907E66] transition"
                />
                <ActionButton
                  onClick={handleDelete}
                  label="삭제하기"
                  className="w-full sm:w-auto px-7.5 py-2 bg-white text-black text-xs border-2 border-[#A6917D] rounded-2xl hover:bg-gray-200 transition"
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
