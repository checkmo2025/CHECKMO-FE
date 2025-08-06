import type { ApiResponse } from "../apiResponse";

export interface ShelfHomeRequest {
  clubId:     number;
  cursorId?:  number;
  size?:      number;
  generation?: number;
}

export interface BookInfo {
  bookId:  string;
  title:   string;
  author:  string;
  imgUrl:  string;
}

export interface MeetingInfo {
  meetingId:     number;
  title:         string;
  meetingTime:   string;  
  location:      string;
  generation:    number;
  tag:           string;
  content:       string;
  bookInfo:      BookInfo;
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