import { useQuery } from '@tanstack/react-query';
import { getVoteNoticeDetail } from '../../apis/clubAnnouncements/clubNoticeApi';
import type { voteNoticeItemDto } from '../../types/clubNotice';

export function useVoteNoticeDetail(clubId: number, noticeId: number) {
  return useQuery<voteNoticeItemDto, Error>({
    queryKey: ['voteNoticeDetail', clubId, noticeId],
    queryFn: () => getVoteNoticeDetail(clubId, noticeId),
    enabled: clubId > 0 && noticeId > 0,
    staleTime: 1000 * 60 * 5,
  });
}


