// hooks/useStaffCheck.ts
import { useQuery } from '@tanstack/react-query';
import { getStaffCheck } from '../../apis/BookClub/getStaffCheck';

export function useStaffCheck(clubId: string) {
  return useQuery({
    queryKey: ['staffCheck', clubId],
    queryFn: () => getStaffCheck(clubId),           
    enabled: Boolean(clubId),
    staleTime: 5 * 60 * 1000,
  });
}