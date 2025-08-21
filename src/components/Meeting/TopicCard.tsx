import { memo } from "react";
import type { AuthorDto } from "../../types/dto";
import { useNavigate } from "react-router-dom";

interface TopicCardProps {
  content: string;
  authorInfo: AuthorDto;
}

const TopicCardComponent = ({ content, authorInfo }: TopicCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 min-w-[500px] items-center justify-between bg-[#F4F2F1] p-1 rounded-2xl border-2 border-[#EAE5E2]">
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        <img
          src={authorInfo.profileImageUrl}
          alt={authorInfo.nickname}
          onClick={() => navigate(`/info/others/${authorInfo.nickname}`)}
          className="w-8 h-8 rounded-full bg-gray-200 shrink-0 ml-2"
        />
        <span className="text-black text-[12px] font-medium w-[120px] shrink-0 overflow-hidden text-ellipsis whitespace-nowrap">
          {authorInfo.nickname}
        </span>
        <p className="text-black text-[12px] font-medium truncate min-w-0">
          {content}
        </p>
      </div>
    </div>
  );
};

export const TopicCard = memo(TopicCardComponent);
