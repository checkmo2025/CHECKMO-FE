// src/pages/BookClub/CreateClubPage.tsx
import React, { useState } from 'react';
import { ChipToggleGroup } from '../../components/CreateClub/ChipToggleGroup';
import Header from '../../components/Header';
import { useCreateClub } from '../../hooks/useCreateClub';
import { useUploadImage } from '../../hooks/useUploadImage';
import { useClubNameValidation } from '../../hooks/useClubNameValidation';
import type { CreateClubRequestDto } from '../../types/bookClub';
import { BOOK_CATEGORIES, PARTICIPANT_TYPES } from '../../types/bookClub';

// 카테고리 옵션 (문자열 배열로 변환)
const BOOK_CATEGORY_OPTIONS = Object.values(BOOK_CATEGORIES);

// 참여자 유형 옵션 (문자열 배열로 변환)
const PARTICIPANT_TYPE_OPTIONS = Object.values(PARTICIPANT_TYPES);

// 카테고리 이름을 ID로 변환하는 함수
const getCategoryId = (categoryName: string): number => {
  const entry = Object.entries(BOOK_CATEGORIES).find(([, name]) => name === categoryName);
  return entry ? parseInt(entry[0]) : 1;
};

// 참여자 유형 이름을 키로 변환하는 함수
const getParticipantKey = (participantName: string): string => {
  const entry = Object.entries(PARTICIPANT_TYPES).find(([, name]) => name === participantName);
  return entry ? entry[0] : 'STUDENT';
};

