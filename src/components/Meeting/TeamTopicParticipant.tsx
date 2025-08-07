import type { MemberDto } from "../../types/dto";

interface TeamTopicParticipantProps {
  teamName: string;
  participants: MemberDto[];
}

const TeamTopicParticipant = ({
  teamName,
  participants,
}: TeamTopicParticipantProps) => {
  return (
    <>
      <h2 className="text-base font-semibold mb-3">{`${teamName}조`} 참여자</h2>
      <div className="max-w-[250px] pt-2 pb-4 px-3 border-2 border-[#D6E5CE] rounded-xl">
        <ul className={`divide-y-2 divide-gray-200 overflow-auto`}>
          {participants.map((p) => (
            <li
              key={p.memberId}
              className="flex items-center mt-2 p-2 border-b-2 border-gray-200"
            >
              <img
                src={p.imgUrl ?? "/default-avatar.png"}
                alt={p.nickName}
                className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0"
              />
              <span className="ml-3 text-md font-medium text-black">
                {p.nickName}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TeamTopicParticipant;
