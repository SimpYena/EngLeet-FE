"use client";
import { User } from "@/types/user.type";
import nookies from "nookies";
import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { getItem, removeItem, setItemIntoStorage } from "@/utils/localStorage";
import userService from "@/utils/services/user.service";
import { usePathname, useRouter } from "next/navigation";

const AuthContext = React.createContext<User>({} as User);

const accessTokenCookieName = "el-access-token";
const refreshTokenCookieName = "el-refresh-token";

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);
  const pathName = usePathname();
  // Check if user session is invalid
  useEffect(() => {
    const cookies = parseCookies();
    const refreshToken = cookies[refreshTokenCookieName];
    const user = getItem("user");

    if (!refreshToken || !user) {
      setUser({} as User);
      removeItem("user");
      nookies.destroy(null, accessTokenCookieName);
      nookies.destroy(null, refreshTokenCookieName);
      if (pathName.includes("/auth") || pathName.includes("/admin")) {
        return;
      }

      router.push("/auth/login");
      return;
    }

    const fetchUser = async () => {
    await userService
      .loadCurrentUser()
      .then((res) => {
        if (res) {
          setUser(res);
          setItemIntoStorage("user", JSON.stringify(res));
        }
      })
      .catch((err) => {
        console.error("err", err);
        setUser({} as User);
      });
    }
    fetchUser();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useUser = () => {
  return React.useContext(AuthContext);
};

export default AuthContext;
