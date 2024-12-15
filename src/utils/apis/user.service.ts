/* eslint-disable import/no-anonymous-default-export */
import { User } from "@/types/user.type";
import axios from "axios";
import { QuizFilter } from "../../app/application/quiz/interface";
import { TestFilter, TestPayload, TestSubmitPayload } from "@/app/application/test/interface";
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

const logout = async (): Promise<any> => {
  return axiosInterceptorInstance.delete("/auth/logout");
};

const verifyEmail = async (token: string): Promise<any> => {
  return axiosInterceptorInstance.patch(`/auth/verify-email/${token}`);
};

const getCurrentUser = async (): Promise<any> => {
  return axiosInterceptorInstance.get("/auth/me");
};

const getQuizzes = async (filter: QuizFilter): Promise<any> => {
  return axiosInterceptorInstance.get("/quizz", { params: filter });
};

const getQuizDetail = async (id: string): Promise<any> => {
  return axiosInterceptorInstance.get(`/quizz/${id}`);
};

const submitAnswer = async (id: number, answer: string): Promise<any> => {
  return axiosInterceptorInstance.post(`/quizz/${id}`, { answer });
};

const getTest = async (filter: TestFilter): Promise<any> => {
  return axiosInterceptorInstance.get("/test", { params: filter });
};

const getTestDetail = async (id): Promise<any> => {
  return axiosInterceptorInstance.get(`/test/${id}`);
};
const getReadingTestDetail = async (id): Promise<TestPayload> => {
  return axiosInterceptorInstance.get(`/test/${id}/reading`);
}

const getListeningTestDetail = async (id): Promise<TestPayload> => {
  return axiosInterceptorInstance.get(`/test/${id}/listening`);
}

const submitTest = async (id, answers: TestSubmitPayload[]) => {
  return axiosInterceptorInstance.post(`/test/${id}/submit`, answers);
}

const getSubmitedTest = async (id): Promise<any> => {
  return axiosInterceptorInstance.get(`/test/${id}/result`);
}

const generateReadingTest = async (topic, difficulty): Promise<any> => {
  return axiosInterceptorInstance.post('/generate/reading', { topic, difficulty });
}

const generateListeningTest = async (topic, difficulty): Promise<any> => {
  return axiosInterceptorInstance.post('/generate/listening', { topic, difficulty });
}

const generateAssessmentTest = async (): Promise<any> => {
  return axiosInterceptorInstance.get('/generate/assessment');
}

const submitAssessmentTest = async (answers): Promise<any> => {
  return axiosInterceptorInstance.post('/generate/submit', { answers });
}

const getGeneratedTests = async (): Promise<any> => {
  return axiosInterceptorInstance.get('/generate/test');
};

const getGeneratedTest = async (id): Promise<any> => {
  return axiosInterceptorInstance.get(`/generate/test/${id}`);
}

const submitGeneratedTest = async (id, answer): Promise<any> => {
  return axiosInterceptorInstance.post(`/generate/submit`, { answer });
}

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
  getTestDetail,
  getReadingTestDetail,
  getListeningTestDetail,
  submitTest,
  getSubmitedTest,
  generateReadingTest,
  generateListeningTest,
  generateAssessmentTest,
  submitAssessmentTest,
  getGeneratedTests,
  getGeneratedTest,
  submitGeneratedTest
};
