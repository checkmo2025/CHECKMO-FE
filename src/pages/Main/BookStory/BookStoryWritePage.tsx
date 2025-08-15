import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import bookIcon from "../../../assets/icons/booktitle.png";
import Header from "../../../components/Header";
import Modal, { type ModalButton } from "../../../components/Modal";
import { createBookStory } from "../../../apis/BookStory/bookstories";

export default function BookStoryWritePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state?.book;

  if (!book) {
    navigate("/bookstory/search");
    return null;
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // 모달 상태
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddStory = async () => {
    try {
      setLoading(true);

      const payload = {
        bookInfo: {
          isbn: book.isbn || "",
          title: book.title,
          author: book.author,
          imgUrl: book.imgUrl || "",
          publisher: book.publisher || "",
          description: book.description || "",
        },
        title: title,
        description: content,
      };

      await createBookStory(payload);

      setIsModalOpen(true);
    } catch (error) {
      console.error("책 이야기 등록 실패", error);
      alert("등록에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const modalButtons: ModalButton[] = [
    {
      label: "돌아가기",
      variant: "primary",
      onClick: () => navigate("/bookstory"),
    },
  ];

  return (
    <div
      className="absolute left-[315px] right-[42px] top-0 bottom-0 flex flex-col opacity-100"
      style={{ maxWidth: "1080px", margin: "0 auto" }}
    >
      <Header
        pageTitle="책 이야기"
        userProfile={{
          username: "yujin",
          bio: "가나다",
        }}
        customClassName="mt-[30px]"
      />

      <main className="overflow-y-auto flex-grow pt-[30px] px-0">
        <div className="max-w-full mx-auto p-0 space-y-8 text-gray-900">
          {/* 책 정보 */}
          <section className="relative flex items-start gap-6 p-6 border border-[#EAE5E2] rounded-xl bg-white">
            <div className="w-28 h-36 rounded-lg bg-gray-200 flex-shrink-0">
              {book.imgUrl ? (
                <img
                  src={book.imgUrl}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : null}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-sm text-gray-700 font-semibold">
                <img
                  src={bookIcon}
                  alt="profile"
                  className="w-6 h-6 rounded-full"
                />
                <span>{book.title}</span>
              </div>
              <div className="text-xs text-gray-500 mt-1 mb-2">
                {book.author} | {book.publisher}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-gray-800 whitespace-pre-line pr-28">
                {book.description}
              </p>
            </div>

            <div className="flex flex-col gap-2 absolute top-6 right-6 items-center">
              <button className="rounded-[1rem] bg-[#A6917D] px-3 py-1.5 text-xs font-semibold text-white cursor-default select-none w-[6rem]">
                선택됨
              </button>
              <Link to="/bookstory/search">
                <button className="rounded-[1rem] border border-[#A6917D] px-3 py-1.5 text-xs font-semibold text-beige-700 hover:bg-beige-100 w-[6rem]">
                  변경하기
                </button>
              </Link>
            </div>
          </section>

          {/* 입력 폼 */}
          <section className="p-6 border border-[#EAE5E2] rounded-xl bg-white min-h-[22rem] flex flex-col">
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              className="border-none focus:outline-none placeholder-gray-400 text-base font-semibold mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <hr className="border-t border-gray-300 mb-4" />
            <textarea
              placeholder="내용을 자유롭게 입력해주세요."
              className="flex-grow resize-none border-none focus:outline-none placeholder-gray-300 text-sm leading-relaxed"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            <div className="mt-4 flex justify-end gap-4">
              <button className="rounded-[1rem] border border-[#A6917D] px-6 py-2 text-sm text-beige-700 hover:bg-beige-100 w-[6.5625rem]">
                임시저장
              </button>
              <button
                onClick={handleAddStory}
                className="rounded-[1rem] bg-[#A6917D] px-6 py-2 text-sm font-semibold text-white hover:bg-beige-600 w-[6.5625rem]"
              >
                등록
              </button>
            </div>
          </section>
        </div>
      </main>

      <Modal
        isOpen={isModalOpen}
        title="등록이 완료되었습니다!"
        buttons={modalButtons}
        onBackdrop={() => setIsModalOpen(false)}
      />
    </div>
  );
}
