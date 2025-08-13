import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postLogin,
  postAdditionalInfo,
  checkNickname,
  requestEmailVerification,
  confirmEmailVerification,
  postSignup,
  postLogout,
} from "../apis/authApi";
import type {
  LoginRequest,
  LoginResponse as LoginResult,
  AdditionalInfoRequest,
  AdditionalInfoResult,
  CheckNicknameResult,
  EmailVerificationConfirmRequest,
  EmailVerificationConfirmResult,
  EmailVerificationSendResult,
  SignupRequest,
  SignupResult,
} from "../types/auth";
import { QK } from "../hooks/useHeader";

// 로그인
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginResult, Error, LoginRequest>({
    mutationFn: (payload) => postLogin(payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: QK.me }),
        queryClient.invalidateQueries({ queryKey: QK.notiPreview(5) }),
      ]);
    },
  });
};

// 회원 추가 정보 입력
export const useSubmitAdditionalInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<AdditionalInfoResult, Error, AdditionalInfoRequest>({
    mutationFn: (payload) => postAdditionalInfo(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: QK.me });
    },
  });
};

// 닉네임 중복 확인
export const useCheckNickname = () =>
  useMutation<CheckNicknameResult, Error, string>({
    mutationFn: (nickname) => checkNickname(nickname),
  });

// 이메일 인증: 코드 요청
export const useRequestEmailCode = () =>
  useMutation<EmailVerificationSendResult, Error, string>({
    mutationFn: (email) => requestEmailVerification(email),
  });

// 이메일 인증: 코드 확인
export const useConfirmEmailCode = () =>
  useMutation<EmailVerificationConfirmResult, Error, EmailVerificationConfirmRequest>({
    mutationFn: (payload) => confirmEmailVerification(payload),
  });

// 회원가입
export const useSignup = () =>
  useMutation<SignupResult, Error, SignupRequest>({
    mutationFn: (payload) => postSignup(payload),
  });

// 로그아웃
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, void>({
    mutationFn: () => postLogout(),
    onSuccess: async () => {
      // 헤더 관련 캐시 비우기 + 즉시 로그아웃 상태 반영
      await Promise.all([
        queryClient.removeQueries({ queryKey: QK.me }),
        queryClient.removeQueries({ queryKey: QK.notiPreview(5) }),
      ]);
    },
  });
};
