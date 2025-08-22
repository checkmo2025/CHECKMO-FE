import { memo } from "react";
import { useUpdateTopicSelect } from "../../hooks/useClubMeeting";
import type { Topic } from "../../types/clubMeeting";
import { TeamButtonList } from "./TeamButtonList";
import { TopicCard } from "./TopicCard";
import { AxiosError } from "axios";

interface TopicPreviewCardProps {
  preview: Topic;
  meetingId?: number;
  listOfTeams: number[];
  onUpdateSuccess?: (message: string) => void;
}

const TopicPreviewCardComponent = ({
  preview,
  meetingId,
  listOfTeams,
  onUpdateSuccess,
}: TopicPreviewCardProps) => {
  // 토픽 선택 기능 활성화 여부
  const isSelectable =
    typeof meetingId === "number" &&
    // typeof listOfTeams === "Array" &&
    typeof onUpdateSuccess === "function";

  const { mutate: updateTopic, isPending } = useUpdateTopicSelect(
    meetingId ?? 0,
    preview.topicId
  );

  const handleSelect = (teamId: number) => {
    if (!isSelectable || isPending) return;

    const isCurrentlySelected = preview.teamNumbers.includes(teamId);

    updateTopic(
      { isSelected: !isCurrentlySelected, teamNumber: teamId },
      {
        onSuccess: () => {
          const message = !isCurrentlySelected
            ? "발제가 선택되었습니다."
            : "발제 선택이 해제되었습니다.";
          onUpdateSuccess(message);
        },
        onError: (error) => {
          let errorMessage = `오류가 발생했습니다: ${error.message}`;

          if (error instanceof AxiosError && error.response?.data) {
            errorMessage = error.response.data.message;
          }
          onUpdateSuccess(errorMessage);
        },
      }
    );
  };

  return (
    <li className="flex items-center justify-between">
      <TopicCard content={preview.content} authorInfo={preview.authorInfo} />
      <>
        <TeamButtonList
          teamNumbers={listOfTeams}
          selectedTeamNumbers={preview.teamNumbers}
          onSelect={handleSelect}
          disabled={!isSelectable}
        />
      </>
    </li>
  );
};

export const TopicPreviewCard = memo(TopicPreviewCardComponent);
