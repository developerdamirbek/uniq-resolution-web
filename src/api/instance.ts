import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  headers: {
    "Content-Type": "application/json",
  },
});

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
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
