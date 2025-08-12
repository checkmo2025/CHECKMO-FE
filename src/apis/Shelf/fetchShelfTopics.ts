import { axiosInstance } from '../axiosInstance';
import type { TopicListRequest, TopicListResponseResult, TopicCreateRequest, TopicCreateResponseResult, TopicUpdateRequest, TopicUpdateResponseResult } from '../../types/Shelf/Shelftopics';

//
export function fetchShelfTopics( req : TopicListRequest ): Promise<TopicListResponseResult> {
  const { meetingId, cursorId, size } = req;
  return axiosInstance.get(`/meetings/${meetingId}/topics`,{ 
    params: { cursorId, size },
  });
}

export function createShelfTopic(meetingId: number, req: TopicCreateRequest): Promise<TopicCreateResponseResult> {
  return axiosInstance.post(
    `/meetings/${meetingId}/topics`,
    {description: req.description }
  );
}

export function updateShelfTopic(meetingId: number, req: TopicUpdateRequest): Promise<TopicUpdateResponseResult> {
   const {topicId, description} = req;
   return axiosInstance.patch(
    `/meetings/${meetingId}/topics/${topicId}`,
    {description: description}
  );
}

export function deleteShelfTopic(meetingId: number, topicId : number): Promise<null>{
  return axiosInstance.delete(`/meetings/${meetingId}/topics/${topicId}`).then(() => null);
}