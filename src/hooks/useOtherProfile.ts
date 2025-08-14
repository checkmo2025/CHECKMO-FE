import { useQuery } from "@tanstack/react-query";
import { getOtherProfile } from "../apis/otherApi";
import type { OtherProfile } from "../types/other";

export const QK_OTHER = {
  profile: (nickname: string) => ["otherProfile", nickname] as const,
};

// 다른 사람 프로필 조회 훅
export function useOtherProfileQuery(nickname: string) {
  return useQuery<OtherProfile>({
    queryKey: QK_OTHER.profile(nickname),
    queryFn: () => getOtherProfile(nickname),
    enabled: !!nickname, // 닉네임이 있을 때만 호출
  });
}
