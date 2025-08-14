import { useParams } from "react-router-dom";
import MeetingManageView from "../../components/Meeting/MeetingManageView";

export default function DetailMeetingManagePage() {
  const { meetingId: idParam, meetingTitle: titleParam } =
    useParams<{ meetingId?: string; meetingTitle?: string }>();
  
  const meetingId = Number(idParam) || 1;
  const meetingTitle = titleParam || "모임제목";

  return <MeetingManageView meetingId={meetingId} meetingTitle={meetingTitle} />;
}