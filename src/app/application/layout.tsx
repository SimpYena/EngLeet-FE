"use client";
import Sidebar from "@/components/sidebar";
import userService from "@/utils/services/user.service";
import {
  HomeIcon,
  ClipboardIcon,
  UserIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    userService
      .loadCurrentUser()
      .then((response) => {
        console.log(response);
        // if (!user) {
        //   window.location.href = '/auth/login';
        // }
      })
      .catch(() => {
        // window.location.href = '/auth/login';
      });
  }, []);

  // useEffect(() => {
  //   if (pathName === '/application') {
  //     router.replace('/application/dashboard');
  //   }
  // }, [pathName, router]);

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className=" bg-white border-r">
        <div className="space-y-4 flex flex-col">
          <Sidebar />
        </div>
      </aside>
      {children}
    </div>
  );
}
