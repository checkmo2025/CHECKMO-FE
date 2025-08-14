import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ProfilePage from "./pages/Auth/ProfilePage";
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
import NoticeDetailPage from "./pages/BookClub/NoticeDetailPage"; // 공지사항 상세 (통합)
import NoticeCreatePage from "./pages/BookClub/NoticeCreatePage";
import ClubSearchPage from "./pages/Main/ClubSearchPage"; // 북클럽 검색
import CreateClubPage from "./pages/Main/CreateClubPage";
import BookStorySearchPage from "./pages/Main/BookStory/BookStorySearchPage";
import SearchPage from "./pages/Main/SearchPage";
import BookRecommendSearchPage from "./pages/BookRecommend/BookRecommendSearchPage";
import ShelfHomePage from "./pages/BookClub/Shelf/ShelfHomePage";
import ShelfDetailPage from "./pages/BookClub/Shelf/ShelfDetailPage";
import TopicDetailPage from "./pages/BookClub/Shelf/TopicDetailPage";
import ScoreDetailPage from "./pages/BookClub/Shelf/ScoreDetailPage";
import BookStoryHomePage from "./pages/Main/BookStory/BookStoryHomePage";
import Layout from "./components/layout/Layout";
import MeetingListPage from "./pages/Meeting/MeetingListPage";
import BookStoryDetailPage from "./pages/Main/BookStory/BookStoryDetailPage";
import BookStoryWritePage from "./pages/Main/BookStory/BookStoryWritePage";
import GroupManagementPage from "./pages/Admin/GroupAdminPage";
import MeetingDetailPage from "./pages/Meeting/MeetingDetailPage";
import CreateMeetingPage from "./pages/Meeting/CreateMeetingPage";
import MeetingTopicListPage from "./pages/Meeting/MeetingTopicListPage";
import NoticeManagementPage from "./pages/Manage/NoticeManagementPage";
import EditClubPage from "./pages/BookClub/Club/ClubEditPage";
import BookClubAdminPage from "./pages/Admin/BookClubAdminPage";
import MemberAdminPage from "./pages/Admin/MemberAdminPage";
import RegisterAdminPage from "./pages/Admin/RegisterAdminPage";
import MeetingTeamTopicListPage from "./pages/Meeting/MeetingTeamTopicListPage";
import BookRecommendEditPage from "./pages/BookRecommend/BookRecommendEditPage";

const App = () => {
  return (
      <Router>
        <Routes>
          {/* 로그인 / 회원가입 */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          <Route element={<Layout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/booksearch" element={<SearchPage />} />
            <Route path="/searchClub" element={<ClubSearchPage />} />
            <Route
              path="/info/others/:userId"
              element={<OthersProfilePage />}
            />
            <Route
              path="/info/others/:userId"
              element={<OthersProfilePage />}
            />
            <Route path="/createClub" element={<CreateClubPage />} />

            {/* 운영진 */}
            <Route path="manage">
              <Route path="group" element={<GroupManagementPage />} />
              <Route path="notices" element={<NoticeManagementPage />} />{" "}
              {/* 임시 */}
            </Route>
            {/* 마이페이지 */}
            <Route path="mypage">
              <Route index element={<MyHomePage />} />
              <Route path="group" element={<MyGroupPage />} />
              <Route path="subscription" element={<MySubscriptionPage />} />
              <Route path="notification" element={<MyNotificationPage />} />
              <Route path="story" element={<MyStoryPage />} />
              <Route path="myprofile" element={<MyProfilePage />} />
            </Route>

            {/* 책이야기 */}
            <Route path="bookstory">
              <Route index element={<BookStoryHomePage />} />
              <Route path="search" element={<BookStorySearchPage />} />
              <Route path=":storyId/detail" element={<BookStoryDetailPage />} />
              <Route path=":bookId/write" element={<BookStoryWritePage />} />
            </Route>
          </Route>

          {/* /bookclub 이하에 북클럽 관련 페이지 묶기 */}
          <Route path="/bookclub">
            <Route path=":bookclubId" element={<Layout />}>
              <Route path="home" element={<BookClubHomePage />} />
              <Route path="notices" element={<NoticePage />} />
              <Route path="edit" element={<EditClubPage />} />
              <Route path="notices/:noticeId" element={<NoticeDetailPage />} />
              <Route path="notices/create" element={<NoticeCreatePage />} />
              
              {/* 책장 */}
              <Route path="shelf">
                <Route index element={<ShelfHomePage />} />
                <Route path=":ShelfmeetingId" element={<ShelfDetailPage />} />
                <Route
                  path=":ShelfmeetingId/topic"
                  element={<TopicDetailPage />}
                />
                <Route
                  path=":ShelfmeetingId/score"
                  element={<ScoreDetailPage />}
                />
              </Route>
              {/* 책 추천 */}
              <Route path="recommend">
                <Route index element={<BookRecommendPage />} />
                <Route
                  path=":recommendId"
                  element={<BookRecommendDetailPage />}
                />
                <Route
                  path=":recommendId/edit"
                  element={<BookRecommendEditPage />}
                />
                <Route
                  path=":bookId/create"
                  element={<BookRecommendCreatePage />}
                />
                <Route path="search" element={<BookRecommendSearchPage />} />
              </Route>
              {/* 책 모임 */}
              <Route path="meeting">
                <Route index element={<MeetingListPage />} />
                <Route path=":meetingId" element={<MeetingDetailPage />} />
                <Route path="create" element={<CreateMeetingPage />} />
                <Route
                  path=":meetingId/topics"
                  element={<MeetingTopicListPage />}
                />
                <Route
                  path=":meetingId/teamTopic/:teamId"
                  element={<MeetingTeamTopicListPage />}
                />
              </Route>

              {/* 관리자 페이지 */}
              <Route path="admin">
                <Route index element={<BookClubAdminPage />} />
                <Route path="member" element={<MemberAdminPage />} />
                <Route path="register" element={<RegisterAdminPage />} />
              </Route>

              

            </Route>
          </Route>
        </Routes>
      </Router>
  );
};

export default App;
