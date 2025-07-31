import MeetingCard from "./MeetingCard";
import VoteCard from "./VoteCard";
import AnnouncementCard from "./AnnouncementCard";

interface NoticeCardProps {
  title: string;
  date: string;
  book: string;
  type: "모임" | "투표" | "공지";
  imageUrl: string;
  content: string;
}

const NoticeCard = (props: NoticeCardProps) => {
  switch (props.type) {
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
