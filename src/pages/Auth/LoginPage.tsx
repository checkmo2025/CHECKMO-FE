// 카카오는 이메일 권한 때문에 심사 받아서 사용해야함 
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import type { CredentialResponse } from "@react-oauth/google";
import AuthLeftPanel from "../../components/AuthLeftPanel";
import AuthRightTopTitle from "../../components/AuthRightTopTitle";
import { jwtDecode } from "jwt-decode";
import { KEYS } from "../../config/key";

// 카카오 SDK 타입 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  카카오 SDK 초기화
  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KEYS.KAKAO_JAVASCRIPT_KEY); // 카카오 앱키
          console.log(" Kakao SDK 초기화됨");
        }
      };
      document.body.appendChild(script);
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KEYS.KAKAO_JAVASCRIPT_KEY);
      console.log(" Kakao SDK 초기화됨");
    }
  }, []);

  //  이메일 형식 검증 함수
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      alert("이메일 형식이 아닙니다!");
      return;
    }
    console.log("로그인 시도", { email, password });
  };

  //  구글 로그인 처리
  const handleGoogleSuccess = (response: CredentialResponse) => {
    if (response.credential) {
      const decoded: any = jwtDecode(response.credential);
      console.log(" 구글 로그인 성공", decoded);
      alert(`구글 로그인 성공: ${decoded.name}님`);
    }
  };

  const handleGoogleError = () => {
    console.error(" 구글 로그인 실패");
    alert("구글 로그인에 실패했습니다.");
  };

  //  카카오 로그인 처리 (SDK 내장형)
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      alert("카카오 SDK 로드 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    window.Kakao.Auth.login({
      scope: "profile_nickname, account_email",
      success: function (authObj: any) {
        console.log(" 카카오 로그인 성공", authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res: any) {
            console.log(" 카카오 사용자 정보", res);
            const nickname = res.kakao_account.profile.nickname;
            alert(`카카오 로그인 성공: ${nickname}님`);
          },
          fail: function (error: any) {
            console.error(" 사용자 정보 요청 실패", error);
            alert("카카오 사용자 정보를 가져오는데 실패했습니다.");
          },
        });
      },
      fail: function (err: any) {
        console.error(" 카카오 로그인 실패", err);
        alert("카카오 로그인에 실패했습니다.");
      },
    });
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left 고정 패널 */}
      <AuthLeftPanel />

      {/* Right */}
      <div className="w-3/5 flex justify-center items-center relative">
        {/* 상단 책모 타이틀 */}
        <AuthRightTopTitle />

        <div className="w-[80%] max-w-md mt-50">
          {/* 이메일 입력 */}
          <div className="mb-7">
            <label className="block mb-3 text-gray-700 text-sm font-semibold">
              이메일
            </label>
            <input
              type="email"
              placeholder="이메일을 입력해주세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none"
            />
            {!isValidEmail(email) && email.length > 0 && (
              <p className="flex items-center text-green-700 text-sm mt-2">
                <span className="mr-1">ⓘ</span> 이메일 형식이 아닙니다!
              </p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className="mb-6">
            <label className="block mb-3 text-gray-700 text-sm font-semibold">
              비밀번호
            </label>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none"
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#90D26D] text-white py-3 rounded mt-6 transition hover:opacity-90"
          >
            로그인
          </button>

          {/* 회원가입 */}
          <div className="flex justify-center mt-3 text-sm">
            <button
              onClick={goToSignup}
              className="hover:underline font-medium text-black"
            >
              회원가입
            </button>
          </div>

          {/* 간편 로그인 */}
          <div className="mt-10 text-center text-black text-sm font-medium">
            간편 로그인
          </div>
          <div className="flex justify-center gap-5 mt-4">
            {/* Google Login 버튼 */}
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />

            {/* Kakao Login 버튼 (SDK 내장형) */}
            <button
              onClick={handleKakaoLogin}
              className="flex items-center justify-center gap-2 bg-[#FEE500] hover:opacity-90 text-black font-bold py-2 px-4 rounded w-52 shadow"
            >
              <img
                src="/kakao-logo.png"
                alt="Kakao"
                className="w-5 h-5"
              />
              카카오로 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;