import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

let capturedCsrfToken = null;

api.interceptors.request.use((config) => {
  // Try to get from document.cookie first
  const cookieToken = document.cookie
    .split("; ")
    .find(c => c.startsWith("XSRF-TOKEN"))
    ?.split("=")[1];

  const csrfToken = cookieToken || capturedCsrfToken;

  if (csrfToken) {
    config.headers["X-XSRF-TOKEN"] = csrfToken;
  }

  return config;
});

api.interceptors.response.use((response) => {
  // Capture token from response headers (works even if cross-domain)
  // Axios normalizes headers to lowercase, but we can check both just in case
  const token = response.headers['x-xsrf-token'] || response.headers['X-XSRF-TOKEN'];
  if (token) {
    capturedCsrfToken = token;
  }
  return response;
}, (error) => {
  const token = error.response?.headers['x-xsrf-token'] || error.response?.headers['X-XSRF-TOKEN'];
  if (token) {
    capturedCsrfToken = token;
  }
  return Promise.reject(error);
});

export default api;