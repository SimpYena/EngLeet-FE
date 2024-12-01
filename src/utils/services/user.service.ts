import { User } from "@/types/user.type";
import UserApi from "../apis/user.service";
import { ErrorInfo } from "@/types/error.type";
// import { useStore } from "zustand";
// import UserStore from "@/stores/user.store";
import useUserStore from "@/stores/user.store";
import { setItemIntoStorage } from "../localStorage";

// const useUserStore = (selector) => useStore(UserStore, selector);

const register = async (payload: User) => {
  return UserApi.register(payload)
    .then((response) => {
      return response.data as User;
    })
    .catch(({ response }) => {
      return response.data.error;
    });
};

const login = async (payload: User) => {
  const setUser = useUserStore.getState().setUser;
  return UserApi.login(payload)
    .then(({ data }) => {
      setItemIntoStorage("access_token", data.data.access_token);
      setItemIntoStorage("refresh_token", data.data.refresh_token);
      return UserApi.getCurrentUser().then(({ data }) => {
        console.log(JSON.stringify(data.data));
        setItemIntoStorage("user", JSON.stringify(data.data));
        setUser(data.data);
        return data.data as User;
      });
    })
    .catch(({ response }) => {
      return response.data.error;
    });
};

const verifyEmail = async (token: string) => {
  return UserApi.verifyEmail(token)
    .then((response) => {
      return response.data;
    })
    .catch(({ errors }: ErrorInfo) => {
      return { errors };
    });
};

const refreshToken = async () => {
  return UserApi.refreshToken()
    .then(({ data }) => {
      setItemIntoStorage("access_token", data.data.access_token);
      setItemIntoStorage("refresh_token", data.data.refresh_token);
    })
    .catch(({ response }) => {
      return response.data.error;
    });
};

const loadCurrentUser = async () => {
  setItemIntoStorage("access_token", "");
  const token = await refreshToken();

  if (!token) {
    setItemIntoStorage("refresh_token", "");
    setItemIntoStorage("user", "");
  }

  console.log(token);
  return null;

  // return UserApi.refreshToken()
  // .then((response) => {
  //   console.log(response);
  //   setItem('access_token', response.data.data.access_token);
  //   return UserApi.getCurrentUser()
  //   .then((response) => {
  //     return response.data.data as User;
  //   })
  // });
};

export default {
  register,
  login,
  verifyEmail,
  loadCurrentUser,
  refreshToken,
};
