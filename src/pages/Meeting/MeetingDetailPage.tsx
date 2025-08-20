import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { TeamTopic, Topic } from "../../types/clubMeeting";
import { MeetingCard } from "../../components/Meeting/MeetingCard";
import { TopicPreviewSection } from "../../components/Meeting/TopicPreviewSection";
import { TeamTopicSection } from "../../components/Meeting/TeamTopicSection";
import { NonProfileHeader } from "../../components/NonProfileHeader";
import { useMeetingDetail } from "../../hooks/useClubMeeting";

const MeetingDetailPage = () => {
  const navigate = useNavigate();
  const { meetingId } = useParams<{ meetingId: string }>();
  const { data, isLoading, isError } = useMeetingDetail(Number(meetingId));

  const title = data?.meetingInfo.bookInfo?.title ?? "";
  const meetingTime = data?.meetingInfo?.meetingTime ?? "";

  const handleMoreTopics = useCallback(() => {
    navigate("topics", {
      state: {
        title: title,
        meetingTime: meetingTime,
      },
    });
  }, [navigate, title, meetingTime]);

  const handleViewAllTeamTopics = useCallback(
    (team: TeamTopic) => {
      navigate(`teamTopic/${team.teamNumber}`, {
        state: {
          title: title,
          meetingTime: meetingTime,
        },
      });
    },
    [navigate, title, meetingTime]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>모임 정보를 불러오는데 실패했습니다.</div>;
  }

  const { meetingInfo, teams, topics } = data;

  // 최소 2개의 팀 섹션이 보이도록! (A, B 조 형태)
  const displayTeams: TeamTopic[] = (() => {
    if (!teams || teams.length === 0) {
      return [
        { teamNumber: 1, topics: [] as Topic[] },
        { teamNumber: 2, topics: [] as Topic[] },
      ];
    }
    // 팀이 1개뿐이면 한 섹션 더 채워서 보여줌
    else if (teams.length === 1) {
      return [...teams, { teamNumber: teams[0].teamNumber + 1, topics: [] as Topic[] }];
    }
    return teams;
  })();

  return (
    <div className="mx-auto px-10">
      <NonProfileHeader title={meetingInfo.title} />
      <section className="space-y-10">
        <div className="relative min-w-[700px]">
          <MeetingCard
            book={meetingInfo.bookInfo}
            meetingDate={meetingInfo.meetingTime}
            meetingPlace={meetingInfo.location}
            tags={meetingInfo.tag}
            generation={meetingInfo.generation}
            className="flex w-full min-w-[700px] px-4 pt-2 pb-8 bg-white mx-5 truncate"
          />
          <hr className="h-[2px] bg-[#EAE5E2] border-0" />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("manage", {
                state: {
                  meetingTitle: meetingInfo.title,
                },
              });
            }}
            className="absolute right-4 bottom-5 text-[#8D8D8D] text-xs font-medium underline underline-offset-2 hover:text-[#907E66] cursor-pointer select-none"
          >
            조 관리하기
          </a>
        </div>

        <div className="min-w-[700px]">
          <TopicPreviewSection
            previews={topics.slice(0, 4)}
            onMoreClick={handleMoreTopics}
          />
        </div>
        <hr className="h-[1px] bg-[#EAE5E2] border-0" />

        {displayTeams.map((team) => (
          <div key={team.teamNumber} className="min-w-[700px]">
            <TeamTopicSection
              teamNumber={team.teamNumber}
              topics={(team.topics ?? []).slice(0, 4)}
              onViewAllClick={() => handleViewAllTeamTopics(team)}
            />
            <hr className="h-[1px] bg-[#EAE5E2] border-0" />
          </div>
        ))}
      </section>
    </div>
  );
};

export default MeetingDetailPage;
