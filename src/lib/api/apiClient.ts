import axios from "axios";
import { endPoint } from "../../settings.json";

const axiosInstance = axios.create({
  baseURL: endPoint,
});

axiosInstance.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("auth");
    const token = stored ? JSON.parse(stored)?.state?.token : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch {}
  return config;
});

export default axiosInstance;
