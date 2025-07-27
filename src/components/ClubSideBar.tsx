import { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import homeIcon from "../assets/icons/home.png";
import searchIcon from "../assets/icons/search.png";
import bookstoryIcon from "../assets/icons/bookstory.png";
import mypageIcon from "../assets/icons/mypage.png";
import logoImage from "../assets/logos/mainlogo.png";
import toggleClose from "../assets/icons/toggleClose.png";
import toggleOpen from "../assets/icons/toggleOpen.png";

const dummyBookclubs: Record<string, string> = {
  "1": "북적북적",
  "2": "책을모아",
  "3": "슬기로운 독서생활",
};

const ClubSideBar = () => {
  const { id } = useParams<{ id: string }>();
  const [bookclubName, setBookclubName] = useState("모임 이름");
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

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

  useEffect(() => {
    if (id && dummyBookclubs[id]) {
      setBookclubName(dummyBookclubs[id]);
    }
  }, [id]);

  const menus = [
    {
      name: bookclubName,
      icon: homeIcon,
      submenus: [
        { name: "공지사항", path: `/bookclub/${id}/notice` },
        { name: "책장", path: `/bookclub/${id}/shelf` },
        { name: "모임", path: `/bookclub/${id}/meeting` },
        { name: "책 추천", path: `/bookclub/${id}/recommend` },
        { name: "일정", path: `/bookclub/${id}/schedule` },
      ],
    },
    {
      name: "책 검색하기",
      icon: searchIcon,
      submenus: [
        { name: "통합검색", path: `/bookclub/${id}` },
        { name: "국내도서", path: "/domesticBook" },
        { name: "전자책", path: "/ebook" },
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
  ];

  return (
    <div className="flex w-[16.5rem] h-screen flex-col items-start justify-start gap-[2.8125rem] px-6 py-8 bg-[#E9F2E3] shrink-0">
      <div className="flex items-center gap-[0.5rem]">
        <img src={logoImage} alt="logo" className="w-10 h-10 object-contain" />
        <div className="flex flex-col">
          <span className="text-[2rem] font-blackHanSans leading-[3.4375rem] tracking-[-0.02rem] text-[#3D4C35]">
            {bookclubName}
          </span>
          <button
            onClick={() => navigate(`/home`)}
            className="flex items-center cursor-pointer gap-2 mt-1 px-[0.875rem] py-[0.25rem] rounded-[0.3125rem] border border-[#93C27C] bg-[#F1F8EF] text-[#3D4C35] text-base font-medium"
          >
            <img src={homeIcon} alt="home" className="w-4 h-4" />
            메인 홈
          </button>
        </div>
      </div>

      <nav className="flex flex-col w-full space-y-2">
        {menus.map(({ name, icon, submenus }) => (
          <div key={name} className="w-full">
            <div
              onClick={() => toggleMenu(name)}
              className="flex items-center justify-between py-2 pl-3 pr-4 gap-3 w-full rounded-r-lg cursor-pointer hover:bg-[#DDEED6] text-[#3D4C35] font-semibold"
            >
              <div className="flex items-center gap-3">
                <img src={icon} alt={`${name} 아이콘`} className="w-5 h-5" />
                <span className="text-[18px] font-medium leading-[135%] tracking-[-0.018px] font-pretendard">
                  {name}
                </span>
              </div>
              <img
                src={openMenus.has(name) ? toggleClose : toggleOpen}
                alt="토글 아이콘"
                className="w-4 h-4"
              />
            </div>

            {openMenus.has(name) && (
              <div className="ml-8 mt-1 space-y-1">
                {submenus.map(({ name: subName, path }) => (
                  <NavLink
                    key={subName}
                    to={path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 text-sm py-1 pl-2 pr-3 rounded hover:text-[#3D4C35]
                      ${
                        isActive
                          ? "text-[#3D4C35] font-semibold"
                          : "text-[#AAA]"
                      }`
                    }
                  >
                    {/* TODO: 로고 [독서모임이름] 부분에만 넣고 나머지는 빼기ㅣ */}
                    <div className="w-4 h-4 bg-red-300 rounded" /> {subName}
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

export default ClubSideBar;
