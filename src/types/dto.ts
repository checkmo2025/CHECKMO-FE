// 공용 Dto 파일
export type BookDto = {
  bookId: number;
  title: string;
  author: string;
  imgUrl: string;
  pulisher: string;
};

export type MemberDto = {
  memberId: number;
  nickName: string;
  imgUrl: string;
};

export type RecommendationDto = {
  recommendId: number;
  bookInfo: BookDto;
  memberInfo: MemberDto;
  content: string; // 추천평 미리보기
  rate: number;
  createdAt: Date;
};

export type ClubDto = {
  clubId: number;
  name: string;
  description: string;
};

export type MeetingDto = {
  meetingId: number;
  title: string;
  generation: number; // 기수
  book: BookDto;
  meetingTime: Date;
  location: string;
  participantCount: number;
  topicCount: number;
  reviewCount: number;
  averageRating: number;
  status: String;
};

export type TopicDto = {
  topicId: number;
  description: string;
  author: MemberDto; // 발제 작성자
  createdAt: Date;
  selectedByTeamCount: number; // 몇 개의 팀에서 선택했는 지
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
