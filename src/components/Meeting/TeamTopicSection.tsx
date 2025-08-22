import { memo } from "react";
import type { Topic } from "../../types/clubMeeting";
import { TopicCard } from "./TopicCard";

interface TeamTopicSectionProps {
  teamNumber: number;
  topics: Topic[];
  onViewAllClick?: () => void;
}

const TeamTopicSectionComponent = ({
  teamNumber,
  topics,
  onViewAllClick,
}: TeamTopicSectionProps) => {
  const getTeamName = (num: number) =>
    `토론 ${String.fromCharCode(64 + num)}조`;

  return (
    <section className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold">{getTeamName(teamNumber)}</h2>
        {onViewAllClick && (
          <button
            onClick={onViewAllClick}
            className="text-sm text-gray-500 hover:underline"
          >
            전체보기
          </button>
        )}
      </div>
      <ul className="space-y-3">
        {topics.map((topic) => (
          <TopicCard
            key={topic.topicId}
            content={topic.content}
            authorInfo={topic.authorInfo}
          />
        ))}
      </ul>
    </section>
  );
};

export const TeamTopicSection = memo(TeamTopicSectionComponent);
