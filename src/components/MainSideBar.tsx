import { NavLink } from "react-router-dom";
import homeIcon from "../assets/icons/home.png";
import bookclubIcon from "../assets/icons/bookclub.png";
import searchIcon from "../assets/icons/search.png";
import bookstoryIcon from "../assets/icons/bookstory.png";
import mypageIcon from "../assets/icons/mypage.png";
import logoImage from "../assets/logos/mainlogo.png";

const menus = [
  { name: "홈", path: "/home", icon: homeIcon },
  { name: "독서 모임", path: "/bookclub", icon: bookclubIcon },
  { name: "책 검색하기", path: "/search", icon: searchIcon },
  { name: "책 이야기", path: "/bookstory", icon: bookstoryIcon },
  { name: "마이페이지", path: "/mypage", icon: mypageIcon },
];

const MainSidebar = () => {
  return (
    <div className="flex w-[16.5rem] h-[64rem] flex-col items-start justify-start gap-[2.8125rem] px-6 py-8 bg-[#E9F2E3] shrink-0">
      <div className="flex w-[9.375rem] h-[4.5rem] items-center gap-4 shrink-0">
        <img src={logoImage} alt="logo" className="w-18 h-18 object-contain" />
        <span className="text-4xl font-bold text-[#3D4C35] tracking-tight font-pretendard">
          책모
        </span>
      </div>

      <nav className="flex flex-col w-full space-y-2">
        {menus.map(({ name, path, icon }) => (
          <NavLink
            to={path}
            className={({ isActive }) =>
              `flex items-center py-2 pl-3 pr-4 gap-3 w-full rounded-r-lg
            ${
              isActive
                ? "text-[#3D4C35] border-l-4 border-[#90D26D]"
                : "text-[#AAAAAA]"
            }`
            }
          >
            <img src={icon} alt={`${name} 아이콘`} className="w-5 h-5" />
            <span className="text-[18px] font-medium leading-[135%] tracking-[-0.018px] font-pretendard">
              {name}
            </span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MainSidebar;
