import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLeftPanel from "../../components/AuthLeftPanel";
import AuthRightTopTitle from "../../components/AuthRightTopTitle";

const SignupPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("@naver.com");
  const [customDomain, setCustomDomain] = useState("");
  const [isCustomDomain, setIsCustomDomain] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationMessage, setVerificationMessage] = useState(""); 
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(""); 
  const [passwordConfirmError, setPasswordConfirmError] = useState(""); 
  const [agreements, setAgreements] = useState({
    privacy: false,
    terms: false,
    marketing: false,
  });

  const emailOptions = ["@naver.com", "@gmail.com", "@daum.net", "직접 입력"];

  const getFullEmail = () => {
    const domain = isCustomDomain ? customDomain.trim() : emailDomain.trim();
    return `${emailId.trim()}@${domain.replace(/^@/, "")}`;
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (pw: string) => {
    const pwRegex = /^(?=.*[A-Za-z])(?=.*\W).{6,10}$/;
    return pwRegex.test(pw);
  };

  const handleSendCode = () => {
    const fullEmail = getFullEmail();
    if (!isValidEmail(fullEmail)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      return;
    }
    setEmailError(""); 
    alert(`인증번호가 ${fullEmail}로 발송되었습니다!`);
    setIsCodeSent(true);
    setVerificationMessage(""); 
  };

  const handleVerifyCode = () => {
    if (verificationCode === "1234") {
      setIsVerified(true);
      setVerificationMessage(" 인증되었습니다.");
    } else {
      setIsVerified(false);
      setVerificationMessage(" 인증번호가 올바르지 않습니다.");
    }
  };

  const handleDomainChange = (value: string) => {
    if (value === "직접 입력") {
      setIsCustomDomain(true);
      setCustomDomain("");
    } else {
      setIsCustomDomain(false);
      setEmailDomain(value);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (!isValidPassword(value)) {
      setPasswordError("6~10자, 영어 및 특수문자를 1개 이상 포함해야 합니다.");
    } else {
      setPasswordError("");
    }
    setPasswordConfirmError(""); 
  };

  const handlePasswordConfirmChange = (value: string) => {
    setPasswordConfirm(value);
    if (password && value && password !== value) {
      setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
    } else {
      setPasswordConfirmError("");
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (!isVerified) {
        alert("이메일 인증을 완료해주세요.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!isValidPassword(password)) {
        setPasswordError("6~10자, 영어 및 특수문자를 1개 이상 포함해야 합니다.");
        return;
      }
      if (password !== passwordConfirm) {
        setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
        return;
      }
      setPasswordError("");
      setPasswordConfirmError("");
      setStep(3);
    } else if (step === 3) {
      if (!agreements.privacy || !agreements.terms) {
        alert("필수 약관에 동의해주세요.");
        return;
      }
      navigate("/profile");
    }
  };

  const toggleAgreement = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex h-screen font-sans">
      <AuthLeftPanel />

      <div className="w-3/5 flex justify-center items-start relative">
        <AuthRightTopTitle />
        {/* 상단 고정 회원가입 글씨 */}
        <div className="absolute top-55 right-1/2 translate-x-1/2">
          <h2 className="text-2xl font-bold">회원가입</h2>
        </div>

        {/* 아래쪽 박스 */}
        <div className="w-[80%] max-w-md mt-80 mb-16 transition-all duration-300">
          {step === 1 && (
            <>
              {/* 아이디 입력 */}
              <div className="mb-7">
                <label className="block mb-3 text-gray-700 text-sm font-semibold">
                  아이디
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="이메일 아이디"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    className="flex-1 border-b border-gray-300 px-2 py-1 focus:outline-none"
                  />
                  {isCustomDomain ? (
                    <input
                      type="text"
                      placeholder="직접 입력"
                      value={customDomain}
                      onChange={(e) => setCustomDomain(e.target.value)}
                      onBlur={() => {
                        if (customDomain.trim() === "") {
                          setIsCustomDomain(false);
                          setEmailDomain("@naver.com");
                        }
                      }}
                      className="border-b border-gray-300 px-2 py-1 w-[40%] focus:outline-none"
                    />
                  ) : (
                    <select
                      value={emailDomain}
                      onChange={(e) => handleDomainChange(e.target.value)}
                      className="border-b border-gray-300 px-2 py-1 w-[40%] focus:outline-none"
                    >
                      {emailOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                {/* 이메일 오류 메시지 */}
                {emailError && (
                  <p className="text-green-600 mt-3 text-sm">{emailError}</p>
                )}
              </div>

              {/* 인증번호 발송 버튼 */}
              {emailId && (
                <div className="mb-6">
                  <button
                    onClick={handleSendCode}
                    className="w-full bg-[#90D26D] text-white py-2 rounded transition hover:opacity-90"
                  >
                    인증번호 발송
                  </button>
                </div>
              )}

              {/* 인증번호 입력 */}
              <div className="mb-7">
                <label className="block mb-3 text-gray-700 text-sm font-semibold">
                  인증번호
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="인증번호 입력"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full border-b border-gray-300 px-2 py-1 focus:outline-none"
                  />
                  {verificationCode && (
                    <button
                      onClick={handleVerifyCode}
                      disabled={isVerified}
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 rounded text-white text-xs ${
                        isVerified ? "bg-gray-400" : "bg-[#90D26D]"
                      }`}
                    >
                      {isVerified ? "완료" : "확인"}
                    </button>
                  )}
                </div>
              </div>

              {/* 인증 메시지 */}
              {verificationMessage && (
                <p
                  className={`mt-1 text-sm ${
                    isVerified ? "text-green-600" : "text-gray-700"
                  }`}
                >
                  {verificationMessage}
                </p>
              )}
            </>
          )}

          {step === 2 && (
            <>
              {/* 비밀번호 입력 */}
              <div className="mb-7">
                <label className="block mb-3 text-gray-700 text-sm font-semibold">
                  비밀번호
                </label>
                <input
                  type="password"
                  placeholder="비밀번호 입력"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none"
                />
                {/* 비밀번호 조건 에러 메시지 */}
                {passwordError && (
                  <p className="text-green-700 font-medium text-sm mt-2">
                    {passwordError}
                  </p>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div className="mb-6">
                <label className="block mb-3 text-gray-700 text-sm font-semibold">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  placeholder="비밀번호 확인"
                  value={passwordConfirm}
                  onChange={(e) => handlePasswordConfirmChange(e.target.value)}
                  className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none"
                />
                {/* 비밀번호 불일치 에러 메시지 */}
                {passwordConfirmError && (
                  <p className="text-green-700 font-medium text-sm mt-2">
                    {passwordConfirmError}
                  </p>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-8 mb-7">
                {[ 
                  { key: "privacy", label: "개인정보보호 정책에 동의하시나요?" },
                  { key: "terms", label: "서비스 이용약관에 동의하시나요?" },
                  { key: "marketing", label: "마케팅 정보 수신에 동의하시나요?" },
                ].map((item) => (
                  <div key={item.key} className="flex justify-between items-center">
                    <span className="text-gray-700 text-m font-bold">{item.label}</span>
                    <button
                      onClick={() =>
                        toggleAgreement(item.key as keyof typeof agreements)
                      }
                      className={`px-4 py-1 rounded-full text-sm ${
                        agreements[item.key as keyof typeof agreements]
                          ? "bg-[#90D26D] text-white"
                          : "bg-[#EFF5ED] text-[#7FCF6C]"
                      }`}
                    >
                      {agreements[item.key as keyof typeof agreements]
                        ? "동의"
                        : "미동의"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 다음 버튼 고정 */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[80%] max-w-md">
            <button
              onClick={handleNextStep}
              className="w-full bg-[#90D26D] text-white py-3 rounded transition hover:opacity-90"
            >
              {step === 3 ? "다음" : "다음"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;