import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../apis/imageApi";

// 이미지 업로드 훅
export const useUploadImage = () => {
  return useMutation<string, Error, File>({
    mutationFn: uploadImage,
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
      const axiosError = error as any;
      if (axiosError.response?.status === 400) {
        alert('잘못된 요청입니다.');
      } else if (axiosError.response?.status === 401) {
        alert('로그인이 필요한 서비스입니다.');
      } else {
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      }
    },
  });
};
