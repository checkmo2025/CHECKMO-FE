import type { ClubGenerationDto } from "../../types/clubMeeting";
import { DummyMeetingList } from "./DummyMeetingList";
import { MeetingCard } from "../../components/Meeting/MeetingCard";

const MeetingListPage = () => {
  const { generations } = DummyMeetingList.result;
  // 무한 스크롤 커스텀 훅이 들어올 예정
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* 추후에 헤더가 들어 갈 자리 */}
      <h1 className="text-2xl font-bold">모임</h1>

      {generations.map((group: ClubGenerationDto) => (
        <section key={group.generation}>
          <h2 className="text-xl font-semibold mb-4">{group.generation}기</h2>
          <div className="space-y-4">
            {group.meetings.map((meeting) => (
              <MeetingCard
                key={meeting.meetingId}
                meeting={meeting}
                generation={group.generation}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default MeetingListPage;
