import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BOOK_CATEGORIES } from "../../types/dto";
import checkerImage from "../../assets/images/checker.png";
import backIcon from "../../assets/icons/backIcon.png";
import calenderIcon from "../../assets/icons/calenderIcon.png";
import mapIcon from "../../assets/icons/mapIcon.png";

interface MeetingNoticeDetailProps {
  id?: number;
  title?: string;
  clubName?: string;
  meetingDate?: string;
  meetingPlace?: string;
  book?: string;
  bookAuthor?: string;
  bookPublisher?: string;
  imageUrl?: string;
  description?: string;
  bookDescription?: string;
  generation?: number; // 기수
  categories?: number[]; // 카테고리 ID 배열
}

// 카테고리 ID를 이름으로 변환하는 함수
const getCategoryName = (categoryId: number): string => {
  return BOOK_CATEGORIES[categoryId as keyof typeof BOOK_CATEGORIES] || "기타";
};

export default function MeetingNoticeDetailPage(): React.ReactElement {
  const navigate = useNavigate();
  const { meetingId } = useParams<{ meetingId: string }>();

  // 더미 데이터 목록 (나중에 API로 받아올 예정)
  const dummyMeetingData: { [key: string]: MeetingNoticeDetailProps } = {
    "1": {
      id: 1,
      title: "북적북적",
      clubName: "북적북적",
      meetingDate: "2025. 7. 3. (목) 05:20",
      meetingPlace: "홍익대학교 2캠퍼스",
      book: "넥서스",
      bookAuthor: "유발하라리",
      bookPublisher: "장비",
      imageUrl: checkerImage,
      description:
        "안녕하세요! 이번 주 토요일에 모임을 진행하려고 합니다. 이번 모임에서는 유발하라리의 넥서스를 읽고 토론할 예정입니다. 많은 참여 부탁드립니다!",
      bookDescription:
        "인류 문명의 발전 과정을 정보 네트워크의 관점에서 분석한 유발 하라리의 최신작. 정보의 흐름이 어떻게 인류의 역사를 바꾸어 왔는지, 그리고 미래에는 어떤 변화가 일어날지를 예측하는 통찰력 있는 책입니다.",
      generation: 7,
      categories: [6, 9], // 인문학, 사회과학
    },
    "4": {
      id: 4,
      title: "북적북적",
      clubName: "북적북적",
      meetingDate: "2025. 6. 12. (수)",
      meetingPlace: "강남역 2번 출구",
      book: "넥서스",
      bookAuthor: "유발하라리",
      bookPublisher: "장비",
      imageUrl: checkerImage,
      description:
        "이번 주에도 즐거운 독서 모임을 가져보아요! 넥서스 책을 통해 다양한 이야기를 나누어 보아요.",
      bookDescription:
        "인류 문명의 발전 과정을 정보 네트워크의 관점에서 분석한 유발 하라리의 최신작. 정보의 흐름이 어떻게 인류의 역사를 바꾸어 왔는지, 그리고 미래에는 어떤 변화가 일어날지를 예측하는 통찰력 있는 책입니다.",
      generation: 3,
      categories: [6, 8, 9], // 인문학, 역사/문화, 사회과학
    },
  };

  const meetingData = meetingId
    ? dummyMeetingData[meetingId]
    : dummyMeetingData["1"];

  //공지사항 정보 못 받아왔을 때 코드 작성 필요?

  return (
    <div className="mt-[60px] ml-[51px]">
      {/* 헤더 */}
      <div className="flex items-center mb-[36px]">
        <button
          onClick={() => navigate(-1)}
          className="w-[24px] h-[24px] mr-[3px] cursor-pointer"
        >
          <img src={backIcon} alt="back" />
        </button>
        <h1 className="font-pretendard font-semibold text-[24px] leading-[135%] tracking-[-0.1%] text-[#2c2c2c]">
          공지사항
        </h1>
      </div>

      {/* 메인 컨텐츠 */}
      <div>
        {/* 상단 영역 */}
        <div className="w-[552px] flex gap-[32px] mb-[12px]">
          {/* 왼쪽: 책 이미지? 모임 이미지? */}
          <div className="flex-shrink-0">
            <img
              src={meetingData.imageUrl}
              alt="book cover"
              className="w-[200px] h-[292px] object-cover"
            />
          </div>

          {/* 오른쪽: 정보 */}
          <div className="flex-1 relative">
            {/* 책 제목 */}
            <div className="flex items-center justify-between mb-[6px]">
              <h2 className="font-pretendard font-semibold text-[20px] leading-[135%] tracking-[-0.1%] text-[#000000]">
                {meetingData.book}
              </h2>
            </div>

            {/* 책 정보 */}
            <div className="mb-[20px]">
              <p className="font-pretendard font-normal text-[14px] leading-[145%] tracking-[-0.1%] text-[#8D8D8D]">
                {meetingData.bookAuthor} 지음 | 출판 {meetingData.bookPublisher}
              </p>
            </div>

            {/* 책 설명 */}
            <div className="flex items-center justify-between">
              <p className="font-pretendard font-normal text-[14px] leading-[135%] tracking-[-0.1%] text-[#000000]">
                {meetingData.bookDescription}
              </p>
            </div>

            {/* 태그 */}
            <div className="absolute bottom-[0px] flex flex-wrap gap-[8px]">
              {/* 기수 태그 */}
              {meetingData.generation && (
                <span className="inline-flex items-center justify-center min-w-[54px] px-[18px] h-[24px] bg-[#90D26D] text-white rounded-[15px] font-pretendard font-medium text-[12px] leading-[145%] tracking-[-0.1%]">
                  {meetingData.generation}기
                </span>
              )}

              {/* 독서 카테고리 태그 */}
              {meetingData.categories?.map((categoryId) => (
                <span
                  key={categoryId}
                  className="inline-flex items-center justify-center min-w-[54px] px-[16.5px] h-[24px] bg-[#90D26D] text-white rounded-[15px] font-pretendard font-medium text-[12px] leading-[145%] tracking-[-0.1%]"
                >
                  {getCategoryName(categoryId)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 일정 */}
        <div className="flex flex-col mb-[20px]">
          <h3 className="font-pretendard font-medium text-[18px] leading-[145%] tracking-[-0.1%] text-[#000000]">
            날짜
          </h3>
          <div className="bg-[#F4F2F1] w-[1080px] h-[53px] mt-[19px] rounded-[16px] flex items-center gap-[12px]">
            <img
              src={calenderIcon}
              alt="calendar"
              className="w-[24px] h-[24px] ml-[20px]"
            />
            <p className="font-pretendard font-medium text-[18px] leading-[145%] tracking-[-0.1%] text-[#000000]">
              {meetingData.meetingDate}
            </p>
          </div>
        </div>

        {/* 장소 */}
        <div className="flex flex-col mb-[36px]">
          <h3 className="font-pretendard font-medium text-[18px] leading-[145%] tracking-[-0.1%] text-[#000000]">
            장소
          </h3>
          <div className="bg-[#F4F2F1] w-[1080px] h-[53px] mt-[19px] rounded-[16px] flex items-center gap-[12px]">
            <img
              src={mapIcon}
              alt="map"
              className="w-[24px] h-[24px] ml-[20px]"
            />
            <p className="font-pretendard font-medium text-[18px] leading-[145%] tracking-[-0.1%] text-[#000000]">
              {meetingData.meetingPlace}
            </p>
          </div>
        </div>

        {/* 하단: 상세 설명 */}
        <div className="w-[1080px] h-[622px] p-[20px] border-[2px] border-[#EAE5E2] rounded-[16px] mb-[36px]">
          <p className="font-pretendard font-medium text-[14px] leading-[180%] tracking-[-0.1%] text-[#2c2c2c] whitespace-pre-line">
            {meetingData.description}
          </p>
        </div>
      </div>
    </div>
  );
}
