import type {
  BookDto,
  ClubDto,
  MeetingDto,
  ReviewDto,
  StatisticsDto,
  TeamDto,
  TopicDto,
} from "./dto";

export type MeetingListResult = {
  club: ClubDto;
  meetings: MeetingDto[];
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  isFirst: boolean;
  isLast: boolean;
};

export type MeetingListDto = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MeetingListResult;
};

export type MeetingDetailResult = {
  meeting: MeetingDto;
  club: ClubDto;
  book: BookDto;
  topics: TopicDto[];
  reviews: ReviewDto[];
  teams: TeamDto[];
  statistics: StatisticsDto;
};

export type MeetingDetailDto = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: MeetingDetailResult;
};
