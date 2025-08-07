import type { ApiResponse } from "../apiResponse";

export interface ShelfHomeRequest {
  clubId:     number;
  cursorId?:  number | null;
  size?:      number ;
  generation?: number;
}

export interface BookInfo {
  bookId:  string;
  title:   string;
  author:  string;
  imgUrl:  string;
}

export interface MeetingInfo {
  meetingId:   number;
  generation:  number;
  tag:         string;
  averageRate: number;
}

export interface BookShelfInfo {
  meetingInfo: MeetingInfo;
  bookInfo:    BookInfo;
}

export type ShelfHomeResponse = ApiResponse<{
  bookShelfInfoList: BookShelfInfo[];
  hasNext:           boolean;
  nextCursor:        number;
}>;

export type ShelfHomeResponseResult = ShelfHomeResponse['result'];