import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteVote } from '../../hooks/ClubNotice/useDeleteVote';
import logoImage from '../../assets/logos/clearMainLogo.png';
import vector from "../../assets/icons/mainnotice.svg";
import type { noticeListItemDto, voteItemDto } from '../../types/clubNotice';
import { mapTagToRouteType } from '../../types/noticeType';
import { parseISO, format } from 'date-fns';
import Modal from '../Modal';
import { useDeleteGeneralNotice } from '../../hooks/ClubNotice/useDeleteGeneralNotice';

export default function AnnouncementList({
  items,
  isStaff = false,
}: {
  items: noticeListItemDto[];
  isStaff?: boolean;
}): React.ReactElement {
  const navigate = useNavigate();
  const { bookclubId } = useParams<{ bookclubId: string }>();
  const clubIdNum = Number(bookclubId) || 0;
  const { mutate: deleteVote, isPending: deletingVote } = useDeleteVote(clubIdNum);
  const { mutate: deleteGeneral, isPending: deletingGeneral } = useDeleteGeneralNotice(clubIdNum);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetVoteId, setTargetVoteId] = useState<number | null>(null);
  const [targetGeneralId, setTargetGeneralId] = useState<number | null>(null);
  const handleItemClick = (item: noticeListItemDto) => {
    if (!bookclubId) return;
    const noticeId = item.id;
    const type = mapTagToRouteType(item.tag);
    navigate(`/bookclub/${bookclubId}/notices/${noticeId}?type=${type}`);
  };

  return (
    <div className="space-y-[12px] mx-auto w-full max-w-[1700px] px-4 sm:px-5">
      {items.map(item => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item)}
          className="
            w-full md:min-h-[204px] min-h-[180px]
            relative flex items-start
            bg-white border-[2px] border-[#EAE5E2] rounded-[16px]
            cursor-pointer
            hover:bg-gray-50 hover:shadow-lg hover:scale-[1.03] transition-all duration-300 origin-center
          "
        >
          {/* 왼쪽: 이미지 (모임이면 책 이미지, 아니면 로고를 128x64로 표시) */}
          {item.tag === '모임' && item.meetingInfoDTO?.bookInfo?.imgUrl ? (
            <img
              src={item.meetingInfoDTO.bookInfo.imgUrl}
              alt="notice thumbnail"
              className="hidden sm:block sm:w-[128px] sm:h-[164px] ml-4 sm:ml-[21.5px] mt-4 sm:mt-[20px] rounded-lg object-cover"
            />
          ) : (
            <div className="hidden sm:flex sm:w-[128px] sm:h-[164px] ml-4 sm:ml-[21.5px] mt-4 sm:mt-[20px] rounded-lg items-center justify-center overflow-hidden bg-white">
              <img
                src={logoImage}
                alt="logo"
                className="w-full h-full object-contain"
              />
            </div>
          )}

          {/* 오른쪽: 내용 */}
          <div className="ml-4 sm:ml-[29px] mt-4 sm:mt-[23px] flex-1 min-w-0">
            {/* 제목 */}
            <div className="flex items-center min-w-0">
              <img src={vector} alt="icon" className="w-[24px] h-[24px]" />
              <p className="ml-[13px] font-medium text-[16px] sm:text-[18px] text-[#000000] line-clamp-2">
                {item.title}
              </p>
            </div>

            {/* 본문 */}
            <div className="mt-[12px] sm:mt-[18px] space-y-[5px] font-medium text-[13px] sm:text-[14px] text-[#8D8D8D]">
              {item.tag === '모임' && item.meetingInfoDTO && (
                <>
                  <p>
                    다음 모임 날짜: {
                      (() => {
                        try {
                          const d = parseISO(item.meetingInfoDTO!.meetingTime);
                          return format(d, 'yyyy. MM. dd');
                        } catch {
                          return item.meetingInfoDTO!.meetingTime;
                        }
                      })()
                    }
                  </p>
                  <p className="line-clamp-2">
                    다음 모임 책: {item.meetingInfoDTO.bookInfo?.title} | {item.meetingInfoDTO.bookInfo?.author}
                  </p>
                </>
              )}

              {item.tag === '투표' && (
                <>
                  <p className="whitespace-pre-line line-clamp-2">{item.content}</p>
                  {Array.isArray(item.items) && item.items.length > 0 && (
                    <div className="mt-[8px] text-[12px] sm:text-[13px] text-[#8D8D8D]">
                      {item.items.slice(0, 3).map((opt: voteItemDto, i: number) => (
                        <span key={`${opt.item}-${i}`} className="mr-2">• {opt.item}</span>
                      ))}
                    </div>
                  )}
                </>
              )}

              {item.tag === '공지' && item.content && (
                <>
                  <p className="whitespace-pre-line line-clamp-2">
                    {item.content}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* 태그 */}
          <span
            className={`
              absolute top-[23px] right-[21.5px]
              hidden lg:inline-flex items-center justify-center
              w-[44px] h-[20px] sm:w-[52px] sm:h-[22px]
              rounded-[15px]
              text-[11px] sm:text-[12px] font-[600]
              text-white whitespace-nowrap
              ${item.tag === '모임' ? 'bg-[#90D26D]' :
                item.tag === '투표' ? 'bg-[#FF8045]' :
                  'bg-[#FFC648]'} /* 모임: #90D26D, 투표: #FF8045, 공지: #FFC648 */
            `}
          >
            {item.tag}
          </span>

          {/* 삭제하기 버튼 (운영진이면서 투표/공지일 때만 표시) */}
          {isStaff && (item.tag === '투표' || item.tag === '공지') && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (item.tag === '투표') {
                  setTargetVoteId(item.id);
                  setConfirmOpen(true);
                } else {
                  setTargetGeneralId(item.id);
                  setConfirmOpen(true);
                }
              }}
              className="
                hidden lg:block absolute sm:bottom-[63px] bottom-[56px] right-[21.5px]
                w-[88px] h-[32px] sm:w-[105px] sm:h-[35px]
                border-2 border-[#EAE5E2]
                rounded-[16px]
                font-medium text-[11px] sm:text-[12px]
                text-[#8D8D8D]
                bg-white
                whitespace-nowrap
                cursor-pointer
                hover:bg-[#F7F5F3]
                transition-colors
                z-10
                disabled:opacity-50 disabled:cursor-not-allowed
              "
              disabled={deletingVote || deletingGeneral}
            >
              삭제하기
            </button>
          )}

          {/* 상세보기 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleItemClick(item);
            }}
            className="
              hidden lg:block absolute bottom-[23px] right-[21.5px]
              w-[96px] h-[32px] sm:w-[105px] sm:h-[35px]
              bg-[#A6917D]
              rounded-[16px]
              font-medium text-[12px]
              text-white
              whitespace-nowrap
              cursor-pointer
              hover:bg-[#9A8471]
              transition-colors
            "
          >
            상세보기
          </button>
        </div>
      ))}

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={confirmOpen}
        title={targetVoteId != null ? '투표를 삭제하시겠습니까?' : '공지사항을 삭제하시겠습니까?'}
        buttons={[
          {
            label: '삭제하기',
            variant: 'primary',
            onClick: () => {
              if (targetVoteId != null) {
                deleteVote(targetVoteId);
              } else if (targetGeneralId != null) {
                deleteGeneral(targetGeneralId);
              }
              setConfirmOpen(false);
              setTargetVoteId(null);
              setTargetGeneralId(null);
            },
          },
          {
            label: '취소',
            variant: 'outline',
            onClick: () => {
              setConfirmOpen(false);
              setTargetVoteId(null);
              setTargetGeneralId(null);
            },
          },
        ]}
        onBackdrop={() => {
          setConfirmOpen(false);
          setTargetVoteId(null);
          setTargetGeneralId(null);
        }}
      />
    </div>
  );
}
