import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TeamTopic } from "../../types/clubMeeting";
import { MeetingCard } from "../../components/Meeting/MeetingCard";
import { TopicPreviewSection } from "../../components/Meeting/TopicPreviewSection";
import { TeamTopicSection } from "../../components/Meeting/TeamTopicSection";
import { NonProfileHeader } from "../../components/NonProfileHeader";
import { useMeetingDetail } from "../../hooks/useClubMeeting";

const MeetingDetailPage = () => {
  const navigate = useNavigate();
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data, isLoading, isError } = useMeetingDetail(Number(meetingId));

  const handleMoreTopics = useCallback(() => {
    if (!data) return;
    navigate("topics", {
      state: {
        date: data.meetingInfo.meetingTime,
        bookTitle: data.meetingInfo.bookInfo.title,
        topics: data.topics,
      },
    });
  }, [navigate, data]);

  const handleViewAllTeamTopics = useCallback(
    (team: TeamTopic) => {
      if (!data) return;
      navigate(`teamTopic/${team.teamNumber}`, {
        state: {
          date: data.meetingInfo.meetingTime,
          bookTitle: data.meetingInfo.bookInfo.title,
          topics: team.topics,
        },
      });
    },
    [navigate, data]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>모임 정보를 불러오는데 실패했습니다.</div>;
  }

  const { meetingInfo, teams, topics } = data;
  console.log(meetingInfo);
  console.log(teams);
  console.log(topics);

  return (
    <div className="mx-auto px-10 space-y-10">
      <NonProfileHeader title={meetingInfo.content} />

      <MeetingCard
        title={meetingInfo.title}
        book={meetingInfo.bookInfo}
        meetingDate={meetingInfo.meetingTime}
        meetingPlace={meetingInfo.location}
        tags={meetingInfo.tag}
        generation={meetingInfo.generation}
        className="flex min-w-[700px] px-4 pt-2 pb-4 bg-white mx-5 border-[#EAE5E2] border-b-2"
      />

      <TopicPreviewSection
        previews={topics.slice(0, 4)}
        onMoreClick={handleMoreTopics}
      />

      {teams.map((team) => (
        <TeamTopicSection
          key={team.teamNumber}
          teamNumber={team.teamNumber}
          topics={team.topics.slice(0, 4)}
          onViewAllClick={() => handleViewAllTeamTopics(team)}
        />
      ))}
    </div>
  );
};

export default MeetingDetailPage;
