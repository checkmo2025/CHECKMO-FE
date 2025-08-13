import type { ApiResponse } from "../apiResponse";

export interface CreateNoticeRequest {
  title: string;
  content: string; 
  important: boolean; 
}

export interface CreateVoteRequest {
  title: string;        
  important: boolean;  
  item1: string;       
  item2: string;        
  item3?: string;       // 투표 항목 3 (선택)
  item4?: string;       // 투표 항목 4 (선택)
  item5?: string;       // 투표 항목 5 (선택)    
  anonymity: boolean;  
  duplication: boolean; 
  startTime: string;    // 시작 시각 (ISO 8601)
  deadline: string;     // 종료 시각 (ISO 8601)
}


export interface NoticeMinimal {
  id: number;
  tag: string;
}

// 공지 생성
export type NoticeCreateResponse = ApiResponse<{ noticeItem: NoticeMinimal; staff: boolean }>;
export type NoticeCreateResponseResult = NoticeCreateResponse['result'];

// 투표 생성
export type VoteCreateResponse = ApiResponse<{ noticeItem: NoticeMinimal; staff: boolean }>;
export type VoteCreateResponseResult = VoteCreateResponse['result'];