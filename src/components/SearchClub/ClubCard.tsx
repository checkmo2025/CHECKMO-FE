// src/components/BookClub/ClubCard.tsx
import React, { useState } from 'react';
import checker from '../../assets/images/checker.png';
import { BOOK_CATEGORIES, PARTICIPANT_TYPES } from '../../types/dto';

export interface ClubCardProps {
  id: number;
  title: string;
  /** 카테고리 ID 배열, ex: [1, 2, 3] */
  category: number[];
  /** 참여자 유형 배열, ex: ['STUDENT', 'WORKER'] */
  participantTypes: string[];
  /** 활동 지역, ex: '서울' */
  region: string;
  /** 동아리 썸네일 URL */
  logoUrl?: string;
}

export default function ClubCard({
  title,
  category,
  participantTypes,
  region,
  logoUrl,
}: ClubCardProps): React.ReactElement {
  const [mode, setMode] = useState<'default' | 'join' | 'inquiry'>('default');

  // 카테고리 ID를 이름으로 변환
  const categoryNames = category.map(id => BOOK_CATEGORIES[id as keyof typeof BOOK_CATEGORIES] || `카테고리${id}`);
  
  // 참여자 유형을 이름으로 변환
  const participantNames = participantTypes.map(type => PARTICIPANT_TYPES[type as keyof typeof PARTICIPANT_TYPES] || type);

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
                  w-[54px] h-[24px]
                  rounded-[15px]
                  whitespace-nowrap
                "
              >
                {categoryName}
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
            모임 대상 | {participantNames.join(', ')}
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
            <div className="absolute right-[20px] top-[107px] flex flex-col gap-[10px]">
              <button
                onClick={() => setMode('join')}
                className="
                  w-[105px] h-[35px]
                  bg-[#A6917D] rounded-[15px]
                  px-[19.5px] py-[9px]
                  text-white text-[12px]
                  flex items-center justify-center
                  whitespace-nowrap
                  cursor-pointer
                "
              >
                가입 신청하기
              </button>
              <button
                onClick={() => setMode('inquiry')}
                className="
                  w-[105px] h-[35px]
                  bg-white border-[1.5px] border-[#BFAB96] rounded-[15px]
                  px-[19.5px] py-[9px]
                  text-[#434343] text-[12px]
                  flex items-center justify-center
                  whitespace-nowrap
                  cursor-pointer
                "
              >
                문의 하기
              </button>
            </div>
          )}

          {/* 가입 신청 모드 */}
          {mode === 'join' && (
            <>
              <div className="absolute right-[20px] top-[20px] flex flex-col gap-[10px]">
                <button
                  onClick={() => setMode('join')}
                  className="
                    w-[105px] h-[35px]
                    bg-[#A6917D] rounded-[15px]
                    px-[19.5px] py-[9px]
                    text-white text-[12px]
                    flex items-center justify-center
                    whitespace-nowrap
                    cursor-pointer
                  "
                >
                  가입 신청하기
                </button>
                <button
                  onClick={() => setMode('inquiry')}
                  className="
                    w-[105px] h-[35px]
                    bg-white border-[1.5px] border-[#BFAB96] rounded-[15px]
                    px-[19.5px] py-[9px]
                    text-[#434343] text-[12px]
                    flex items-center justify-center
                    whitespace-nowrap
                    cursor-pointer
                  "
                >
                  문의 하기
                </button>
              </div>
              <div className="absolute left-[213px] top-[196px] flex flex-col gap-[8px]">
                <textarea
                  placeholder="가입 메시지 작성"
                  className="
                    w-[699px] h-[40px] border-[2px] border-[#EAE5E2]
                    rounded-[16px] px-[20px] py-[20px]
                    font-pretendard font-medium text-[14px]
                    leading-[145%] tracking-[-0.1%] text-[#2C2C2C]
                    outline-none resize-none
                  "
                />
              </div>
            </>
          )}
          {mode === 'join' && (
            <button
              onClick={() => {}}
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
          )}

          {/* 문의 모드 */}
          {mode === 'inquiry' && (
            <>
              <div className="absolute right-[20px] top-[20px] flex flex-col gap-[10px]">
              <button
                onClick={() => setMode('join')}
                className="
                  w-[105px] h-[35px]
                  bg-[#A6917D] rounded-[15px]
                  px-[19.5px] py-[9px]
                  text-white text-[12px]
                  flex items-center justify-center
                  whitespace-nowrap
                  cursor-pointer
                "
              >
                가입 신청하기
              </button>
              <button
                onClick={() => setMode('inquiry')}
                className="
                  w-[105px] h-[35px]
                  bg-white border-[1.5px] border-[#BFAB96] rounded-[15px]
                  px-[19.5px] py-[9px]
                  text-[#434343] text-[12px]
                  flex items-center justify-center
                  whitespace-nowrap
                  cursor-pointer
                "
              >
                문의 하기
              </button>
            </div>
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
