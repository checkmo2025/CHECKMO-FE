import React, { useState } from "react";
import { Heart, AlertTriangle } from "lucide-react"; 

interface Book {
  id: number;
  title: string;
  content: string;
  likes: number;
}

const OthersProfilePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: "나는 나이든 왕자다",
      content:
        "어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다. 어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다. 어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다. 어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.",
      likes: 12,
    },
    {
      id: 2,
      title: "나는 나이든 왕자다",
      content:
        "어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 지구에 온 어린 왕자는 여우를 만나 우정과 책임감을 배우고, 자신의 별로 돌아가기 위해 독사에게 몸을 맡긴다.",
      likes: 8,
    },
  ]);

  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleSubscribe = () => {
    setIsSubscribed((prev) => !prev);
  };

  return (
    <div className="flex w-full min-h-screen bg-[#FAFAFA]">
      {/* 사이드바 */}
      <aside className="hidden md:block w-[264px] bg-[#F1F8EF] border-r border-gray-200"></aside>

      {/* 메인 영역 */}
      <main className="flex-1 flex flex-col items-center px-10 py-10">
        {/* 프로필 영역 */}
        <div className="w-[1080px] h-[143px] bg-white rounded-[12px] p-4 mb-5 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] bg-gray-300 rounded-full"></div>
              <p className="text-[18px] font-semibold text-[#2C2C2C]">우끼끼</p>
              <button
                className={`px-2 py-1 rounded-full text-[12px] font-medium text-white ${
                  isSubscribed ? "bg-[#A6917D]" : "bg-[#90D26D]"
                } hover:bg-[#7bb95b]`}
                onClick={toggleSubscribe}
              >
                {isSubscribed ? "구독중" : "구독"}
              </button>
            </div>

            {/* 사회 버튼 */}
            <div className="flex gap-2">
              {["사회", "사회", "사회", "사회"].map((label, index) => (
                <button
                  key={index}
                  className="px-3 py-1 rounded-full bg-[#90D26D] text-white text-[12px] font-medium"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full h-[56px] bg-[#EFF5ED] rounded-[8px] flex items-center px-4 text-[#5C5C5C] text-[18px] font-medium">
            책을 아는가? 나는 모른다!
          </div>
        </div>

        {/* 책 이야기 영역 */}
        <div className="w-[1080px] flex justify-between items-center mb-4">
          <h2 className="text-[18px] font-medium text-[#2C2C2C]">
            우끼끼님의 책 이야기
          </h2>
          <button className="text-sm text-[#8D8D8D] hover:underline">
            전체보기
          </button>
        </div>

        {/* 책 리스트 */}
        <div className="w-[1080px] space-y-4">
          {books.map((book) => (
            <div
              key={book.id}
              className="flex w-full h-[288px] bg-white rounded-[12px] border border-[#EAE5E2] p-6"
            >
              {/* 책 이미지 */}
              <div className="w-[176px] h-[248px] bg-[#E0E0E0] rounded-[16px] flex-shrink-0"></div>

              {/* 책 내용 */}
              <div className="flex flex-col justify-between ml-6 w-full relative">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-[24px] h-[24px] bg-gray-300 rounded-full"></div>
                    <p className="text-[14px] text-[#8D8D8D]">hy</p>
                  </div>

                  <h3 className="text-[20px] font-semibold text-[#2C2C2C] mb-3">
                    {book.title}
                  </h3>

                  <p
                    className="text-[14px] text-[#5C5C5C] overflow-hidden text-ellipsis mb-4"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {book.content}
                  </p>
                </div>

                {/* 좋아요 & 신고 아이콘 */}
                <div className="flex items-center gap-5 mt-auto ml-[20px]">
                  <div className="flex items-center gap-1 text-[#2C2C2C] hover:text-[#90D26D] text-sm cursor-pointer">
                    <Heart size={24} />
                    <span>{book.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#2C2C2C] hover:text-[#90D26D] text-sm cursor-pointer">
                    <AlertTriangle size={24} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default OthersProfilePage;