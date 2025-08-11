import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogin } from "../apis/authApi";
import type { LoginRequest, LoginResponse as LoginResult } from "../types/auth";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResult, Error, LoginRequest>({
    mutationFn: (payload) => postLogin(payload),
    // recommend 훅들처럼 기본 무효화만 넣어둠 (프로필 캐시 갱신용)
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};