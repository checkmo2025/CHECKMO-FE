import { useState,useEffect } from "react";
import { useNavigate,useLocation, useParams } from "react-router-dom";
import { useStaffCheck } from "../../hooks/BookClub/useStaffCheck";
import { useGetInfinityMember } from "../../hooks/Meeting/useGetInfinityMember"
import { useMeetingTeamMutate } from "../../hooks/Meeting/useSetMeetingTeam.ts";
import { buildMeetingTeamMutateRequest } from "../../components/Meeting/teamMapper.ts";
import type { MeetingMemberItem } from "../../types/Meeting/GetmeetingMember.ts";
import type { ModalButton } from "../../components/Modal.tsx";

import Modal from "../../components/Modal.tsx";
import { NonProfileHeader } from "../../components/NonProfileHeader.tsx";
export default function DetailMeetingManagePage() {
  const params = useParams<{ bookclubId: string, meetingId: string }>();
  const { state } = useLocation();
  const { meetingTitle } = state || { meetingTitle: "제목 없음" };
  const meetingId = params.meetingId!;
  const navigate = useNavigate();

  const { data: isStaff, isLoading, isError } = useStaffCheck(params.bookclubId!);

  const [groups, setGroups] = useState<string[]>([]);
  const [participants, setparticipants] = useState<MeetingMemberItem[]>([]);
  const [groupSelections, setGroupSelections] = useState<Record<string, MeetingMemberItem[]>>({});
 
  const {data : result, fetchNextPage,  hasNextPage,  isFetchingNextPage} = useGetInfinityMember(Number(meetingId), 15);
  useEffect(() => {
      if (!hasNextPage || isLoading || isFetchingNextPage) return;
      fetchNextPage();
  }, [hasNextPage, isLoading, isFetchingNextPage, fetchNextPage]);

  const [infoOpen, setInfoOpen] = useState(false);
  const infoTitle ="저장이 완료되었습니다."
  const infoButton : ModalButton[] = [
    {
        label: "확인",
        onClick: () => {
          setInfoOpen(false);
          window.location.reload();
        }
    }
  ];
  useEffect(() => {
  if (!result) return;

  const flatMembers = result.pages.flatMap(p => p.members);
  setparticipants(flatMembers);
  const toLabel = (i: number) => `${String.fromCharCode(65 + i)}조`;
  const assigned = flatMembers.filter(
    m => typeof m.teamNumber === 'number' && m.teamNumber > 0
  );

  const maxGroup = Math.max(...assigned.map(m => m.teamNumber!)); 
  const groupsArr = Array.from({ length: maxGroup }, (_, i) => toLabel(i));

  const initialGroup: Record<string, MeetingMemberItem[]> = {};
  for (const g of groupsArr) initialGroup[g] = [];

  for (const m of assigned) {
    const label = toLabel(m.teamNumber! - 1); 
    initialGroup[label].push(m);
  }

  setGroups(groupsArr);
  setGroupSelections(initialGroup);
}, [result]);



  
  const addGroup = () => {
    if (groups.length >= 6) return; //  A~F까지만 제한
    const nextChar = String.fromCharCode(65 + groups.length);
    setGroups([...groups, `${nextChar}조`]);
  };

  const removeGroup = (groupName: string) => {
    setGroups((prev) => prev.filter((name) => name !== groupName));
    setGroupSelections(prev => {
      const newSelections = { ...prev };
      delete newSelections[groupName];
      return newSelections;
    });
  };
  
  const removeMemberFromGroup = (groupName: string, membername: string) => {
    setGroupSelections(prev => {
      const current = prev[groupName] ?? [];
      const nextArr = current.filter(m => m.memberInfo.nickname !== membername);
      return { ...prev, [groupName]: nextArr };
    });
  };

  const toggleGroup = (userIdx: number, groupName: string) => {
  const member = participants[userIdx];
  if (!member) return;
  const nickname = member.memberInfo.nickname;

  setGroupSelections(prev => {
      const next: Record<string, MeetingMemberItem[]> = {};
      for (const [g, arr] of Object.entries(prev)) {
        next[g] = arr.filter(m => m.memberInfo.nickname !== nickname);
      }

      const target = next[groupName] ?? [];
      const alreadyInTarget = target.some(m => m.memberInfo.nickname === nickname);

      if (alreadyInTarget) {

        const trimmed = target.filter(m => m.memberInfo.nickname !== nickname);
        if (trimmed.length) next[groupName] = trimmed;
        else delete next[groupName]; // 깔끔하게 비우기
      } else {
        next[groupName] = [...target, member];
      }

      return next;
    });
  };

  const getMembersInGroup = (groupName: string): MeetingMemberItem[] => {
    return groupSelections[groupName] ?? [];
  };
  
  const { mutate: saveTeams } = useMeetingTeamMutate(Number(meetingId));
  const handleSend = () => {
    const payload = buildMeetingTeamMutateRequest(groupSelections);
    if (payload.teamMemberDTOList.length === 0) return;
    console.log("Saving teams:", payload);
    saveTeams(payload);
  };

  if(!isStaff)return <div>권한이 없습니다!</div>;
  if(isLoading) return <div>Loading...</div>;
  if(isError) return <div>Error occurred</div>;
  
  return (
    <div className="flex min-h-screen bg-[#FAFAFA] overflow-y-auto bg-white">
      <main className="flex-1 px-10">
        <NonProfileHeader title={meetingTitle} />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* 왼쪽: 조 생성 + 멤버 배정 */}
          <div className="flex flex-col items-center gap-6 min-w-[401px]">
            <h2 className="text-[#2C2C2C] text-[18px] font-medium self-start ml-2">
              조 생성
            </h2>

            {groups.map((groupName, idx) => (
              <div className="w-[401px] min-h-[310px] border-[2px] border-[#EAE5E2] bg-white rounded-[16px] px-4 py-3 text-[#2C2C2C] flex flex-col">
                <div className = 'flex justify-between font-semibold text-lg mb-2'>
                  <p className="">{groupName}</p>
                { groups.length-1 == idx &&
                  <button onClick={() => removeGroup(groupName)} className="text-red-500 hover:underline cursor-pointer">삭제</button>
                }
                </div>
                <hr className="border-t border-[#EAE5E2] mb-2" />
                <div className="grid grid-cols-1 gap-y-2">
                  {getMembersInGroup(groupName).map((member : MeetingMemberItem) => (
                    <div
                      className="bg-[#F4F2F1] w-[365px] h-[44px] rounded-[20px] flex items-center px-3 text-[17px] font-medium text-[#2C2C2C] truncate cursor-pointer hover:shadow-sm"
                      onClick={() => {
                        removeMemberFromGroup(groupName, member.memberInfo.nickname);
                      }}
                    >
                      <img src={member.memberInfo.profileImageUrl || "/assets/basic_profile.png"}
                      className="w-[32px] h-[32px] rounded-full mr-5 text-[var(--Gray-1,#2C2C2C)] font-pretendard text-[18px] font-medium leading-[135%]" />
                      {member.memberInfo.nickname}
                    </div>
                  ))}
                </div>
                
              </div>
            ))}

            {groups.length !== 6 && (
              <button
                onClick={addGroup}
                className="w-[400px] h-[44px] bg-[#F4F2F1] rounded-[16px] text-[#2C2C2C] text-lg font-medium cursor-pointer"
              >
                +
              </button>
            )}
          </div>

          {/* 오른쪽: 참여자 */}
          <div className="flex flex-col flex-1">
            <h2 className="text-[#2C2C2C] text-[18px] font-medium mb-5">
              토론 참여자
            </h2>
            <div className="min-h-[600px] bg-white border-[2px] border-[#EAE5E2] rounded-[12px] p-6 min-h-[540px]" >
              <div className="space-y-4">
                {participants.map((member: MeetingMemberItem) => (
                  <div className="flex items-center justify-between border-b border-[#EAE5E2] pb-3">
                    <div className="flex items-center gap-4 min-w-[180px]">
                      <img src={member.memberInfo.profileImageUrl || "/assets/basic_profile.png"}
                      className="w-[36px] h-[36px] rounded-full" />
                      <span className="text-[#2C2C2C] text-lg font-medium truncate">
                        {member.memberInfo.nickname}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 justify-end flex-1">
                      {groups.map((group) => {
                        const isSelected = (groupSelections[group] ?? []).some(m => m.memberInfo.nickname === member.memberInfo.nickname);
                        return (
                          <button
                            onClick={() => toggleGroup(participants.indexOf(member), group)}
                            className={`w-[58px] h-[36px] rounded-full border text-[14px] font-medium border-[#90D26D] text-[#3D4C35] cursor-pointer hover:shadow-md
                              ${isSelected? " bg-[#90D26D]" : " bg-[#EFF5ED]"}`
                            }
                          >
                            {group}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
                <div/>

            </div>
           <div className = "flex  justify-end ">
            <button className = "mt-[18px] w-[90px] h-[35px] px-3 py-[5px] justify-center items-center gap-[10px] shrink-0 rounded-[16px]  text-sm font-medium bg-[#DED6CD] text-[#A6917D] hover:bg-[#A6917D] hover:text-white" onClick={() => {
              handleSend();
              setInfoOpen(true);
            }}>
              저장하기
            </button> 
           </div>
          </div>
          
        </div>
        <Modal
        isOpen={infoOpen}
        title={infoTitle}
        buttons={infoButton}
        onBackdrop={() => setInfoOpen(false)}
      />
      </main>
    </div>
  );
};

