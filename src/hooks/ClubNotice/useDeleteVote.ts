import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVoteNotice } from '../../apis/clubAnnouncements/clubNoticeApi';
import type { DeleteVoteResult } from '../../types/clubNotice';

export function useDeleteVote(clubId: number) {
  const qc = useQueryClient();

  return useMutation<DeleteVoteResult, Error, number>({
    mutationFn: (voteId: number) => deleteVoteNotice(clubId, voteId),
    onSuccess: async () => {
      // 공지 리스트 갱신
      await qc.invalidateQueries({ queryKey: ['clubNotices', clubId] });
      await qc.invalidateQueries({ queryKey: ['clubNotices', 'infinite', clubId] });
    },
  });
}


