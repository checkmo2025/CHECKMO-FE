// 다른 사람 프로필 타입
export interface Category {
  id: number;
  name: string;
}

export interface OtherProfile {
  nickname: string;
  description: string;
  profileImageUrl: string | null;
  following: boolean;
  categories: Category[];
}
