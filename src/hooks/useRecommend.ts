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
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteBookRecommend(clubId, recommendId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookRecommends", clubId] });
      // 공통 모달로 변경하기
      alert("추천 도서가 삭제되었습니다.");
      navigate(`/bookclub/${clubId}/recommend`);
    },
    onError: (error) => {
      alert("삭제 실패: " + error.message);
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
  const navigate = useNavigate();

  return useMutation<unknown, Error, PostRecommendDto>({
    mutationFn: (data: PostRecommendDto) => postBookRecommend(clubId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookRecommends", clubId] });
      alert("추천 도서가 성공적으로 등록되었습니다.");
      navigate(`/bookclub/${clubId}/recommend`);
    },
    onError: (error) => {
      alert("등록 실패: " + error.message);
    },
  });
};
