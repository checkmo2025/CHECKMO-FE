import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  postLogin,
  postAdditionalInfo,
  checkNickname,
  requestEmailVerification,
  confirmEmailVerification,
  postSignup,
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

// 이메일 인증: 코드 요청
export const useRequestEmailCode = () =>
  useMutation<EmailVerificationSendResult, Error, string>({
    // param: email
    mutationFn: (email) => requestEmailVerification(email),
  });

// 이메일 인증: 코드 확인
export const useConfirmEmailCode = () =>
  useMutation<EmailVerificationConfirmResult, Error, EmailVerificationConfirmRequest>({
    // param: { email, verificationCode }
    mutationFn: (payload) => confirmEmailVerification(payload),
  });

// 회원가입
export const useSignup = () =>
  useMutation<SignupResult, Error, SignupRequest>({
    // param: { email, password }
    mutationFn: (payload) => postSignup(payload),
  });
