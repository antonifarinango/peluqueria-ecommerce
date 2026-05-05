import axios from "axios";
import store from "../store/reducers/store";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear auth from localStorage
      localStorage.removeItem("auth");
      
      // Dispatch LOG_OUT action to clear Redux state
      store.dispatch({ type: "LOG_OUT" });

      // Redirect to login page if not already there
      if (window.location.pathname !== "/") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;