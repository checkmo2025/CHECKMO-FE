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
