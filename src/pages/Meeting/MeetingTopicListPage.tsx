import { useParams, useLocation } from "react-router-dom";
import { TopicPreviewSection } from "../../components/Meeting/TopicPreviewSection";
import { NonProfileHeader } from "../../components/NonProfileHeader";
import { useGetMeetingTopics } from "../../hooks/useClubMeeting";
import { format, parseISO } from "date-fns";

const MeetingTopicListPage = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const location = useLocation();
  const { title, meetingTime } = (location.state as { title: string; meetingTime: string }) || {};

  const meetId = Number(meetingId ?? 0);
  const date = parseISO(meetingTime);
  const dateStr = format(date, "yyyy.MM.dd");

  const { data: topicsResult, isLoading: areTopicsLoading } =
    useGetMeetingTopics(meetId);

  if (areTopicsLoading) {
    return <div>Loading...</div>;
  }

  if (!topicsResult) {
    return <div>Error: Could not fetch meeting data.</div>;
  }

  const topics = topicsResult.topics;

  return (
    <div className="mx-auto px-10 space-y-5">
      <NonProfileHeader title={dateStr + " | " + title} />
      <TopicPreviewSection previews={topics} />
    </div>
  );
};

export default MeetingTopicListPage;
