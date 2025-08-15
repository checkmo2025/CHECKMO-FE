import { memo } from "react";
import type { Topic } from "../../types/clubMeeting";
import { TopicPreviewCard } from "./TopicPreviewCard";

interface TopicPreviewSectionProps {
  previews: Topic[];
  onMoreClick?: () => void;
}

const TopicPreviewSectionComponent = ({
  previews,
  onMoreClick,
}: TopicPreviewSectionProps) => {
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
          <TopicPreviewCard key={preview.topicId} preview={preview} />
        ))}
      </ul>
    </section>
  );
};

export const TopicPreviewSection = memo(TopicPreviewSectionComponent);
