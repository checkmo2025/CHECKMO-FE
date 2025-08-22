import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MeetingTeamMutateRequest } from "../../types/Meeting/MeetingTeamManage";
import { SetMeetingTeam } from "../../apis/BookClub/SetMeetingTeam";

export function useMeetingTeamMutate(meetingId: number) {
  const queryClient = useQueryClient();
  return useMutation<void, Error, MeetingTeamMutateRequest>({
    mutationFn: (body) => SetMeetingTeam(meetingId, body).then(() => undefined),
    onSuccess: () => {
      // 모임 상세 정보와 토픽 선택 정보 모두를 무효화하여 새로고침합니다.
      queryClient.invalidateQueries({ queryKey: ["meeting", meetingId] });
      queryClient.invalidateQueries({ queryKey: ["meetingTopics", meetingId] });
    },
  });
}
