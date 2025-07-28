// 이메일 형식 검증
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// 비밀번호 형식 검증
export const isValidPassword = (password: string): boolean => {
  const pwRegex = /^(?=.*[A-Za-z])(?=.*\W).{6,10}$/;
  return pwRegex.test(password);
};