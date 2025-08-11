import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { TopicUpdateRequest, TopicUpdateResponseResult, TopicListRequest, TopicListResponseResult } from '../../types/Shelf/Shelftopics';
import { buildTopicKey } from '../../types/Shelf/Shelftopics';
import { updateShelfTopic } from "../../apis/Shelf/fetchShelfTopics";
;

export function useTopicUpdate(req: TopicListRequest) {
  const qc = useQueryClient();

return useMutation<TopicUpdateResponseResult, Error, TopicUpdateRequest,  { previousData?: InfiniteData<TopicListResponseResult>}>({
  mutationFn: (TopicUpdateRequest) => updateShelfTopic(req.meetingId, TopicUpdateRequest),

  onMutate: async (updatedTopic) => {
      const key = buildTopicKey({ meetingId: req.meetingId, size: req.size });
      await qc.cancelQueries({ queryKey: key });
  
      // 캐시 데이터 보관 (롤백용)
      const previousData = qc.getQueryData<InfiniteData<TopicListResponseResult>>(key);

      qc.setQueryData<InfiniteData<TopicListResponseResult>>(key, old => {
              if (!old) return old;
              return {
                ...old,
                pages: old.pages.map(page => ({
                  ...page,
                  topics: page.topics.map(topic =>
                    topic.topicId === updatedTopic.topicId
                      ? { ...topic, description: updatedTopic.description }
                      : topic
                  ),
                })),
              };
            });
      
            return { previousData };
      },
      onError: (_error, _newReview, context) => {
            qc.setQueryData(buildTopicKey({ meetingId: req.meetingId, size: req.size }), context?.previousData);
      },
      onSettled: () => {
          qc.invalidateQueries({ queryKey: buildTopicKey({ meetingId: req.meetingId, size: req.size }) });
      },
  });
}