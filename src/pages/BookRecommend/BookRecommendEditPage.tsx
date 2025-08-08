import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEditRecommend } from "../../hooks/useRecommend";
import Header from "../../components/Header";
import StarSelector from "../../components/BookRecommend/StarSelector";
import ActionButton from "../../components/BookRecommend/ActionButton";

const BookRecommendEditPage = () => {
  const { bookclubId, recommendId } = useParams<{
    bookclubId: string;
    recommendId: string;
  }>();
  const navigate = useNavigate();
  const numericClubId = Number(bookclubId);
  const numericRecommendId = Number(recommendId);

  const location = useLocation();
  const initialData = location.state?.recommendDetail;

  const [content, setContent] = useState("");
  const [rate, setRate] = useState(0);
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState(""); // title 상태 추가

  const { mutate: editRecommend } = useEditRecommend(
    numericClubId,
    numericRecommendId
  );

  useEffect(() => {
    if (initialData) {
      setContent(initialData.content);
      setRate(initialData.rate);
      setTag(initialData.tag);
      setTitle(initialData.title); // title 초기 데이터 설정
    }
  }, [initialData]);

  const handleEdit = () => {
    editRecommend(
      {
        title, // title 포함
        content,
        rate,
        tag,
      },
      {
        onSuccess: () => {
          alert("수정이 완료되었습니다.");
          navigate(`/bookclub/${numericClubId}/recommend/${numericRecommendId}`);
        },
        onError: (error) => {
          alert("수정 실패: " + error.message);
        },
      }
    );
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!initialData) return <div>데이터가 없습니다.</div>;

  const { bookInfo } = initialData;

  return (
    <div className="flex flex-col h-screen ml-5 mr-10">
      <Header pageTitle="추천 도서 수정" />
      <div className="flex-grow overflow-y-auto mt-4">
        <div className="p-4 h-full flex flex-col">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold truncate">{bookInfo.title}</h1>
            <p className="mt-1 mb-3 text-sm text-gray-500">
              {bookInfo.author} | {bookInfo.publisher}
            </p>
          </div>

          <section className="flex-grow flex flex-col md:flex-row md:space-x-8 min-h-0">
            <div className="w-full md:w-1/3 h-48 md:h-full flex-shrink-0 mb-4 md:mb-0">
              <img
                src={bookInfo.imgUrl}
                alt={bookInfo.title}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-grow flex flex-col space-y-4 pr-2">
                {/* 태그 수정 */}
                <div>
                  <label className="font-semibold text-gray-700">제목</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700">태그</label>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* 별점 수정 */}
                <label className="block mb-2 font-semibold">별점 선택</label>
                <div className="flex items-center">
                  <StarSelector value={rate} onChange={setRate} size={20} />
                </div>

                {/* 추천 내용 수정 */}
                <div className="flex flex-col flex-grow">
                  <label className="font-semibold text-gray-700">
                    추천 내용
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 block w-full flex-grow px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    rows={10}
                  />
                </div>
              </div>

              <div className="flex flex-col mt-10 sm:flex-row sm:justify-end sm:space-x-2 space-y-2 sm:space-y-0">
                <ActionButton
                  onClick={handleEdit}
                  label="수정완료"
                  className="w-full sm:w-auto px-7.5 py-2 bg-[#A6917D] text-white text-xs border-2 border-[#A6917D] rounded-2xl hover:bg-[#907E66] transition"
                />
                <ActionButton
                  onClick={handleCancel}
                  label="수정취소"
                  className="w-full sm:w-auto px-7.5 py-2 bg-white text-black text-xs border-2 border-[#A6917D] rounded-2xl hover:bg-gray-200 transition"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default BookRecommendEditPage;
