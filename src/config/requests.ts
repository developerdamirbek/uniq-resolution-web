import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

const authFreeEndpoints: string[] = ["/auth/login"];

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (!authFreeEndpoints.includes(config.url || "")) {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
    }
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => Promise.reject(error)
);

request.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

export default request;
