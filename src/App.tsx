import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { KEYS } from "./config/key";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ProfilePage from "./pages/Auth/ProfilePage";
// import HomePage from "./pages/BookClub/HomePage";
import MainLayout from "./components/layout/MainLayout";
import SearchPage from "./pages/Main/SearchPage";
import MyPage from "./pages/Main/Info/MyPage";
import HomePage from "./pages/Main/HomePage";

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
            <Route path="/mypage" element={<MyPage />} />
          </Route>
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
