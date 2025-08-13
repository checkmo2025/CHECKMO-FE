import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProfile, patchMyProfile } from "../../apis/My/memberApi";
import type { MyProfile, UpdateMyProfileRequest, UpdateMyProfileResult } from "../../types/My/member";
import { QK } from "../useHeader"; 

export const useMyProfileQuery = () =>
  useQuery<MyProfile, Error>({
    queryKey: QK.me,
    queryFn: getMyProfile,
  });

export const useUpdateMyProfile = () => {
  const qc = useQueryClient();
  return useMutation<UpdateMyProfileResult, Error, UpdateMyProfileRequest>({
    mutationFn: (payload) => patchMyProfile(payload),
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: QK.me }); // 헤더/프로필 즉시 반영
    },
  });
};
