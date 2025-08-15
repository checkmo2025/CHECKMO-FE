import { useMutation, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import type { ClubMemberStatus } from '../../types/Club/ClubMemberUpdate';
import { updateMemberGrade } from '../../apis/BookClub/ClubMembergrade';
import type { ClubMembersPage } from '../../types/Club/GetClubMembers';

export function useUpdateMemberGrade(clubId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ memberId, status }: { memberId: number; status: ClubMemberStatus }) =>
      updateMemberGrade(clubId, memberId, status),


    onMutate: async (variables) => {
      const { status: nextStatus, memberId } = variables;
      await qc.cancelQueries({ queryKey: ['getMembers', clubId], exact: false });
      const snapshots = qc.getQueriesData<InfiniteData<ClubMembersPage>>({
        queryKey: ['getMembers', clubId],
        exact: false,
      });

      // 3) 캐시 즉시 패치 (무한스크롤 페이지 전부 순회)
      snapshots.forEach(([key, data]) => {
        if (!data) return;
        const patched: InfiniteData<ClubMembersPage> = {
          pageParams: data.pageParams,
          pages: data.pages.map((page) => ({
            ...page,
            clubMembers: page.clubMembers.map((m) =>
              m.clubMemberId === memberId ? { ...m, clubMemberStatus: nextStatus } : m
            ),
          })),
        };
        qc.setQueryData(key, patched);
      });

      // 4) 롤백용 컨텍스트 반환
      return { snapshots };
    },

    // 실패하면 롤백
    onError: (_err, _vars, ctx) => {
      ctx?.snapshots?.forEach(([key, snapshot]) => {
        qc.setQueryData(key, snapshot);
      });
    },

    // 성공/실패와 무관하게 최종 동기화
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['getMembers', clubId], exact: false });
    },
  });
}