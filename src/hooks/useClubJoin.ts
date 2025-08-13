import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestJoinClub } from "../apis/clubApi";
import type { JoinClubResult } from "../types/bookClub";

type JoinVariables = { clubId: number; joinMessage: string };

export const useClubJoin = () => {
  const queryClient = useQueryClient();

  return useMutation<JoinClubResult, Error, JoinVariables>({
    mutationFn: ({ clubId, joinMessage }) =>
      requestJoinClub(clubId, { joinMessage }),
    onSuccess: (data) => {
      // 가입 후 목록 최신화 (멤버 여부 등 갱신 목적)
      queryClient.invalidateQueries({ queryKey: ["clubList"] });
      if (data.open) {
        alert("가입이 완료되었습니다.");
      } else {
        alert("가입 신청이 접수되었습니다. 운영진 승인 대기 중입니다.");
      }
    },
    onError: (error: any) => {
      const status: number | undefined = error?.response?.status;
      if (status === 404) {
        alert("존재하지 않는 독서모임입니다.");
        return;
      }
      if (status === 409) {
        alert("이미 가입을 신청했거나, 가입이 승인된 상태입니다.");
        return;
      }
      alert("가입 신청에 실패했습니다. 다시 시도해주세요.");
    },
  });
};


