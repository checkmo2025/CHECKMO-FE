import { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

import homeIcon from "../assets/icons/home.png";
import bookclubIcon from "../assets/icons/bookclub.png";
import searchIcon from "../assets/icons/search.png";
import bookstoryIcon from "../assets/icons/bookstory.png";
import mypageIcon from "../assets/icons/mypage.png";
import logoImage from "../assets/logos/mainlogo.png";
import toggleClose from "../assets/icons/toggleClose.png";
import toggleOpen from "../assets/icons/toggleOpen.png";

type Submenu = {
  name: string;
  path: string;
};

type Menu = {
  name: string;
  icon: string;
  path?: string;
  submenus: Submenu[];
};

const dummyBookclubs: Record<string, string> = {
  "1": "북적북적",
  "2": "책을 모아",
  "3": "슬기로운 독서",
};

const Sidebar = () => {
  const { bookclubId } = useParams<{ bookclubId?: string }>();
  const navigate = useNavigate();
  const [bookclubName, setBookclubName] = useState("모임 이름");
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  useEffect(() => {
    if ( bookclubId && dummyBookclubs[bookclubId]) {
      setBookclubName(dummyBookclubs[bookclubId]);
    }
  }, [bookclubId]);

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

  const menus: Menu[] = bookclubId
    ? [
        {
          
          name: bookclubName,
          path: `/bookclub/${bookclubId}/home`,
          icon: homeIcon,
          submenus: [
            { name: "공지사항", path: `/bookclub/${bookclubId}/notices` },
            { name: "책장", path: `/bookclub/${bookclubId}/shelf` },
            { name: "모임", path: `/bookclub/${bookclubId}/meeting` },
            { name: "책 추천", path: `/bookclub/${bookclubId}/recommend` },
            { name: "일정", path: `/bookclub/${bookclubId}/schedule` },
          ],
        },
        {
          name: "책 검색하기",
          icon: searchIcon,
          submenus: [
            { name: "통합검색", path: "/booksearch" },
            { name: "국내도서", path: "/booksearch1" },   // 미구현 추후 모달로 대체 예정
            { name: "전자책", path: "/booksearch2" },
          ],
        },
        {
          name: "책 이야기",
          icon: bookstoryIcon,
          submenus: [
            { name: "전체보기", path: "/bookstory" },
            { name: "내 책 이야기", path: "/bookstory/my" },
          ],
        },
        {
          name: "마이페이지",
          icon: mypageIcon,
          submenus: [
            { name: "내 모임", path: "/bookclub/my" },
            { name: "내 책 이야기", path: "/bookstory/my" },
            { name: "내 알림", path: "/notification" },
            { name: "내 구독", path: "/subscribe" },
          ],
        },
      ]
    : [
        {
          name: "홈",
          path: "/home",
          icon: homeIcon,
          submenus: [],
        },
        {
          name: "독서 모임",
          icon: bookclubIcon,
          submenus: [
            { name: "북적북적", path: `/bookclub/1/home` },
            { name: "책을모아", path: `/bookclub/2/home` },
            { name: "슬기로운 독서", path: `/bookclub/3/home` },
            { name: "모임 검색하기", path: "/searchClub" },
            { name: "모임 생성하기", path: "/createClub" },
          ],
        },
        {
          name: "책 검색하기",
          path: "/booksearch",
          icon: searchIcon,
          submenus: [
            { name: "통합검색", path: "/booksearch" },
            { name: "국내도서", path: "booksearch1" },
            { name: "전자책", path: "/booksearch2" },
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
            { name: "내 모임", path: "/mypage/group" },
            { name: "내 책 이야기", path: "/mypage/story" },
            { name: "내 알림", path: "/mypage/notification" },
            { name: "내 구독", path: "/mypage/subscription" },
          ],
        },
      ];

  const header = bookclubId ? (
    <div className="flex items-center gap-[0.5rem]">
      <img src={logoImage} alt="logo" className="w-10 h-10 object-contain" />
      <div className="flex flex-col">
        <span className="text-[2rem] font-blackHanSans text-[#3D4C35]">
          {bookclubName}
        </span>
        <button
          onClick={() => navigate(`/home`)}
          className="flex items-center gap-2 mt-1 px-[0.875rem] py-[0.25rem] rounded border border-[#93C27C] bg-[#F1F8EF] text-[#3D4C35]"
        >
          <img src={homeIcon} alt="home" className="w-4 h-4" />
          메인 홈
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-4">
      <img src={logoImage} alt="logo" className="w-10 h-auto" />
      <span className="text-4xl font-bold text-[#3D4C35] font-pretendard">
        책모
      </span>
    </div>
  );

  return (
    <div className="flex w-[16.5rem] h-screen flex-col px-6 py-8 bg-[#E9F2E3]">
      {header}

      <nav className="flex flex-col w-full space-y-2 mt-6">
        {menus.map(({ name, path, icon, submenus }) => (
          <div key={name} className="w-full">
            <div
              onClick={() => {
                if (submenus.length > 0) toggleMenu(name);
              }}
            >
              <NavLink
                to={path ?? "#"}
                className={({ isActive }) =>
                  `flex items-center justify-between py-2 pl-3 pr-4 w-full rounded-r-lg cursor-pointer hover:bg-[#DDEED6] ${
                    isActive
                      ? "text-[#3D4C35] font-semibold border-l-4 border-[#90D26D]"
                      : "text-[#AAA]"
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <img src={icon} alt={`${name} 아이콘`} className="w-5 h-5" />
                  <span className="text-[18px] font-medium font-pretendard">
                    {name}
                  </span>
                </div>
                {submenus.length > 0 && (
                  <img
                    src={openMenus.has(name) ? toggleClose : toggleOpen}
                    alt="토글"
                    className="w-4 h-4"
                  />
                )}
              </NavLink>
            </div>

            {openMenus.has(name) && submenus.length > 0 && (
              <div className="ml-8 mt-1 space-y-1">
                {submenus.map(({ name: subName, path: subPath }) => (
                  <NavLink
                    key={subName}
                    to={subPath}
                    className={({ isActive }) =>
                      `block text-sm py-1 pl-2 pr-3 rounded hover:text-[#3D4C35] ${
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

export default Sidebar;
