import { User } from "@/types/user.type";
import axios from "axios";
import { QuizFilter } from "../../app/application/quiz/interface";
import { TestFilter } from "@/app/application/test/interface";
import axiosInterceptorInstance from "./axios";
import { parseCookies } from "nookies";

const API_ENDPOINT = "http://18.142.54.43:3000/api/v1";

const refreshToken = async (): Promise<any> => {
  const cookies = parseCookies();
  const res = await axios.post(`${API_ENDPOINT}/auth/refresh-token`, null, {
    headers: {
      Authorization: `Bearer ${cookies["el-refresh-token"]}`
    }
  });
  return res.data.data;
};

const register = async ({ email, full_name, gender, password }: User) => {
  return axiosInterceptorInstance.post("/auth/register", {
    email,
    full_name,
    gender,
    password
  });
};

const login = async ({ email, password }: User): Promise<any> => {
  return axiosInterceptorInstance.post("/auth/login", { email, password });
};

const logout = async () => {
  return axiosInterceptorInstance.delete("/auth/logout");
};

const verifyEmail = async (token: string) => {
  return axiosInterceptorInstance.patch(`/auth/verify-email/${token}`);
};

const getCurrentUser = async (): Promise<any> => {
  return axiosInterceptorInstance.get("/auth/me");
};

const getQuizzes = async (filter: QuizFilter) => {
  return axiosInterceptorInstance.get("/quizz", { params: filter });
};

const getQuizDetail = async (id: string) => {
  return axiosInterceptorInstance.get(`/quizz/${id}`);
};

const submitAnswer = async (id: number, answer: string) => {
  return axiosInterceptorInstance.post(`/quizz/${id}`, { answer });
};

const getTest = async (filter: TestFilter) => {
  return axiosInterceptorInstance.get("/test", { params: filter });
};

const getTestDetail = async (id: string) => {
  return axiosInterceptorInstance.get(`/test/${id}`);
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
  getTest,
  getTestDetail
};
