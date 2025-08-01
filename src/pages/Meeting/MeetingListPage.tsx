import type { ClubGenerationDto } from "../../types/clubMeeting";
import { DummyMeetingList } from "./DummyMeetingList";
import { MeetingCard } from "../../components/Meeting/MeetingCard";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
const MeetingListPage = () => {
  const isAdmin = true; // 추후에 로그인 정보로 변경 예정
  const { bookclubId } = useParams();
  const { generations } = DummyMeetingList.result;
  // 무한 스크롤 커스텀 훅이 들어올 예정
  return (
    <div className="min-h-screen ml-13 mr-11">
      {/* 추후에 헤더가 들어 갈 자리 */}
      <Header pageTitle={'모임'} userProfile={{
          username: 'oz',
          bio: '자기 소개!!'
        }} 
        notifications={[]}
        customClassName="mt-18 mb-9"
        />

      {/* 모임 추가 */}
      {isAdmin && (
        <Link to="create" className="flex w-[204px] h-[48px] bg-[#F6F3F0] rounded-[100px] ml-auto py-[10px] px-5" >
          <div className = "flex justify-center items-center gap-2 w-full">
            <img src="/assets/ic_round-plus.svg" alt="모임 추가 아이콘" className="w-7 h-7" />
            <span className="text-[#2C2C2C] text-[18px] font-semibold">모임 추가하기</span>
          </div>
        </Link>
      )}

      {generations.map((group: ClubGenerationDto) => (
        <section key={group.generation} className="mb-9">
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
