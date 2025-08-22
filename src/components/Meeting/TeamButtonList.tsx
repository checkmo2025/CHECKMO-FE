import { memo } from "react";

interface TeamButtonListProps {
  teamNumbers: number[],
  selectedTeamNumbers: number[];
  onSelect: (teamId: number) => void;
  disabled: boolean
}

const TeamButtonListComponent = ({
  teamNumbers,
  selectedTeamNumbers,
  onSelect,
  disabled
}: TeamButtonListProps) => {
  const getTeamName = (num: number) => `${String.fromCharCode(64 + num)}조`;
  // const allTeams = Array.from({ length: teamCnt }, (_, i) => i + 1);

  return (
    <div className="flex overflow-x-auto space-x-1 flex-shrink-0 ml-2 max-w-[230px]">
      <div className="flex space-x-1">
        {teamNumbers.map((teamNumber) => {
          const isSelected = selectedTeamNumbers.includes(teamNumber);
          return (
            <button
              key={teamNumber}
              onClick={(e) => {
                if (disabled) {
                  e.preventDefault();
                  return;
                }
                onSelect(teamNumber);
              }}
              className={`px-4 py-1.5 border-2 text-xs rounded-xl whitespace-nowrap cursor-pointer ${isSelected
                ? "border-[#90D26D] bg-[#90D26D] text-white"
                : "border-[#90D26D]  bg-[#EFF5ED] text-[#3D4C35]"
                }`}
            >
              {getTeamName(teamNumber)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export const TeamButtonList = memo(TeamButtonListComponent);
