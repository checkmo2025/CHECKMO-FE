import { axiosInstance } from "./axiosInstance";
import type { LoginRequest, LoginResponse } from "../types/auth";

// axiosInstance가 이미 data.result를 반환한다고 가정
export async function postLogin(payload: LoginRequest): Promise<LoginResponse> {
  const res: LoginResponse = await axiosInstance.post("/auth/login", payload);
  return res; // { nickname: string }
}