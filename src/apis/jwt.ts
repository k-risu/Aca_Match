import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { getCookie, setCookie } from "../utils/cookie";

interface AccessTokenResponse {
  accessToken: string;
  // 기타 필요한 응답 데이터 타입들
}

const jwtAxios: AxiosInstance = axios.create();

// Request Interceptor
const beforeReq = (config: InternalAxiosRequestConfig) => {
  const accessToken = getCookie("accessToken");

  if (!accessToken) {
    return Promise.reject({
      response: { data: { error: "Login 이 되어있지 않습니다." } },
    });
  }

  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const failReq = (error: AxiosError) => {
  console.log("Request Interceptor Error:", error);
  return Promise.reject(error);
};

jwtAxios.interceptors.request.use(beforeReq, failReq);

// Response Interceptor
const beforeRes = async (response: AxiosResponse) => {
  try {
    const result = await axios.get<AccessTokenResponse>(
      "/api/user/access-token",
    );
    if (result.data.accessToken) {
      setCookie("accessToken", result.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
    }
    return response;
  } catch (error) {
    console.log("Response Interceptor Error:", error);
    return response;
  }
};

const failRes = async (error: AxiosError) => {
  try {
    const result = await axios.get<AccessTokenResponse>(
      "/api/user/access-token",
    );
    if (result.data.accessToken) {
      setCookie("accessToken", result.data.accessToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
    }
    return Promise.reject(error);
  } catch (refreshError) {
    console.log("Token Refresh Error:", refreshError);
    return Promise.reject(error);
  }
};

jwtAxios.interceptors.response.use(beforeRes, failRes);

export const jwtApiRequest = {
  get: <T>(url: string, config = {}) => {
    return jwtAxios.get<T>(url, config);
  },
  post: <T>(url: string, data = {}, config = {}) => {
    return jwtAxios.post<T>(url, data, config);
  },
  put: <T>(url: string, data = {}, config = {}) => {
    return jwtAxios.put<T>(url, data, config);
  },
  delete: <T>(url: string, config = {}) => {
    return jwtAxios.delete<T>(url, config);
  },
};

export default jwtAxios;
