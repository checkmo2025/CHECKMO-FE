import type { NoticeResultDto } from "../types/notices";
import { axiosInstance } from "./axiosInstance";

interface FetchNoticesParams {
  cursorId?: number | null;
  onlyImportant?: boolean;
}

export const fetchNotices = async (
  params: FetchNoticesParams
): Promise<NoticeResultDto> => {
  const result = await axiosInstance.get("/clubs/notices", {
    params: {
      cursorId: params.cursorId ?? undefined,
      onlyImportant: params.onlyImportant ?? false,
    },
  });
  return result;
};
