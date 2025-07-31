import { useState } from "react";

const GroupManagementPage = () => {
  const [groups, setGroups] = useState<string[]>([]);
  const [participants, setParticipants] = useState<string[]>(
    Array.from({ length: 20 }, (_, i) => `닉네임${i + 1}`)
  );  
  const [groupSelections, setGroupSelections] = useState<{ [key: number]: string[] }>({});

  const addGroup = () => {
    if (groups.length >= 26) return; // A ~ Z까지만
    const nextChar = String.fromCharCode(65 + groups.length); 
    setGroups([...groups, `${nextChar}조`]);
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
    <div className="flex w-full min-h-screen bg-[#FAFAFA] overflow-y-auto">
      <main className="flex-1 px-10 py-8">
        {/* 제목 */}
        <h1 className="text-[#2C2C2C] text-[24px] font-semibold mb-10">2차 정기모임</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* 왼쪽: 조 생성 + 멤버 배정 */}
          <div className="flex flex-col items-center gap-6 min-w-[401px]">
            <h2 className="text-[#2C2C2C] text-[18px] font-medium self-start ml-2">조 생성</h2>

            {groups.map((groupName, idx) => (
              <div
                key={idx}
                className="w-[401px] h-[310px] border-[2px] border-[#EAE5E2] bg-white rounded-[8px] px-4 py-3 text-[#2C2C2C] flex flex-col"
              >
                <p className="font-semibold text-lg mb-2">{groupName}</p>
                <hr className="border-t border-[#EAE5E2] mb-2" />
                <div className="grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto">
                  {getMembersInGroup(groupName).map((name, mIdx) => (
                    <div key={mIdx} className="text-[17px] text-[#2C2C2C] truncate mb-1">{name}</div>
                  ))}
                </div>
              </div>
            ))}

            <button
              onClick={addGroup}
              disabled={groups.length >= 26}
              className="w-[400px] h-[44px] bg-[#F4F2F1] rounded-md text-[#2C2C2C] text-lg font-medium"
            >
              +
            </button>
          </div>

          {/* 오른쪽: 참여자 */}
          <div className="flex flex-col flex-1">
            <h2 className="text-[#2C2C2C] text-[18px] font-medium mb-5">토론 참여자</h2>

            <div
              className="bg-white border-[2px] border-[#D6E5CE] rounded-[12px] p-6 max-h-[792px] overflow-y-scroll"
              style={{
                scrollbarWidth: "none",          // Firefox
                msOverflowStyle: "none",         // IE 10+
              }}
            >
              <style>{`
                /* Chrome, Safari */
                .no-scrollbar::-webkit-scrollbar {
                  display: none;
                }
              `}</style>

              <div className="space-y-4 no-scrollbar">
                {participants.map((name, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between border-b border-[#EAE5E2] pb-3"
                  >
                    {/* 프로필 + 닉네임 */}
                    <div className="flex items-center gap-4">
                      <div className="w-[36px] h-[36px] rounded-full bg-[#DADADA]" />
                      <span className="text-[#2C2C2C] font-medium">{name}</span>
                    </div>

                    {/* 조 버튼들 */}
                    <div className="grid grid-cols-7 gap-x-2 gap-y-2">
                      {groups.map((group, gIdx) => {
                        const isSelected = groupSelections[idx]?.includes(group);
                        return (
                          <button
                            key={gIdx}
                            onClick={() => toggleGroup(idx, group)}
                            className={`w-[58px] h-[36px] rounded-full border text-[13px] font-medium
                              ${isSelected
                                ? "bg-[#EFF5ED] border-[#90D26D] text-[#3D4C35]"
                                : "bg-[#F0F0F0] border-[#F0F0F0] text-[#5A5A5A]"
                              }`}
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
      </main>
    </div>
  );
};

export default GroupManagementPage;
