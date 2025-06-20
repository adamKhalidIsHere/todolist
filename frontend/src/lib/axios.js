import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.mode === "development"
      ? "https://todolist-1.up.railway.app/api"
      : "/api",
  withCredentials: true,
});
export default axiosInstance;
