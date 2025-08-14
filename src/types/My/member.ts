export type Category = { id: number; name: string };

export type MyProfile = {
  nickname: string;
  description: string | null;
  profileImageUrl: string | null;
  categories: Category[];
};

// PATCH /members/me 요청
export type UpdateMyProfileRequest = {
  description?: string | null;
  imgUrl?: string | null;        // 프로필 이미지 URL(선택)
  categoryIds?: number[];        // 선택 카테고리 ID 목록
};

// 응답은 갱신된 내 프로필
export type UpdateMyProfileResult = MyProfile;

/* -------------------- 마이홈페이지 전용 타입 -------------------- */

export type FollowItem = {
  nickname: string;
  profileImageUrl: string | null;
  following: boolean;
};

export type FollowResponse = {
  followList: FollowItem[];
  hasNext: boolean;
  nextCursor: number | null;
};

export type ClubItem = {
  clubId: number;
  name: string;
  description: string;
  profileImageUrl: string | null;
  open: boolean;
  category: string[];
  region: string;
  participantTypes: string[];
  insta: string;
  kakao: string;
  staff: boolean;
};

export type ClubResponse = {
  clubList: ClubItem[];
  hasNext: boolean;
  nextCursor: number | null;
};

export type NotificationItem = {
  notificationId: number;
  notificationType: "LIKE" | "COMMENT" | "FOLLOW";
  senderNickname: string;
  targetName: string | null;
  read: boolean;
  createdAt: string; // ISO 날짜 문자열
  redirectPath: string;
};

export type NotificationResponse = {
  notifications: NotificationItem[];
  hasNext: boolean;
  nextCursor: number | null;
  pageSize: number;
};