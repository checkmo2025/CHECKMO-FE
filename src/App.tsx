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
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
