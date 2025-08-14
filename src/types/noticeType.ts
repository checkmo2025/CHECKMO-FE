// 공지 타입 매핑 및 검증 유틸리티
// - 현지화 태그('모임' | '투표' | '공지')를 안정적인 라우트 타입으로 매핑합니다
// - 라우팅에 사용되는 쿼리 파라미터 `type`을 검증합니다

import type { noticeListItemDto } from './clubNotice';

export type NoticeRouteType = 'meeting' | 'vote' | 'general';

type LocalizedNoticeTag = noticeListItemDto['tag']; // '공지' | '모임' | '투표'

export const LOCALIZED_TAG_TO_ROUTE_TYPE: Record<LocalizedNoticeTag, NoticeRouteType> = {
  '모임': 'meeting',
  '투표': 'vote',
  '공지': 'general',
};

export function mapTagToRouteType(tag: LocalizedNoticeTag): NoticeRouteType {
  return LOCALIZED_TAG_TO_ROUTE_TYPE[tag];
}

export function isNoticeRouteType(value: unknown): value is NoticeRouteType {
  return value === 'meeting' || value === 'vote' || value === 'general';
}

export function parseNoticeRouteType(param: string | null | undefined): NoticeRouteType {
  return isNoticeRouteType(param) ? param : 'general';
}



