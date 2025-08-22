import { useState } from "react";
import noUserImage from "../../assets/images/userImage.png";
import editIcon from "../../assets/icons/edit.png";
import editHoverIcon from "../../assets/icons/editHover.png";
import deleteIcon from "../../assets/icons/delete.png";
import deleteHoverIcon from "../../assets/icons/deleteHover.png";

type Props = {
  profileUrl: string;
  userName: string;
  imageUrl: string;
  title: string;
  summary: string;
  bookTitle: string;
  author: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onClick?: () => void;
};

export default function MyBookStoryCard({
  profileUrl,
  userName,
  imageUrl,
  title,
  summary,
  bookTitle,
  author,
  onEdit,
  onDelete,
  onClick,
}: Props) {
  const [isDeleteHovered, setIsDeleteHovered] = useState(false);
  const [isEditHovered, setIsEditHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      className="rounded-[16px] border-2 border-[#EAE5E2] overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.03] transition-all duration-300 origin-center w-full"
      role="button"
    >
      <div className="flex flex-col md:flex-row gap-4 p-7 h-full">
        {/* 왼쪽 책 이미지 */}
        <div className="w-full md:w-[200px] h-[290px] bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={bookTitle}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* 오른쪽 텍스트 영역 */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* 상단: 프로필 */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img
                src={profileUrl || noUserImage}
                alt={`${userName} 프로필 이미지`}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="font-medium text-sm text-black">{userName}</span>
            </div>
          </div>
          {/* 제목 + 요약 */}
          <div className="mt-2 flex flex-col gap-1">
            <h4
              className="font-semibold text-xl text-black overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {title}
            </h4>
            <p
              className="font-normal text-sm text-gray-700 overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 4,
                WebkitBoxOrient: "vertical",
              }}
            >
              {summary}
            </p>
          </div>
          {/* 관련 도서 정보 */}
          <div className="text-gray-500 text-xs mt-4 truncate">
            도서: {bookTitle} | {author}
          </div>
          {/* 하단: 수정/삭제 버튼 */}
          <div className="mt-auto flex items-center justify-end gap-3 pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              onMouseEnter={() => setIsDeleteHovered(true)}
              onMouseLeave={() => setIsDeleteHovered(false)}
              className="cursor-pointer"
            >
              <img
                src={isDeleteHovered ? deleteHoverIcon : deleteIcon}
                alt="삭제"
                className="w-[18px] h-[18px]"
              />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              onMouseEnter={() => setIsEditHovered(true)}
              onMouseLeave={() => setIsEditHovered(false)}
              className="cursor-pointer"
            >
              <img
                src={isEditHovered ? editHoverIcon : editIcon}
                alt="수정"
                className="w-[18px] h-[18px]"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
