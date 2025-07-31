import { useState, useEffect, useRef, useCallback } from "react";
import { Heart, Siren } from "lucide-react";
import AlertModal from "../../../components/AlertModal";
import { useParams } from "react-router-dom";

type Book = {
  id: number;
  title: string;
  content: string;
  likes: number;
  liked: boolean;
};

const OthersProfilePage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const { userId } = useParams<{ userId: string }>();

  const toggleSubscribe = () => setIsSubscribed((prev) => !prev);

  const toggleLike = (id: number) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id
          ? {
              ...book,
              liked: !book.liked,
              likes: book.liked ? book.likes - 1 : book.likes + 1,
            }
          : book
      )
    );
  };

  const openReportModal = (id: number) => {
    setSelectedBookId(id);
    setShowReportModal(true);
  };

  const handleReportConfirm = () => {
    setShowReportModal(false);
    alert("신고 사유 작성 폼으로 이동 예정입니다.");
  };

  const fetchBooks = async (pageNum: number) => {
    if (isFetching || !hasMore) return;
    setIsFetching(true);

    await new Promise((res) => setTimeout(res, 500));

    const newBooks: Book[] = Array.from({ length: 2 }, (_, idx) => {
      const id = (pageNum - 1) * 2 + idx + 1;
      return {
        id,
        title: `나는 나이든 왕자다 ${id}`,
        content:
          "어린 왕자는 소행성의 주인공이며 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 살았으며 세상에 대한 호기심으로 여행을 떠났다. 여우를 만나고, 장미를 떠올리며, 책임감을 배웠다.".repeat(5),
        likes: Math.floor(Math.random() * 10),
        liked: false,
      };
    });

    setBooks((prev) => [...prev, ...newBooks]);
    setPage((prev) => prev + 1);
    if (pageNum >= 5) setHasMore(false);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchBooks(1);
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchBooks(page);
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetching, hasMore, page]
  );

  return (
    <div className="flex min-h-screen w-full bg-[#FAFAFA] overflow-x-hidden">
      <main className="flex-grow w-full px-4 md:px-8 py-10">
        <div className="w-full bg-white rounded-[12px] p-4 mb-5">
          <div className="flex justify-between items-center mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-[40px] h-[40px] bg-gray-300 rounded-full" />
              <p className="text-[18px] font-semibold text-[#2C2C2C]">{userId}님</p>
              <button
                className={`px-2 py-1 rounded-full text-[12px] font-medium text-white ${
                  isSubscribed ? "bg-[#A6917D]" : "bg-[#90D26D]"
                } hover:bg-[#7bb95b]`}
                onClick={toggleSubscribe}
              >
                {isSubscribed ? "구독중" : "구독"}
              </button>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0 flex-wrap">
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

        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-[18px] font-medium text-[#2C2C2C]">
            {userId}님의 책 이야기
          </h2>
          <button className="text-sm text-[#8D8D8D] hover:underline">
            전체보기
          </button>
        </div>

        <div className="w-full space-y-4">
          {books.map((book, idx) => (
            <div
              key={book.id}
              ref={idx === books.length - 1 ? lastElementRef : null}
              className="flex bg-white rounded-[12px] border border-[#EAE5E2] p-6"
            >
              <div className="w-[176px] h-[248px] bg-[#E0E0E0] rounded-[16px] flex-shrink-0" />
              <div className="flex flex-col justify-between ml-6 w-full">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-[24px] h-[24px] bg-gray-300 rounded-full" />
                    <p className="text-[14px] text-[#8D8D8D]">{userId}</p>
                  </div>

                  <h3 className="text-[20px] font-semibold text-[#2C2C2C] mb-3">
                    {book.title}
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
                    {book.content}
                  </p>
                </div>

                <div className="flex items-center gap-5 mt-auto ml-[20px]">
                  <div
                    className={`flex items-center gap-1 text-sm cursor-pointer ${
                      book.liked ? "text-[#90D26D]" : "text-[#2C2C2C]"
                    } hover:text-[#90D26D]`}
                    onClick={() => toggleLike(book.id)}
                  >
                    <Heart size={24} />
                    <span>{book.likes}</span>
                  </div>
                  <div
                    className="flex items-center gap-1 text-[#2C2C2C] hover:text-[#90D26D] text-sm cursor-pointer"
                    onClick={() => openReportModal(book.id)}
                  >
                    <Siren size={26} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isFetching && (
            <p className="text-center text-gray-400">불러오는 중...</p>
          )}
          {!hasMore && !isFetching && (
            <p className="text-center text-gray-400">더 이상 책 이야기가 없습니다.</p>
          )}
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