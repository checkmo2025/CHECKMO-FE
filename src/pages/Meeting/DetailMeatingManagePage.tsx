
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DetailMeetingManagePage(meetingId: number, meetingTitle: string) {
  const navigate = useNavigate();
  const [groups, setGroups] = useState<string[]>([]);
  const [participants] = useState<string[]>(
    Array.from({ length: 20 }, (_, i) => `닉네임${i + 1}`)
  );
  const [groupSelections, setGroupSelections] = useState<{
    [key: number]: string[];
  }>({});


  console.log(meetingId, meetingTitle);
  if (!meetingId || !meetingTitle) {
    meetingId = 1
    meetingTitle = '모임제목'
  }

  const addGroup = () => {
    if (groups.length >= 6) return; //  A~F까지만 제한
    const nextChar = String.fromCharCode(65 + groups.length);
    setGroups([...groups, `${nextChar}조`]);
  };

  const removeGroup = (groupName: string) => {
    setGroups((prev) => prev.filter((name) => name !== groupName));
  };

  const toggleGroup = (userIdx: number, group: string) => {
    setGroupSelections((prev) => {
      const current = prev[userIdx] || [];
      const isSelected = current.includes(group);

      if (isSelected) {
        return { ...prev, [userIdx]: [] };
      }

      return { ...prev, [userIdx]: [group] };
    });
  };

  const getMembersInGroup = (groupName: string) => {
    return participants.filter((_, idx) =>
      groupSelections[idx]?.includes(groupName)
    );
  };

  return (


    <div className="flex w-full min-h-screen bg-[#FAFAFA] overflow-y-auto bg-white">
      <main className="flex-1 px-10 py-[30px]">
        {/* 상단 뒤로가기 영역 */}
        <div onClick={() => navigate(-1)} className="flex items-center h-[38px] gap-[3px] cursor-pointer mb-[36px]">
          {/* 1) 왼쪽 아이콘 영역 (30px) */}
          <div className="w-[30px] h-full flex items-center justify-center">
            <img src="/assets/material-symbols_arrow-back-ios.svg" className="w-[30px] h-[30px]"/>
          </div>
          {/* 2) 책 이름 */}
          <span className="font-[Pretendard] font-bold text-[28px] leading-[135%]">
            {meetingTitle}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* 왼쪽: 조 생성 + 멤버 배정 */}
          <div className="flex flex-col items-center gap-6 min-w-[401px]">
            <h2 className="text-[#2C2C2C] text-[18px] font-medium self-start ml-2">
              조 생성
            </h2>

            {groups.map((groupName, idx) => (
              <div
                key={idx}
                className="w-[401px] min-h-[310px] border-[2px] border-[#EAE5E2] bg-white rounded-[16px] px-4 py-3 text-[#2C2C2C] flex flex-col"
              >
                <div className = 'flex justify-between font-semibold text-lg mb-2'>
                  <p className="">{groupName}</p>
                { groups.length-1 == idx &&
                  <button onClick={() => removeGroup(groupName)} className="text-red-500 hover:underline">삭제</button>
                }
                </div>
                <hr className="border-t border-[#EAE5E2] mb-2" />
                <div className="grid grid-cols-1 gap-y-2">
                  {getMembersInGroup(groupName).map((name, mIdx) => (
                    <div
                      key={mIdx}
                      className="bg-[#F4F2F1] w-[365px] h-[44px] rounded-[20px] flex items-center px-3 text-[17px] font-medium text-[#2C2C2C] truncate"
                    >
                      <div className="w-[32px] h-[32px] rounded-full bg-[#DADADA] mr-5 text-[var(--Gray-1,#2C2C2C)] font-pretendard text-[18px] font-medium leading-[135%]" />
                      {name}
                    </div>
                  ))}
                </div>
                
              </div>
            ))}

            {groups.length !== 6 && (
              <button
                onClick={addGroup}
                className="w-[400px] h-[44px] bg-[#F4F2F1] rounded-[16px] text-[#2C2C2C] text-lg font-medium"
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

            <div className="bg-white border-[2px] border-[#EAE5E2] rounded-[12px] p-6 min-h-[540px]" >
              <div className="space-y-4">
                {participants.map((name, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-[#EAE5E2] pb-3"
                  >
                    <div className="flex items-center gap-4 min-w-[180px]">
                      <div className="w-[36px] h-[36px] rounded-full bg-[#DADADA]" />
                      <span className="text-[#2C2C2C] text-lg font-medium truncate">
                        {name}
                      </span>
                    </div>

                    <div className="grid grid-cols-6 gap-x-2 gap-y-2">
                      {groups.map((group) => {
                        const isSelected = groupSelections[idx]?.includes(group);
                        return (
                          <button
                            onClick={() => toggleGroup(idx, group)}
                            className={`w-[58px] h-[36px] rounded-full border text-[14px] font-medium border-[#90D26D] text-[#3D4C35]
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
            </div>
          </div>
        </div>
        <div className = 'h-10'/>
      </main>
    </div>
  );
};

