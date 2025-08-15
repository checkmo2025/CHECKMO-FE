export type NoticeTag = "모임" | "투표" | "공지";

export interface BaseNotice {
  id: number;
  title: string;
  tag: NoticeTag;
  content: string;
  important?: boolean;
  imgUrl?: string;
  afterPartyPlace?: string;
  clubId: number;
}

export interface BookInfo {
  bookId: string;
  title: string;
  author?: string;
  imgUrl?: string;
}

export interface MeetingInfoDTO {
  meetingId: number;
  title: string;
  meetingTime: string;
  location: string;
  bookInfo?: BookInfo;
}

export interface VoteItem {
  item: string;
  voteCount: number;
  votedMembers: any[];
  selected: boolean;
}

export interface VoteNotice extends BaseNotice {
  tag: "투표";
  startTime: string;
  deadline: string;
  items: VoteItem[];
  anonymity: boolean;
  duplication: boolean;
  meetingInfoDTO?: MeetingInfoDTO;
}

export interface MeetingNotice extends BaseNotice {
  tag: "모임";
  meetingInfoDTO: MeetingInfoDTO;
}

export interface GeneralNotice extends BaseNotice {
  tag: "공지";
  meetingInfoDTO?: MeetingInfoDTO;
}

export type NoticeDto = VoteNotice | MeetingNotice | GeneralNotice;
