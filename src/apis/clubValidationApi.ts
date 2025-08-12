import { axiosInstance } from './axiosInstance';

// 독서모임 이름 중복검사
// 반환값: true(중복), false(사용 가능)
export const validateClubName = async (clubName: string): Promise<boolean> => {
  const response = await axiosInstance.get<boolean>(`/clubs/checkName`, {
    params: {
      clubName,
    },
  });
  return response.data;
};
