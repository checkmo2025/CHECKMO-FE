const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_URL is missing in .env");
}

export const GOOGLE_OAUTH_URL = `${API_BASE_URL}/oauth2/authorization/google`;
export const KAKAO_OAUTH_URL  = `${API_BASE_URL}/oauth2/authorization/kakao`;

export { API_BASE_URL };