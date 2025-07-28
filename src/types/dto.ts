// 공용 Dto 파일
export type BookDto = {
  bookId?: number;
  title: string;
  author: string;
  imgUrl: string;
  pulisher?: string;
};

export type MemberDto = {
  memberId: number;
  nickName: string;
  imgUrl: string;
};

export interface AuthorDto {
  nickname: string;
  profileImageUrl: string;
}

export type RecommendationDto = {
  recommendId: number;
  bookInfo: BookDto;
  memberInfo: MemberDto;
  content: string; // 추천평 미리보기
  rate: number;
  createdAt: Date;
};

export type ReviewDto = {
  reviewId: number;
  description: string;
  rate: number;
  author: MemberDto; // 리뷰 작성자
  createdAt: Date;
};

export type TeamDto = {
  teamId: number;
  name: string;
  teamNumber: number;
  memberCount: number;
  selectedTopicCount: number;
};

export type StatisticsDto = {
  totalParticipants: number;
  totalTopics: number;
  totalReviews: number;
  averageRating: number;
};
