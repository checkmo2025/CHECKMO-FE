import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getBookRecommends,
  getBookRecommendDetail,
} from "../apis/BookRecommend/recommendApi";

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
