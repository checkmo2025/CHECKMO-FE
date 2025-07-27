// src/pages/BookClub/CreateClubPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChipToggleGroup } from '../../components/CreateClub/ChipToggleGroup';
import { createClub } from '../../apis/clubApi';
import type { ClubDto } from '../../types/dto';
import { BOOK_CATEGORIES, PARTICIPANT_TYPES } from '../../types/dto';

// 카테고리 옵션 (문자열 배열로 변환)
const BOOK_CATEGORY_OPTIONS = Object.values(BOOK_CATEGORIES);

// 참여자 유형 옵션 (문자열 배열로 변환)
const PARTICIPANT_TYPE_OPTIONS = Object.values(PARTICIPANT_TYPES);

// 카테고리 이름을 ID로 변환하는 함수
const getCategoryId = (categoryName: string): number => {
  const entry = Object.entries(BOOK_CATEGORIES).find(([id, name]) => name === categoryName);
  return entry ? parseInt(entry[0]) : 1;
};

// 참여자 유형 이름을 키로 변환하는 함수
const getParticipantKey = (participantName: string): string => {
  const entry = Object.entries(PARTICIPANT_TYPES).find(([key, name]) => name === participantName);
  return entry ? entry[0] : 'STUDENT';
};

export default function CreateClubPage(): React.ReactElement {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [duplicateCheck, setDuplicateCheck] = useState<'pending' | 'duplicate' | 'available' | null>(null);
  const [instaLink, setInstaLink] = useState('');
  const [kakaoLink, setKakaoLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 클럽 생성 핸들러
  const handleCreateClub = async () => {
    if (!clubName.trim()) {
      alert('모임 이름을 입력해주세요.');
      return;
    }
    if (!clubDescription.trim()) {
      alert('모임 소개글을 입력해주세요.');
      return;
    }
    if (open === null) {
      alert('공개/비공개 여부를 선택해주세요.');
      return;
    }
    if (selectedCategories.length === 0) {
      alert('선호하는 독서 카테고리를 선택해주세요.');
      return;
    }
    if (selectedParticipants.length === 0) {
      alert('모임 참여 대상을 선택해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const clubData: Omit<ClubDto, 'clubId'> = {
        name: clubName,
        description: clubDescription,
        open: open,
        category: selectedCategories.map(getCategoryId),
        participantTypes: selectedParticipants.map(getParticipantKey),
        region: '서울', // 임시로 서울로 설정, 나중에 지역 선택 기능 추가 필요
        insta: instaLink || undefined,
        kakao: kakaoLink || undefined,
      };

      const response = await createClub(clubData);
      if (response.isSuccess) {
        alert('모임이 성공적으로 생성되었습니다!');
        navigate('/searchClub'); // 모임 검색 페이지로 이동
      } else {
        alert(`모임 생성에 실패했습니다: ${response.message}`);
      }
    } catch (error: any) {
      console.error('모임 생성 실패:', error);
      if (error.response?.status === 409) {
        alert('이미 존재하는 독서클럽 이름입니다.');
      } else if (error.response?.status === 400) {
        alert('유효하지 않은 카테고리가 입력되었습니다. (1 ~ 15 사이의 값이어야 함)');
      } else {
        alert('모임 생성에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 p-8 min-h-screen">

      {/* 모임 이름 + 중복확인 버튼 */}
      <div className="ml-[187px] mt-[36px]">
        <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]">
          독서 모임을 입력해주세요.
        </label>
        <div className="flex flex-col mt-[16px]">
          <div className="flex gap-[4px] items-center">
            <input
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              className="w-[699px] h-[40px] rounded-[16px] px-[17px] py-[10px] bg-[#F4F2F1] text-[14px] text-[#2C2C2C] outline-none"
            />
            <button
              type="button"
              onClick={() => {
                // 임시로 중복 체크 로직 (실제로는 API 호출)
                if (clubName.trim() === '') {
                  setDuplicateCheck(null);
                  return;
                }
                // 예시: '북적북적'이 중복이라고 가정
                if (clubName.includes('북적북적')) {
                  setDuplicateCheck('duplicate');
                } else {
                  setDuplicateCheck('available');
                }
              }}
              className="w-[90px] h-[35px] ml-[19px] bg-[#90D26D] text-white rounded-[16px] text-[12px] cursor-pointer"
            >
              중복 확인
            </button>
          </div>
                      {duplicateCheck === 'duplicate' && (
              <p className="mt-[10px] font-pretendard font-medium text-[12px] leading-[145%] tracking-[-0.1%] text-[#FF8045]">
                다른 이름을 입력하거나, 기수 또는 지역명을 추가해 구분해 주세요.
                <br />
                예) 독서재량 2기, 독서재량 서울, 북적북적 인문학팀
              </p>
            )}
          {duplicateCheck === 'available' && (
            <p className="mt-[10px] font-pretendard font-medium text-[12px] leading-[145%] tracking-[-0.1%] text-[#367216]">
              사용가능한 독서 이름 입니다.
            </p>
          )}
        </div>
      </div>

        {/* 모임 소개 */}
        <div className="ml-[187px] mt-[56px] flex flex-col">
          <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]">
            모임의 소개글을 입력해주세요.
          </label>
          <textarea
            value={clubDescription}
            onChange={(e) => setClubDescription(e.target.value)}
            placeholder='내용을 입력해주세요.'
            className="w-[808px] h-[265px] rounded-[16px] border-[2px] border-[#EAE5E2] px-[20px] py-[20px] text-[14px] text-[#2C2C2C] outline-none mt-[16px] resize-none"
          />
        </div>

        {/* 프로필 사진 업로드 */}
        <div className="ml-[455.5px] mt-[56px]">
          <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]">
            모임의 프로필 사진을 업로드 해주세요.
          </label>
          <div
            className="
              ml-[27.5px] mt-[16px]
              w-[216px] h-[216px]
              bg-white rounded-[16px] border-[2px] border-[#EAE5E2]
              flex items-center justify-center
            "
          >
          <span className="text-[24px] text-gray-300">＋</span>
        </div>
      </div>

      {/* 모임 공개 여부 */}
      <div className="ml-[401px] mt-[56px]">
        <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]">
          모임의 공개/비공개 여부를 알려주세요.
        </label>
        <div className="flex gap-[24px]">
          {/* 공개 버튼 */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`
              w-[178px] h-[53px]
              mt-[16px] flex flex-col items-center justify-center
              rounded-[36px] py-[10px]
              cursor-pointer
              ${open === true
                ? 'bg-[#90D26D] text-white'
                : 'border-[1px] border-[#90D26D]'
              }
            `}
          >
            <span className={`font-pretendard font-semibold text-[12px] leading-[145%] tracking-[-0.1%] text-center ${
              open === true ? 'text-white' : 'text-[#2C2C2C]'
            }`}>
              공개
            </span>
            <span className={`font-pretendard font-normal text-[12px] mt-[4px] ${
              open === true ? 'text-white' : 'text-[#8D8D8D]'
            }`}>
              누구나 가입 가능
            </span>
          </button>

          {/* 비공개 버튼 */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={`
              w-[178px] h-[53px]
              mt-[16px] flex flex-col items-center justify-center
              rounded-[36px] py-[10px]
              cursor-pointer
              ${open === false
                ? 'bg-[#90D26D] text-white'
                : 'border-[1px] border-[#90D26D]'
              }
            `}
          >
            <span className={`font-pretendard font-semibold text-[12px] leading-[145%] tracking-[-0.1%] text-center ${
              open === false ? 'text-white' : 'text-[#2C2C2C]'
            }`}>
              비공개
            </span>
            <span className={`font-pretendard font-normal text-[12px] mt-[4px] ${
              open === false ? 'text-white' : 'text-[#8D8D8D]'
            }`}>
              운영자의 승인 필요
            </span>
          </button>
        </div>
      </div>


      {/* 독서 카테고리 */}
      <div className="ml-[394.5px] mt-[56px]">
        <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
          선호하는 독서 카테고리를 선택해주세요.
        </label>
        <div className="mt-[16px] max-w-[400px]">
          <ChipToggleGroup
            options={BOOK_CATEGORY_OPTIONS}
            selected={selectedCategories}
            onToggle={(cat) => {
              if (selectedCategories.includes(cat)) {
                setSelectedCategories(selectedCategories.filter(c => c !== cat));
              } else {
                setSelectedCategories([...selectedCategories, cat]);
              }
            }}
          />
        </div>
      </div>

      {/* 모임 참여 대상 */}
      <div className="ml-[394.5px] mt-[56px]">
        <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
          모임 참여 대상을 선택해주세요.
        </label>
        <div className="mt-[16px] max-w-[400px]">
          <ChipToggleGroup
            options={PARTICIPANT_TYPE_OPTIONS}
            selected={selectedParticipants}
            onToggle={(pt) => {
              if (selectedParticipants.includes(pt)) {
                setSelectedParticipants(selectedParticipants.filter(pp => pp !== pt));
              } else {
                setSelectedParticipants([...selectedParticipants, pt]);
              }
            }}
          />
        </div>
      </div>

      {/* SNS/카카오톡 링크 연동 (선택) */}
      <div className="ml-[394.5px] mt-[56px]">
        <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
          SNS/카카오톡 링크 연동 (선택)
        </label>
        <div className="mt-[16px] flex flex-col gap-[16px]">
          <input
            value={instaLink}
            onChange={(e) => setInstaLink(e.target.value)}
            className="w-[393px] h-[40px] bg-[#F6F5F3] rounded-full px-[17px] py-[10px] text-[14px] text-[#2C2C2C] outline-none placeholder:text-[#BBBBBB]"
          />
          <input
            value={kakaoLink}
            onChange={(e) => setKakaoLink(e.target.value)}
            className="w-[393px] h-[40px] bg-[#F6F5F3] rounded-full px-[17px] py-[10px] text-[14px] text-[#2C2C2C] outline-none placeholder:text-[#BBBBBB]"
          />
        </div>
      </div>

      {/* 유의사항 */}
      <div className="ml-[394.5px] mt-[86px] w-[393px] h-[88px] flex flex-col items-center">
        <p className="font-pretendard font-normal text-[12px] leading-[145%] tracking-[-0.1%] text-[#FF8045]">
          등록된 동아리는 수정이 불가합니다. 위 사항을 한 번 더 확인해주세요!
        </p>

        {/* 등록하기 버튼 */}
        <button
          type="button"
          className="
            w-full mt-[12px] py-[12px] bg-[#90D26D] text-white
            rounded-[16px] font-pretendard font-semibold text-[20px]
          "
        >
          등록하기
        </button>
      </div>
    </div>
  );
}
