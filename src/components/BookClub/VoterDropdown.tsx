import type { voteMembersDto } from "../../types/clubNotice";
import { motion, AnimatePresence } from "framer-motion";
import toggleOpen from "../../assets/icons/toggleOpen.png";
import toggleClose from "../../assets/icons/toggleClose.png";
import { useNavigate } from "react-router-dom";
import { useMyProfileQuery } from "../../hooks/My/useMember";

interface VoterDropdownProps {
  voters: voteMembersDto[];
  optionLabel: string;
  voterCount: number;
  isOpen: boolean;
  onToggle: () => void;
}

export default function VoterDropdown({
  voters,
  optionLabel,
  voterCount,
  isOpen,
  onToggle,
}: VoterDropdownProps) {
  const navigate = useNavigate();
  const { data: me } = useMyProfileQuery();
  const handleClickVoter = (nickname?: string) => {
    if (!nickname) return;
    const encoded = encodeURIComponent(nickname);
    // 드롭다운 닫고 이동
    if (isOpen) onToggle();
    if (me?.nickname && me.nickname === nickname) {
      navigate('/mypage');
    } else {
      navigate(`/info/others/${encoded}`);
    }
  };
  return (
    <div className="relative">
      {/* 투표자 수 버튼 */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={`${optionLabel} 투표자 목록 토글`}
        className="cursor-pointer w-[105px] h-[44px] bg-[#EEEEEE] rounded-[16px] font-medium text-[14px] text-[#434343] flex items-center justify-center gap-[6px] hover:bg-[#DADADA] transition-colors"
      >
        <span>{voterCount}명</span>
        <img
          src={isOpen ? toggleClose : toggleOpen}
          alt={isOpen ? "투표자 목록 닫기" : "투표자 목록 열기"}
          className="w-[12px] h-[12px]"
        />
      </button>

      {/* 투표자 목록 드롭다운 (framer-motion 적용) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 top-[50px] w-[200px] bg-[#FFFFFF] border-[1px] border-[#DED6CD] rounded-[16px] z-10 overflow-hidden"
          >
            {/* 투표자 목록 */}
            <div className="max-h-[289px] overflow-y-auto">
              <div className="p-3 space-y-2">
                {voters.length === 0 ? (
                  <div className="p-2 text-center text-[13px] text-[#8D8D8D]">투표자 없음</div>
                ) : (
                  voters.map((voter, index) => (
                    <div
                      key={`${voter.nickname}-${index}`}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                      onClick={() => handleClickVoter(voter.nickname)}
                    >
                      <div className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-orange-400 to-orange-500">
                        {voter.profileImageUrl ? (
                          <img
                            src={voter.profileImageUrl}
                            alt={`${voter.nickname} 프로필 이미지`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-white text-xs font-medium">
                            {voter.nickname.charAt(0)}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[13px] text-gray-900 truncate">
                          {voter.nickname}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
