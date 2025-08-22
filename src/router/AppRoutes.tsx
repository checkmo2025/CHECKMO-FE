import { lazy, Suspense, type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { RouteTracker, NotFoundRedirect } from "./RouteGuards";

// 로그인 / 회원가입 / 프로필
const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("../pages/Auth/SignupPage"));
const ProfilePage = lazy(() => import("../pages/Auth/ProfilePage"));

// 메인
const HomePage = lazy(() => import("../pages/Main/HomePage"));
const SearchPage = lazy(() => import("../pages/Main/SearchPage"));
const ClubSearchPage = lazy(() => import("../pages/Main/ClubSearchPage"));
const CreateClubPage = lazy(() => import("../pages/Main/CreateClubPage"));
const OthersProfilePage = lazy(() => import("../pages/Main/Info/OthersProfilePage"));

// 마이페이지
const MyHomePage = lazy(() => import("../pages/Main/Info/My/MyHomePage"));
const MyGroupPage = lazy(() => import("../pages/Main/Info/My/MyGroupPage"));
const MySubscriptionPage = lazy(() => import("../pages/Main/Info/My/MySubscriptionPage"));
const MyNotificationPage = lazy(() => import("../pages/Main/Info/My/MyNotificationPage"));
const MyStoryPage = lazy(() => import("../pages/Main/Info/My/MyStoryPage"));
const MyProfilePage = lazy(() => import("../pages/Main/Info/My/MyProfilePage"));

// 책 이야기
const BookStoryHomePage = lazy(() => import("../pages/Main/BookStory/BookStoryHomePage"));
const BookStorySearchPage = lazy(() => import("../pages/Main/BookStory/BookStorySearchPage"));
const BookStoryDetailPage = lazy(() => import("../pages/Main/BookStory/BookStoryDetailPage"));
const BookStoryWritePage = lazy(() => import("../pages/Main/BookStory/BookStoryWritePage"));
const MyBookStoryPage = lazy(() => import("../pages/Main/BookStory/MyBookStoryPage"));

// 북클럽
const BookClubHomePage = lazy(() => import("../pages/BookClub/BookClubHomePage"));
const EditClubPage = lazy(() => import("../pages/BookClub/Club/ClubEditPage"));
const NoticePage = lazy(() => import("../pages/BookClub/NoticePage"));
const NoticeDetailPage = lazy(() => import("../pages/BookClub/NoticeDetailPage"));
const NoticeCreatePage = lazy(() => import("../pages/BookClub/NoticeCreatePage"));

// 책장
const ShelfHomePage = lazy(() => import("../pages/BookClub/Shelf/ShelfHomePage"));
const ShelfDetailPage = lazy(() => import("../pages/BookClub/Shelf/ShelfDetailPage"));
const TopicDetailPage = lazy(() => import("../pages/BookClub/Shelf/TopicDetailPage"));
const ScoreDetailPage = lazy(() => import("../pages/BookClub/Shelf/ScoreDetailPage"));

// 책 추천
const BookRecommendPage = lazy(() => import("../pages/BookRecommend/BookRecommendPage"));
const BookRecommendDetailPage = lazy(() => import("../pages/BookRecommend/BookRecommendDetailPage"));
const BookRecommendCreatePage = lazy(() => import("../pages/BookRecommend/BookRecommendCreatePage"));
const BookRecommendSearchPage = lazy(() => import("../pages/BookRecommend/BookRecommendSearchPage"));
const BookRecommendEditPage = lazy(() => import("../pages/BookRecommend/BookRecommendEditPage"));

// 모임
const MeetingListPage = lazy(() => import("../pages/Meeting/MeetingListPage"));
const MeetingDetailPage = lazy(() => import("../pages/Meeting/MeetingDetailPage"));
const MeetingCreatePage = lazy(() => import("../pages/Meeting/MeetingCreatePage"));
const MeetingEditPage = lazy(() => import("../pages/Meeting/MeetingEditPage"));
const DetailMeatingManagePage = lazy(() => import("../pages/Meeting/DetailMeatingManagePage"));
const MeetingTopicListPage = lazy(() => import("../pages/Meeting/MeetingTopicListPage"));
const MeetingTeamTopicListPage = lazy(() => import("../pages/Meeting/MeetingTeamTopicListPage"));

// 로그인 여부에 따라 접근 제어
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isLoggedIn = Boolean(localStorage.getItem("nickname"));
    return isLoggedIn ? children : <Navigate to="/" replace />;
};

export const AppRoutes = () => {
    return (
        <Suspense fallback={<div>로딩중...</div>}>
            <Routes>
                {/* ✅ 정상 라우트만 추적기(RouteTracker)로 감싼다 */}
                <Route element={<RouteTracker />}>
                    {/* 로그인 / 회원가입 */}
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* 로그인된 사용자만 접근 */}
                    <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/booksearch" element={<SearchPage />} />
                        <Route path="/searchClub" element={<ClubSearchPage />} />
                        <Route path="/info/others/:userId" element={<OthersProfilePage />} />
                        <Route path="/createClub" element={<CreateClubPage />} />

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
                            <Route path="my" element={<MyBookStoryPage />} />
                        </Route>
                    </Route>

                    {/* 북클럽 */}
                    <Route path="/bookclub/:bookclubId" element={<PrivateRoute><Layout /></PrivateRoute>}>
                        <Route path="home" element={<BookClubHomePage />} />
                        <Route path="edit" element={<EditClubPage />} />

                        {/* 공지 */}
                        <Route path="notices" element={<NoticePage />} />
                        <Route path="notices/:noticeId" element={<NoticeDetailPage />} />
                        <Route path="notices/create" element={<NoticeCreatePage />} />

                        {/* 책장 */}
                        <Route path="shelf">
                            <Route index element={<ShelfHomePage />} />
                            <Route path=":ShelfmeetingId" element={<ShelfDetailPage />} />
                            <Route path=":ShelfmeetingId/topic" element={<TopicDetailPage />} />
                            <Route path=":ShelfmeetingId/score" element={<ScoreDetailPage />} />
                        </Route>

                        {/* 책 추천 */}
                        <Route path="recommend">
                            <Route index element={<BookRecommendPage />} />
                            <Route path=":recommendId" element={<BookRecommendDetailPage />} />
                            <Route path=":recommendId/edit" element={<BookRecommendEditPage />} />
                            <Route path=":bookId/create" element={<BookRecommendCreatePage />} />
                            <Route path="search" element={<BookRecommendSearchPage />} />
                        </Route>

                        {/* 모임 */}
                        <Route path="meeting">
                            <Route index element={<MeetingListPage />} />
                            <Route path=":meetingId" element={<MeetingDetailPage />} />
                            <Route path=":meetingId/edit" element={<MeetingEditPage />} />
                            <Route path="create" element={<MeetingCreatePage />} />
                            <Route path=":meetingId/manage" element={<DetailMeatingManagePage />} />
                            <Route path=":meetingId/topics" element={<MeetingTopicListPage />} />
                            <Route path=":meetingId/teamTopic/:teamId" element={<MeetingTeamTopicListPage />} />
                        </Route>
                    </Route>
                </Route>

                {/* ❌ 정의되지 않은 경로 → 바로 직전 정상 경로로 리다이렉트 + 강제 새로고침 */}
                <Route path="*" element={<NotFoundRedirect />} />
            </Routes>
        </Suspense>
    );
};