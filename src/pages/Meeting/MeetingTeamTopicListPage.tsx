import { useLocation, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { NonProfileHeader } from "../../components/NonProfileHeader";
import { TeamTopicSection } from "../../components/Meeting/TeamTopicSection";
import TeamTopicParticipant from "../../components/Meeting/TeamTopicParticipant";
import { useGetMeetingTeamMember, useGetMeetingTeamTopic } from "../../hooks/useClubMeeting";

const MeetingTeamTopicListPage = () => {
  const { meetingId, teamId } = useParams<{ meetingId: string, teamId: string }>();
  const location = useLocation();
  const { title, meetingTime } = (location.state as { title: string; meetingTime: string }) || {};
  const dateStr = format(parseISO(meetingTime), "yyyy.MM.dd");
  const headerTitle = `${dateStr} | ${title}`;

  const meetId = Number(meetingId ?? 0);
  const tId = Number(teamId ?? 0);
  const { data: teamTopicResult, isLoading: isTopicLoading } =
    useGetMeetingTeamTopic(meetId, tId);

  const { data: teamMemberResult, isLoading: isMemeberLoading } =
    useGetMeetingTeamMember(meetId, tId);

  if (isMemeberLoading || isTopicLoading) {
    return <div>Loading...</div>;
  }

  if (!teamTopicResult) {
    return <div>Error: Could not fetch teamTopic data.</div>;
  }

  if (!teamMemberResult) {
    return <div>Error: Could not fetch teamMember data.</div>;
  }

  const topics = teamTopicResult.topics;
  const participants = teamMemberResult.members;

  return (
    <div className="w-full px-10 space-y-5 min-w-[900px]">
      <NonProfileHeader title={headerTitle} />
      <div className="flex gap-5 md:gap-8 items-start">
        <div className="flex-1 min-w-0">
          <TeamTopicSection teamNumber={Number(teamId)} topics={topics} />
        </div>

        <div className="shrink-0 basis-[240px]">
          <TeamTopicParticipant
            teamName={Number(teamId)}
            participants={participants}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingTeamTopicListPage;
