import { useQuery } from '@tanstack/react-query';
import { getMeetingNoticeDetail } from '../../apis/clubAnnouncements/clubNoticeApi';
import type { meetingInfoDto } from '../../types/clubNotice';

export function useMeetingNoticeDetail(clubId: number, noticeId: number) {
  return useQuery<meetingInfoDto, Error>({
    queryKey: ['meetingNoticeDetail', clubId, noticeId],
    queryFn: () => getMeetingNoticeDetail(clubId, noticeId),
    enabled: clubId > 0 && noticeId > 0,
    staleTime: 1000 * 60 * 5,
  });
}


