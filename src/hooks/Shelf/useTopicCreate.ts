import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShelfTopic } from "../../apis/Shelf/fetchShelftopics";
import type { TopicCreateRequest, TopicCreateResponseResult,TopicListRequest } from "../../types/Shelf/Shelftopics";

export function useTopicCreate(req: TopicListRequest) {
  const qc = useQueryClient();

  return useMutation<
  TopicCreateResponseResult, 
  Error,
  TopicCreateRequest
  >({
    mutationFn: (TopicCreateRequest) => createShelfTopic(req.meetingId, TopicCreateRequest),
    onSuccess: () => {
      // 생성이 성공하면, 발제 목록을 리패치
      qc.invalidateQueries({
        queryKey: ["topicList", req],
      });
    },
  });
}
