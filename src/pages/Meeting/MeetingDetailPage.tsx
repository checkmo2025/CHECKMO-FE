import { useMemo, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { DummyMeetingDetail } from "./DummyMeetingDetail";
import type { MeetingDetailResultDto } from "../../types/clubMeeting";
import { MeetingCard } from "../../components/Meeting/MeetingCard";
import { TopicPreviewSection } from "../../components/Meeting/TopicPreviewSection";
import { TeamTopicSection } from "../../components/Meeting/TeamTopicSection";

const MeetingDetailPage = () => {
  const { bookclubId } = useParams<{ bookclubId: string }>();
  const detail = DummyMeetingDetail.result as MeetingDetailResultDto;

  // useMemo를 사용하여 meeting 객체의 참조 안정성 보장
  const meetingForCard = useMemo(
    () => ({
      meetingId: detail.meetingId,
      tags: detail.tags,
      title: detail.title,
      book: detail.book,
      meetingDate: detail.meetingDate,
      meetingPlace: detail.meetingPlace,
    }),
    [detail]
  );

  // useCallback으로 이벤트 핸들러의 참조 안정성 보장
  const handleMoreTopics = useCallback(() => {
    // TODO: 발제 전체보기 페이지로 이동하는 로직 구현
  }, []);

  const handleViewAllTeamTopics = useCallback((teamNumber: number) => {
    // TODO: 해당 팀의 토론 전체보기 페이지로 이동하는 로직 구현
  }, []);

  return (
    <div className="mx-auto p-10 space-y-10">
      <Link
        to={`/bookclub/${bookclubId}/meeting`}
        className="text-gray-600 hover:underline"
      >
        &lt; {detail.title}
      </Link>

      <MeetingCard meeting={meetingForCard} generation={detail.generation} />

      <TopicPreviewSection
        previews={detail.topicPreview}
        onMoreClick={handleMoreTopics}
      />

      {detail.teams.map((team) => (
        <TeamTopicSection
          key={team.teamNumber}
          teamNumber={team.teamNumber}
          topics={team.topics}
          onViewAllClick={handleViewAllTeamTopics}
        />
      ))}
    </div>
  );
};

export default MeetingDetailPage;
