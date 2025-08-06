import { useQuery } from "@tanstack/react-query";
import { fetchShelfTopics } from "../../apis/Shelf/fetchShelftopics";
import type { TopicListRequest ,TopicListResponseResult } from '../../types/Shelf/Shelftopics';

export function useTopicList(req: TopicListRequest) {

  return useQuery<TopicListResponseResult, Error>({
    queryKey: ["topicList", req],
    queryFn:  () => fetchShelfTopics(req),
    enabled:  Boolean(req.meetingId),
    staleTime: 1000 * 60 * 5, // 5분
  });
}