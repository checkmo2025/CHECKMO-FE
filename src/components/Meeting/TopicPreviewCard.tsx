import { memo } from "react";
import type { Topic } from "../../types/clubMeeting";
import { TopicCard } from "./TopicCard";
import { TeamButtonList } from "./TeamButtonList";

interface TopicPreviewCardProps {
  preview: Topic;
}

const TopicPreviewCardComponent = ({ preview }: TopicPreviewCardProps) => {
  return (
    <li className="flex items-center justify-between">
      <TopicCard content={preview.content} authorInfo={preview.authorInfo} />
      <TeamButtonList selectedTeams={preview.teamNumbers} />
    </li>
  );
};

export const TopicPreviewCard = memo(TopicPreviewCardComponent);
