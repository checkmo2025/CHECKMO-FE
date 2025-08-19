import { useInfiniteQuery } from "@tanstack/react-query";
import type { InfiniteData } from "@tanstack/react-query";
import { getMyFollower, getMyFollowing } from "../../apis/My/memberApi";
import type { FollowResponse } from "../../types/My/member";

export const useMyFollowerInfinite = () => {
  return useInfiniteQuery<
    FollowResponse,            // 한 페이지 타입
    Error,                     // 에러 타입
    InfiniteData<FollowResponse>, // 전체 데이터 타입 (pages 있음)
    ["myFollower"],            // queryKey 타입
    number | null              // pageParam 타입
  >({
    queryKey: ["myFollower"],
    queryFn: ({ pageParam = null }) =>
      getMyFollower(pageParam as number | null),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });
};

export const useMyFollowingInfinite = () => {
  return useInfiniteQuery<
    FollowResponse,
    Error,
    InfiniteData<FollowResponse>,
    ["myFollowing"],
    number | null
  >({
    queryKey: ["myFollowing"],
    queryFn: ({ pageParam = null }) =>
      getMyFollowing(pageParam as number | null),
    initialPageParam: null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
  });
};