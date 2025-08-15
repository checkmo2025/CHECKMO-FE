export interface NoticeDto {
  id: number;
  tag: "모임" | "투표" | "공지" | string;
  title: string;
  important: boolean;
  content?: string;
  date?: string;
  book?: string;
  clubId?: number; // 클럽 구분용
  meetingInfoDTO?: any; // 모임 관련 상세
  voteInfoDTO?: any; // 투표 관련 상세
}

export interface NoticeResultDto {
  noticeList: NoticeDto[];
  hasNext: boolean;
  nextCursor: number;
  pageSize: number;
  staff: boolean;
}
