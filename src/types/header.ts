export type NotificationPreviewItem = {
  notificationId: number;
  notificationType: string; 
  senderNickname: string | null; 
  targetName?: string | null;    
  read: boolean;
  createdAt: string;   
  redirectPath: string;
};

export type NotificationPreviewResult = {
  notifications: NotificationPreviewItem[];
};

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

export type HeaderNotification = {
  message: string;
  time: string;
  redirectPath?: string;
};
