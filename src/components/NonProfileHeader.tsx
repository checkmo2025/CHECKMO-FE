import { memo } from "react";
import { useNavigate } from "react-router-dom";

interface NonProfileHeaderProps {
  title: string;
}

const NonProfileHeaderComponent = ({ title }: NonProfileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center my-[30px]">
      <button onClick={() => navigate(-1)} className="mr-3">
        <img src="/src/assets/icons/backIcon.png" alt="뒤로가기" />
      </button>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export const NonProfileHeader = memo(NonProfileHeaderComponent);
