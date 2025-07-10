import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { KEYS } from "./config/key"; 
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ProfilePage from "./pages/Auth/ProfilePage";


import BookStorySearchPage from "./pages/Main/BookStory/BookStorySearchPage";
import SearchPage from "./pages/Main/SearchPage";
import BookAddPage from "./pages/BookClub/Review/BookAddPage";

import ShelfHomePage from "./pages/BookClub/Shelf/ShelfHomePage";
import ShelfDetailPage from "./pages/BookClub/Shelf/ShelfDetailPage";
const App = () => {
  return (
    <GoogleOAuthProvider clientId={KEYS.GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          // 검색 임시 페이지
          <Route path="/bookstory/search" element={<BookStorySearchPage />} />
          <Route path="/booksearch" element={<SearchPage />} />
          <Route path=":prefix/bookaddpage" element={<BookAddPage />} />


          // 책장
          <Route path=":prefix/shelf" element={<ShelfHomePage />} />
          <Route path=":prefix/shelf/:shelfBookIndex" element={<ShelfDetailPage />} />

          
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
