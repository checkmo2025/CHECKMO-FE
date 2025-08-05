export interface BookInfo {
  isbn: string;
  title: string;
  author: string;
  imgUrl: string;
  publisher: string;
  description: string;
}

export interface CreateMeetingRequest {
  title: string;
  meetingTime: string;    //e.g. "2025-08-01T14:20:27.975Z"
  location: string;
  content: string;
  generation: number;
  tag: string;
  bookInfo: BookInfo;
}