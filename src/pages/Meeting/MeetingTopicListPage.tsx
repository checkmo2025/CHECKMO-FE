import { useLocation } from "react-router-dom";
import { TopicPreviewSection } from "../../components/Meeting/TopicPreviewSection";
import { NonProfileHeader } from "../../components/NonProfileHeader";
import type { Topic } from "../../types/clubMeeting";
import { format, parseISO } from "date-fns";

const MeetingTopicListPage = () => {
  const location = useLocation();
  const { date, bookTitle, topics } = location.state as {
    date: string;
    bookTitle: string;
    topics: Topic[];
  };
  const dateStr = format(parseISO(date), "yyyy.MM.dd");

  const title = `${dateStr} | ${bookTitle}`;
  return (
    <div className="mx-auto px-10 space-y-10">
      <NonProfileHeader title={title} />

      <TopicPreviewSection previews={topics} />
    </div>
  );
};

export default MeetingTopicListPage;
