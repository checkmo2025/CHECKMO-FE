import type { ClubMember } from "../../types/Club/GetClubMembers";
import type { MeetingTeamMutateRequest } from "../../types/Meeting/MeetingTeamManage";

// "1조" → 1, "A조" → 1, 그 외엔 groups 인덱스 기반
export function toTeamNumber(groupName: string, groups: string[]) {
  const digits = groupName.match(/\d+/);
  if (digits) return Number(digits[0]);

  const letter = groupName.match(/[A-Z]/i);
  if (letter) return letter[0].toUpperCase().charCodeAt(0) - 64;

  const idx = groups.indexOf(groupName);
  return idx >= 0 ? idx + 1 : 0;
}

export function buildMeetingTeamMutateRequest(  groupSelections: Record<string, ClubMember[]>,
  groups: string[]
): MeetingTeamMutateRequest {
  return {
    teamMemberDTOList: Object.entries(groupSelections)
      .map(([groupName, members]) => ({
        teamNumber: toTeamNumber(groupName, groups),
        nicknameList: members.map(m => m.basicInfo.nickname)
          

      }))
      .filter(x => x.teamNumber > 0 && x.nicknameList.length > 0)

  };
}