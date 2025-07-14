export type Book = {
  bookId: number;
  title: string;
  author: string;
  imgUrl: string;
};

export type Member = {
  memberId: number;
  nickName: string;
  imgUrl: string;
};

export type Recommendation = {
  recommendId: number;
  bookInfo: Book;
  memberInfo: Member;
  content: string; // 추천평 미리보기
  rate: number;
  createdAt: Date;
};

export type ListResult = {
  recommendations: Recommendation[];
  hasNext: false;
  totalElements: number;
};

export type DetailResult = {
  recommend: Recommendation;
  isMyRecommendation: boolean; // 내가 작성했는 지 여부에 따라 수정/삭제 버튼 띄우기
};

export type RecommendList = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ListResult;
};

export type RecommendDetail = {
  isSuccess: boolean;
  code: string;
  result: DetailResult;
};
