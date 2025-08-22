import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createClub } from "../apis/clubApi";
import type { ClubDto, CreateClubRequestDto } from "../types/bookClub";

// 클럽 생성 hook
export const useCreateClub = () => {
  const queryClient = useQueryClient();

  return useMutation<ClubDto, Error, CreateClubRequestDto>({
    mutationFn: createClub,
    onSuccess: () => {
      console.log("클럽 생성 성공");
      
      // 클럽 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
    },
    onError: (error) => {
      console.error('모임 생성 실패:', error);
    },
  });
};