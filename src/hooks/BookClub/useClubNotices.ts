import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { noticeListItemDto } from '../../types/clubNotice';
import { getClubNotices } from '../../apis/clubAnnouncements/clubNoticeApi';

interface UseClubNoticesProps {
  clubId: number;
  onlyImportant?: boolean;
  size?: number;
}

interface UseClubNoticesReturn {
  notices: noticeListItemDto[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  hasNext: boolean;
  staff: boolean;
}

/**
 * 북클럽 공지사항을 조회하는 커스텀 훅
 */
export const useClubNotices = ({ 
  clubId, 
  onlyImportant = true,
  size = 5 
}: UseClubNoticesProps): UseClubNoticesReturn => {
  const queryKey = useMemo(() => ['clubNotices', clubId, onlyImportant, size], [clubId, onlyImportant, size]);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: () => getClubNotices(clubId, onlyImportant, undefined, size),
    enabled: !!clubId && clubId > 0,
    staleTime: 1000 * 60 * 5,
  });

  return {
    notices: data?.noticeList ?? [],
    loading: isLoading,
    error: isError
      ? (() => {
          const err = error as unknown;
          if (typeof err === 'object' && err && 'isAxiosError' in (err as any)) {
            const axiosErr = err as any;
            return (
              axiosErr.response?.data?.message ??
              axiosErr.message ??
              '알 수 없는 오류가 발생했습니다.'
            );
          }
          return (err as Error)?.message ?? '알 수 없는 오류가 발생했습니다.';
        })()
      : null,
    refetch: async () => { await refetch(); },
    hasNext: data?.hasNext ?? false,
    staff: data?.staff ?? false,
  };
};
