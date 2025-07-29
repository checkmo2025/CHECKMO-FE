export interface VoteOption {
  label: string;
  value: string;
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
  voteLink?: string;
  afterPartyPlace?: string;
  voteOptions?: VoteOption[];
  onVoteSubmit?: (selectedValue: string) => void;
  
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