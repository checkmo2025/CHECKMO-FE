import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default axiosInstance;

// api 응답 방식에 따라 변경 가능!
axiosInstance.interceptors.response.use((res) => {
  if (res.data?.data !== undefined) res.data = res.data.data;
  return res;
});
