import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGeneralNotice } from '../../apis/clubAnnouncements/clubNoticeApi';
import type { DeleteGeneralNoticeResult } from '../../types/clubNotice';

export function useDeleteGeneralNotice(clubId: number) {
  const qc = useQueryClient();

  return useMutation<DeleteGeneralNoticeResult, Error, number>({
    mutationFn: (noticeId: number) => deleteGeneralNotice(clubId, noticeId),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: ['clubNotices', clubId] });
      await qc.invalidateQueries({ queryKey: ['clubNotices', 'infinite', clubId] });
    },
  });
}


