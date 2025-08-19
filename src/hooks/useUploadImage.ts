import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../apis/imageApi";

// 이미지 업로드 훅
export const useUploadImage = () => {
  return useMutation<string, Error, File>({
    mutationFn: uploadImage,
    onError: (error) => {
      console.error('이미지 업로드 실패:', error);
      // UI 알림은 훅 외부(호출 컴포넌트)에서 처리합니다.
    },
  });
};
