import { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
import exitIcon from "../assets/icons/exit.png";
import logoImage from "../assets/logos/mainlogo.png";
import toggleClose from "../assets/icons/toggleClose.png";
import toggleOpen from "../assets/icons/toggleOpen.png";

import homeGreen from "../assets/icons/home-green.png";
import homeGray from "../assets/icons/home-gray.png";
import bookclubGreen from "../assets/icons/bookclub-green.png";
import bookclubGray from "../assets/icons/bookclub-gray.png";
import searchGreen from "../assets/icons/search-green.png";
import searchGray from "../assets/icons/search-gray.png";
import bookstoryGreen from "../assets/icons/bookstory-green.png";
import bookstoryGray from "../assets/icons/bookstory-gray.png";
import mypageGreen from "../assets/icons/mypage-green.png";
import mypageGray from "../assets/icons/mypage-gray.png";
import bookGreen from "../assets/icons/book-green.png";
import bookGray from "../assets/icons/book-gray.png";
import bookshelfGreen from "../assets/icons/bookshelf-green.png";
import bookshelfGray from "../assets/icons/bookshelf-gray.png";
import noticeGreen from "../assets/icons/notice-green.png";
import noticeGray from "../assets/icons/notice-gray.png";

import Modal from "./Modal";
import BookClubListModal from "./BookClubListModal";

import { fetchMyClubs } from "../apis/Main/clubs";
import type { ClubDto } from "../apis/Main/clubs";

type Submenu = {
  name: string;
  path: string;
  isModal?: boolean;
  submenus?: Submenu[];
};

type Menu = {
  name: string;
  icon: { green: string; gray: string };
  path?: string;
  submenus: Submenu[];
};

const MODAL_ONLY = new Set([
  "/booksearch1",
  "/booksearch2",
  "/bookclub/this",
  "/bookclub/recommend/create",
]);

const Sidebar = () => {
  const { bookclubId } = useParams<{ bookclubId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [bookclubName, setBookclubName] = useState("모임 이름");
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myClubs, setMyClubs] = useState<ClubDto[]>([]);
  const [isClubListModalOpen, setIsClubListModalOpen] = useState(false);

  const openPlannedModal = () => setIsModalOpen(true);

  useEffect(() => {
    const loadClubs = async () => {
      const clubs = await fetchMyClubs();
      setMyClubs(clubs);
    };
    loadClubs();
  }, []);

  useEffect(() => {
    if (bookclubId) {
      const matchedClub = myClubs.find((c) => c.clubId === Number(bookclubId));
      if (matchedClub) setBookclubName(matchedClub.clubName);
    }
  }, [bookclubId, myClubs]);

  const menus: Menu[] = bookclubId
    ? [
        {
          name: bookclubName,
          path: `/bookclub/${bookclubId}/home`,
          icon: { green: homeGreen, gray: homeGray },
          submenus: [
            { name: "공지사항", path: `/bookclub/${bookclubId}/notices` },
            { name: "책장", path: `/bookclub/${bookclubId}/shelf` },
            {
              name: "모임",
              path: "#",
              submenus: [
                {
                  name: "모임 전체보기",
                  path: `/bookclub/${bookclubId}/meeting`,
                },
                { name: "이번 모임 바로가기", path: `/bookclub/this` },
              ],
            },
            {
              name: "책 추천",
              path: "#",
              submenus: [
                {
                  name: "책 추천 전체보기",
                  path: `/bookclub/${bookclubId}/recommend`,
                },
                {
                  name: "책 추천 하기",
                  path: `/bookclub/recommend/create`,
                },
              ],
            },
          ],
        },
        {
          name: "책 검색하기",
          icon: { green: searchGreen, gray: searchGray },
          submenus: [
            { name: "통합검색", path: "/booksearch" },
            { name: "국내도서", path: "/booksearch1" },
            { name: "전자책", path: "/booksearch2" },
          ],
        },
        {
          name: "책 이야기",
          icon: { green: bookstoryGreen, gray: bookstoryGray },
          submenus: [
            { name: "전체보기", path: "/bookstory" },
            { name: "내 책 이야기", path: "/bookstory/my" },
          ],
        },
        {
          name: "마이페이지",
          icon: { green: mypageGreen, gray: mypageGray },
          submenus: [
            { name: "내 모임", path: "/mypage/group" },
            { name: "내 책 이야기", path: "/mypage/story" },
            { name: "내 알림", path: "/mypage/notification" },
            { name: "내 구독", path: "/mypage/subscription" },
          ],
        },
      ]
    : [
        {
          name: "홈",
          path: "/home",
          icon: { green: homeGreen, gray: homeGray },
          submenus: [],
        },
        {
          name: "독서 모임",
          icon: { green: bookclubGreen, gray: bookclubGray },
          submenus: [
            { name: "내 모임 바로가기", path: "#", isModal: true },
            { name: "모임 검색하기", path: "/searchClub" },
            { name: "모임 생성하기", path: "/createClub" },
          ],
        },
        {
          name: "책 검색하기",
          path: "/booksearch",
          icon: { green: searchGreen, gray: searchGray },
          submenus: [
            { name: "통합검색", path: "/booksearch" },
            { name: "국내도서", path: "/booksearch1" },
            { name: "전자책", path: "/booksearch2" },
          ],
        },
        {
          name: "책 이야기",
          path: "/bookstory",
          icon: { green: bookstoryGreen, gray: bookstoryGray },
          submenus: [
            { name: "전체보기", path: "/bookstory" },
            { name: "내 책 이야기", path: "/bookstory/my" },
          ],
        },
        {
          name: "마이페이지",
          path: "/mypage",
          icon: { green: mypageGreen, gray: mypageGray },
          submenus: [
            { name: "내 모임", path: "/mypage/group" },
            { name: "내 책 이야기", path: "/mypage/story" },
            { name: "내 알림", path: "/mypage/notification" },
            { name: "내 구독", path: "/mypage/subscription" },
          ],
        },
      ];

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) => {
      const updated = new Set(prev);
      updated.has(menuName) ? updated.delete(menuName) : updated.add(menuName);
      return updated;
    });
  };

  const isTopMenuActive = (menu: Menu) => {
    const paths = [
      ...(menu.path ? [menu.path] : []),
      ...menu.submenus.flatMap((s) => [
        s.path,
        ...(s.submenus?.map((n) => n.path) || []),
      ]),
    ].filter(Boolean) as string[];
    return paths.some((p) => location.pathname.startsWith(p));
  };

  const getMenuTextColor = (menu: Menu, subPath?: string) => {
    const currentPath = location.pathname;
    const activeColor = "#3D4C35";
    const inactiveColor = "#AAAAAA";
    if (subPath) {
      if (subPath === "/bookstory" || subPath === "/booksearch") {
        return currentPath === subPath ? activeColor : inactiveColor;
      }
      return currentPath.startsWith(subPath) ? activeColor : inactiveColor;
    }
    return isTopMenuActive(menu) ? activeColor : inactiveColor;
  };

  const getIconSrc = (menu: Menu, subPath?: string) => {
    const active = getMenuTextColor(menu, subPath) === "#3D4C35";
    return active ? menu.icon.green : menu.icon.gray;
  };

  const renderSubmenus = (
    submenus: Submenu[],
    level = 1,
    parentMenu?: Menu
  ) => {
    return (
      <div
        className="mt-1 space-y-1 pl-3"
        style={{ marginLeft: `${level}rem` }}
      >
        {submenus.map(({ name, path, isModal, submenus: nested }) => {
          let iconPair = null;
          if (name === "공지사항")
            iconPair = { green: noticeGreen, gray: noticeGray };
          else if (name === "책장")
            iconPair = { green: bookshelfGreen, gray: bookshelfGray };
          else if (name === "모임")
            iconPair = { green: bookclubGreen, gray: bookclubGray };
          else if (name === "책 추천")
            iconPair = { green: bookGreen, gray: bookGray };

          const isOpen = openMenus.has(name);

          if (isModal) {
            return (
              <button
                key={name}
                onClick={() => setIsClubListModalOpen(true)}
                style={{ color: getMenuTextColor(parentMenu!, path) }}
                className="flex items-center gap-2 text-sm py-1 pl-2 pr-3 rounded hover:bg-[#DDEED6]"
              >
                {iconPair && (
                  <img
                    src={
                      getMenuTextColor(parentMenu!, path) === "#3D4C35"
                        ? iconPair.green
                        : iconPair.gray
                    }
                    className="w-5 h-5"
                  />
                )}
                {name}
              </button>
            );
          }

          if (!path || MODAL_ONLY.has(path)) {
            return (
              <button
                key={name}
                onClick={(e) => {
                  e.preventDefault();
                  openPlannedModal();
                }}
                style={{ color: getMenuTextColor(parentMenu!, path) }}
                className="flex items-center gap-2 text-sm py-1 pl-2 pr-3 rounded hover:bg-[#DDEED6]"
              >
                {iconPair && (
                  <img
                    src={
                      getMenuTextColor(parentMenu!, path) === "#3D4C35"
                        ? iconPair.green
                        : iconPair.gray
                    }
                    className="w-5 h-5"
                  />
                )}
                {name}
              </button>
            );
          }

          return (
            <div key={name}>
              <div className="flex items-center justify-between">
                <NavLink
                  to={nested ? "#" : path}
                  end
                  style={{ color: getMenuTextColor(parentMenu!, path) }}
                  className="flex items-center gap-2 text-sm py-1 pl-2 pr-3 rounded hover:bg-[#DDEED6]"
                  onClick={() => {
                    if (nested) toggleMenu(name);
                  }}
                >
                  {iconPair && (
                    <img
                      src={
                        getMenuTextColor(parentMenu!, path) === "#3D4C35"
                          ? iconPair.green
                          : iconPair.gray
                      }
                      className="w-5 h-5"
                    />
                  )}
                  {name}
                </NavLink>
                {nested && nested.length > 0 && (
                  <button
                    onClick={() => toggleMenu(name)}
                    className="p-1 cursor-pointer"
                  >
                    <img
                      src={isOpen ? toggleClose : toggleOpen}
                      alt="토글"
                      className="w-4 h-4"
                    />
                  </button>
                )}
              </div>
              {isOpen &&
                nested &&
                nested.length > 0 &&
                renderSubmenus(nested, level + 1, parentMenu)}
            </div>
          );
        })}
      </div>
    );
  };

  const header = (
    <div className="flex items-center gap-4 cursor-pointer">
      <img
        src={logoImage}
        alt="logo"
        style={{ width: "3.00188rem", height: "4.63044rem" }}
        onClick={() =>
          navigate(bookclubId ? `/bookclub/${bookclubId}/home` : "/home")
        }
      />
      <div className="flex flex-col justify-center">
        <span
          className={`text-4xl font-bold font-blackHanSans break-words truncate text-[#3D4C35]`}
          title={bookclubName}
          onClick={() =>
            navigate(bookclubId ? `/bookclub/${bookclubId}/home` : "/home")
          }
        >
          {bookclubId ? bookclubName : "책모"}
        </span>
        {bookclubId && (
          <button
            onClick={() => navigate(`/home`)}
            className="relative flex items-center mt-1 h-[2.125rem] rounded border border-[#93C27C] bg-[#F1F8EF]"
            style={{ width: "100%" }}
          >
            <img
              src={exitIcon}
              alt="home"
              className="w-4 h-4 ml-[0.875rem] absolute left-0"
            />
            <span className="absolute left-0 right-0 text-center text-[0.85rem] text-[#3D4C35] font-medium">
              메인 홈
            </span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex w-[16.5rem] h-screen flex-col px-6 py-8 bg-[#E9F2E3]">
      {header}

      <nav className="flex flex-col w-full overflow-y-auto space-y-2 mt-6">
        {menus.map((menu) => {
          const { name, path, submenus } = menu;
          const isMenuOpen = openMenus.has(name);

          return (
            <div key={name} className="w-full">
              <div className="flex items-center justify-between">
                <NavLink
                  to={path ?? submenus[0]?.path ?? "#"}
                  end
                  style={{ color: getMenuTextColor(menu) }}
                  className={`flex items-center gap-3 py-2 pl-3 pr-4 w-full rounded-r-lg cursor-pointer hover:bg-[#DDEED6] ${
                    isTopMenuActive(menu) ? "border-l-4 border-[#93C27C]" : ""
                  }`}
                  onClick={() => {
                    if (submenus.length > 0) toggleMenu(name);
                  }}
                >
                  <img src={getIconSrc(menu)} className="w-5 h-5" />
                  <span className="text-[18px] font-medium font-pretendard">
                    {name}
                  </span>
                </NavLink>

                {submenus.length > 0 && (
                  <button
                    onClick={() => toggleMenu(name)}
                    className="p-1 cursor-pointer"
                  >
                    <img
                      src={isMenuOpen ? toggleClose : toggleOpen}
                      alt="토글"
                      className="w-4 h-4"
                    />
                  </button>
                )}
              </div>
              {isMenuOpen &&
                submenus.length > 0 &&
                renderSubmenus(submenus, 1, menu)}
            </div>
          );
        })}
      </nav>

      <Modal
        isOpen={isModalOpen}
        title={"추후 개발 예정입니다!"}
        buttons={[{ label: "돌아가기", onClick: () => setIsModalOpen(false) }]}
        onBackdrop={() => setIsModalOpen(false)}
      />

      <BookClubListModal
        isOpen={isClubListModalOpen}
        clubs={myClubs}
        onClose={() => setIsClubListModalOpen(false)}
        onSelect={(clubId: number) => navigate(`/bookclub/${clubId}/home`)}
      />
    </div>
  );
};

export default Sidebar;
