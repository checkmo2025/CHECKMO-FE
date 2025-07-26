import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { KEYS } from "./config/key";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ProfilePage from "./pages/Auth/ProfilePage";
import { dummyRecommendList } from "./pages/BookRecommend/DummyRecommendList";
import BookRecommendPage from "./pages/BookRecommend/BookRecommendPage";
import BookRecommendDetailPage from "./pages/BookRecommend/BookRecommendDetailPage";
import BookRecommendCreatePage from "./pages/BookRecommend/BookRecommendCreatePage";
import HomePage from "./pages/Main/HomePage";
import MyHomePage from "./pages/Main/Info/My/MyHomePage";
import MyGroupPage from "./pages/Main/Info/My/MyGroupPage";
import MySubscriptionPage from "./pages/Main/Info/My/MySubscriptionPage";
import MyNotificationPage from "./pages/Main/Info/My/MyNotificationPage";
import MyStoryPage from "./pages/Main/Info/My/MyStoryPage";
import MyProfilePage from "./pages/Main/Info/My/MyProfilePage";
import OthersProfilePage from "./pages/Main/Info/OthersProfilePage";
import BookClubHomePage from "./pages/BookClub/BookClubHomePage"; // 북클럽 홈
import NoticePage from "./pages/BookClub/NoticePage"; // 북클럽 공지사항
import ClubSearchPage from "./pages/Main/ClubSearchPage"; // 북클럽 검색
import CreateClubPage from "./pages/Main/CreateClubPage";
import BookStorySearchPage from "./pages/Main/BookStory/BookStorySearchPage";
import SearchPage from "./pages/Main/SearchPage";
import SearchRecommendBookPage from "./pages/BookRecommend/SearchRecommendBookPage";
import ShelfHomePage from "./pages/BookClub/Shelf/ShelfHomePage";
import ShelfDetailPage from "./pages/BookClub/Shelf/ShelfDetailPage";
import ThemeDetailPage from "./pages/BookClub/Shelf/ThemeDetailPage";
import ScoreDetailPage from "./pages/BookClub/Shelf/ScoreDetailPage";
import BookStoryHomePage from "./pages/Main/BookStory/BookStoryHomePage";
import Layout from "./components/layout/Layout";
import TestPage from "./pages/test";

const App = () => {
  const dummyList = dummyRecommendList;

  return (
    <GoogleOAuthProvider clientId={KEYS.GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/recommend"
            element={<BookRecommendPage bookRecommendList={dummyList} />}
          />
          <Route
            path="/recommend/:recommendId"
            element={<BookRecommendDetailPage />}
          />
          <Route
            path="/recommend/create/:bookId"
            element={<BookRecommendCreatePage />}
          />
          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/booksearch" element={<SearchPage />} />
            <Route path="/searchClub" element={<ClubSearchPage />} />
            {/* 마이페이지 하위 라우트 */}
            <Route path="/mypage/group" element={<MyGroupPage />} />
            <Route
              path="/mypage/subscription"
              element={<MySubscriptionPage />}
            />
            <Route
              path="/mypage/notification"
              element={<MyNotificationPage />}
            />
            <Route path="/mypage/story" element={<MyStoryPage />} />
            <Route path="/mypage/myprofile" element={<MyProfilePage />} />
            <Route path="/mypage" element={<MyHomePage />} />
            <Route path="/bookstory" element={<BookStoryHomePage />} />
            <Route path="/bookstory/search" element={<BookStorySearchPage />} />
          </Route>

          {/* 동적 모임 - 사이드바 확인용 (더기)  */}
          <Route path=":id" element={<Layout />}>
            <Route path="test" element={<TestPage />} />
          </Route>

          {/* /bookclub 이하에 북클럽 관련 페이지 묶기 */}
          <Route path="/bookclub">
            {/* /bookclub → 북클럽 홈 */}
            <Route index element={<BookClubHomePage />} />

            {/* /bookclub/notices → 공지사항 페이지 */}
            <Route path="notices" element={<NoticePage />} />
            <Route path=":id" element={<Layout />}>
              <Route path="home" element={<BookClubHomePage />} />

              {/* 책장 */}
              <Route path="shelf" element={<ShelfHomePage />} />
              <Route
                path="shelf/:shelfBookIndex"
                element={<ShelfDetailPage />}
              />
              <Route
                path="shelf/:shelfBookIndex/theme"
                element={<ThemeDetailPage />}
              />
              <Route
                path="shelf/:shelfBookIndex/score"
                element={<ScoreDetailPage />}
              />

              {/* 책 추천 */}
              <Route
                path="recommend/searchrecommendbook"
                element={<SearchRecommendBookPage />}
              />
            </Route>
          </Route>
          {/* Others 프로필 라우트 추가 */}
          <Route path="/info/others/:id" element={<OthersProfilePage />} />

          <Route path="/createClub" element={<CreateClubPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
