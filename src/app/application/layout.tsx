"use client";
import Sidebar from "@/components/sidebar";
import userService from "@/utils/services/user.service";
import { useEffect } from "react";
import { useUser } from "@/provider/AuthContent";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  // useEffect(() => {
  //   userService
  //     .loadCurrentUser()
  //     .then((response) => {
  //       console.log(response);
  //       // if (!user) {
  //       //   window.location.href = '/auth/login';
  //       // }
  //     })
  //     .catch(() => {
  //       // window.location.href = '/auth/login';
  //     });
  // }, []);

  // useEffect(() => {
  //   if (pathName === '/application') {
  //     router.replace('/application/dashboard');
  //   }
  // }, [pathName, router]);

  return user ? (
    <div className="flex h-screen bg-gray-50">
      <aside className=" bg-white border-r">
        <div className="space-y-4 flex flex-col">
          <Sidebar />
        </div>
      </aside>
      {children}
    </div>
  ): <div>Loading.....</div>;
}
