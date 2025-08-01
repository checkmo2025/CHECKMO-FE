import type { ClubGenerationDto } from "../../types/clubMeeting";
import { DummyMeetingList } from "./DummyMeetingList";
import { MeetingCard } from "../../components/Meeting/MeetingCard";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";

const MeetingListPage = () => {
  const { bookclubId } = useParams();
  const { generations } = DummyMeetingList.result;
  // 무한 스크롤 커스텀 훅이 들어올 예정
  return (
    <div className="space-y-8 p-6 min-h-screen">
      <Header
        pageTitle={"추천 도서 목록"}
        userProfile={{
          username: "오즈",
          bio: "re_turnto_oz",
        }}
        notifications={[]}
        customClassName="mx-3 my-5"
      />

      {generations.map((group: ClubGenerationDto) => (
        <section key={group.generation}>
          <h2 className="text-xl font-semibold mb-4">{group.generation}기</h2>
          <div className="space-y-4">
            {group.meetings.map((meeting) => (
              <Link
                key={meeting.meetingId}
                to={`/bookclub/${bookclubId}/meeting/${meeting.meetingId}`}
              >
                <MeetingCard meeting={meeting} generation={group.generation} />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MeetingListPage;
