export interface NoticeDto {
  id: number;
  tag: "모임" | "투표" | "공지" | string;
  title: string;
  important: boolean;
}

export interface NoticeResultDto {
  noticeList: NoticeDto[];
  hasNext: boolean;
  nextCursor: number;
  pageSize: number;
  staff: boolean;
}
