import { useState } from "react";
import StarSelector from "../../components/BookRecommend/StarSelector";
import type { BookDto } from "../../types/dto";

const dummyBook: BookDto = {
  bookId: 43,
  title: "넥서스",
  author: "유발 하라리",
  imgUrl: "/chess.png",
  pulisher: "1234",
};

const BookRecommendCreatePage = () => {
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
    <div>
      <div className="max-w-4xl mx-auto pt-6 pl-6 pr-6">
        <h2 className="text-xl font-bold">{dummyBook.title}</h2>
        <p className="text-gray-600 mt-4">{dummyBook.author}</p>
      </div>
      <section className="max-w-4xl mx-auto mt-2 pl-6 pr-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-stretch min-h-[300px]">
        <div className="space-y-4 h-full">
          <img
            src={dummyBook.imgUrl}
            alt={dummyBook.title}
            className="w-full h-full object-cover rounded-lg bg-gray-100"
          />
        </div>

        <div className="flex flex-col space-y-6 h-full">
          <div>
            <label className="block mb-2 font-semibold">별점 선택</label>
            <div className="flex items-center">
              <StarSelector value={rating} onChange={setRating} size={32} />
              <p className="ml-2 text-sm text-gray-700">
                {rating.toFixed(1)} / 5.0
              </p>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <label className="block mb-2 font-semibold">추천 이유 작성</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="이 책을 추천하는 이유를 자유롭게 적어주세요!"
              className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </section>
      <div className="flex justify-end max-w-4xl mx-auto pt-6 pl-6 pr-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition"
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default BookRecommendCreatePage;
