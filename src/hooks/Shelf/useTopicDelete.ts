import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShelfTopic } from "../../apis/Shelf/fetchShelftopics";
import type {TopicListRequest, TopicListResponseResult} from '../../types/Shelf/Shelftopics';

export function useTopicDelete(req: TopicListRequest) {
  const qc = useQueryClient();
  
  return useMutation<
    null,
    Error,
    number
    >({
    mutationFn: (topicId: number) => deleteShelfTopic(req.meetingId, topicId),
    // 낙관적 업데이트
    onMutate : async (topicId) => {
      await qc.cancelQueries({ queryKey: ["topicList", req] });
      const previous = qc.getQueryData(["topicList", req]);

      qc.setQueryData<TopicListResponseResult>(["topicList", req], (old) => {
        if (!old) return old;
        return {
          ...old,
          topics: old.topics.filter((t) => t.topicId !== topicId),
        };
      });
      return { previous };
    },

    onError: (_err,  context) => {
      if (context) {
        qc.setQueryData(["topicList", req] , context);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({
        queryKey: ["topicList", req],
      });
    },
  });
}