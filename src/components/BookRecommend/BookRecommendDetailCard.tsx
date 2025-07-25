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
    <div className="mx-auto mt-2 p-4">
      <h1 className=" text-3xl font-bold">{bookInfo.title}</h1>
      <p className="mt-6 mb-4 text-sm text-gray-500">
        {bookInfo.author}
        {" | "}
        {bookInfo.pulisher}
        {" | "}
        {format(new Date(detailInfo.createdAt), "yyyy.MM.dd")}
      </p>

      <section className="md:flex md:space-x-8">
        <div className="flex-shrink-0 w-1/3 h-2/3 min-w-[300px]">
          <img
            // src={bookInfo.imgUrl}
            src="/chess.png"
            alt={bookInfo.title}
            className="h-100 object-cover rounded-lg bg-gray-100"
          />
        </div>

        <div className="flex-1 mt-1 ml-3 min-w-[400px]">
          <div className="flex gap-2">
            <span className="px-4 py-1 rounded-full bg-[#90D26D] text-xs font-normal text-white">
              사회
            </span>
            <span className="px-4 py-1 rounded-full bg-[#90D26D] text-xs font-normal text-white">
              사회
            </span>
          </div>

          <div className="flex items-center ml-1 my-4 space-x-3">
            <img
              // src={memberInfo.imgUrl}
              src="/profile.png"
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
          <div className="mt-8 flex items-center">
            <StarRating rate={detailInfo.rate} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookRecommendDetailCard;
