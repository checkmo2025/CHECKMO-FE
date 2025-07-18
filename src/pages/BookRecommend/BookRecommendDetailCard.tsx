import type { RecommendDetailDto } from "../../types/bookRecommend";
import StarRating from "./StarRating";
import { format } from "date-fns";

interface BookRecommendDetailCardProps {
  recommendDetail: RecommendDetailDto;
}

const BookRecommendDetailCard = ({
  recommendDetail,
}: BookRecommendDetailCardProps) => {
  const detailInfo = recommendDetail.result.recommend;
  const bookInfo = detailInfo.bookInfo;
  const memberInfo = detailInfo.memberInfo;
  return (
    <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:flex md:space-x-8">
      {/* 좌측 ─ 표지 */}
      <div className="flex-shrink-0">
        <img
          src={bookInfo.imgUrl}
          alt={bookInfo.title}
          className="w-48 h-64 object-cover rounded-lg bg-gray-100"
        />
      </div>

      {/* 우측 ─ 정보 */}
      <div className="flex-1 mt-6 md:mt-0">
        {/* 카테고리 정보가 담길 위치 */}
        {/* {categories && categories.length > 0 && (
          <div className="mb-2 flex gap-2">
            {categories.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )} */}

        {/* 제목/저자/날짜 */}
        <h1 className="text-2xl font-bold">{bookInfo.title}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {bookInfo.author}
          {bookInfo.pulisher}
          {" · "}
          {format(new Date(detailInfo.createdAt), "yyyy.MM.dd")}
        </p>

        {/* 작성자 */}
        <div className="flex items-center mt-6 space-x-3">
          <img
            src={memberInfo.imgUrl}
            alt={memberInfo.nickName}
            className="w-10 h-10 rounded-full object-cover bg-gray-200"
          />
          <div>
            <p className="font-semibold">{memberInfo.nickName}</p>
            <p className="text-xs text-gray-500">건전한가즈앗코치</p>
          </div>
        </div>

        {/* 추천 내용 */}
        <p className="mt-4 text-gray-800 leading-relaxed whitespace-pre-line">
          {detailInfo.content}
        </p>

        {/* 별점 */}
        <div className="mt-6 flex items-center">
          <StarRating rate={detailInfo.rate} />
        </div>
      </div>
    </section>
  );
};

export default BookRecommendDetailCard;
