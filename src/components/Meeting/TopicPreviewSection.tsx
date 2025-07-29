import { memo } from "react";
import type { TopicPreviewDto } from "../../types/clubMeeting";
import { TopicCard } from "./TopicCard";

interface TopicPreviewSectionProps {
  previews: TopicPreviewDto[];
  onMoreClick?: () => void;
}

const TopicPreviewSectionComponent = ({
  previews,
  onMoreClick,
}: TopicPreviewSectionProps) => {
  const getTeamName = (num: number) => `${String.fromCharCode(64 + num)}조`;

  return (
    <section className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">발제 전체보기</h2>
        {onMoreClick && (
          <button
            onClick={onMoreClick}
            className="text-sm text-gray-500 hover:underline"
          >
            더보기
          </button>
        )}
      </div>
      <ul className="space-y-3">
        {previews.map((preview) => (
          <li
            key={preview.topicId}
            className="flex items-center justify-between"
          >
            <TopicCard
              content={preview.content}
              authorInfo={preview.authorInfo}
            />

            {/* 선택된 팀 버튼 */}
            <div className="flex space-x-1 flex-shrink-0 ml-2">
              {preview.selectedTeams.map((teamNumber) => (
                <button
                  key={teamNumber}
                  className="px-4 py-1.5 border-2 border-[#90D26D] bg-[#EFF5ED] text-[#3D4C35] text-xs rounded-xl"
                >
                  {getTeamName(teamNumber)}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export const TopicPreviewSection = memo(TopicPreviewSectionComponent);
