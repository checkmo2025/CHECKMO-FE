import { memo } from "react";
import type { AuthorDto } from "../../types/dto";

interface TopicCardProps {
  content: string;
  authorInfo: AuthorDto;
}

const TopicCardComponent = ({ content, authorInfo }: TopicCardProps) => {
  return (
    <div className="flex flex-1 min-w-[500px] items-center justify-between bg-[#F4F2F1] p-1 rounded-2xl border-2 border-[#EAE5E2]">
      <div className="flex items-center space-x-2 flex-1 overflow-hidden">
        <img
          src={authorInfo.profileImageUrl}
          alt={authorInfo.nickname}
          className="w-8 h-8 mx-2 rounded-full bg-gray-200 flex-shrink-0"
        />
        <span className="text-black text-[12px] font-medium whitespace-nowrap ml-5 mr-20">
          {authorInfo.nickname}
        </span>
        <p className="text-black text-[12px] font-medium truncate">{content}</p>
      </div>
    </div>
  );
};

export const TopicCard = memo(TopicCardComponent);
