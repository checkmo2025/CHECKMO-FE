import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { KEYS } from "./config/key";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ProfilePage from "./pages/Auth/ProfilePage";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/Main/HomePage";
import TestHeaderPage from "./pages/TestHeaderPage";
import MyHomePage from "./pages/Main/Info/My/MyHomePage";
import MyGroupPage from "./pages/Main/Info/My/MyGroupPage";
import MySubscriptionPage from "./pages/Main/Info/My/MySubscriptionPage";
import MyNotificationPage from "./pages/Main/Info/My/MyNotificationPage";
import MyStoryPage from "./pages/Main/Info/My/MyStoryPage";
import MyProfilePage from "./pages/Main/Info/My/MyProfilePage";
import OthersProfilePage from "./pages/Main/Info/OthersProfilePage";
import BookClubHomePage from './pages/BookClub/BookClubHomePage'      // 북클럽 홈
import NoticePage from './pages/BookClub/NoticePage'  // 북클럽 공지사항
import ClubSearchPage from './pages/Main/ClubSearchPage'  // 북클럽 검색
import CreateClubPage from './pages/Main/CreateClubPage'
import BookStorySearchPage from "./pages/Main/BookStory/BookStorySearchPage";
import SearchPage from "./pages/Main/SearchPage";
import BookAddPage from "./pages/BookClub/Review/BookAddPage";
import ShelfHomePage from "./pages/BookClub/Shelf/ShelfHomePage";
import ShelfDetailPage from "./pages/BookClub/Shelf/ShelfDetailPage";
import ThemeDetailPage from "./pages/BookClub/Shelf/ThemeDetailPage";
import ScoreDetailPage from "./pages/BookClub/Shelf/ScoreDetailPage";


const App = () => {
  return (
    <GoogleOAuthProvider clientId={KEYS.GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route element={<MainLayout />}>
            <Route path="/home" element={<HomePage />} />
            {/* 메인 사이드바 사용할 페이지는 여기에 넣기 */}
            <Route path="/search" element={<SearchPage />} />
          </Route>
          <Route path="/test-header" element={<TestHeaderPage />} /> 
          <Route path="/mypage" element={<MyHomePage />} />
          {/* Others 프로필 라우트 추가 */}
          <Route path="/info/others/:id" element={<OthersProfilePage />} />
          {/* 마이페이지 하위 라우트 */}
          <Route path="/mypage/group" element={<MyGroupPage />} />
          <Route path="/mypage/subscription" element={<MySubscriptionPage />} />
          <Route path="/mypage/notification" element={<MyNotificationPage />} />
          <Route path="/mypage/story" element={<MyStoryPage />} />
          <Route path="/mypage/myprofile" element={<MyProfilePage />} />
          {/* /bookclub 이하에 북클럽 관련 페이지 묶기 */}
          <Route path="/bookclub">
            {/* /bookclub → 북클럽 홈 */}
            <Route index element={<BookClubHomePage />} />
            {/* /bookclub/notices → 공지사항 페이지 */}
            <Route path="notices" element={<NoticePage />} />
          </Route>
          <Route path='/searchClub' element={<ClubSearchPage />} />
          <Route path='/createClub' element={<CreateClubPage />} />
          // 검색 임시 페이지
          <Route path="/bookstory/search" element={<BookStorySearchPage />} />
          <Route path="/booksearch" element={<SearchPage />} />
          <Route path=":prefix/bookaddpage" element={<BookAddPage />} />
          // 책장
          <Route path=":prefix/shelf" element={<ShelfHomePage />} />
          <Route path=":prefix/shelf/:shelfBookIndex" element={<ShelfDetailPage />} />
          <Route path=":prefix/shelf/:shelfBookIndex/theme" element={<ThemeDetailPage />} />
          <Route path=":prefix/shelf/:shelfBookIndex/score" element={<ScoreDetailPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
