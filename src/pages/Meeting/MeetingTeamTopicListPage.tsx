import { useLocation, useParams } from "react-router-dom";
import type { Topic } from "../../types/clubMeeting";
import { format, parseISO } from "date-fns";
import { NonProfileHeader } from "../../components/NonProfileHeader";
import { TeamTopicSection } from "../../components/Meeting/TeamTopicSection";
import TeamTopicParticipant from "../../components/Meeting/TeamTopicParticipant";

const MeetingTeamTopicListPage = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const location = useLocation();
  const { date, bookTitle, topics } = location.state as {
    date: string;
    bookTitle: string;
    teamNumber: number;
    topics: Topic[];
  };
  const dateStr = format(parseISO(date), "yyyy.MM.dd");
  const title = `${dateStr} | ${bookTitle}`;

  const participants = [
    { memberId: 1, nickName: "oz", imgUrl: "userImage.png" },
    { memberId: 2, nickName: "ojh", imgUrl: "userImage.png" },
    { memberId: 3, nickName: "returntooz", imgUrl: "userImage.png" },
    { memberId: 4, nickName: "re", imgUrl: "userImage.png" },
    { memberId: 5, nickName: "turnto", imgUrl: "userImage.png" },
    { memberId: 6, nickName: "ozi", imgUrl: "userImage.png" },
  ];
  return (
    <div className="w-full px-10 space-y-10">
      <NonProfileHeader title={title} />
      <div className="flex flex-row space-x-10">
        <div className="flex-1">
          <TeamTopicSection teamNumber={parseInt(teamId!)} topics={topics} />
        </div>
        <div className="flex-0">
          <TeamTopicParticipant
            teamName={teamId!}
            participants={participants}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingTeamTopicListPage;
