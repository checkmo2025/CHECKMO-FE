import { useQuery } from '@tanstack/react-query';
import { fetchIsStaff } from '../../apis/clubApi';

export const QK_STAFF = {
	status: (clubId: number) => ['club', 'staff', clubId] as const,
};

export function useIsStaff(clubId: number) {
	return useQuery<boolean, Error>({
		queryKey: QK_STAFF.status(clubId),
		queryFn: () => fetchIsStaff(clubId),
		enabled: Number.isFinite(clubId) && clubId > 0,
		staleTime: 1000 * 60 * 2,
	});
}



