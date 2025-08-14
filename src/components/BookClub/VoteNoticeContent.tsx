// =============================================================================
// VoteNoticeContent: 투표 공지사항 컴포넌트
// 기능: 투표 진행, 투표 완료 후 결과 보기, 다시 투표, 투표자 목록 확인
// =============================================================================

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { voteNoticeItemDto, voteItemDto } from '../../types/clubNotice';
import { submitVoteNotice, getVoteNoticeDetail } from '../../apis/clubAnnouncements/clubNoticeApi';
import VoteNoticeModal from './VoteNoticeModal';
import VoterDropdown from './VoterDropdown';
import { parseISO, format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface VoteNoticeContentProps {
  data: voteNoticeItemDto;
  registerBackBlocker?: (fn: () => boolean) => void | (() => void);
}

export default function VoteNoticeContent({ data, registerBackBlocker }: VoteNoticeContentProps): React.ReactElement {
  // =============================================================================
  // HOOKS & STATE 관리
  // =============================================================================
  const navigate = useNavigate();
  const { bookclubId } = useParams<{ bookclubId: string }>();
  
  // 투표 관련 상태
  const [selectedIndexes, setSelectedIndexes] = React.useState<number[]>([]); // 사용자가 선택한 투표 옵션 index들
  const [hasVoted, setHasVoted] = React.useState<boolean>(false); // 투표 완료 여부 (UI 전환의 핵심 상태)
  const [current, setCurrent] = React.useState<voteNoticeItemDto>(data);
  
  // 모달 관련 상태
  const [showModal, setShowModal] = React.useState<boolean>(false); // 페이지 나가기 확인 모달
  
  // 각 옵션별 투표자 목록 드롭다운 상태
  const [openVoterDropdowns, setOpenVoterDropdowns] = React.useState<{[key: string]: boolean}>({});
  
  // 브라우저 히스토리 조작 관련
  const [historyAdded, setHistoryAdded] = React.useState<boolean>(false); // 히스토리 엔트리 추가 여부

  // =============================================================================
  // EFFECTS - 부수 효과 처리
  // =============================================================================
  
  // 데이터 변경 시 현재 상태 최신화 및 서버 상태로 hasVoted/selectedIndexes 동기화
  React.useEffect(() => {
    setCurrent(data);
    const serverItems = data.items?.items ?? [];
    const initiallySelectedIndexes = serverItems
      .map((item, idx) => (item.selected ? idx : -1))
      .filter((idx) => idx !== -1);
    setSelectedIndexes(initiallySelectedIndexes);
    setHasVoted(initiallySelectedIndexes.length > 0);
  }, [data]);

  // 상단 뒤로가기 버튼 차단 로직은 부모의 registerBackBlocker로만 처리
  // 부모는 클린업 함수를 반환할 수 있으며, 언마운트/의존성 변경 시 호출하여 누수를 방지
  React.useEffect(() => {
    if (!registerBackBlocker) return;
    const blocker = () => {
      if (!hasVoted && selectedIndexes.length > 0) {
        setShowModal(true);
        return true; // 차단됨
      }
      return false; // 차단 안 함
    };
    const cleanup = registerBackBlocker(blocker);
    return () => {
      if (typeof cleanup === 'function') cleanup();
    };
  }, [registerBackBlocker, selectedIndexes, hasVoted]);

  // 브라우저 뒤로가기 감지 및 처리
  React.useEffect(() => {
    const handlePopState = () => {
      // 투표 중에 뒤로가기 시 확인 모달 표시
      if (selectedIndexes.length > 0 && !hasVoted && historyAdded) {
        // 뒤로가기를 막고 현재 페이지 유지 후 모달 표시
        window.history.pushState(null, '', window.location.href);
        setShowModal(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedIndexes, hasVoted, historyAdded]);

  // 투표자 드롭다운 외부 클릭 시 닫기
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.voter-dropdown-container')) {
        setOpenVoterDropdowns({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // =============================================================================
  // EVENT HANDLERS - 이벤트 처리 함수들
  // =============================================================================
  
  // 투표 관련 핸들러들
  // ---------------------------------------------------------------------------
  
  // 투표 옵션 선택/해제 처리
  const handleVoteChange = (index: number) => {
    if (hasVoted) return; // 투표 완료 후에는 변경 불가
    
    setSelectedIndexes(prev => {
      // 다중투표 가능 여부에 따라 선택 로직 분기 후 결과를 newVotes로 저장
      const newVotes = current.duplication
        ? (prev.includes(index) ? prev.filter(v => v !== index) : [...prev, index])
        : (prev.includes(index) ? [] : [index]);
      if (newVotes.length > 0 && !historyAdded) {
        // 처음 투표 선택 시 히스토리 엔트리 추가
        window.history.pushState(null, '', window.location.href);
        setHistoryAdded(true);
      } else if (newVotes.length === 0 && historyAdded) {
        // 모든 투표 선택 해제 시 히스토리 엔트리 제거
        window.history.back();
        setHistoryAdded(false);
      }
      
      return newVotes;
    });
  };

  // 투표 제출 처리
  const handleVoteSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault(); // form submit으로 인한 페이지 리로드 방지
    }
    
    if (selectedIndexes.length === 0) {
      return; // 선택된 투표가 없으면 실행 안함
    }

    // API payload 구성: { item1: boolean, item2: boolean, ... } (명세 반영)
    const payload: Record<string, boolean> = {};
    const options = current.items?.items ?? [];
    options.forEach((_, i) => {
      payload[`item${i + 1}`] = selectedIndexes.includes(i);
    });

    // 투표 제출 API 호출
    try {
      const clubId = Number(bookclubId);
      if (!Number.isFinite(clubId) || clubId <= 0) {
        console.error('잘못된 clubId 입니다:', bookclubId);
        return;
      }
      await submitVoteNotice(Number(bookclubId), current.id, payload);
      // 서버 저장 후 최신 상세 재조회하여 반영 (selected, voteCount, votedMembers 포함)
      const refreshed = await getVoteNoticeDetail(Number(bookclubId), current.id);
      setCurrent(refreshed);
      // 서버 응답 기준으로 선택 및 투표 여부 동기화
      const serverItems = refreshed.items?.items ?? [];
      const newlySelected = serverItems
        .map((item, idx) => (item.selected ? idx : -1))
        .filter((idx) => idx !== -1);
      setSelectedIndexes(newlySelected);
      setHasVoted(newlySelected.length > 0);
    } catch (err) {
      // TODO: 에러 처리 토스트 등
      console.error(err);
      return;
    }
    
    setHasVoted(true); // 투표 완료 상태로 변경 → UI 전환
    setHistoryAdded(false); // 투표 완료 시 더 이상 히스토리 조작 불필요
  };

  // 다시 투표 처리
  const handleRevote = () => {
    setHasVoted(false); // 투표 완료 상태 해제 → 다시 투표 가능한 UI로 전환
    setSelectedIndexes([]); // 선택한 투표 초기화
    setHistoryAdded(false); // 히스토리 상태 초기화
    setOpenVoterDropdowns({}); // 모든 투표자 드롭다운 닫기
    // 투표 결과는 유지 (서버에서 관리되는 데이터이므로)
  };

  // 투표 결과 관련 핸들러들
  // ---------------------------------------------------------------------------
  
  // 투표자 드롭다운 토글 (각 옵션별로 독립적)
  const handleVoterDropdownToggle = (optionValue: string) => {
    setOpenVoterDropdowns(prev => ({
      ...prev,
      [optionValue]: !prev[optionValue]
    }));
  };

  // 모달 관련 핸들러들
  // ---------------------------------------------------------------------------
  
  // 페이지 나가기 확인 - 확인 버튼 클릭
  const handleConfirmLeave = () => {
    setShowModal(false);
    setSelectedIndexes([]);
    setHasVoted(true);
    setHistoryAdded(false);
    
    // 현재 URL에서 클럽 ID를 추출하여 공지사항 목록 페이지로 이동
    const currentPath = window.location.pathname;
    const clubIdMatch = currentPath.match(/\/bookclub\/(\d+)/);
    
    if (clubIdMatch && clubIdMatch[1]) {
      const clubId = clubIdMatch[1];
      navigate(`/bookclub/${clubId}/notices`);
    } else {
      // 클럽 ID를 찾을 수 없는 경우 기본적으로 -1로 이동
      navigate(-1);
    }
  };

  // 페이지 나가기 확인 - 취소 버튼 클릭
  const handleCancelLeave = () => {
    setShowModal(false);
  };

  // =============================================================================
  // UI RENDER - 컴포넌트 렌더링
  // =============================================================================
  
  return (
    <div>
      {/* 메인 콘텐츠 영역 */}
      <div className="w-[1080px] min-h-[622px] p-[20px] border-[2px] border-[#EAE5E2] rounded-[16px] mb-[36px] mx-auto">
        
        {/* 제목 영역 */}
        <div className="w-full h-[57px] border-b-[2px] border-[#EEEEEE] mb-[20px]">
          <h3 className="pt-[10px] pb-[20px] pl-[23.5px] font-pretendard font-semibold text-[20px] leading-[145%] tracking-[-0.1%] text-[#000000] ">
            {current.title}
          </h3>
        </div>
        
        {/* 투표 마감일 표시 */}
        <p className="px-[20px] py-[10px] font-medium text-[18px] text-[#2c2c2c] whitespace-pre">
          {(() => {
            if (!current.deadline) return '';
            try {
              const d = parseISO(current.deadline);
              return format(d, "yyyy. M. d. (eee) HH:mm '까지'", { locale: ko });
            } catch {
              return `${current.deadline} 까지`;
            }
          })()}
        </p>

        {/* 익명 여부, 중복 투표 가능 여부 표시 */}
        {(() => {
          const labels: string[] = [];
          if (current.anonymity) labels.push('익명 투표');
          if (current.duplication) labels.push('중복 투표');
          const text = labels.join(' | ');
          return text ? (
            <p className="px-[20px] py-[4px] text-[14px] text-[#8D8D8D] mb-[20px] ">
              {text}
            </p>
          ) : null;
        })()}

        {/* 투표 설명 */}
        <p className="px-[20px] py-[10px] font-pretendard font-medium text-[18px] leading-[180%] tracking-[-0.1%] text-[#2c2c2c] whitespace-pre mb-[20px]">
            {current.content}
        </p>

        {/* 투표 섹션 */}
        <div className="w-[969px] px-[40px] mt-[40px]">
          <form onSubmit={handleVoteSubmit}>
            
            {/* 투표 옵션들 */}
            {current.items?.items?.map((option: voteItemDto, index: number) => (
              <div key={`${option.item}-${index}`} className="relative voter-dropdown-container pb-[17px]">
                <label className="flex items-center w-full cursor-pointer">
                  {/* 라디오 버튼 */}
                  <input
                    type="checkbox"
                    value={index}
                    checked={selectedIndexes.includes(index)}
                    onChange={() => handleVoteChange(index)}
                    disabled={hasVoted} // 투표 완료 후 비활성화
                    className={`appearance-none w-[24px] h-[24px] rounded-full cursor-pointer mr-[12px] flex-shrink-0 aspect-square relative transition-all duration-200 border-[2px] ${
                      selectedIndexes.includes(index) 
                        ? 'border-[#FF8045] bg-[#FF8045]' 
                        : 'border-[#BBBBBB] bg-[#EEEEEE]'
                    } ${hasVoted ? 'cursor-not-allowed opacity-50' : ''}`}
                  />
                  
                  {/* 투표 옵션 박스 */}
                  <div className={`w-[933px] h-[64px] rounded-[16px] p-[20px] flex items-center justify-between ${
                    hasVoted ? 'bg-[#FFFFFF] border-[2px] border-[#DED6CD]' : 'bg-[#EEEEEE]'
                  }`}>
                    {/* 옵션 라벨 (왼쪽) */}
                    <span className="font-pretendard font-medium text-[18px] leading-[145%] tracking-[-0.1%] text-[#2C2C2C]">
                      {option.item}
                    </span>
                    
                    {/* 투표자 드롭다운 컴포넌트 */}
                    {hasVoted && current.items?.items?.[index] && (
                      <VoterDropdown
                        voters={current.items.items[index].votedMembers}
                        optionLabel={option.item}
                        voterCount={current.items.items[index].voteCount}
                        isOpen={openVoterDropdowns[String(index)] || false}
                        onToggle={() => handleVoterDropdownToggle(String(index))}
                      />
                    )}
                  </div>
                </label>
              </div>
            ))}
            
            {/* 투표/다시투표 버튼 영역 */}
            <div className="flex items-center justify-end mt-[4px] mr-[0px] mb-[20px]">
              {!hasVoted ? (
                // 투표하기 버튼 (투표 전)
                <button
                  type="submit"
                  disabled={selectedIndexes.length === 0}
                  className="w-[105px] h-[35px] bg-[#FF8045] text-white rounded-[16px] font-pretendard font-semibold text-[12px] leading-[145%] tracking-[-0.1%] whitespace-nowrap cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  투표하기
                </button>
              ) : (
                // 다시 투표 버튼 (투표 완료 후)
                <button
                  type="button"
                  onClick={handleRevote}
                  className="w-[105px] h-[35px] bg-[#FF8045] text-white rounded-[16px] font-pretendard font-semibold text-[12px] leading-[145%] tracking-[-0.1%] whitespace-nowrap cursor-pointer hover:bg-[#e6723e] transition-colors"
                >
                  다시 투표
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* 페이지 나가기 확인 모달 */}
      {showModal && (
        <VoteNoticeModal
          message="현재 창을 나가시면
          결과가 저장되지 않습니다!"
          onConfirm={handleConfirmLeave}
          onCancel={handleCancelLeave}
        />
      )}
    </div>
  );
} 