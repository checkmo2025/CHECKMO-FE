import type { NoticeResultDto } from "../types/notices";
import { axiosInstance } from "./axiosInstance";

export interface FetchNoticesParams {
  cursorId?: number | null;
  onlyImportant?: boolean;
}

export const fetchNotices = async (
  params?: FetchNoticesParams
): Promise<NoticeResultDto> => {
  const { data } = await axiosInstance.get<NoticeResultDto>("/clubs/notices", {
    params: {
      cursorId: params?.cursorId ?? undefined,
      onlyImportant: params?.onlyImportant,
    },
  });
  return data;
};
