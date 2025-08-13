import { useQuery } from '@tanstack/react-query';
import { getGeneralNoticeDetail } from '../../apis/clubAnnouncements/clubNoticeApi';
import type { generalNoticeItemDto } from '../../types/clubNotice';

export function useGeneralNoticeDetail(clubId: number, noticeId: number) {
  return useQuery<generalNoticeItemDto, Error>({
    queryKey: ['generalNoticeDetail', clubId, noticeId],
    queryFn: () => getGeneralNoticeDetail(clubId, noticeId),
    enabled: clubId > 0 && noticeId > 0,
    staleTime: 1000 * 60 * 5,
  });
}


