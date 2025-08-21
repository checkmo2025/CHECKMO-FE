import { useInfiniteQuery } from "@tanstack/react-query";
import { getMyClubs } from "../../apis/My/memberApi";
import type { ClubResponse } from "../../types/My/member";


export function useMyClubsInfinite() {
  return useInfiniteQuery<ClubResponse, Error>({
    queryKey: ["my", "clubs"],

    queryFn: ({ pageParam = null }) => {
      const requestParams = pageParam as number | null;
      console.log("🏷️ MyClubs API 요청:", requestParams);
      return getMyClubs(requestParams);
    },

    initialPageParam: null,

    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,

    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
}