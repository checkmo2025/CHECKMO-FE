import { useQuery } from "@tanstack/react-query";
import { getRecommendDetail, getRecommendList } from "../apis/recommendApi";

export const useRecommendList = (clubId: number) => {
  useQuery({
    queryKey: ["recommendList", clubId],
    queryFn: () => getRecommendList(clubId),
    staleTime: 1000 * 60 * 5,
  });
};

export const useRecommendDetail = (clubId: number, recommendId: number) => {
  useQuery({
    queryKey: ["recommendDetail", clubId, recommendId],
    queryFn: () => getRecommendDetail(clubId, recommendId),
    enabled: !!recommendId,
    staleTime: 1000 * 60 * 5,
  });
};
