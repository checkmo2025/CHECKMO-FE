import type { AuthorDto } from "../../types/dto";
import defaultAvatar from "../../assets/images/userImage.png";

interface HeaderProps {
  author: AuthorDto;
  tag: string
}

const BookRecommendHeader = ({ author, tag }: HeaderProps) => {
  return (
    <>
      <div className="flex flex-row mt-5 mx-4">
        <img
          src={author.profileImageUrl ? author.profileImageUrl : defaultAvatar}

          // src={author.profileImageUrl
          className="mr-3 w-8 h-8
                        object-cover
                        rounded-full"
        />
        <div className="flex items-center">
          <h3>{author.nickname}</h3>
        </div>
        <div className="ml-auto">
          <span
            className="flex items-center justify-center
              px-3.5 py-1 bg-[#90D26D] text-white text-xs
              rounded-full whitespace-nowrap"
            title={tag}
          >
            {tag}
          </span>
        </div>
      </div>
    </>
  );
};

export default BookRecommendHeader;
