import React from "react";
import Header from "../components/Header";

const notifications = [
  { message: "새 댓글이 달렸습니다.", time: "2025-07-11 13:00" },
  { message: "이현서님이 팔로우했습니다.", time: "2025-07-11 12:45" },
  { message: "새 모임이 등록되었습니다.", time: "2025-07-10 18:30" },
  { message: "공지사항이 업데이트되었습니다.", time: "2025-07-09 09:15" },
  { message: "투표가 시작되었습니다.", time: "2025-07-08 14:20" },
];

const userProfile = {
  username: "hy_0716",
  bio: "책을 아는가? 나는 모른다",
};

const TestHeaderPage = () => {
  return (
    <div>
      <Header
        pageTitle="헤더 테스트"
        userProfile={userProfile}
        notifications={notifications}
      />
      <main className="p-6">
        <h2 className="text-2xl font-bold">헤더 테스트 페이지</h2>
        <p>종 모양을 클릭 후 알림 모달 확인</p>
      </main>
    </div>
  );
};

export default TestHeaderPage;