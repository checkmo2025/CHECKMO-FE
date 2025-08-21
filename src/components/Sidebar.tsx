import { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import exitIcon from "../assets/icons/exit.png";
import logoImage from "../assets/logos/mainlogo.png";
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
import { fetchClubDetail } from "../apis/BookClub/getBookClub";
import type { ClubDetailDto } from "../apis/BookClub/getBookClub";
import clubDefaultImage from "../assets/images/clubImage.png";
import toggleOpenGray from "../assets/icons/toggleOpen-gray.png";
import toggleOpenGreen from "../assets/icons/toggleOpen-green.png";
import toggleCloseGray from "../assets/icons/toggleClose-gray.png";
import toggleCloseGreen from "../assets/icons/toggleClose-green.png";
import exitHoverIcon from "../assets/icons/exit-hover.png";

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
  const [clubProfileImage, setClubProfileImage] = useState<string | null>(null);
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("추후 개발 예정입니다!");

  const [myClubs, setMyClubs] = useState<ClubDto[]>([]);
  const [isClubListModalOpen, setIsClubListModalOpen] = useState(false);

  const openPlannedModal = (msg = "추후 개발 예정입니다!") => {
    setModalMessage(msg);
    setIsModalOpen(true);
  };

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

      fetchClubDetail(Number(bookclubId))
        .then((detail: ClubDetailDto) => {
          if (detail?.profileImageUrl) {
            setClubProfileImage(detail.profileImageUrl);
          } else {
            setClubProfileImage(null);
          }
        })
        .catch((err) => {
          console.error("클럽 정보 불러오기 실패:", err);
        });
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
              path: `/bookclub/${bookclubId}/meeting`,
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
              path: `/bookclub/${bookclubId}/recommend`,
              submenus: [
                {
                  name: "책 추천 전체보기",
                  path: `/bookclub/${bookclubId}/recommend`,
                },
                {
                  name: "책 추천 하기",
                  path: `/bookclub/${bookclubId}/recommend/search`,
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
          path: "/mypage",
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
            {
              name: "내 모임 바로가기",
              path: "#",
              isModal: true,
            },
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

  const isMenuActive = (menu: Menu | Submenu, currentPath: string): boolean => {
    if (menu.path === currentPath) {
      return true;
    }
    if (menu.submenus && menu.submenus.length > 0) {
      return menu.submenus.some((submenu) =>
        isMenuActive(submenu, currentPath)
      );
    }
    return false;
  };

  const toggleMenu = (menuName: string) => {
    setOpenMenus((prev) => {
      const updated = new Set(prev);
      updated.has(menuName) ? updated.delete(menuName) : updated.add(menuName);
      return updated;
    });
  };

  const getMenuTextColor = (menu: Menu | Submenu) => {
    const activeColor = "#3D4C35";
    const inactiveColor = "#AAAAAA";
    return isMenuActive(menu, location.pathname) ? activeColor : inactiveColor;
  };

  const getToggleIcon = (menu: Menu | Submenu, isOpen: boolean) => {
    const active = isMenuActive(menu, location.pathname);
    if (isOpen) {
      return active ? toggleCloseGreen : toggleCloseGray;
    } else {
      return active ? toggleOpenGreen : toggleOpenGray;
    }
  };

  const getIconSrc = (menu: Menu | Submenu) => {
    const active = isMenuActive(menu, location.pathname);
    return "icon" in menu ? (active ? menu.icon.green : menu.icon.gray) : "";
  };

  const renderSubmenus = (submenus: Submenu[], level = 1) => {
    const paddingClass = level === 1 ? "pl-8" : "pl-7";

    return (
      <div className={`mt-1 space-y-1 ${paddingClass} cursor-pointer`}>
        {submenus.map((submenu) => {
          const { name, path, isModal, submenus: nested } = submenu;
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
          const currentSubmenuObject: Submenu = {
            name,
            path,
            submenus: nested,
          };

          if (isModal) {
            return (
              <button
                key={name}
                onClick={() => {
                  if (myClubs.length === 0) {
                    openPlannedModal("내 모임이 없습니다.");
                  } else {
                    setIsClubListModalOpen(true);
                  }
                }}
                style={{ color: getMenuTextColor(currentSubmenuObject) }}
                className="flex items-center gap-2 text-sm py-1 pl-2 pr-3 rounded hover:bg-[#DDEED6] cursor-pointer"
              >
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
                style={{ color: getMenuTextColor(currentSubmenuObject) }}
                className="flex items-center gap-2 text-sm py-1 pl-2 pr-3 rounded hover:bg-[#DDEED6] cursor-pointer"
              >
                {name}
              </button>
            );
          }

          return (
            <div key={name} className="cursor-pointer">
              <div className="flex items-center justify-between">
                <NavLink
                  to={nested ? "#" : path}
                  end={!nested}
                  style={{ color: getMenuTextColor(currentSubmenuObject) }}
                  className="flex items-center gap-2 text-sm py-1 pl-2 pr-3 rounded hover:bg-[#DDEED6]"
                  onClick={(e) => {
                    if (nested) {
                      e.preventDefault();
                      toggleMenu(name);
                    }
                  }}
                >
                  {iconPair && (
                    <img
                      src={
                        getMenuTextColor(currentSubmenuObject) === "#3D4C35"
                          ? iconPair.green
                          : iconPair.gray
                      }
                      className="w-5 h-5"
                      alt={name}
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
                      src={getToggleIcon(currentSubmenuObject, isOpen)}
                      alt="토글"
                      className="w-4 h-4"
                    />
                  </button>
                )}
              </div>
              <AnimatePresence>
                {isOpen && nested && nested.length > 0 && (
                  <motion.div
                    key={name}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    {renderSubmenus(nested, level + 1)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    );
  };

  const header = (
    <div
      className={`flex cursor-pointer ${
        bookclubId ? "items-center gap-4" : "items-center justify-center gap-1"
      }`}
    >
      <img
        src={bookclubId ? clubProfileImage || clubDefaultImage : logoImage}
        alt="logo"
        style={{
          width: "5.3478rem",
          height: "5.7158rem",
          objectFit: bookclubId ? "cover" : "contain",
          borderRadius: bookclubId ? "0.81rem" : "0",
          cursor: "pointer",
        }}
        onClick={() =>
          navigate(bookclubId ? `/bookclub/${bookclubId}/home` : "/home")
        }
        onError={(e) => {
          e.currentTarget.src = clubDefaultImage;
        }}
      />
      <div className="flex flex-col items-center">
        <span
          style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: bookclubId ? "2.25rem" : "3rem",
            marginRight: !bookclubId ? "1rem" : undefined,
          }}
          className="max-w-[8.125rem] whitespace-nowrap overflow-hidden text-ellipsis text-[#3D4C35] text-center"
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
            className="relative flex items-center mt-1 h-[2.125rem] w-[7rem] rounded border border-[#93C27C] bg-[#F1F8EF] cursor-pointer"
          >
            <img src={exitIcon} alt="home" className="w-4 h-4 ml-5" />
            <span className="text-[0.85rem] text-[#3D4C35] font-medium ml-2">
              메인 홈
            </span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex w-[16.5rem] h-screen flex-col px-6.5 py-8 bg-[#E9F2E3] ">
      {header}
      <nav className="flex flex-col w-full overflow-y-auto space-y-2 mt-6">
        {menus.map((menu) => {
          const { name, path, submenus } = menu;
          const isMenuOpen = openMenus.has(name);

          return (
            <div key={name} className="w-full">
              <div className="flex items-center justify-between w-full">
                <NavLink
                  to={path ?? submenus[0]?.path ?? "#"}
                  end={!submenus || submenus.length === 0}
                  style={{ color: getMenuTextColor(menu) }}
                  className={`flex items-center gap-3 py-2 pl-3 pr-4 flex-1 rounded-r-lg hover:bg-[#DDEED6] cursor-pointer ${
                    isMenuActive(menu, location.pathname)
                      ? "border-l-4 border-[#93C27C]"
                      : ""
                  }`}
                  onClick={(e) => {
                    if (submenus.length > 0) {
                      e.preventDefault();
                      toggleMenu(name);
                    }
                  }}
                >
                  <img
                    src={getIconSrc(menu)}
                    className="w-5 h-5 flex-shrink-0"
                    alt=""
                  />
                  <span
                    className="text-[18px] font-medium whitespace-nowrap overflow-hidden text-ellipsis flex-1"
                    title={name}
                  >
                    {name}
                  </span>
                </NavLink>

                {submenus.length > 0 && (
                  <button
                    onClick={() => toggleMenu(name)}
                    className="p-1 flex-shrink-0 cursor-pointer"
                  >
                    <img
                      src={getToggleIcon(menu, isMenuOpen)}
                      alt="토글"
                      className="w-4 h-4 cursor-pointer"
                    />
                  </button>
                )}
              </div>

              <AnimatePresence>
                {isMenuOpen && (
                  <motion.div
                    key="submenu"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {renderSubmenus(submenus, 1)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      <Modal
        isOpen={isModalOpen}
        title={modalMessage}
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
