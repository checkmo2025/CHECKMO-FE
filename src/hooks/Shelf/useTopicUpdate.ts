import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { TopicUpdateRequest, TopicUpdateResponseResult, TopicListRequest } from '../../types/Shelf/Shelftopics';
import { updateShelfTopic } from "../../apis/Shelf/fetchShelftopics";

export function useTopicUpdate(req: TopicListRequest) {
  const qc = useQueryClient();

  return useMutation<
    TopicUpdateResponseResult,             
    Error,                                  
    TopicUpdateRequest
  >({
    mutationFn: (TopicUpdateRequest) => updateShelfTopic(req.meetingId, TopicUpdateRequest),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["topicList", req],
      });
    },
  });
}