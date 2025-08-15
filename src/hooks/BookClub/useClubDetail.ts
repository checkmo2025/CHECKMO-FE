import { useQuery } from '@tanstack/react-query';
import { getClubDetail } from '../../apis/clubApi';
import type { ClubDto } from '../../types/bookClub';

export const QK_CLUB = {
  detail: (clubId: number) => ['club', 'detail', clubId] as const,
};

export function useClubDetail(clubId: number) {
  return useQuery<ClubDto, Error>({
    queryKey: QK_CLUB.detail(clubId),
    queryFn: () => getClubDetail(clubId),
    enabled: Number.isFinite(clubId) && clubId > 0,
    staleTime: 1000 * 60 * 5,
  });
}


