import { useQuery } from "@tanstack/react-query";
import { fetchShelfHome } from "../../apis/Shelf/fetchShelfHome";
import type { ShelfHomeRequest, ShelfHomeResponseResult } from "../../types/Shelf/Shelfhome";

export function useShelfHome(req: ShelfHomeRequest) {
  return useQuery<ShelfHomeResponseResult, Error>({
    queryKey: ["shelfHome", req],
    queryFn:  () => fetchShelfHome(req),
    enabled:  Boolean(req.clubId),
    staleTime: 1000 * 60 * 5, // 5분
  });
}