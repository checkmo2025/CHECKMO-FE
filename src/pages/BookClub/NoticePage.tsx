import { useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import AnnouncementCard from '../../components/BookClub/AnnouncementCard';
import AnnouncementList from '../../components/BookClub/AnnouncementList';
import NoticeCreateDropdown from '../../components/BookClub/NoticeCreateHoverMenu';
import { useIsStaff } from '../../hooks/BookClub/useIsStaff';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useClubNotices } from '../../hooks/BookClub/useClubNotices';
import { useClubNoticesInfinite } from '../../hooks/BookClub/useClubNoticesInfinite';
import type { noticeListItemDto } from '../../types/clubNotice';

export default function NoticePage(): React.ReactElement {
  const navigate = useNavigate();
  const { bookclubId } = useParams<{ bookclubId: string }>();
  const numericClubId = useMemo(() => Number(bookclubId) || 0, [bookclubId]);
  const { data: isStaff } = useIsStaff(numericClubId);

  const { notices: topNotices, loading: topLoading, error: topError } = useClubNotices({
    clubId: numericClubId,
    onlyImportant: true,
    size: 5,
  });

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useClubNoticesInfinite(numericClubId, 10);
  const allNotices: noticeListItemDto[] = useMemo(() => data?.pages.flatMap((p) => p.noticeList) ?? [], [data]);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!hasNextPage || isLoading || isFetchingNextPage) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });
    const el = loadMoreRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

  const listItems = allNotices;

  return (
    <div className="w-full h-screen flex flex-col">
      <Header pageTitle={'공지사항'}
        customClassName="mt-[30px] ml-[52px] mr-[41px] mb-[15px]"
      />

      <div className="flex-1 overflow-y-auto ml-[52px] mr-4">
        <div className="mt-[15px]">
          <section className="mb-6">
            {topLoading && (
              <div className="w-full h-[120px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px]">
                <p className="text-[#969696]">중요 공지사항을 불러오는 중...</p>
              </div>
            )}
            {topError && (
              <div className="w-full h-[120px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px]">
                <p className="text-red-500">{topError}</p>
              </div>
            )}
            {!topLoading && !topError && (topNotices.length ?? 0) > 0 && (
              <AnnouncementCard items={topNotices} />
            )}
            {!topLoading && !topError && topNotices.length === 0 && (
              <div className="w-full h-[120px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px]">
                <p className="text-[#969696]">아직 등록된 중요 공지사항이 없습니다.</p>
              </div>
            )}
          </section>

          <section className="mt-[43px]">
            {isStaff && (
              <div className="relative h-[48px] mb-4">
                <NoticeCreateDropdown
                  onSelectNoticeType={(type) => {
                    const noticeType = type === 'vote' ? 'poll' : 'notice';
                    navigate(`/bookclub/${numericClubId}/notices/create?type=${noticeType}`);
                  }}
                  className="z-10"
                />
              </div>
            )}
            {isError && (
              <div className="w-full h-[120px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px]">
                <p className="text-red-500">{(error as Error)?.message ?? '공지사항을 불러오지 못했어요.'}</p>
              </div>
            )}
            <div className="pb-12">
              {!isError && listItems.length > 0 && (
                <AnnouncementList items={listItems} isStaff={!!isStaff} />
              )}
              {!isError && !isLoading && listItems.length === 0 && (
                <div className="w-full h-[120px] flex items-center justify-center border-2 border-[#EAE5E2] rounded-[16px]">
                  <p className="text-[#969696]">아직 등록된 공지사항이 없습니다.</p>
                </div>
              )}
              <div ref={loadMoreRef} className="h-[1px]" />
              {isFetchingNextPage && (
                <div className="w-full py-4 flex items-center justify-center">
                  <p className="text-[#969696]">더 불러오는 중...</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}