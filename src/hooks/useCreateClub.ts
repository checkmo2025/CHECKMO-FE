import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createClub } from "../apis/clubApi";
import type { ClubDto, CreateClubRequestDto } from "../types/bookClub";
import { useNavigate } from "react-router-dom";

// 클럽 생성 hook
export const useCreateClub = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<ClubDto, Error, CreateClubRequestDto>({
    mutationFn: createClub,
    onSuccess: () => {
      // 클럽 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      
      alert("모임이 성공적으로 생성되었습니다!");
      navigate('/searchClub'); // 모임 검색 페이지로 이동
    },
    onError: (error) => {
      console.error('모임 생성 실패:', error);
      
      // HTTP 응답 에러 확인
      const axiosError = error as any;
      if (axiosError.response?.status === 400) {
        alert('입력 값이 유효하지 않습니다.');
      } else {
        alert('모임 생성에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });
};