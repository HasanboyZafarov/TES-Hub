import axios from "axios";
import { endPoint } from "../../settings.json";

const axiosInstance = axios.create({
  baseURL: endPoint,
});

export default axiosInstance;
