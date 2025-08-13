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
  deleteBookRecommend,
  postBookRecommend,
  getBookDetail,
} from "../apis/BookRecommend/recommendApi";
import type {
  UpdateRecommendDto,
  PostRecommendDto,
} from "../types/bookRecommend";


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
      queryClient.invalidateQueries({
        queryKey: ["recommendDetail", clubId, recommendId],
      });
      queryClient.invalidateQueries({ queryKey: ["bookRecommends", clubId] });
    },
  });
};

export const useDeleteRecommend = (clubId: number, recommendId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteBookRecommend(clubId, recommendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookRecommends", clubId] });
    },
    onError: (error) => {
      // 전역 에러 처리 모달로 교체하는 것을 권장합니다.
      console.error("삭제 실패: ", error);
    },
  });
};

export const useGetBookInfo = (isbn: string) => {
  return useQuery({
    queryKey: ["BookInfo", isbn],
    queryFn: () => getBookDetail(isbn),
    enabled: !!isbn,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateRecommend = (clubId: number) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, PostRecommendDto>({
    mutationFn: (data: PostRecommendDto) => postBookRecommend(clubId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookRecommends", clubId] });
    },
    onError: (error) => {
      // 나중에 전역 에러 처리 모달로 교체하면 더 좋습니다.
      alert("등록 실패: " + error.message);
    },
  });
};
