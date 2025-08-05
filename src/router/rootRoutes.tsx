import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/SignupPage";
import ProfilePage from "../pages/Auth/ProfilePage";
import MainLayout from "../components/layout/MainLayout";
import HomePage from "../pages/Main/HomePage";
import SearchPage from "../pages/Main/SearchPage";
import MyHomePage from "../pages/Main/Info/My/MyHomePage";
import MyGroupPage from "../pages/Main/Info/My/MyGroupPage";
import MySubscriptionPage from "../pages/Main/Info/My/MySubscriptionPage";
import MyNotificationPage from "../pages/Main/Info/My/MyNotificationPage";
import MyStoryPage from "../pages/Main/Info/My/MyStoryPage";
import MyProfilePage from "../pages/Main/Info/My/MyProfilePage";
import OthersProfilePage from "../pages/Main/Info/OthersProfilePage";
import BookClubHomePage from "../pages/BookClub/BookClubHomePage";
import NoticePage from "../pages/BookClub/NoticePage";
import ShelfHomePage from "../pages/BookClub/Shelf/ShelfHomePage";
import ShelfDetailPage from "../pages/BookClub/Shelf/ShelfDetailPage";
import ThemeDetailPage from "../pages/BookClub/Shelf/ThemeDetailPage";
import ScoreDetailPage from "../pages/BookClub/Shelf/ScoreDetailPage";
import BookRecommendPage from "../pages/BookRecommend/BookRecommendPage";
import BookRecommendDetailPage from "../pages/BookRecommend/BookRecommendDetailPage";
import BookRecommendSearchPage from "../pages/BookRecommend/BookRecommendSearchPage";

export const rootRoutes = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      { path: "/home", element: <HomePage /> },
      { path: "/search", element: <SearchPage /> },
    ],
  },
  {
    path: "/mypage",
    children: [
      { index: true, element: <MyHomePage /> },
      { path: "group", element: <MyGroupPage /> },
      { path: "subscription", element: <MySubscriptionPage /> },
      { path: "notification", element: <MyNotificationPage /> },
      { path: "story", element: <MyStoryPage /> },
      { path: "profile", element: <MyProfilePage /> },
    ],
  },
  { path: "/info/others/:memberId", element: <OthersProfilePage /> },

  {
    path: "/bookclub/:clubId",
    children: [
      { index: true, element: <BookClubHomePage /> },
      { path: "notices", element: <NoticePage /> },

      {
        path: "shelf",
        children: [
          { index: true, element: <ShelfHomePage /> },
          { path: ":shelfBookIndex", element: <ShelfDetailPage /> },
          { path: ":shelfBookIndex/theme", element: <ThemeDetailPage /> },
          { path: ":shelfBookIndex/score", element: <ScoreDetailPage /> },
        ],
      },
      {
        path: "recommend",
        children: [
          { index: true, element: <BookRecommendPage /> },
          { path: ":recommendId", element: <BookRecommendDetailPage /> },
          { path: "search", element: <BookRecommendSearchPage /> },
        ],
      },
    ],
  },

  /* 6. 잘못된 URL → 홈으로 */
  { path: "*", element: <Navigate to="/" replace /> },
]);
