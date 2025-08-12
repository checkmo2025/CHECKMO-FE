// 닉네임: 소문자/숫자/특수문자만, 길이 1~6
export const NICKNAME_REGEX = /^[a-z0-9!@#$%^&*()_+\-\=\[\]{};':"\\|,.<>\/?]{1,6}$/;

// 공백 제거 후 비어있지 않은지
export const isNonBlank = (s: string) => s.trim().length > 0;

// 백엔드와 동일 규칙: 공백불가 + 소문자/숫자/특수문자, 최대 6자
export const isValidNickname = (s: string) => {
  const trimmed = s.trim();
  if (!isNonBlank(trimmed)) return false;
  return NICKNAME_REGEX.test(trimmed);
};

// 프론트에서 에러 문구용 (닉네임)
export const getNicknameError = (s: string) => {
  const trimmed = s.trim();
  if (!trimmed) return "닉네임은 필수입니다.";
  if (trimmed.length > 6) return "닉네임은 최대 6자까지 가능합니다.";
  if (!NICKNAME_REGEX.test(trimmed)) {
    return "영어 소문자/숫자/특수문자만 사용할 수 있습니다.";
  }
  return "";
};

// 이메일 형식 검증
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 (백엔드와 동일)
const PASSWORD_LEN_OK = (pw: string) => pw.length >= 6 && pw.length <= 10;
const HAS_LETTER = (pw: string) => /[A-Za-z]/.test(pw);
const HAS_REQUIRED_SPECIAL = (pw: string) => /[!@#$%^&*]/.test(pw);

export const isValidPassword = (password: string): boolean => {
  const trimmed = password.trim();           // @NotBlank 대응
  return (
    trimmed.length > 0 &&
    PASSWORD_LEN_OK(trimmed) &&
    HAS_LETTER(trimmed) &&
    HAS_REQUIRED_SPECIAL(trimmed)
  );
};

// 프론트에서 에러 문구용 (비밀번호)
export const getPasswordError = (password: string): string => {
  const trimmed = password.trim();
  if (!trimmed) return "비밀번호는 필수입니다.";
  if (!PASSWORD_LEN_OK(trimmed)) return "비밀번호는 6-10자여야 합니다.";
  if (!HAS_LETTER(trimmed) || !HAS_REQUIRED_SPECIAL(trimmed)) {
    return "비밀번호는 영어 및 특수문자를 포함해야 합니다.";
  }
  return "";
};
