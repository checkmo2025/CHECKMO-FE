import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { KEYS } from "./config/key"; 
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ProfilePage from "./pages/Auth/ProfilePage";
import TestHeaderPage from "./pages/TestHeaderPage";
import MyPage from "./pages/Main/Info/MyPage";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={KEYS.GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/test-header" element={<TestHeaderPage />} /> 
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
