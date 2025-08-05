// 투표 선택지 타입 (개선됨)
export interface VoteOption {
  id: string; // 고유 식별자 추가
  label: string;
  value: string;
  description?: string; // 선택지에 대한 설명
}

// 투표 유형
export type VoteType = 'single' | 'multiple'; // 단일 선택 | 다중 선택

// 투표 결과
export interface VoteResult {
  optionId: string;
  count: number;
  percentage: number;
  voters?: string[]; // 투표한 사용자들의 ID (선택적)
}

// 투표 상태
export type VoteStatus = 'active' | 'closed' | 'draft';

// 투표 참여자 정보
export interface VoteParticipant {
  userId: string;
  userName: string;
  userImageUrl: string;
  userDescription: string;
  selectedOptions: string[]; // 선택한 옵션들의 ID
}

// 투표 설정 정보
export interface VoteSettings {
  type: VoteType; // 투표 유형
  allowAnonymous: boolean; // 익명 투표 허용
}

// 투표 마감일 상세 정보
export interface VoteDeadline {
  datetime: string; // ISO 8601 형식: '2024-12-25T14:30:00'
  year: number;
  month: number;
  date: number;
  day: string; // '월', '화', '수', '목', '금', '토', '일'
  hour: number;
  minute: number;
}

// 완전한 투표 정보
export interface VoteInfo {
  id: string;
  title: string;
  description?: string;
  options: VoteOption[];
  settings: VoteSettings;
  deadline: VoteDeadline;
  status: VoteStatus;
  results?: VoteResult[];
  participants?: VoteParticipant[];
  totalVotes?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AnnouncementProps {
  id?: number;
  title?: string;
  clubName?: string;
  tag?: '모임' | '투표' | '공지';
  
  // 모임 관련
  meetingDate?: string;
  meetingPlace?: string;
  book?: string;
  bookAuthor?: string;
  bookPublisher?: string;
  
  // 투표 관련
  voteInfo?: VoteInfo; // 완전한 투표 정보
  voteLink?: string; // 레거시 호환용
  voteDeadline?: VoteDeadline; // 레거시 호환용
  afterPartyPlace?: string;
  voteOptions?: VoteOption[]; // 레거시 호환용
  onVoteSubmit?: (selectedValues: string[]) => void; // 다중 선택 지원
  
  // 공지 관련
  announcementTitle?: string;
  announcement?: string;
  
  // 상세 정보
  description?: string;
  bookDescription?: string;
  generation?: number; // 기수
  categories?: number[]; // 카테고리 ID 배열
  
  // UI 관련
  imageUrl?: string;
} 