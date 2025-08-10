import { useMutation, useQueryClient, type InfiniteData} from '@tanstack/react-query';
import { createShelfTopic } from '../../apis/Shelf/fetchShelfTopics';
import type {TopicCreateRequest, TopicCreateResponseResult, TopicListRequest, TopicItem, TopicListResponseResult, CreateParams} from '../../types/Shelf/Shelftopics';
import { buildTopicKey } from '../../types/Shelf/Shelftopics';

export function useTopicCreate({ meetingId, size, currentUser } : CreateParams){
  const qc = useQueryClient();

  return useMutation<  TopicCreateResponseResult,  Error,  TopicCreateRequest, { previousData?: InfiniteData<TopicListResponseResult> }>({
    mutationFn: (TopicCreateRequest) => createShelfTopic(meetingId, TopicCreateRequest),

    onMutate: async (newTopic) => {
      const key = buildTopicKey({meetingId, size});
      await qc.cancelQueries({ queryKey: key });

      const previousData =
        qc.getQueryData<InfiniteData<TopicListResponseResult>>(key);

      let tempId: number = 0;
      const firstItem = previousData?.pages?.[0]?.topics?.[0];
      if (firstItem) {
        tempId = firstItem.topicId + 1;
      } else {
        tempId = 0;
      }

      const tempTopic: TopicItem = {
        topicId: tempId,
        content: newTopic.description,
        authorInfo: {
          nickname: currentUser.nickname,
          profileImageUrl: currentUser.profileImageUrl,
        },
        author: false
      };

      qc.setQueryData(buildTopicKey({ meetingId, size }),(old: InfiniteData<TopicListResponseResult>) => {
          return { ...old, pages: [{ ...old.pages[0], topics: [tempTopic, ...old.pages[0].topics] }, ...old.pages.slice(1)] };
        },
      );

      return { previousData };
    },

    onError: (_error, _newTopic, context) => {
      qc.setQueryData(buildTopicKey({meetingId, size}), context?.previousData);
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: buildTopicKey({meetingId, size}) });
    },
  });
}
