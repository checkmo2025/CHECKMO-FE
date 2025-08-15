import MeetingCard from "./MeetingCard";
import VoteCard from "./VoteCard";
import AnnouncementCard from "./AnnouncementCard";
import type { NoticeDto } from "../../../types/mainNotices";

interface NoticeCardProps {
  notice: NoticeDto;
}

const NoticeCard = ({ notice }: NoticeCardProps) => {
  switch (notice.tag) {
    case "모임":
      return <MeetingCard notice={notice} />;
    case "투표":
      return <VoteCard notice={notice} />;
    case "공지":
      return <AnnouncementCard notice={notice} />;
    default:
      return null;
  }
};

export default NoticeCard;
