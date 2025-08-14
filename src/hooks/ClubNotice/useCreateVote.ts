import { useMutation } from '@tanstack/react-query';
import { NoticeCreateVote } from '../../apis/clubAnnouncements/NoticeCreate';
import type { VoteCreateResponseResult, CreateVoteRequest } from '../../types/Notice/clubNoticeCreate';

export function useCreateVote(clubId: string) {
  return useMutation<VoteCreateResponseResult, Error, CreateVoteRequest>({
    mutationFn: (req) => NoticeCreateVote(req, clubId),
  });
}