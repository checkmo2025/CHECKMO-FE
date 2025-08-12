// 이미지 업로드 관련 타입 정의

import type { ApiResponse } from "./apiResponse";

// 허용되는 이미지 타입 (API 명세서 기준)
export type AllowedImageType = "image/jpeg" | "image/jpg" | "image/png" | "image/webp" | "image/gif";

export interface ImageUploadRequest {
  originalFileName: string;
  contentType: AllowedImageType;
}

export interface PresignedUrlResult {
  presignedUrl: string;
  imageUrl: string;
}

export type PresignedUrlResponse = ApiResponse<PresignedUrlResult>;