import React from "react";
import { Edit2, Trash2 } from "lucide-react";

type Props = {
  imageUrl: string;
  userName: string;
  title: string;
  summary: string;
  bookTitle: string;
  author: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function MyBookStoryCard({
  imageUrl,
  userName,
  title,
  summary,
  bookTitle,
  author,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="border border-[#EAE5E2]  rounded-lg p-4 flex bg-white">
      {/* 책 이미지 */}
      <div className="w-32 h-48 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={bookTitle}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* 내용 영역 */}
      <div className="flex flex-col ml-4 flex-1">
        {/* 작성자 */}
        <div className="text-sm text-gray-500 mb-1">{userName}</div>

        {/* 제목 */}
        <h3 className="text-lg font-semibold mb-2">{title}</h3>

        {/* 요약 */}
        <p className="text-gray-700 text-sm mb-2 line-clamp-2">{summary}</p>

        {/* 책 정보 */}
        <div className="text-gray-500 text-xs mb-2">
          도서: {bookTitle} | {author}
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-4 mt-auto justify-end">
          <button onClick={onDelete}>
            <Trash2 size={16} color="#A6917D" />
          </button>
          <button onClick={onEdit}>
            <Edit2 size={16} color="#A6917D" />
          </button>
        </div>
      </div>
    </div>
  );
}
