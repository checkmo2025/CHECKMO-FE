// src/components/BookClub/ClubCard.tsx
import React, { useLayoutEffect, useRef, useState } from 'react';
import bookclubDefault from '../../assets/images/bookclubDefaultImage.png';
import { BOOK_CATEGORIES, PARTICIPANT_TYPES } from '../../types/dto';

export interface ClubCardProps {
  id: number;
  title: string;
  category: number[];
  participantTypes: string[];
  region: string;
  logoUrl?: string;
  kakao?: string;
  insta?: string;
  isMember?: boolean;
  onJoinRequest?: (clubId: number, message: string) => void;
}

// 버튼 컴포넌트들
const ActionButton: React.FC<{
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}> = ({ variant, onClick, children }) => (
  <button
    onClick={onClick}
    className={`
      w-[105px] h-[35px] rounded-[16px] px-[19.5px] py-[9px]
      text-[12px] flex items-center justify-center whitespace-nowrap cursor-pointer
      transition-colors
      ${variant === 'primary' 
        ? 'bg-[#DED6CD] text-[#BFAB96] hover:bg-[#A6917D] hover:text-white'
        : 'bg-white border-[1.5px] border-[#BFAB96] text-[#434343] hover:bg-[#EAE5E2] hover:border-[#A6917D] hover:text-2C2C2C'
      }
    `}
  >
    {children}
  </button>
);

const ActionButtons: React.FC<{
  onJoinClick: () => void;
  onInquiryClick: () => void;
  position?: 'top-right' | 'default';
}> = ({ onJoinClick, onInquiryClick, position = 'default' }) => {
  const positionClass = position === 'top-right'
    ? 'absolute right-[20px] top-[25px]'
    : 'absolute right-[20px] top-[107px]';
  return (
    <div className={`${positionClass} hidden lg:flex flex-col gap-[10px]`}>
      <ActionButton
        variant="primary"
        onClick={onJoinClick}
      >
        가입 신청하기
      </ActionButton>
      <ActionButton
        variant="secondary"
        onClick={onInquiryClick}
      >
        문의 하기
      </ActionButton>
    </div>
  );
};

