import { axiosInstance } from '../axiosInstance';
import type { StaffCheckResponse} from '../../types/dto';

export function getStaffCheck(clubId: string) {
  return axiosInstance.get<StaffCheckResponse>(`/clubs/${clubId}/staff`);
}