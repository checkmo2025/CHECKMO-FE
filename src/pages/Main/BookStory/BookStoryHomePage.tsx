import { useState, useEffect } from "react";
import BookStoryCard from "../../../components/BookClub/BookStoryCard";
import { LayoutGrid, List, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

const dummyData = [
  {
    imageUrl: "/placeholder/book1.png",
    profileUrl: "/placeholder/profile1.png",
    userName: "hy",
    isSubscribed: true,
    title: "나는 나이트 왕자다",
    summary:
      "어린 왕자는 소행성의 주인이므로 어린 군주라는 뜻이다. 어린 왕자는 B-612에서 바오밥나무 씨앗을 캐거나 석양을 보며 살고 있다. B-612는 크기가 너무 ...",
    bookTitle: "어린 왕자",
    author: "헤밍웨이",
    likes: 12,
  },
  {
    imageUrl: "/placeholder/book2.png",
    profileUrl: "/placeholder/profile2.png",
    userName: "sally",
    isSubscribed: false,
    title: "행복한 삶을 위하여",
    summary:
      "우리는 모두 행복을 추구한다. 그러나 그 방법은 저마다 다르다. 이 책은 그 다양한 길을 소개한다...",
    bookTitle: "행복론",
    author: "알랭",
    likes: 5,
  },
  {
    imageUrl: "/placeholder/book3.png",
    profileUrl: "/placeholder/profile3.png",
    userName: "min",
    isSubscribed: true,
    title: "시간을 파는 상점",
    summary:
      "고등학생 소녀가 시간 판매 상점을 운영하면서 벌어지는 사건들. 시간을 통해 삶을 되돌아보게 만든다...",
    bookTitle: "시간을 파는 상점",
    author: "김선영",
    likes: 22,
  },
  {
    imageUrl: "/placeholder/book4.png",
    profileUrl: "/placeholder/profile4.png",
    userName: "jake",
    isSubscribed: false,
    title: "죽음에 관하여",
    summary:
      "삶의 끝은 죽음이다. 그러나 우리는 그것을 회피하려고만 한다. 죽음을 직면하는 법을 이 책은 말해준다...",
    bookTitle: "죽음의 수용소에서",
    author: "빅터 프랭클",
    likes: 17,
  },
  {
    imageUrl: "/placeholder/book5.png",
    profileUrl: "/placeholder/profile5.png",
    userName: "yuna",
    isSubscribed: true,
    title: "감정 수업",
    summary:
      "감정은 우리를 움직이게 만든다. 그 감정을 어떻게 받아들이고 다룰 수 있을까에 대해 설명한다...",
    bookTitle: "감정 수업",
    author: "롤프 젤린",
    likes: 30,
  },
  {
    imageUrl: "/placeholder/book6.png",
    profileUrl: "/placeholder/profile6.png",
    userName: "daniel",
    isSubscribed: false,
    title: "어둠 속에서",
    summary:
      "이 책은 어둠을 어떻게 견뎌내는지에 대한 이야기다. 우리는 모두 한 번쯤 그 어둠을 마주하게 된다...",
    bookTitle: "어둠의 왼손",
    author: "어슐러 K. 르 귄",
    likes: 9,
  },
];

const tabs = [
  "전체 보기",
  "구독 중 보기",
  "복작복작 보기",
  "짱구의 독서모임 보기",
];

const BookStoryHomePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [stories, setStories] = useState(dummyData);

  useEffect(() => {
    const savedStories = JSON.parse(
      localStorage.getItem("bookStories") || "[]"
    );
    setStories([...savedStories, ...dummyData]);
  }, []);

  const filteredStories =
    activeTab === 1 ? stories.filter((story) => story.isSubscribed) : stories;

  return (
    <div className="p-8">
      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`pb-2 text-sm font-medium relative transition-colors duration-150 ${
              index === activeTab
                ? "text-black border-b-2 border-green-500"
                : "text-gray-400 hover:text-black"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center mb-6 mt-6">
        <Link to="/bookstory/search">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#A6917D] text-white text-sm font-medium">
            <Pencil size={16} /> 책 이야기
          </button>
        </Link>

        <div className="flex gap-2">
          <button onClick={() => setViewMode("grid")}>
            <LayoutGrid
              size={20}
              className={viewMode === "grid" ? "text-black" : "text-gray-400"}
            />
          </button>
          <button onClick={() => setViewMode("list")}>
            <List
              size={20}
              className={viewMode === "list" ? "text-black" : "text-gray-400"}
            />
          </button>
        </div>
      </div>

      <div
        className={`${
          viewMode === "grid"
            ? "grid grid-cols-2 gap-6"
            : "flex flex-col gap-4 w-full"
        }`}
      >
        {filteredStories.map((story, index) => (
          <BookStoryCard key={index} {...story} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
};

export default BookStoryHomePage;
