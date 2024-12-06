import { User } from "@/types/user.type";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getItem } from "../localStorage";
import {
  QuizFilter,
  Quiz,
  Transcript,
  QuizAttempt,
} from "../../app/application/quiz/interface";
import { Pagination } from "../../components/table";
// import { EXPIRED_TOKEN } from "../const/errorCode";
const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://18.142.54.43:3000/api/v1",
});

const getToken = () => {
  const accessToken = getItem("access_token");

  if (!accessToken) {
    return getItem("refresh_token") || null;
  }

  return accessToken;
};

// Attach access token to every request
api.interceptors.request.use(async (config) => {
  // const token = getToken();
  // if (!token) {
  //   return config;
  // }

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbklkIjo2MCwidXNlcklkIjo5LCJpYXQiOjE3MzM1MDk1MTQsImV4cCI6MTczMzUxMzExNH0.hQlHxNBOBuIfCCAUeHHXQmaJ_FOkIBqwSfkqt311sq8";

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

const request = async (
  method: "GET" | "POST" | "PATCH" | "DELETE",
  url: string,
  payload?: object
): Promise<AxiosResponse> => {
  const config: AxiosRequestConfig = {
    method,
    url,
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
    password,
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

const getQuizzes = async (filter: QuizFilter) => {
  try {
    const response = (await request("GET", "/quizz", filter)) as AxiosResponse<{
      data: {
        items: Quiz[];
        pagination: Pagination;
      };
    }>;
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
    throw error;
  }
};

const getQuizDetail = async (id: string) => {
  try {
    const response = (await request("GET", `/quizz/${id}`)) as AxiosResponse<{
      data: Transcript;
    }>;
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch quiz detail:", error);
    throw error;
  }
};

const submitAnswer = async (id: number, answer: string) => {
  try {
    const response = (await request("POST", `/quizz/${id}`, {
      answer,
    })) as AxiosResponse<{
      data: QuizAttempt;
    }>;
    return response.data.data;
  } catch (error) {
    console.error("Failed to submit answer:", error);
    throw error;
  }
};

export default {
  register,
  login,
  logout,
  verifyEmail,
  getCurrentUser,
  refreshToken,
  getQuizzes,
  getQuizDetail,
  submitAnswer,
};
