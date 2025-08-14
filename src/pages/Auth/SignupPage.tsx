import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthLeftPanel from "../../components/AuthLeftPanel";
import { isValidEmail, getPasswordError } from "../../utils/validators";
import ReactivateAccountModal from "../../components/ReactivateAccountModal";
import AlertModal from "../../components/AlertModal";
import {
  useRequestEmailCode,
  useConfirmEmailCode,
  useSignup,
} from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query"; //  qc
import { getMyProfile } from "../../apis/My/memberApi"; //  getMyProfile
import { QK } from "../../hooks/useHeader"; //  QK

const SignupPage = () => {
  const navigate = useNavigate();
  const qc = useQueryClient();

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

  // 단계/입력 상태
  const [step, setStep] = useState(1);
  const [emailId, setEmailId] = useState("");
  const [emailDomain, setEmailDomain] = useState("@naver.com");
  const [customDomain, setCustomDomain] = useState("");
  const [isCustomDomain, setIsCustomDomain] = useState(false);

  const [verificationCode, setVerificationCode] = useState("");
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

  const [showReactivateModal, setShowReactivateModal] = useState(false);
  const [reactivateEmail, setReactivateEmail] = useState("");

  const withdrawnEmails = ["2jw@gmail.com"]; // TODO: 서버에서 판단하도록 변경

  const [alertMessage, setAlertMessage] = useState("");

  const emailOptions = ["@naver.com", "@gmail.com", "@daum.net", "직접 입력"];

  // API 훅
  const { mutate: requestEmailCode, isPending: isSendingCode } = useRequestEmailCode();
  const { mutate: confirmEmailCode, isPending: isConfirmingCode } = useConfirmEmailCode();
  const { mutate: signup, isPending: isSigningUp } = useSignup();

  const getFullEmail = () => {
    const domain = isCustomDomain ? customDomain.trim() : emailDomain.trim();
    return `${emailId.trim()}@${domain.replace(/^@/, "")}`;
  };

  const handleSendCode = () => {
    const fullEmail = getFullEmail();
    if (!isValidEmail(fullEmail)) {
      setEmailError("올바른 이메일 형식을 입력해주세요.");
      return;
    }

    if (withdrawnEmails.includes(fullEmail)) {
      setReactivateEmail(fullEmail);
      setShowReactivateModal(true);
      return;
    }

    setEmailError("");
    requestEmailCode(fullEmail, {
      onSuccess: (msg) => {
        setAlertMessage(msg || `인증번호가 ${fullEmail}로 발송되었습니다!`);
        setVerificationMessage("");
      },
      onError: (err) => {
        setAlertMessage(err.message || "인증번호 발송에 실패했습니다.");
      },
    });
  };

  const handleVerifyCode = () => {
    const fullEmail = getFullEmail();
    confirmEmailCode(
      { email: fullEmail, verificationCode },
      {
        onSuccess: (ok) => {
          if (ok) {
            setIsVerified(true);
            setVerificationMessage(" 인증되었습니다.");
          } else {
            setIsVerified(false);
            setVerificationMessage(" 인증번호가 올바르지 않습니다.");
          }
        },
        onError: (err) => {
          setIsVerified(false);
          setVerificationMessage(err.message || "인증번호 확인에 실패했습니다.");
        },
      }
    );
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
    const err = getPasswordError(value);
    setPasswordError(err ? `ⓘ ${err}` : "");
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
      return;
    }

    if (step === 2) {
      const pwErr = getPasswordError(password);
      if (pwErr) {
        setPasswordError(`ⓘ ${pwErr}`);
        return;
      }
      if (password !== passwordConfirm) {
        setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
        return;
      }
      setPasswordError("");
      setPasswordConfirmError("");
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!agreements.privacy || !agreements.terms) {
        alert("필수 약관에 동의해주세요.");
        return;
      }
      signup(
        { email: getFullEmail(), password },
        {
          onSuccess: () => {
            navigate("/profile");
          },
          onError: (err) => {
            setAlertMessage(err.message || "회원가입에 실패했습니다.");
          },
        }
      );
    }
  };

  const toggleAgreement = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex h-screen font-sans">
      <div className="hidden xl:flex">
        <AuthLeftPanel />
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center w-full min-h-screen px-6 py-20">
          <div className="mb-16 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#90D26D] break-keep">
              책모
            </h1>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl text-[#2C2C2C] font-bold">회원가입</h2>
          </div>

          <div className="w-[80%] max-w-md space-y-10">
            {step === 1 && (
              <>
                <div className="mb-7">
                  <label className="block mb-3 text-[#2C2C2C] text-sm font-semibold">
                    아이디
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="이메일 아이디"
                      value={emailId}
                      onChange={(e) => setEmailId(e.target.value)}
                      className="flex-1 border-b border-[#DADFE3] px-3 py-1 focus:outline-none"
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
                        className="border-b border-[#DADFE3] px-3 py-1 w-[40%] focus:outline-none"
                      />
                    ) : (
                      <select
                        value={emailDomain}
                        onChange={(e) => handleDomainChange(e.target.value)}
                        className="border-b border-[#DADFE3] px-3 py-1 w-[40%] focus:outline-none"
                      >
                        {emailOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                  {emailError && (
                    <p className="text-[#FF8045] mt-2 text-sm">{emailError}</p>
                  )}
                </div>

                {emailId && (
                  <div className="w-full">
                    <button
                      onClick={handleSendCode}
                      disabled={isSendingCode}
                      className="w-full bg-[#90D26D] text-white py-3 rounded transition hover:opacity-90 cursor-pointer disabled:opacity-60"
                    >
                      {isSendingCode ? "발송중..." : "인증번호 발송"}
                    </button>
                  </div>
                )}

                <div>
                  <label className="block mb-2 text-[#2C2C2C] text-sm font-semibold">
                    인증번호
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="인증번호 입력"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      className="w-full border-b border-[#DADFE3] px-3 py-1 focus:outline-none"
                    />
                    {verificationCode && (
                      <button
                        onClick={handleVerifyCode}
                        disabled={isVerified || isConfirmingCode}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 rounded text-white text-xs ${
                          isVerified ? "bg-gray-400" : "bg-[#90D26D] cursor-pointer"
                        }`}
                      >
                        {isVerified ? "완료" : isConfirmingCode ? "확인중..." : "확인"}
                      </button>
                    )}
                  </div>
                </div>

                {verificationMessage && (
                  <p
                    className={` text-[14px] mt-1 ${
                      isVerified ? "text-[#488328]" : "text-[#FF8045]"
                    }`}
                  >
                    {verificationMessage}
                  </p>
                )}
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-7">
                  <label className="block mb-3 text-[#2C2C2C] text-sm font-semibold">
                    비밀번호
                  </label>
                  <input
                    type="password"
                    placeholder="영어+특수문자 포함 6~10자"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="w-full border-b border-[#DADFE3] px-2 py-2 focus:outline-none"
                  />
                  {passwordError && (
                    <p className="text-[#FF8045] font-medium text-[14px] mt-2">
                      {passwordError}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block mb-3 text-[#2C2C2C] text-[14px] font-semibold">
                    비밀번호 확인
                  </label>
                  <input
                    type="password"
                    placeholder="비밀번호 확인"
                    value={passwordConfirm}
                    onChange={(e) => handlePasswordConfirmChange(e.target.value)}
                    className="w-full border-b border-[#DADFE3] px-3 py-2 focus:outline-none"
                  />
                  {passwordConfirmError && (
                    <p className="text-[#FF8045] font-medium text-[14px] mt-2">
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
                      <span className="text-[#2C2C2C] text-m font-bold">{item.label}</span>
                      <button
                        onClick={() => toggleAgreement(item.key as keyof typeof agreements)}
                        className={`px-4 py-1 rounded-full text-sm ${
                          agreements[item.key as keyof typeof agreements]
                            ? "bg-[#90D26D] text-white cursor-pointer"
                            : "bg-[#EFF5ED] text-[#7FCF6C] cursor-pointer"
                        }`}
                      >
                        {agreements[item.key as keyof typeof agreements] ? "동의" : "미동의"}
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="w-full max-w-md mt-25">
              <button
                onClick={handleNextStep}
                disabled={step === 3 && isSigningUp}
                className="w-full bg-[#90D26D] text-white py-3 rounded transition hover:opacity-90 cursor-pointer disabled:opacity-60"
              >
                {step === 3 ? (isSigningUp ? "가입중..." : "다음") : "다음"}
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
            setIsVerified(true);
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

export default SignupPage;