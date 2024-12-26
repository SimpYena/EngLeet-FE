import React, { act } from "react";
import {
  Home,
  FileText,
  HelpCircle,
  Trophy,
  User,
  Settings,
  LogOut
} from "lucide-react";
import logo from "./../app/public/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { destroyCookie } from "nookies";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from "@nextui-org/react";
import userService from "@/utils/apis/user.service";

const NAV_ITEMS = [
  {
    title: "Homepage",
    icon: Home,
    path: "/application",
    label: "Home",
    action: () => {}
  },
  {
    title: "Test",
    icon: FileText,
    path: "/application/test",
    label: "Tests",
    action: () => {}
  },
  {
    title: "Quiz",
    icon: HelpCircle,
    path: "/application/quiz",
    label: "Quiz",
    action: () => {}
  },
  {
    title: "Rank",
    icon: Trophy,
    path: "/application/leaderboard",
    label: "Leaderboard",
    action: () => {}
  },
  {
    title: "Profile",
    icon: User,
    path: "/application/profile",
    label: "Profile",
    action: () => {}
  },
  {
    title: "Logout",
    icon: LogOut,
    path: "",
    label: "Logout",
    action: async () => {
        await userService.logout().then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("test");
          localStorage.removeItem("testTimer");
          destroyCookie(null, "el-refresh-token");
          destroyCookie(null, "el-access-token");
          window.location.href = "/auth/login";
        });
    }
  }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-screen w-72 bg-white border-r border-gray-200">
      <div className="flex flex-col items-center pt-2">
        <div className="p-6">
          <div className="flex flex-col items-center space-y-2">
            <Image
              src={logo}
              alt="logo"
              className="object-cover"
              width={100}
              height={80}
            />
            <span className="text-xl font-bold text-blue-600">ENGLEET</span>
          </div>
        </div>

        <nav className="flex-1 px-4 pt-10">
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;

              return (
                <Link href={item.path} onClick={item.action} key={item.path} className="text-lg">
                  <div
                    className={`w-full flex items-center px-4 py-2 rounded-lg text-left cursor-pointer ${
                      isActive ? "font-bold" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
