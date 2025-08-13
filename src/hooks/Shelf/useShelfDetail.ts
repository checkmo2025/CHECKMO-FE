import { useQuery } from "@tanstack/react-query";
import { fetchShelfDetail } from "../../apis/Shelf/fetchShelfDetail";
import type {
  ShelfDetailRequest,
  ShelfDetailResponseResult,
} from "../../types/Shelf/Shelfdetail";

export function useShelfDetail(req: ShelfDetailRequest) {
  return useQuery<ShelfDetailResponseResult, Error>({
    queryKey: ["shelfDetail", req],
    queryFn: () => fetchShelfDetail(req),
    enabled: Boolean(req.meetingId),
    staleTime: 1000 * 60 * 5,
  });
}
