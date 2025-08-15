import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createClubMeeting,
  getMeetingDetail,
  getMeetingList,
  updateClubMeeting,
} from "../apis/clubMeeting/meetingAPI";
import type {
  CreateClubMeeting,
  MeetingDetailResult,
  MeetingListResult,
  UpdateClubMeeting,
} from "../types/clubMeeting";

// 정기 독서 모임 간편 조회
export const useMeetingList = (clubId: number, size?: number) => {
  return useInfiniteQuery<MeetingListResult, Error>({
    queryKey: ["meetings", clubId],
    queryFn: ({ pageParam }) =>
      getMeetingList(clubId, pageParam as number, size),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
};

// 정기 독서 모임 상세 조회
export const useMeetingDetail = (meetingId: number) => {
  return useQuery<MeetingDetailResult, Error>({
    queryKey: ["meeting", meetingId],
    queryFn: () => getMeetingDetail(meetingId),
  });
};

// 정기 독서 모임 생성
export const useCreateClubMeeting = (meetingId: number) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, CreateClubMeeting>({
    mutationFn: (data: CreateClubMeeting) => createClubMeeting(meetingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
    },
  });
};

// 정기 독서 모임 수정
export const useUpdateClubMeeting = (meetingId: number) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, UpdateClubMeeting>({
    mutationFn: (data: UpdateClubMeeting) => updateClubMeeting(meetingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetings"] });
      queryClient.invalidateQueries({ queryKey: ["meeting", meetingId] });
    },
  });
};
