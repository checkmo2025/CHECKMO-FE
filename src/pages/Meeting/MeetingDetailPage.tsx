import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DummyMeetingDetail } from "./DummyMeetingDetail";
import type { MeetingDetailResultDto } from "../../types/clubMeeting";
import { MeetingCard } from "../../components/Meeting/MeetingCard";
import { TopicPreviewSection } from "../../components/Meeting/TopicPreviewSection";
import { TeamTopicSection } from "../../components/Meeting/TeamTopicSection";
import { NonProfileHeader } from "../../components/NonProfileHeader";

const MeetingDetailPage = () => {
  const navigate = useNavigate();
  const detail = DummyMeetingDetail.result as MeetingDetailResultDto;

  // useCallback으로 이벤트 핸들러의 참조 안정성 보장
  const handleMoreTopics = useCallback(() => {
    navigate("topics", {
      state: {
        date: detail.meetingDate,
        bookTitle: detail.book.title,
        topics: detail.topicPreview,
      },
    });
  }, [navigate, detail.meetingDate, detail.book.title, detail.topicPreview]);

  const handleViewAllTeamTopics = useCallback((teamNumber: number) => {
    // TODO: 해당 팀의 토론 전체보기 페이지로 이동하는 로직 구현
  }, []);

  return (
    <div className="mx-auto px-10 space-y-10">
      <NonProfileHeader title={detail.title} />

      <MeetingCard
        title={""}
        book={detail.book}
        meetingDate={detail.meetingDate}
        meetingPlace={detail.meetingPlace}
        tags={detail.tags}
        generation={detail.generation}
        className="flex min-w-[500px] px-4 pt-2 pb-4 bg-white mx-5 border-[#EAE5E2] border-b-2"
      />

      <TopicPreviewSection
        previews={detail.topicPreview.slice(0, 4)}
        onMoreClick={handleMoreTopics}
      />

      {detail.teams.map((team) => (
        <TeamTopicSection
          key={team.teamNumber}
          teamNumber={team.teamNumber}
          topics={team.topics.slice(0, 4)}
          onViewAllClick={handleViewAllTeamTopics}
        />
      ))}
    </div>
  );
};

export default MeetingDetailPage;
