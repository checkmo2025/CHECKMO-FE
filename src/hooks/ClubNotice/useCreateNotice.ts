import { useMutation } from '@tanstack/react-query';
import { NoticeCreateNotice } from '../../apis/clubAnnouncements/NoticeCreate';
import type { NoticeCreateResponseResult, CreateNoticeRequest } from '../../types/Notice/clubNoticeCreate';

export function useCreateNotice(clubId: string) {
  return useMutation<NoticeCreateResponseResult, Error, CreateNoticeRequest>({
    mutationFn: (req) => NoticeCreateNotice(req, clubId),
  });
}
