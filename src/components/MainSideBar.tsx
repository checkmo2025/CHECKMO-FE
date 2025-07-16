import { useState } from "react";
import { NavLink } from "react-router-dom";
import homeIcon from "../assets/icons/home.png";
import bookclubIcon from "../assets/icons/bookclub.png";
import searchIcon from "../assets/icons/search.png";
import bookstoryIcon from "../assets/icons/bookstory.png";
import mypageIcon from "../assets/icons/mypage.png";
import logoImage from "../assets/logos/mainlogo.png";
import toggleClose from "../assets/icons/toggleClose.png";
import toggleOpen from "../assets/icons/toggleOpen.png";

const menus = [
  {
    name: "홈",
    path: "/home",
    icon: homeIcon,
    submenus: [],
  },
  {
    name: "독서 모임",
    path: "/bookclub",
    icon: bookclubIcon,
    submenus: [
      { name: "내 모임 바로가기", path: "/bookclub/:id" },
      { name: "모임 검색하기", path: "/bookclub/search" },
      { name: "모임 생성하기", path: "/bookclub/create" },
    ],
  },
  {
    name: "책 검색하기",
    path: "/search",
    icon: searchIcon,
    submenus: [
      { name: "통합검색", path: "/bookclub/:id" },
      { name: "국내도서", path: "/domesticBook" },
      { name: "전자책", path: "/ebook" },
    ],
  },
  {
    name: "책 이야기",
    path: "/bookstory",
    icon: bookstoryIcon,
    submenus: [
      { name: "전체보기", path: "/bookstory" },
      { name: "내 책 이야기", path: "/bookstory/my" },
    ],
  },
  {
    name: "마이페이지",
    path: "/mypage",
    icon: mypageIcon,
    submenus: [
      { name: "내 모임", path: "/bookclub/my" },
      { name: "내 책 이야기", path: "/bookstory/my" },
      { name: "내 알림", path: "/notification" },
      { name: "내 구독", path: "/subscribe" },
    ],
  },
];

const MainSidebar = () => {
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) => {
      const updated = new Set(prev);
      if (updated.has(menuName)) {
        updated.delete(menuName);
      } else {
        updated.add(menuName);
      }
      return updated;
    });
  };

  return (
    <div className="flex w-[16.5rem] h-[64rem] flex-col items-start justify-start gap-[2.8125rem] px-6 py-8 bg-[#E9F2E3] shrink-0">
      <div className="flex w-[9.375rem] h-[4.5rem] items-center gap-4 shrink-0">
        <img src={logoImage} alt="logo" className="w-18 h-18 object-contain" />
        <span className="text-4xl font-bold text-[#3D4C35] tracking-tight font-pretendard">
          책모
        </span>
      </div>

      <nav className="flex flex-col w-full space-y-2">
        {menus.map(({ name, path, icon, submenus }) => (
          <div key={name} className="w-full">
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex items-center justify-between py-2 pl-3 pr-4 gap-3 w-full rounded-r-lg cursor-pointer hover:bg-[#DDEED6]
                ${
                  isActive
                    ? "text-[#3D4C35] font-semibold border-l-4 border-[#90D26D]]"
                    : "text-[#AAA]"
                }`
              }
              onClick={() => {
                if (submenus.length > 0) toggleMenu(name);
              }}
            >
              <div className="flex items-center gap-3">
                <img src={icon} alt={`${name} 아이콘`} className="w-5 h-5" />
                <span className="text-[18px] font-medium leading-[135%] tracking-[-0.018px] font-pretendard">
                  {name}
                </span>
              </div>
              {submenus.length > 0 && (
                <img
                  src={openMenus.has(name) ? toggleClose : toggleOpen}
                  alt="토글 아이콘"
                  className="w-4 h-4"
                />
              )}
            </NavLink>

            {openMenus.has(name) && submenus.length > 0 && (
              <div className="ml-8 mt-1 space-y-1">
                {submenus.map(({ name: subName, path: subPath }) => (
                  <NavLink
                    to={subPath}
                    key={subName}
                    className={({ isActive }) =>
                      `block text-sm py-1 pl-2 pr-3 rounded hover:text-[#3D4C35]
                      ${
                        isActive
                          ? "text-[#3D4C35] font-semibold"
                          : "text-[#AAA]"
                      }`
                    }
                  >
                    {subName}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default MainSidebar;
