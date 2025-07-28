import { useState } from "react";
import type { BookDto } from "../../types/dto";
import StarSelector from "./StarSelector";

interface BookRecommendCreateCardProps {
  bookInfo: BookDto;
}

const BookRecommendCreateCard = ({
  bookInfo,
}: BookRecommendCreateCardProps) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!rating || !content.trim()) {
      alert("별점과 추천 이유를 모두 입력해 주세요.");
      return;
    }
    console.log({ rating, content });
    alert(`등록 완료!\n별점: ${rating}\n내용: ${content}`);
  };
  return (
    <>
      <div className="mx-auto mt-2 p-4">
        <h1 className=" text-3xl font-bold">{bookInfo.title}</h1>
        <p className="mt-6 mb-4 text-sm text-gray-500">
          {bookInfo.author}
          {" | "}
          {bookInfo.publisher}
          {" | "}
          {/* {format(new Date(bookInfo.createdAt), "yyyy.MM.dd")} */}
        </p>

        <section className="flex h-2/3 min-h-[500px]">
          <div className="w-1/3 min-w-[300px] rounded-xl overflow-hidden">
            <img
              // src={bookInfo.imgUrl}
              src="/chess.png"
              alt={bookInfo.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="ml-8 flex flex-col flex-start w-2/3 min-w-[300px]">
            <label className="block mb-2 font-semibold">별점 선택</label>
            <div className="flex items-center">
              <StarSelector value={rating} onChange={setRating} size={20} />
            </div>

            <label className="block mt-6 mb-2 font-semibold">
              책 소개 및 추천 이유 작성
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 작성해주세요."
              className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </section>
      </div>

      <div className="flex justify-end mr-4">
        <button
          onClick={handleSubmit}
          className="px-7 py-2 bg-[#A6917D] text-white text-xs rounded-2xl hover:bg-amber-600 transition"
        >
          등록하기
        </button>
      </div>
    </>
  );
};

export default BookRecommendCreateCard;
