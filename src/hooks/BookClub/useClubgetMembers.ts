import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchClubMembers } from '../../apis/BookClub/getClubMembers';
import type { GetClubMembersRequest, GetClubMembersResponseResult}  from '../../types/Club/GetClubMembers';

export function useClubgetMembers(req: Omit<GetClubMembersRequest, 'cursorId'>) {
  return useInfiniteQuery<GetClubMembersResponseResult, Error>({
    queryKey: ['getMembers',req.clubId, req.status, req.size],
    queryFn: ({ pageParam = null }) =>
    fetchClubMembers({ ...req, cursorId: pageParam as number | null }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null, // nextCursor
  });
}