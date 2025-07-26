// src/components/BookClub/ClubCard.tsx
import React, { useState } from 'react';
import checker from '../../assets/images/checker.png';

export interface ClubCardProps {
  id: number;
  title: string;
  /** 독서 카테고리 태그, ex: ['7기', '사회'] */
  tags: string[];
  /** 모임 대상, ex: '대학생' */
  target: string;
  /** 활동 지역, ex: '서울' */
  region: string;
  /** 동아리 썸네일 URL */
  logoUrl?: string;
  /** 가입 신청 처리 함수 */
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
      w-[105px] h-[35px] rounded-[15px] px-[19.5px] py-[9px]
      text-[12px] flex items-center justify-center whitespace-nowrap cursor-pointer
      ${variant === 'primary' 
        ? 'bg-[#A6917D] text-white' 
        : 'bg-white border-[1.5px] border-[#BFAB96] text-[#434343]'
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
    ? 'absolute right-[20px] top-[20px]' 
    : 'absolute right-[20px] top-[107px]';
  
  return (
    <div className={`${positionClass} flex flex-col gap-[10px]`}>
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
  tags,
  target,
  region,
  logoUrl,
  onJoinRequest,
}: ClubCardProps): React.ReactElement {
  const [mode, setMode] = useState<'default' | 'join' | 'inquiry'>('default');
  const [joinMessage, setJoinMessage] = useState('');

  // 현재 사용자 닉네임 (실제로는 로그인된 사용자 정보에서 가져와야 함)
  const currentUserNickname = 'dayoun'; // 임시로 하드코딩

  // 더미 데이터: 이미 가입된 모임 목록 (API 명세서 참고)
  const dummyClubMembers = [
    {
      clubMemberId: 1001,
      nickname: 'dayoun', // 현재 사용자가 이미 가입된 모임
      profileImgUrl: 'https://example.com/profile.jpg',
      joinMessage: '책 너무 좋아요! 가입하고 싶어요.',
      clubMemberStatus: 'PENDING'
    },
    {
      clubMemberId: 1002,
      nickname: 'reader123',
      profileImgUrl: 'https://example.com/profile2.jpg',
      joinMessage: '모임에 꼭 참여하고 싶습니다.',
      clubMemberStatus: 'PENDING'
    }
  ];

  // 현재 모임에 이미 가입되어 있는지 확인
  const isAlreadyMember = dummyClubMembers.some(
    member => member.nickname === currentUserNickname
  );

  // 가입 신청 처리
  const handleJoinRequest = () => {
    if (isAlreadyMember) {
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

  const handleJoinClick = () => setMode('join');
  const handleInquiryClick = () => setMode('inquiry');

  return (
    <div
      className={`
        relative w-[916px] bg-white rounded-[16px] border-[2px] border-[#EAE5E2]
        overflow-hidden hover:shadow transition-all duration-300
        ${mode === 'join' ? 'h-[396px]' : mode === 'inquiry' ? 'h-[307px]' : 'h-[204px]'}
      `}
    >
      <div className="flex gap-[16px]">
        {/* 썸네일 */}
        <img
          src={logoUrl ?? checker}
          alt="club"
          className="w-[164px] h-[164px] ml-[20px] mt-[20px] rounded-lg object-cover"
        />

        {/* 정보 영역 */}
        <div className="ml-[29px] flex-1 flex flex-col">
          {/* 카테고리 태그 */}
          <div className="flex gap-[12px] mt-[24px] mb-[18px]">
            {tags.map((t) => (
              <span
                key={t}
                className="
                  inline-flex
                  items-center
                  justify-center
                  text-[12px] font-medium
                  bg-[#90D26D] text-white
                  w-[54px] h-[24px]
                  rounded-[15px]
                  whitespace-nowrap
                "
              >
                {t}
              </span>
            ))}
          </div>

          {/* 모임명 */}
          <h3
            className="
              font-pretendard font-medium text-[18px]
              leading-[135%] tracking-[-0.1%] text-[#2C2C2C]
              mb-[18px]
            "
          >
            {title}
          </h3>

          {/* 모임 대상 & 활동 지역 */}
          <p
            className="
              font-pretendard font-medium text-[14px]
              leading-[145%] tracking-[-0.1%] text-[#8D8D8D]
            "
          >
            모임 대상 | {target}
          </p>
          <p
            className="
              font-pretendard font-medium text-[14px]
              leading-[145%] tracking-[-0.1%] text-[#8D8D8D]
            "
          >
            활동 지역 | {region}
          </p>

          {/* 모드별 UI */}
          {/* 기본 모드 */}
          {mode === 'default' && (
            <ActionButtons
              onJoinClick={handleJoinClick}
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
                    font-pretendard font-medium text-[14px]
                    leading-[145%] tracking-[-0.1%] text-[#2C2C2C]
                    outline-none resize-none
                  "
                />
              </div>
              <button
                onClick={handleJoinRequest}
                className="
                  absolute left-[787px] top-[321px]
                  w-[90px] h-[35px]
                  bg-[#A6917D] text-white rounded-[16px] text-[12px]
                  flex items-center justify-center
                  cursor-pointer
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
                w-[684px] h-[91px] border-[2px] border-[#EAE5E2]
                rounded-[16px] px-[20px] py-[20px]
                font-pretendard font-medium text-[14px]
                leading-[145%] tracking-[-0.1%] text-[#2C2C2C]
                underline underline-offset-2
                flex flex-col gap-[10px]
              ">
                <a href="#">
                  카카오톡 링크 카카오톡 링크
                </a>
                <a href="#">
                  인스타 링크 인스타 링크
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