export default function CreateClubPage(): React.ReactElement {
  // React Query hooks
  const createClubMutation = useCreateClub();
  const uploadImageMutation = useUploadImage();
  
  // State
  const [clubName, setClubName] = useState('');
  const [clubDescription, setClubDescription] = useState('');
  const [visibility, setVisibility] = useState<'공개' | '비공개' | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [activityArea, setActivityArea] = useState('');
  const [insta, setInsta] = useState('');
  const [kakao, setKakao] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  // 중복검사 훅
  const { isValidating, isAvailable, isDuplicate, error, checkClubName, hasManualCheck } = useClubNameValidation();

  // 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setImageFile(file);
  };

  // 클럽 생성 핸들러
  const handleCreateClub = async () => {
    if (!clubName.trim()) {
      alert('모임 이름을 입력해주세요.');
      return;
    }
    if (!hasManualCheck) {
      alert('중복확인 버튼을 눌러 모임 이름을 확인해주세요.');
      return;
    }
    if (isDuplicate === true) {
      alert('이미 존재하는 모임 이름입니다. 다른 이름을 입력해주세요.');
      return;
    }
    if (isValidating) {
      alert('모임 이름을 확인 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    if (!clubDescription.trim()) {
      alert('모임 소개글을 입력해주세요.');
      return;
    }
    if (visibility === null) {
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

    let profileImageUrl: string | undefined;
    
    // 이미지가 있는 경우 presigned URL 발급 및 비동기 업로드
    if (imageFile) {
      profileImageUrl = await uploadImageMutation.mutateAsync(imageFile);
      // uploadImage는 즉시 imageUrl을 반환하고 S3 업로드는 백그라운드에서 진행
    }

    const clubData: CreateClubRequestDto = {
      name: clubName,
      description: clubDescription,
      profileImageUrl,
      open: visibility === '공개',
      category: selectedCategories.map(getCategoryId),
      participantTypes: selectedParticipants.map(getParticipantKey),
      region: activityArea || '서울',
      insta: insta || undefined,
      kakao: kakao || undefined,
    };

    createClubMutation.mutate(clubData);
  };

  return (
    <div className="absolute left-[315px] right-[42px] opacity-100">
      <Header 
        pageTitle="모임 생성하기" 
        notifications={[]}
        customClassName="mt-[30px]"
      />

      <div className="mt-[15px] flex flex-col items-center overflow-y-auto h-[calc(100vh-90px)] w-full pb-[80px]">
        {/* 모임 이름 */}
        <div className="mt-[36px]">
          <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]">
            독서 모임을 입력해주세요.
          </label>
          <div className="flex flex-col mt-[16px]">
            <div className="flex gap-[12px] items-center">
              <input
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                className={`w-[699px] h-[40px] rounded-[16px] px-[17px] py-[10px] bg-[#F4F2F1] text-[14px] text-[#2C2C2C] outline-none`}
              />
              <button
                type="button"
                onClick={() => checkClubName(clubName)}
                disabled={!clubName.trim() || isValidating}
                className="
                  w-[90px] h-[35px] 
                  bg-[#90D26D] text-white
                  rounded-[16px] font-medium text-[12px]
                  disabled:opacity-50 disabled:cursor-not-allowed
                  cursor-pointer hover:bg-[#7BC55A] transition-colors
                "
              >
                {isValidating ? '확인중' : '중복확인'}
              </button>
            </div>
            {/* 중복검사 결과 표시 */}
            {isAvailable === true && (
              <p className="mt-[10px] font-medium text-[12px] text-[#367216]">
                사용가능한 독서 이름 입니다.
              </p>
            )}
            {isDuplicate === true && (
              <p className="mt-[10px] font-pretendard font-medium text-[12px] leading-[145%] tracking-[-0.1%] text-[#FF8045]">
                다른 이름을 입력하거나, 기수 또는 지역명을 추가해 구분해 주세요.
                <br />
                예) 독서재량 2기, 독서재량 서울, 북적북적 인문학팀
              </p>
            )}
            {error && (
              <div className="mt-2 text-red-500 text-sm">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* 모임 소개 */}
        <div className="mt-[56px] flex flex-col">
          <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]">
            모임의 소개글을 입력해주세요.
          </label>
          <textarea
            value={clubDescription}
            onChange={(e) => setClubDescription(e.target.value)}
            placeholder='내용을 입력해주세요.'
            className="w-[808px] h-[265px] rounded-[16px] border-[2px] border-[#EAE5E2] px-[20px] py-[20px] text-[14px] text-[#BBBBBB] outline-none mt-[16px] resize-none"
          />
        </div>

        {/* 프로필 사진 업로드 */}
        <div className="mt-[56px] flex flex-col items-center">
          <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] ">
            모임의 프로필 사진을 업로드 해주세요.
          </label>
          <label
            htmlFor="profile-upload"
            className="
              mt-[16px]
              w-[216px] h-[216px]
              bg-white rounded-[16px] border-[2px] border-[#EAE5E2]
              flex flex-col items-center justify-center
              cursor-pointer
              relative
              overflow-hidden
            "
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="프로필 미리보기"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[24px] text-gray-300">＋</span>
            )}
            <input
              type="file"
              id="profile-upload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* 모임 공개 여부 */}
        <div className="mt-[56px]">
          <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%]">
            모임의 공개/비공개 여부를 알려주세요.
          </label>
          <div className="flex gap-[24px]">
            {/* 공개 버튼 */}
            <button
              type="button"
              onClick={() => setVisibility('공개')}
              className={`
                w-[178px] h-[53px]
                mt-[16px] flex flex-col items-center justify-center
                rounded-[36px] py-[10px]
                cursor-pointer
                ${visibility === '공개' 
                  ? 'bg-[#90D26D] text-white' 
                  : 'border-[1px] border-[#90D26D]'
                }
              `}
            >
              <span className={`font-pretendard font-semibold text-[12px] leading-[145%] tracking-[-0.1%] text-center ${
                visibility === '공개' ? 'text-white' : 'text-[#2C2C2C]'
              }`}>
                공개
              </span>
              <span className={`font-pretendard font-normal text-[12px] mt-[4px] ${
                visibility === '공개' ? 'text-white' : 'text-[#8D8D8D]'
              }`}>
                누구나 가입 가능
              </span>
            </button>

            {/* 비공개 버튼 */}
            <button
              type="button"
              onClick={() => setVisibility('비공개')}
              className={`
                w-[178px] h-[53px]
                mt-[16px] flex flex-col items-center justify-center
                rounded-[36px] py-[10px]
                cursor-pointer
                ${visibility === '비공개' 
                  ? 'bg-[#90D26D] text-white' 
                  : 'border-[1px] border-[#90D26D]'
                }
              `}
            >
              <span className={`font-pretendard font-semibold text-[12px] leading-[145%] tracking-[-0.1%] text-center ${
                visibility === '비공개' ? 'text-white' : 'text-[#2C2C2C]'
              }`}>
                비공개
              </span>
              <span className={`font-pretendard font-normal text-[12px] mt-[4px] ${
                visibility === '비공개' ? 'text-white' : 'text-[#8D8D8D]'
              }`}>
                운영자의 승인 필요
              </span>
            </button>
          </div>
        </div>

        {/* 독서 카테고리 */}
        <div className="mt-[56px]">
          <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
            선호하는 독서 카테고리를 선택해주세요.
          </label>
          <div className="mt-[16px] max-w-[400px]">
            <ChipToggleGroup
              options={BOOK_CATEGORY_OPTIONS}
              onChange={setSelectedCategories}
            />
          </div>
        </div>

        {/* 모임 참여 대상 */}
        <div className="mt-[56px]">
          <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
            모임 참여 대상을 선택해주세요.
          </label>
          <div className="mt-[16px] max-w-[400px]">
            <ChipToggleGroup
              options={PARTICIPANT_TYPE_OPTIONS}
              onChange={setSelectedParticipants}
            />
          </div>
        </div>

        {/* 활동 지역 */}
        <div className="mt-[56px]">
          <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
            활동 지역을 작성해주세요.
          </label>
          <div className="mt-[16px] flex flex-col gap-[16px]">
            <input
              value={activityArea}
              onChange={(e) => setActivityArea(e.target.value)}
              className="w-[393px] h-[40px] bg-[#F6F5F3] rounded-full px-[17px] py-[10px] text-[14px] text-[#2C2C2C] outline-none placeholder:text-[#BBBBBB]"
            />
          </div>
        </div>

        {/* SNS/카카오톡 링크 연동 (선택) */}
        <div className="mt-[56px]">
          <label className="font-pretendard font-medium text-[18px] leading-[135%] tracking-[-0.1%] px-[6.5px]">
            SNS/카카오톡 링크 연동 (선택)
          </label>
          <div className="mt-[16px] flex flex-col gap-[16px]">
            <input
              value={insta}
              onChange={(e) => setInsta(e.target.value)}
              className="w-[393px] h-[40px] bg-[#F6F5F3] rounded-full px-[17px] py-[10px] text-[14px] text-[#2C2C2C] outline-none placeholder:text-[#BBBBBB]"
            />
            <input
              value={kakao}
              onChange={(e) => setKakao(e.target.value)}
              className="w-[393px] h-[40px] bg-[#F6F5F3] rounded-full px-[17px] py-[10px] text-[14px] text-[#2C2C2C] outline-none placeholder:text-[#BBBBBB]"
            />
          </div>
        </div>

        {/* 유의사항 */}
        <div className="mt-[86px] w-[393px] h-[88px] flex flex-col items-center">
          <p className="font-pretendard font-normal text-[12px] leading-[145%] tracking-[-0.1%] text-[#FF8045]">
            등록된 동아리명은 수정이 불가합니다. 위 사항을 한 번 더 확인해주세요!
          </p>

          {/* 등록하기 버튼 */}
          <button
            type="button"
            onClick={handleCreateClub}
            disabled={
              createClubMutation.isPending || 
              uploadImageMutation.isPending || 
              isValidating || 
              isDuplicate === true ||
              !clubName.trim()
            }
            className="
              w-full mt-[12px] py-[12px] bg-[#90D26D] text-white
              rounded-[16px] font-pretendard font-semibold text-[20px]
              disabled:opacity-50 disabled:cursor-not-allowed
              cursor-pointer
            "
          >
            {createClubMutation.isPending || uploadImageMutation.isPending ? '등록 중...' : '등록하기'}
          </button>
        </div>
        
        {/* 하단 여백 */}
        <div className="h-[20px]"></div>
      </div>
    </div>
  );
}