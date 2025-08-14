import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBookStories } from "../../apis/BookStory/bookstories";
import type { BookStoriesResult } from "../../types/bookStories";


export const useMyBookStories = () => {
  return useInfiniteQuery<BookStoriesResult, Error>({
    queryKey: ["bookStories", "MY"],
    queryFn: ({ pageParam = undefined }) =>
      fetchBookStories({
        scope: "MY",
        cursorId: pageParam as number | null | undefined,
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: undefined,
    staleTime: 0, // 돌아올 때마다 호출
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};
