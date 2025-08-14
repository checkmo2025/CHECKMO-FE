import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthLeftPanel from "../../components/AuthLeftPanel";
import { isValidEmail } from "../../utils/validators";
import ReactivateAccountModal from "../../components/ReactivateAccountModal";
import AlertModal from "../../components/AlertModal";
import { useLogin } from "../../hooks/useAuth";
import { GOOGLE_OAUTH_URL, KAKAO_OAUTH_URL } from "../../config";
import { useQueryClient } from "@tanstack/react-query";
import { QK } from "../../hooks/useHeader"; // QK.me 키
import { getMyProfile } from "../../apis/My/memberApi"; // 프로필 API

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const qc = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showReactivateModal, setShowReactivateModal] = useState(false);
  const [reactivateEmail, setReactivateEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { mutate: login, isPending } = useLogin();

  // (임시) 탈퇴 이메일 – 실제에선 서버 응답으로 처리 권장
  const withdrawnEmails = ["22jw@gmail.com"];

  // 로그인 상태면 접근 차단 & 프로필 캐시 채운 후 /home 이동
  useEffect(() => {
    const isLoggedIn = Boolean(localStorage.getItem("nickname"));
    const blockedPaths = ["/", "/signup", "/profile"];

    if (isLoggedIn && blockedPaths.includes(location.pathname)) {
      (async () => {
        try {
          const profile = await getMyProfile();
          qc.setQueryData(QK.me, profile);
        } catch (err) {
          console.error("프로필 불러오기 실패:", err);
        }
        navigate("/home", { replace: true });
      })();
    }
  }, [location.pathname, navigate, qc]);

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      setAlertMessage("이메일 형식이 아닙니다!");
      return;
    }
    if (!password.trim()) {
      setPasswordError("비밀번호를 입력해주세요!");
      return;
    } else {
      setPasswordError("");
    }

    if (withdrawnEmails.includes(email)) {
      setReactivateEmail(email);
      setShowReactivateModal(true);
      return;
    }

    login(
      { email, password },
      {
        onSuccess: async (result) => {
          if (result?.nickname) {
            localStorage.setItem("nickname", result.nickname);
          }

          // 로그인 직후 프로필 데이터 캐시에 저장
          try {
            const profile = await getMyProfile();
            qc.setQueryData(QK.me, profile);
          } catch (err) {
            console.error("프로필 불러오기 실패:", err);
          }

          navigate("/home");
        },
        onError: (err) => {
          setAlertMessage(err.message || "아이디 또는 비밀번호가 올바르지 않습니다.");
        },
      }
    );
  };

  // 소셜 로그인은 단순 리다이렉트
  const redirectTo = (url: string) => {
    window.location.assign(url);
  };

  const goToSignup = () => navigate("/signup");

  return (
    <div className="flex h-screen font-sans">
      {/* Left 고정 패널 */}
      <div className="hidden xl:block">
        <AuthLeftPanel />
      </div>

      {/* Right */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center w-full min-h-screen py-20 px-6">
          {/* 상단 책모 타이틀 */}
          <div className="mb-16 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#90D26D] break-keep">
              책모
            </h1>
          </div>

          <div className="w-[80%] max-w-md">
            {/* 이메일 입력 */}
            <div className="mb-7">
              <label className="block mb-3 text-[#2C2C2C] text-sm font-semibold">
                이메일
              </label>
              <input
                type="email"
                placeholder="이메일을 입력해주세요."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
                className="w-full border-b border-[#DADFE3] px-3 py-3 focus:outline-none"
              />
              {!isValidEmail(email) && email.length > 0 && (
                <p className="flex items-center text-[#FF8045] text-sm mt-2">
                  <span className="mr-1">ⓘ</span> 이메일 형식이 아닙니다!
                </p>
              )}
            </div>

            {/* 비밀번호 입력 */}
            <div className="mb-6">
              <label className="block mb-3 text-[#2C2C2C] text-sm font-semibold">
                비밀번호
              </label>
              <input
                type="password"
                placeholder="비밀번호를 입력해주세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
                className="w-full border-b border-[#DADFE3] px-2 py-2 focus:outline-none"
              />
              {passwordError && (
                <p className="flex items-center text-[#FF8045] text-sm mt-2">
                  <span className="mr-1">ⓘ</span> {passwordError}
                </p>
              )}
            </div>

            {/* 로그인 버튼 */}
            <button
              onClick={handleLogin}
              disabled={isPending}
              className="w-full bg-[#90D26D] text-white py-3 rounded mt-6 transition hover:opacity-90 cursor-pointer disabled:opacity-60"
            >
              {isPending ? "로그인 중..." : "로그인"}
            </button>

            {/* 회원가입 */}
            <div className="flex justify-center mt-3 text-sm">
              <button
                onClick={goToSignup}
                className="hover:underline font-medium text-[#2C2C2C] cursor-pointer"
              >
                회원가입
              </button>
            </div>

            {/* 간편 로그인 */}
            <div className="mt-10 text-center text-[#2C2C2C] text-sm font-medium">
              간편 로그인
            </div>
            <div className="flex justify-center gap-5 mt-4">
              {/* Google */}
              <button
                onClick={() => redirectTo(GOOGLE_OAUTH_URL)}
                className="flex items-center justify-center gap-2 border border-[#DADFE3] bg-white hover:opacity-90 text-[#2C2C2C] text-[13px] font-bold py-2 px-4 rounded w-75 shadow-sm cursor-pointer"
              >
                <img src="/assets/google-logo.png" alt="Google" className="w-5 h-5" />
                Google 계정으로 로그인
              </button>

              {/* Kakao */}
              <button
                onClick={() => redirectTo(KAKAO_OAUTH_URL)}
                className="flex items-center justify-center gap-2 bg-[#FEE500] hover:opacity-90 text-[#2C2C2C] text-[13px] font-bold py-2 px-4 rounded w-75 shadow cursor-pointer"
              >
                <img src="/assets/kakao-logo.png" alt="Kakao" className="w-5 h-5" />
                카카오로 로그인
              </button>
            </div>
          </div>
        </div>
      </div>

      {showReactivateModal && (
        <ReactivateAccountModal
          email={reactivateEmail}
          onConfirm={() => {
            setAlertMessage(`${reactivateEmail} 계정이 복구되었습니다.`);
            setShowReactivateModal(false);
            navigate("/");
          }}
          onCancel={() => setShowReactivateModal(false)}
        />
      )}

      {alertMessage && (
        <AlertModal message={alertMessage} onClose={() => setAlertMessage("")} />
      )}
    </div>
  );
};

export default LoginPage;