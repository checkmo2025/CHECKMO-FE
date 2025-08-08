import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getBookRecommends,
  getBookRecommendDetail,
  updateBookRecommend,
} from "../apis/BookRecommend/recommendApi";
import type { UpdateRecommendDto } from "../types/bookRecommend";

export const useBookRecommends = (clubId: number) => {
  return useInfiniteQuery({
    queryFn: ({ pageParam }) => getBookRecommends(clubId, pageParam),
    queryKey: ["bookRecommends", clubId],
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};

export const useRecommendDetail = (clubId: number, recommendId: number) => {
  return useQuery({
    queryKey: ["recommendDetail", clubId, recommendId],
    queryFn: () => getBookRecommendDetail(clubId, recommendId),
    enabled: !!recommendId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useEditRecommend = (clubId: number, recommendId: number) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, UpdateRecommendDto>({
    mutationFn: (data: UpdateRecommendDto) =>
      updateBookRecommend(clubId, recommendId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendDetail", clubId, recommendId] });
        queryClient.invalidateQueries({ queryKey: ["bookRecommends", clubId] });
    },
  });
};
