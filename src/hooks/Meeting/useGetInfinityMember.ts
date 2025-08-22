import { useInfiniteQuery } from '@tanstack/react-query';
import type { GetMeetingMembersResult } from '../../types/Meeting/GetmeetingMember';
import { getMeetingMembers } from '../../apis/clubMeeting/GetmeetingMember';


const qk = {
  meetingMembers: (meetingId: number, size: number) =>
    ['meetingMembers', meetingId, size] as const,
};

export function useGetInfinityMember(meetingId: number, size = 15) {
  return useInfiniteQuery<GetMeetingMembersResult, Error>({
    queryKey: qk.meetingMembers(meetingId, size),
    queryFn: ({ pageParam }) => {
      const cursor = (pageParam ?? null) as number | null;
      return getMeetingMembers({ meetingId, cursorId: cursor, size });
    },
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    select: (data) => {
      const flatMembers = data.pages.flatMap(p => p.members);
      const membership = data.pages[0]?.membership;
      return { ...data, flatMembers, membership };
    },
    staleTime: 30_000,
    gcTime: 5 * 60_000,
  });
}
