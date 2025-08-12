import { axiosInstance } from '../axiosInstance';
import type { ShelfHomeRequest ,ShelfHomeResponseResult } from '../../types/Shelf/Shelfhome';

export function fetchShelfHome( req : ShelfHomeRequest ): Promise<ShelfHomeResponseResult> {
  const { clubId, cursorId, size, generation } = req;
  return axiosInstance.get(`/clubs/${clubId}/bookshelves`,{ 
    params: { cursorId, size, generation },
  });
}
