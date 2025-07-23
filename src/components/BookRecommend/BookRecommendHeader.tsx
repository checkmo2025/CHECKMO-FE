import type { MemberDto } from "../../types/dto";

interface HeaderProps {
  memberInfo: MemberDto;
}

const BookRecommendHeader = ({ memberInfo }: HeaderProps) => {
  return (
    <>
      <div className="font-pretendard flex flex-row mt-5 mx-4">
        <img
          // src={memberInfo.imgUrl}
          src="/profile.png"
          className="mr-3 w-8 h-8
                        object-cover
                        rounded-full"
        />
        <div className="flex items-center">
          <h3>{memberInfo.nickName}</h3>
        </div>
      </div>
    </>
  );
};

export default BookRecommendHeader;
