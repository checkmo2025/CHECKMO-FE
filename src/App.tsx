import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getMyProfile } from "./apis/My/memberApi";
import { QK } from "./hooks/useHeader";
import { AppRoutes } from "./router";

const App = () => {
  const qc = useQueryClient();

  // 앱 시작 시 로그인 상태면 프로필 불러오기
  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem("nickname"));
    if (isLoggedIn) {
      (async () => {
        try {
          const profile = await getMyProfile();
          qc.setQueryData(QK.me, profile);
        } catch (err) {
          console.error("프로필 로드 실패:", err);
        }
      })();
    }
  }, [qc]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;