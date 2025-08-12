import { useInfiniteQuery} from "@tanstack/react-query";
import { fetchShelfTopics } from "../../apis/Shelf/fetchShelfTopics";
import type { TopicListRequest, TopicListResponseResult } from '../../types/Shelf/Shelftopics';
import { buildTopicKey } from '../../types/Shelf/Shelftopics';

export function useTopicInfinite(req: Omit<TopicListRequest, 'cursorId'>) {
  return useInfiniteQuery<TopicListResponseResult, Error>({
    queryKey: buildTopicKey(req),
    queryFn: ({ pageParam = null }) =>
    fetchShelfTopics({ ...req, cursorId: pageParam as number | null }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor || null, // nextCursor
  });
}

