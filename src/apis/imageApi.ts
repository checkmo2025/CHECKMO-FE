import { axiosInstance } from "./axiosInstance";
import type { PresignedUrlResult, ImageUploadRequest, AllowedImageType } from "../types/image";

// 허용된 이미지 타입 목록
const ALLOWED_IMAGE_TYPES: AllowedImageType[] = [
  "image/jpeg", 
  "image/jpg", 
  "image/png", 
  "image/webp", 
  "image/gif"
];

// 이미지 타입 검증 함수
const isAllowedImageType = (type: string): type is AllowedImageType => {
  return ALLOWED_IMAGE_TYPES.includes(type as AllowedImageType);
};

// 이미지 업로드
export const uploadImage = async (file: File): Promise<string> => {
  // 1. 이미지 타입 검증
  if (!isAllowedImageType(file.type)) {
    throw new Error(`지원하지 않는 이미지 형식입니다. 허용된 형식: ${ALLOWED_IMAGE_TYPES.join(', ')}`);
  }

  // 2. 요청 데이터 준비
  const requestData: ImageUploadRequest = {
    originalFileName: file.name,
    contentType: file.type
  };

  // 3. Presigned URL 발급 요청
  const response: PresignedUrlResult = await axiosInstance.post(
    '/s3/image/upload-url', 
    requestData
  );

  const { presignedUrl, imageUrl } = response;

  // 4. Presigned URL로 이미지 비동기 업로드 (응답을 기다리지 않음)
  // PUT 요청은 응답이 없으므로 비동기로 처리
  fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  }).catch(error => {
    console.error('S3 이미지 업로드 실패:', error);
    // S3 업로드 실패해도 이미 imageUrl은 반환했으므로 사용자에게 알리지 않음
  });

  // 5. 이미지 URL 즉시 반환 (비동기 업로드와 관계없이)
  return imageUrl;
};
