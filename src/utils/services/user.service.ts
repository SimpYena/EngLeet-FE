import { User } from "@/types/user.type";
import UserApi from "../apis/user.service";
import { ErrorInfo } from "@/types/error.type";
// import { useStore } from "zustand";
// import UserStore from "@/stores/user.store";
import useUserStore from "@/stores/user.store";
import { setItemIntoStorage } from "../localStorage";
import moment from "moment";
// import nookies from "nookies";
import { parseCookies, setCookie, destroyCookie } from 'nookies'

const setToken = ({ access_token, refresh_token }) => {
  setCookie(null, "el-access-token", access_token, {
    maxAge: 86400,
    path: "/"
  });
  setCookie(null, "el-refresh-token", refresh_token, {
    maxAge: 86400,
    path: "/"
  });
};

const register = async (payload: User) => {
  return UserApi.register(payload)
    .then((response) => {
      return response.data as User;
    })
    .catch(({ response }) => {
      return response.data.error;
    });
};

const login = async (payload: User): Promise<User> => {
  const setUser = useUserStore.getState().setUser;
  return UserApi.login(payload)
    .then((credential) => {
      setToken(credential);

      return UserApi.getCurrentUser().then((user) => {
        setItemIntoStorage("user", JSON.stringify(user));
        setUser(user);
        return user;
      });
    })
    .catch((response) => {
      console.log(response);
      
      return response.data.error;
    });
};

const verifyEmail = async (token: string) => {
  return UserApi.verifyEmail(token)
    .then((response) => {
      return response.data;
    })
    .catch(({ errors }: ErrorInfo) => {
      throw errors;
    });
};

const refreshToken = async () => {
  return UserApi.refreshToken()
    .then((credential) => {
      setItemIntoStorage("access_token", credential.access_token);
      setItemIntoStorage("refresh_token", credential.refresh_token);
    })
    .catch((error) => {
      return error;
    });
};

const loadCurrentUser = async () => {
    return UserApi.getCurrentUser()
    .then((user) => {
      return user;
    });
};

export default {
  setToken,
  register,
  login,
  verifyEmail,
  loadCurrentUser,
  refreshToken,
};
