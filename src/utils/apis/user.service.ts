import { User } from "@/types/user.type";
import axios, { AxiosRequestConfig } from "axios";
import { getItem } from "../localStorage";
// import { EXPIRED_TOKEN } from "../const/errorCode";
const api = axios.create({
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: "http://18.142.54.43:3000/api/v1",
});

const getToken = () => {
  const accessToken = getItem("access_token");

  if (!accessToken) {
    return getItem('refresh_token') || null;
  }

  return accessToken;
}

// Attach access token to every request
api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (!token) {
    return config;
  }

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle expired tokens
// api.interceptors.response.use(
//   (response) => response,
//   async ({
//     response: {
//       data: { error }
//     }
//   }) => {
//     console.log(error);
//     const originalRequest = error.config;

//     if (error.error_id === AUTH_ERROR.EXPIRED_TOKEN && !retry) {
//       retry = true;

//       try {
//         const refreshResponse = await axios.get("/api/refresh-token");
//         const newAccessToken = refreshResponse.data.accessToken;

//         setItem("access_token", newAccessToken);
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${newAccessToken}`;

//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh failed:", refreshError);
//         setItem("access_token", "");
//         setItem("refresh_token", "");
//         setItem("user", "");
//         window.location.href = "/login"; // Redirect to login
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

const request = async (method = "GET", url: string, payload?: object) => {
  const config: AxiosRequestConfig = {
    method,
    url
  };
  if (method === "GET") {
    config.params = payload;
  } else {
    config.data = payload;
  }

  return api(config);
};

const register = async ({ email, full_name, gender, password }: User) => {
  return request("POST", "/auth/register", {
    email,
    full_name,
    gender,
    password
  });
};

const login = async ({ email, password }: User) => {
  return request("POST", "/auth/login", { email, password });
};

const logout = async () => {
  return request("DELETE", "/auth/logout");
};

const verifyEmail = async (token: string) => {
  return request("PATCH", `/auth/verify-email/${token}`);
};

const refreshToken = async () => {
  return request("POST", "/auth/refresh-token");
};

const getCurrentUser = async () => {
  return request("GET", "/auth/me");
};

export default {
  register,
  login,
  logout,
  verifyEmail,
  getCurrentUser,
  refreshToken
};
