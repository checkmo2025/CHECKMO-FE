import { axiosInstance } from '../axiosInstance';
import type { ShelfDetailRequest , ShelfDetailResponseResult } from '../../types/Shelf/Shelfdetail';

export function fetchShelfDetail( req : ShelfDetailRequest ): Promise<ShelfDetailResponseResult> {
  return axiosInstance.get(`/bookshelves/${req.meetingId}`);
}
