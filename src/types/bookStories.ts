export interface BookInfoDto {
  nickname: string;
  profileImageUrl: string;
}

export interface AuthorInfoDto {
  nickname: string;
  profileImageUrl: string;
  following: boolean;
}

export interface BookStoryResponseDto {
  bookStoryId: number;
  bookInfo: BookInfoDto;
  authorInfo: AuthorInfoDto;
  bookStoryTitle: string;
  description: string;
  likes: number;
  likedByMe: boolean;
  createdAt: string;
  writtenByMe: boolean;
}

export interface ScopeInfoDto {
  scope: string;
  selectedClub: {
    clubId: number;
    clubName: string;
  };
}

export interface MemberClubListDto {
  clubList: {
    clubId: number;
    clubName: string;
  }[];
}

export interface BookStoriesResult {
  scopeInfo: ScopeInfoDto;
  memberClubList: MemberClubListDto;
  bookStoryResponses: BookStoryResponseDto[];
  hasNext: boolean;
  nextCursor: number;
  pageSize: number;
}
