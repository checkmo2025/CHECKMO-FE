import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
  baseURL: '/api',        // 공통 베이스 URL
  timeout: 10000,                         // 요청 타임아웃 (ms)
  withCredentials: true,                // 쿠키 전송 허용
  headers: {
    'Content-Type': 'application/json',   // 공통
    
  },
});

axiosInstance.interceptors.response.use(
  // 성공 로직은 그대로
  response => {
    const data = response.data;
    if (!data.isSuccess) {
      return Promise.reject(new Error(`${data.code}: ${data.message}`));
    }
    return data.result;
  },
  // 에러 핸들러
  (error: AxiosError) => {
    const errData = error.response?.data as { message?: string };
    if (errData?.message) {
      console.error(`API 요청 실패: ${errData.message}`);
    } 
    return Promise.reject(error);
  }
);