import type { MemberDto } from "../../types/dto";

interface HeaderProps {
  memberInfo: MemberDto;
}

const BookRecommendHeader = ({ memberInfo }: HeaderProps) => {
  return (
    <>
      <div className="flex flex-row mt-3 ml-3 mr-3">
        <img
          // src={memberInfo.imgUrl}
          src="/profile.png"
          className="mr-3 w-8 h-8
                        sm:w-10 sm:h-10
                        md:w-12 md:h-12
                        lg:w-16 lg:h-16
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
