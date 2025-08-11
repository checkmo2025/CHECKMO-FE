import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLogin, postAdditionalInfo, checkNickname } from "../apis/authApi";
import type {
  LoginRequest,
  LoginResponse as LoginResult,
  AdditionalInfoRequest,
  AdditionalInfoResult,
  CheckNicknameResult,
} from "../types/auth";

// 로그인
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResult, Error, LoginRequest>({
    mutationFn: (payload) => postLogin(payload),
    onSuccess: () => {
      // 로그인 후 내 프로필 캐시 갱신
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

// 회원 추가 정보 입력
export const useSubmitAdditionalInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<AdditionalInfoResult, Error, AdditionalInfoRequest>({
    mutationFn: (payload) => postAdditionalInfo(payload),
    onSuccess: () => {
      // 프로필 정보 변경되었으니 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });
};

// 닉네임 중복 확인 
export const useCheckNickname = () =>
  useMutation<CheckNicknameResult, Error, string>({
    mutationFn: (nickname) => checkNickname(nickname),
  });
