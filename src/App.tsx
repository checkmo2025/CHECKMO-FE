import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { KEYS } from "./config/key"; 
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ProfilePage from "./pages/Auth/ProfilePage";
import HomePage from './pages/BookClub/HomePage'      // 북클럽 홈
import NoticePage from './pages/BookClub/NoticePage'  // 북클럽 공지사항
import ClubSearchPage from './pages/Main/ClubSearchPage'  // 북클럽 검색
import CreateClubPage from './pages/Main/CreateClubPage'


const App = () => {
  return (
    <GoogleOAuthProvider clientId={KEYS.GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* /bookclub 이하에 북클럽 관련 페이지 묶기 */}
          <Route path="/bookclub">
            {/* /bookclub → 북클럽 홈 */}
            <Route index element={<HomePage />} />

            {/* /bookclub/notices → 공지사항 페이지 */}
            <Route path="notices" element={<NoticePage />} />
          </Route>

          <Route path='/searchClub' element={<ClubSearchPage />} />

          <Route path='/createClub' element={<CreateClubPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
