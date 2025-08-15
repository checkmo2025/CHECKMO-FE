import MeetingCard from "./MeetingCard";
import VoteCard from "./VoteCard";
import AnnouncementCard from "./AnnouncementCard";

interface NoticeCardProps {
  id: number;
  title: string;
  date: string;
  book: string;
  tag: "모임" | "투표" | "공지";
  imgUrl: string;
  content: string;
  meetingPlace?: string;
  afterPartyPlace?: string;
}

const NoticeCard = (props: NoticeCardProps) => {
  switch (props.tag) {
    case "모임":
      return <MeetingCard {...props} />;
    case "투표":
      return <VoteCard {...props} />;
    case "공지":
      return <AnnouncementCard {...props} />;
    default:
      return null;
  }
};

export default NoticeCard;
