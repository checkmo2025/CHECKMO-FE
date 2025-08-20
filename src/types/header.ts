export type NotificationPreviewItem = {
  notificationId: number;
  notificationType: "LIKE" | "COMMENT" | "FOLLOW" | "CLUB_JOIN"; 
  senderNickname: string; 
  targetName: string;    
  read: boolean;
  createdAt: string;   
  redirectPath: string;
};

// API 응답 전체 구조
export interface NotificationPreviewResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    notifications: NotificationPreviewItem[];
  };
}

export type MyProfileResult = {
  nickname: string;
  description: string;
  profileImageUrl: string;
  categories?: { id: number; name: string }[];
};

// UI용 뷰모델
export type HeaderUserProfile = {
  username: string;
  bio: string;
  imgUrl?: string;
};

// 실제 화면에서 쓰일 데이터 형태
export type HeaderNotification = NotificationPreviewItem;
