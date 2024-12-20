import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import authServices from "./user.service";
import userService from "../services/user.service";

const axiosInterceptorInstance = axios.create({
  baseURL: "http://18.142.54.43:3000/api/v1",
  headers: {
    "Content-Type": "application/json"
  }
});

axiosInterceptorInstance.interceptors.request.use(
  (config) => {
    // check server
    if (typeof window === "undefined") {
      return config;
    }

    const cookies = parseCookies();
    const accessToken = cookies["el-access-token"];

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    const specificRoute = ["/quizz/create/listening", "/test"]
    // Overwrite header for specific route
    if (config.method === "post" && specificRoute.includes(config.url || "")) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error.response.data);
  }
);

// Handle responses
axiosInterceptorInstance.interceptors.response.use(
  function ({ data }) {
    return data.data;
  },
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await authServices.refreshToken();
        userService.setToken(res);
        originalRequest.headers["Authorization"] = `Bearer ${res.access_token}`;

        return axiosInterceptorInstance(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    const errorMessage =
      error.response?.data &&
      typeof error.response.data === "object" &&
      "error" in error.response.data
        ? error.response.data.error
        : error.message;
    return Promise.reject(errorMessage);
  }
);

export default axiosInterceptorInstance;
