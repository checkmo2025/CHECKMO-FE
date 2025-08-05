import { memo } from "react";

interface TeamButtonListProps {
  selectedTeams: number[];
}

const TeamButtonListComponent = ({ selectedTeams }: TeamButtonListProps) => {
  const getTeamName = (num: number) => `${String.fromCharCode(64 + num)}조`;
  const allTeams = Array.from({ length: 26 }, (_, i) => i + 1);

  return (
    <div className="flex overflow-x-auto space-x-1 flex-shrink-0 ml-2 w-[230px] hide-scrollbar-container">
      <style>{`
        .hide-scrollbar-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="flex space-x-1">
        {allTeams.map((teamNumber) => {
          const isSelected = selectedTeams.includes(teamNumber);
          return (
            <button
              key={teamNumber}
              className={`px-4 py-1.5 border-2 text-xs rounded-xl whitespace-nowrap ${
                isSelected
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
