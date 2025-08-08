import type { AuthorDto } from "../../types/dto";

interface HeaderProps {
  author: AuthorDto;
}

const BookRecommendHeader = ({ author }: HeaderProps) => {
  return (
    <>
      <div className="font-pretendard flex flex-row mt-5 mx-4">
        <img
          src={author.profileImageUrl}
          // src="/profile.png"
          className="mr-3 w-8 h-8
                        object-cover
                        rounded-full"
        />
        <div className="flex items-center">
          <h3>{author.nickname}</h3>
        </div>
      </div>
    </>
  );
};

export default BookRecommendHeader;
