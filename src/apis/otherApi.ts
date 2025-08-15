import { axiosInstance } from "./axiosInstance";
import type { OtherProfile } from "../types/other";
import type { BookStoriesResult } from "../types/bookStories";

/** 다른 사람 프로필 조회: GET /api/members/{memberNickname} */
export async function getOtherProfile(memberNickname: string): Promise<OtherProfile> {
  return axiosInstance.get<unknown, OtherProfile>(`/members/${memberNickname}`);
}

/** 특정 회원 팔로우: POST /api/members/{memberNickname}/following */
export async function followMember(memberNickname: string): Promise<void> {
  return axiosInstance.post(`/members/${memberNickname}/following`);
}

// 특정 회원 책이야기 조회
export const getTargetBookStories = async (nickname: string) => {
  const result: BookStoriesResult = await axiosInstance.get("/book-stories", {
    params: {
      scope: "TARGET",
      targetMemberNickname: nickname,
    },
  });
  return result;
};