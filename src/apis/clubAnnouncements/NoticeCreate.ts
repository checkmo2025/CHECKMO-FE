import { axiosInstance } from '../axiosInstance';
import type { CreateVoteRequest,CreateNoticeRequest, VoteCreateResponseResult, NoticeCreateResponseResult } from '../../types/Notice/clubNoticeCreate';

export function NoticeCreateVote(req: CreateVoteRequest,clubId: string):Promise<VoteCreateResponseResult> {
  const { title, important, item1, item2, item3, item4, item5, anonymity, duplication, startTime, deadline } = req;
  const payload: Record<string, any> = {
    title,
    important,
    item1,
    item2,
    ...(item3 && { item3 }), 
    ...(item4 && { item4 }),
    ...(item5 && { item5 }),
    anonymity,
    duplication,
    startTime,
    deadline,
   
  };

  return axiosInstance.post(`/clubs/${clubId}/notices/votes`, payload);
}


export function NoticeCreateNotice(req: CreateNoticeRequest,  clubId: string): Promise<NoticeCreateResponseResult> {
  const {title,content,important} = req;
  return axiosInstance.post(`/clubs/${clubId}/notices`,{
      title: title,
      content : content,
      important : important,
  })
}