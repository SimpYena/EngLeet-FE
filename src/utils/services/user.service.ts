import { User } from "@/types/user.type";
import UserApi from "../apis/user.service";
import { ErrorInfo } from "@/types/error.type";
import useUserStore from "@/stores/user.store";
import { setItemIntoStorage } from "../localStorage";
import { setCookie } from "nookies";

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
      console.log(response);
      return response as User;
    })
    .catch(({ response }) => {
      console.log(response);
      return response.data.error;
    });
};

const login = async (payload: User): Promise<any> => {
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
      console.log(response.data);
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
  return UserApi.getCurrentUser().then((user) => {
    return user;
  });
};

const getRankers = async (limit: number | string, offset: number | string): Promise<any> => {
  return UserApi.getLeaderboard(limit, offset).then(({items}) => {
    return items.map((ranker, index) => {
      return {
        ...ranker,
        position: offset + index + 1
      };
    });
  });
};

export default {
  setToken,
  register,
  login,
  verifyEmail,
  loadCurrentUser,
  refreshToken,
  getRankers
};
