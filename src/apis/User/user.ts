import { axiosInstance } from "../axiosInstance";

const followUser = async (nickname: string) => {
  try {
    const response = await axiosInstance.post(`/members/${nickname}/following`);
    return response;
  } catch (error) {
    console.error("팔로우 요청 실패:", error);
    throw error;
  }
};

const unfollowUser = async (nickname: string) => {
  try {
    const response = await axiosInstance.delete(
      `/members/${nickname}/following`
    );
    return response;
  } catch (error) {
    console.error("언팔로우 요청 실패:", error);
    throw error;
  }
};

export const toggleUserSubscription = async (
  nickname: string,
  isFollowing: boolean
) => {
  if (isFollowing) {
    return unfollowUser(nickname);
  } else {
    return followUser(nickname);
  }
};
