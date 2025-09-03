// src/apis/axiosInstance.ts
import axios, { AxiosError } from "axios";

/**
 * ──────────────────────────────────────────────────────────────
 * API 베이스 URL 결정
 *  - 프로덕션(Vercel 배포): VITE_API_URL 사용 (예: https://api.checkmo.co.kr/api)
 *  - 개발(vite dev): /api (vite.config.ts 의 proxy가 백엔드로 라우팅)
 * ──────────────────────────────────────────────────────────────
 */
export const API_URL =
  import.meta.env.PROD ? import.meta.env.VITE_API_URL : "/api";

/**
 * API_ORIGIN
 *  - 소셜 로그인 등의 리다이렉트용으로 원본 Origin이 필요할 때 사용
 *  - 예) https://api.checkmo.co.kr
 */
export const API_ORIGIN = import.meta.env.PROD
  ? new URL(import.meta.env.VITE_API_URL!).origin
  : "";

/**
 * 공용 axios 인스턴스
 *  - withCredentials: 세션/소셜 로그인 쿠키 전송
 *  - timeout: 네트워크 지연/무한 대기 방지
 *  - Content-Type: 기본 JSON
 */
export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 응답 인터셉터
 *  - 서버 응답이 { isSuccess, code, message, result } 포맷이면
 *    실패 시 에러로 reject, 성공 시 result만 반환
 *  - 그 외 포맷이면 data 그대로 반환
 */
axiosInstance.interceptors.response.use(
  (response) => {
    const data = response.data;

    // 표준 포맷: { isSuccess, code, message, result }
    if (data && typeof data === "object" && "isSuccess" in data) {
      if (!data.isSuccess) {
        // 백엔드에서 내려준 코드/메시지를 포함해 에러 생성
        return Promise.reject(new Error(`${data.code}: ${data.message}`));
      }
      return data.result;
    }

    // 비표준 포맷은 있는 그대로 반환(호환성)
    return data;
  },
  (error: AxiosError) => {
    // 공통 에러 로깅
    const errData = error.response?.data as { message?: string; code?: string };
    const msg =
      errData?.message ??
      error.message ??
      "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
    console.error(`[API ERROR] ${msg}`);

    // (선택) 인증 만료 등 처리
    // if (error.response?.status === 401) {
    //   // TODO: 로그인 페이지로 이동 등
    // }

    return Promise.reject(error);
  }
);
