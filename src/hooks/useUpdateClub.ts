import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateClub } from "../apis/clubApi";
import type { ClubDto, UpdateClubRequestDto } from "../types/bookClub";
import { QK_CLUB } from "./BookClub/useClubDetail";

export const useUpdateClub = (clubId: number) => {
  const queryClient = useQueryClient();

  return useMutation<ClubDto, Error, UpdateClubRequestDto>({
    mutationFn: (payload) => updateClub(clubId, payload),
    onSuccess: (updated) => {
      // 상세 캐시 갱신
      queryClient.setQueryData(QK_CLUB.detail(clubId), updated);
      // 관련 리스트 무효화
      queryClient.invalidateQueries({ queryKey: ["clubs"] });
      // 상세 즉시 재검증 (서버 소스와 동기화 보장)
      queryClient.invalidateQueries({ queryKey: QK_CLUB.detail(clubId) });
      queryClient.refetchQueries({ queryKey: QK_CLUB.detail(clubId) });
      alert("모임이 성공적으로 수정되었습니다!");
    },
    onError: (error) => {
      console.error("모임 수정 실패:", error);
      alert("모임 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });
};


