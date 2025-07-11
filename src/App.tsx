import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { KEYS } from "./config/key"; 
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ProfilePage from "./pages/Auth/ProfilePage";
import TestHeaderPage from "./pages/TestHeaderPage";
import MyHomePage from "./pages/Main/Info/My/MyHomePage";
import MyGroupPage from "./pages/Main/Info/My/MyGroupPage";
import MySubscriptionPage from "./pages/Main/Info/My/MySubscriptionPage";
import MyNotificationPage from "./pages/Main/Info/My/MyNotificationPage";
import MyStoryPage from "./pages/Main/Info/My/MyStoryPage";
import MyProfilePage from "./pages/Main/Info/My/MyProfilePage";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={KEYS.GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/test-header" element={<TestHeaderPage />} /> 
          <Route path="/mypage" element={<MyHomePage />} />
          {/* 마이페이지 하위 라우트 */}
          <Route path="/mypage/group" element={<MyGroupPage />} />
          <Route path="/mypage/subscription" element={<MySubscriptionPage />} />
          <Route path="/mypage/notification" element={<MyNotificationPage />} />
          <Route path="/mypage/story" element={<MyStoryPage />} />
          <Route path="/mypage/myprofile" element={<MyProfilePage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
