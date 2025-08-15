import { useMutation } from "@tanstack/react-query";
import type { MeetingTeamMutateRequest } from "../../types/Meeting/MeetingTeamManage";
import { SetMeetingTeam } from "../../apis/BookClub/SetMeetingTeam";

export function useMeetingTeamMutate(meetingId: number) {
  return useMutation<void, Error, MeetingTeamMutateRequest>({
    mutationFn: (body) => SetMeetingTeam(meetingId, body).then(() => undefined),
  });
}