export default function ClubCard({
  id,
  title,
  category,
  participantTypes,
  region,
  logoUrl,
  kakao,
  insta,
  isMember = false,
  onJoinRequest,
}: ClubCardProps): React.ReactElement {
  const cardRef = useRef<HTMLDivElement>(null);
  const previousModeRef = useRef<'default' | 'join' | 'inquiry'>('default');
  const [mode, setMode] = useState<'default' | 'join' | 'inquiry'>('default');
  const [joinMessage, setJoinMessage] = useState('');

  const getScrollParent = (element: HTMLElement | null): HTMLElement | Window => {
    if (!element) return window;
    let parent: HTMLElement | null = element.parentElement;
    while (parent) {
      const style = getComputedStyle(parent);
      const overflowY = style.overflowY;
      if (overflowY === 'auto' || overflowY === 'scroll') {
        return parent;
      }
      parent = parent.parentElement;
    }
    return window;
  };

  const animateScroll = (target: HTMLElement | Window, deltaY: number, durationMs: number) => {
    if (deltaY === 0 || durationMs <= 0) return;
    const startTime = performance.now();
    const startY = target instanceof HTMLElement ? target.scrollTop : window.scrollY;
    const endY = startY + deltaY;
    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      const eased = easeInOutCubic(progress);
      const currentY = startY + (endY - startY) * eased;
      if (target instanceof HTMLElement) {
        target.scrollTop = currentY;
      } else {
        window.scrollTo(0, currentY);
      }
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };


  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const isExpandingFromDefault = previousModeRef.current === 'default' && (mode === 'join' || mode === 'inquiry');
    previousModeRef.current = mode;
    if (!isExpandingFromDefault) return;

    const scrollParent = getScrollParent(el);
    const elRect = el.getBoundingClientRect();
    const margin = mode === 'join' ? 250 : 150; // 모드별 여유 마진
    const duration = 500; // 스크롤 애니메이션 지속 시간

    if (scrollParent instanceof HTMLElement) {
      const parentRect = scrollParent.getBoundingClientRect();
      const bottomOverflow = elRect.bottom - parentRect.bottom + margin;
      const topOverflow = parentRect.top - elRect.top + margin;
      let scrollDelta = 0;
      if (bottomOverflow > 0) scrollDelta = bottomOverflow;
      else if (topOverflow > 0) scrollDelta = -topOverflow;
      if (scrollDelta !== 0) {
        animateScroll(scrollParent, scrollDelta, duration);
      }
    } else {
      const bottomOverflow = elRect.bottom - window.innerHeight + margin;
      const topOverflow = 0 - elRect.top + margin;
      let scrollDelta = 0;
      if (bottomOverflow > 0) scrollDelta = bottomOverflow;
      else if (topOverflow > 0) scrollDelta = -topOverflow;
      if (scrollDelta !== 0) {
        animateScroll(window, scrollDelta, duration);
      }
    }
  }, [mode]);

  // 가입 신청 처리
  const handleJoinRequest = () => {
    if (isMember) {
      onJoinRequest?.(id, 'already_member');
      return;
    }

    if (!joinMessage.trim()) {
      onJoinRequest?.(id, 'no_message');
      return;
    }

    // 가입 신청 성공 처리
    onJoinRequest?.(id, joinMessage);
    setMode('default');
    setJoinMessage('');
  };

  const handleJoinClick = () => {
    // 이미 가입신청 모드인 경우 기본 모드로 돌아감
    setMode(mode === 'join' ? 'default' : 'join');
  };
  
  // 기본 버튼 클릭 시: 이미 가입이면 상위에 알리고 종료, 아니면 가입 작성 모드로 전환
  const onJoinButtonClick = () => {
    if (isMember) {
      onJoinRequest?.(id, 'already_member');
      return;
    }
    handleJoinClick();
  };

  const handleInquiryClick = () => {
    // 이미 문의 모드인 경우 기본 모드로 돌아감
    setMode(mode === 'inquiry' ? 'default' : 'inquiry');
  };

  // 카테고리 ID를 이름으로 변환
  const categoryNames = category.map(id => BOOK_CATEGORIES[id as keyof typeof BOOK_CATEGORIES] || `카테고리${id}`);
  
  // 참여자 유형을 이름으로 변환
  const participantNames = participantTypes.map(type => PARTICIPANT_TYPES[type as keyof typeof PARTICIPANT_TYPES] || type);

  const formatUrlForDisplay = (rawUrl: string, maxLength: number = 50): string => {
    if (!rawUrl) return '';
    if (rawUrl.length <= maxLength) return rawUrl;

    let parsed: URL | null = null;
    try {
      parsed = new URL(rawUrl);
    } catch {
      try {
        parsed = new URL(`https://${rawUrl}`);
      } catch {
        parsed = null;
      }
    }

    if (parsed) {
      const origin = `${parsed.protocol}//${parsed.host}`;
      const pathSegments = parsed.pathname.split('/').filter(Boolean);
      const lastSegment = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : '';
      const tail = `${lastSegment}${parsed.search || ''}${parsed.hash || ''}`;
      const composed = `${origin}/…/${tail}`;
      if (composed.length <= maxLength) return composed;
    }

    const keep = Math.max(5, Math.floor((maxLength - 3) / 2));
    const head = rawUrl.slice(0, keep);
    const tail = rawUrl.slice(-keep);
    return `${head}…${tail}`;
  };

  return (
    <div
      ref={cardRef}
      className={`
        relative w-full max-w-[916px] mx-auto bg-white rounded-[16px] border-[2px] border-[#EAE5E2]
        overflow-hidden hover:shadow transition-all duration-300
                 ${mode === 'join' ? 'h-[396px]' : mode === 'inquiry' ? ((kakao && insta) ? 'h-[307px]' : 'h-[280px]') : 'h-[204px]'}
      `}
    >
      <div className="flex gap-[16px] w-full">
        <img
          src={(logoUrl && logoUrl.trim() !== '') ? logoUrl : bookclubDefault}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = bookclubDefault; }}
          alt="club"
          className="w-[164px] h-[164px] ml-[20px] mt-[20px] rounded-lg object-cover"
        />

        {/* 정보 영역 */}
        <div className="ml-[15px] flex-1 flex flex-col min-w-0">
          {/* 카테고리 태그 */}
          <div className="flex gap-[12px] mt-[24px] mb-[18px] flex-wrap">
            {categoryNames.map((categoryName) => (
              <span
                key={categoryName}
                className="
                  inline-flex
                  items-center
                  justify-center
                  text-[12px] font-medium
                  bg-[#90D26D] text-white
                  px-[12px] h-[24px]
                  rounded-[15px]
                  whitespace-nowrap
                  min-w-[54px]
                "
              >
                {categoryName}
              </span>
            ))}
          </div>

          {/* 모임명 */}
          <h3
            className="
              font-medium text-[18px] text-[#2C2C2C]
              mb-[18px] line-clamp-1
            "
          >
            {title}
          </h3>

          {/* 모임 대상 & 활동 지역 */}
          <p
            className="
              font-medium text-[14px] text-[#8D8D8D]
            "
          >
            모임 대상 | {participantNames.join(', ')}
          </p>
          <p
            className="
              font-medium text-[14px] text-[#8D8D8D]
            "
          >
            활동 지역 | {region}
          </p>

          {/* 모드별 UI */}
          {/* 기본 모드 */}
          {mode === 'default' && (
            <ActionButtons
              onJoinClick={onJoinButtonClick}
              onInquiryClick={handleInquiryClick}
            />
          )}
          

          {/* 가입 신청 모드 */}
          {mode === 'join' && (
            <>
              <ActionButtons
                onJoinClick={handleJoinClick}
                onInquiryClick={handleInquiryClick}
                position="top-right"
              />
              <div className="absolute left-[213px] right-[20px] top-[196px] flex flex-col">
                <textarea
                  value={joinMessage}
                  onChange={(e) => setJoinMessage(e.target.value)}
                  placeholder="가입 메시지 작성"
                  className="
                    w-full h-[180px] border-[2px] border-[#EAE5E2]
                    rounded-[16px] px-[20px] py-[20px]
                    font-medium text-[14px] text-[#2C2C2C]
                    outline-none resize-none
                  "
                />
              </div>
              <button
                onClick={handleJoinRequest}
                className="
                  absolute left-[770px] top-[321px]
                  w-[90px] h-[35px] rounded-[16px] text-[12px]
                  flex items-center justify-center
                  cursor-pointer
                  bg-[#DED6CD] text-[#BFAB96] hover:bg-[#A6917D] hover:text-white
                "
              >
                가입 신청하기
              </button>
            </>
          )}

          {/* 문의 모드 */}
          {mode === 'inquiry' && (
            <>
              <ActionButtons
                onJoinClick={handleJoinClick}
                onInquiryClick={handleInquiryClick}
                position="top-right"
              />
              <div className="
                absolute left-[213px] top-[196px]
                w-[684px] ${(kakao && insta) ? 'h-[91px]' : 'h-[51px]'} border-[2px] border-[#EAE5E2]
                rounded-[16px] px-[20px] py-[20px]
                font-medium text-[14px] text-[#2C2C2C]
                underline underline-offset-2
                flex flex-col gap-[10px]
              ">
                {!kakao && !insta ? (
                  <span className="no-underline text-[#8D8D8D] ">등록된 링크가 없습니다.</span>
                ) : (
                  <>
                    {kakao && (
                      <a href={kakao} target="_blank" rel="noopener noreferrer" title={kakao}>
                        {formatUrlForDisplay(kakao)}
                      </a>
                    )}
                    {insta && (
                      <a href={insta} target="_blank" rel="noopener noreferrer" title={insta}>
                        {formatUrlForDisplay(insta)}
                      </a>
                    )}
                  </>
                )}
              </div>
            </>
          )}


        </div>
      </div>
    </div>
  );
}
