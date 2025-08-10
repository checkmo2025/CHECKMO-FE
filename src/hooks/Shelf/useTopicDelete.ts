import { useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import { deleteShelfTopic } from "../../apis/Shelf/fetchShelfTopics";
import {buildTopicKey, type TopicListRequest, type TopicListResponseResult} from '../../types/Shelf/Shelftopics';

export function useTopicDelete(req: TopicListRequest) {
  const qc = useQueryClient();
  
  return useMutation<null, Error, number, { previousData: InfiniteData<TopicListResponseResult> | undefined }>({
    mutationFn: (topicId: number) => deleteShelfTopic(req.meetingId, topicId),
    onMutate: async (topicId: number) => {
          const key = buildTopicKey({ meetingId: req.meetingId, size: req.size });
          await qc.cancelQueries({ queryKey: key });

         const previousData = qc.getQueryData<InfiniteData<TopicListResponseResult>>(key);

         qc.setQueryData<InfiniteData<TopicListResponseResult>>(key, (old) => {
          if (!old) return old; 
          return { ...old, pages: old.pages.map((page) => ({ ...page, topics: page.topics.filter((t) => t.topicId !== topicId), })), }; });

          return { previousData };
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

