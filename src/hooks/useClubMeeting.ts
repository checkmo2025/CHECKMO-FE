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
  getMeetingTeamMember,
  getMeetingTeamTopic,
  getMeetingTopics,
  updateClubMeeting,
  updateTopicSelect,
} from "../apis/clubMeeting/meetingAPI";
import type {
  CreateClubMeeting,
  MeetingDetailResult,
  MeetingListResult,
  TeamMemberResult,
  TeamTopicResult,
  TopicSelect,
  TotalTopicResult,
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
    enabled: !!meetingId,
  });
};

// 정기 독서 모임 생성
export const useCreateClubMeeting = (clubId: number) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, CreateClubMeeting>({
    mutationFn: (data: CreateClubMeeting) => createClubMeeting(clubId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["meetings", clubId] });
      return data; // 생성 후 반환된 데이터
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

// 독서 모임 발제 전체 보기
export const useGetMeetingTopics = (meetingId: number) => {
  return useQuery<TotalTopicResult, Error>({
    queryKey: ["meetingTopics", meetingId],
    queryFn: () => getMeetingTopics(meetingId),
    enabled: !!meetingId,
  });
};

// 독서 모임 팀 별 발제 보기
export const useGetMeetingTeamTopic = (
  meetingId: number,
  teamNumber: number
) => {
  return useQuery<TeamTopicResult, Error>({
    queryKey: ["meetingTeamTopic", meetingId, teamNumber],
    queryFn: () => getMeetingTeamTopic(meetingId, teamNumber),
    enabled: !!meetingId && !!teamNumber,
  });
};

// 독서 모임 팀 별 참여자 보기
export const useGetMeetingTeamMember = (
  meetingId: number,
  teamNumber: number
) => {
  return useQuery<TeamMemberResult, Error>({
    queryKey: ["meetingTeamMembers", meetingId, teamNumber],
    queryFn: () => getMeetingTeamMember(meetingId, teamNumber),
    enabled: !!meetingId && !!teamNumber,
  });
};

// 팀 발제 선택/해제
export const useUpdateTopicSelect = (meetingId: number, topicId: number) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, TopicSelect>({
    mutationFn: (data: TopicSelect) =>
      updateTopicSelect(meetingId, topicId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["meetingTopics", meetingId] });
      queryClient.invalidateQueries({
        queryKey: ["meetingTeamTopic", meetingId],
      });
    },
  });
};
