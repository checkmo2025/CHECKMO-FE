import type { VoteParticipant, VoteOption } from '../types/announcement';

// 더미 사용자 이름 목록
const dummyUserNames = [
  '김민수', '이영희', '박준호', '최수연', '정다은', '장현우', '윤서영', '임태혁',
  '송지민', '한소희', '류승훈', '오나영', '권도현', '신예은', '배성호', '안지우',
  '강민정', '홍준석', '조유진', '문상훈', '노수빈', '서동욱', '유채영', '남태현'
];

// 투표자 더미 데이터 생성 함수
export const generateMockVoters = (optionValue: string, count: number): VoteParticipant[] => {
  const voters: VoteParticipant[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomNameIndex = Math.floor(Math.random() * dummyUserNames.length);
    const userName = dummyUserNames[randomNameIndex] || `사용자${i + 1}`;
    
    voters.push({
      userId: `user_${optionValue}_${i}`,
      userName: userName,
      userImageUrl: `https://via.placeholder.com/150?text=${encodeURIComponent(userName)}`,
      userDescription: `책을 아는가? 나는 모른다.`,
      selectedOptions: [optionValue],
    });
  }
  
  return voters;
};

// 투표 결과 더미 데이터 생성 함수
export const generateMockVoteResults = (options: VoteOption[]) => {
  const mockResults: {[key: string]: {count: number, voters: VoteParticipant[]}} = {};
  
  options.forEach((option) => {
    const voterCount = Math.floor(Math.random() * 20) + 5; // 5-24명 랜덤
    const voters = generateMockVoters(option.value, voterCount);
    
    mockResults[option.value] = {
      count: voterCount,
      voters: voters
    };
  });
  
  return mockResults;
};

// API 호출을 시뮬레이션하는 함수
export const fetchVoteResults = async (voteId: string, options: VoteOption[]) => {
  // 실제 API 호출을 시뮬레이션 (지연 시간 포함)
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return generateMockVoteResults(options);
}; 