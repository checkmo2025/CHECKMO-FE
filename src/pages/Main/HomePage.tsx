import NoticeCard from "../../components/Main/Notices/NoticeCard";
import BookStoriesCard from "../../components/Main/BookStoriesCard";
import Header from "../../components/Header";

const notices = [
  {
    id: 1,
    title: "북적북적",
    date: "2025. 06. 12",
    book: "넥서스",
    type: "모임" as const,
    imageUrl: "https://placehold.co/262x232?text=Book1",
    content: "내용내용내용내용내용내용내용내용",
  },
  {
    id: 2,
    title: "책방산책",
    date: "2025. 07. 03",
    book: "어린 왕자",
    type: "투표" as const,
    imageUrl: "https://placehold.co/262x232?text=Book2",
    content: "내용내용내용내용내용내용내용내용",
  },
  {
    id: 3,
    title: "책사모",
    date: "2025. 10. 03",
    book: "디어 에반 핸슨",
    type: "공지" as const,
    imageUrl: "https://placehold.co/262x232?text=Book3",
    content:
      "내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용",
  },
];

const bookstories = [
  {
    id: 1,
    title: "북적북적",
    story:
      "줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.",
    state: "구독 중",
    likes: 12,
  },
  {
    id: 2,
    title: "인간실격",
    story:
      "줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.",
    state: "구독 중",
    likes: 193,
  },
  {
    id: 3,
    title: "홍학의 자리",
    story:
      "줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.",
    state: "구독 중",
    likes: 2003,
  },
  {
    id: 4,
    title: "홍학의 자리",
    story:
      "줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다. 줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.줄거리 들어갈 부분입니다.",
    state: "구독 중",
    likes: 2003,
  },
];

const HomePage = () => {
  return (
    <>
      <Header pageTitle="책모 홈" />
      {/* TODO: margin 수정하기 */}
      <div className="mt-20 px-6 py-8">
        <div className="text-xl font-semibold text-gray-800 mb-4">공지사항</div>
        <div className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth mb-12 scrollbar-hide">
          {notices.map((notice) => (
            <NoticeCard key={notice.id} {...notice} />
          ))}
        </div>

        <div className="text-xl font-semibold text-gray-800 mb-4">
          책 이야기
        </div>
        <div className="flex gap-4 overflow-x-auto flex-nowrap scroll-smooth scrollbar-hide">
          {bookstories.map((story) => (
            <div key={story.id} className="flex-shrink-0 w-[33rem]">
              <BookStoriesCard {...story} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
