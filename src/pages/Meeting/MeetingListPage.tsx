import { MeetingCard } from "../../components/Meeting/MeetingCard";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useMeetingList } from "../../hooks/useClubMeeting";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import type { ClubMeeting } from "../../types/clubMeeting";

const MeetingListPage = () => {
  const isAdmin = true; // 추후에 로그인 정보로 변경 예정
  const { bookclubId } = useParams<{ bookclubId: string }>();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useMeetingList(Number(bookclubId));
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const generations = useMemo(() => {
    if (!data) return [];
    const meetings = data.pages.flatMap((page) => page.meetingInfoList);
    const groupedMeetings = meetings.reduce((acc, meeting) => {
      const generation = meeting.generation;
      if (!acc[generation]) {
        acc[generation] = [];
      }
      acc[generation].push(meeting);
      return acc;
    }, {} as Record<number, ClubMeeting[]>);

    return Object.keys(groupedMeetings)
      .map((generation) => ({
        generation: Number(generation),
        meetings: groupedMeetings[Number(generation)],
      }))
      .sort((a, b) => a.generation - b.generation);
  }, [data]);

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="px-10 space-y-10 min-h-screen">
      <Header
        pageTitle={"모임"}
        userProfile={{
          username: "오즈",
          bio: "re_turnto_oz",
        }}
        notifications={[]}
        customClassName="mt-[30px]"
      />

      {isAdmin && (
        <Link
          to="create"
          className="flex w-[204px] h-[48px] bg-[#F6F3F0] rounded-[100px] ml-auto py-[10px] px-5"
        >
          <div className="flex justify-center items-center gap-2 w-full">
            <img
              src="/assets/ic_round-plus.svg"
              alt="모임 추가 아이콘"
              className="w-7 h-7"
            />
            <span className="text-[#2C2C2C] text-[18px] font-semibold">
              모임 추가하기
            </span>
          </div>
        </Link>
      )}

      {generations.map((group) => (
        <section key={group.generation}>
          <h2 className="text-xl font-semibold mb-3">{group.generation}기</h2>
          <div className="flex flex-col space-y-3">
            {group.meetings.map((meeting) => (
              <Link
                key={meeting.meetingId}
                to={`/bookclub/${bookclubId}/meeting/${meeting.meetingId}`}
              >
                <MeetingCard
                  title={meeting.title}
                  book={meeting.bookInfo}
                  meetingDate={meeting.meetingTime}
                  meetingPlace={meeting.location}
                  tags={meeting.tag}
                  generation={group.generation}
                />
              </Link>
            ))}
          </div>
        </section>
      ))}
      <div ref={ref} style={{ height: "20px" }}>
        {isFetchingNextPage && "Loading more..."}
      </div>
    </div>
  );
};

export default MeetingListPage;
