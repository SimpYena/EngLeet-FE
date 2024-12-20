import React from "react";
import {
  Home,
  FileText,
  HelpCircle,
  Trophy,
  User,
  Settings
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
    title: "Quizz",
    icon: Home,
    path: "/admin/manage-quizz",
    label: "Manage Quizz"
  },
  {
    title: "Test",
    icon: FileText,
    path: "/admin/manage-test",
    label: "Manage Test"
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
                <Link href={item.path} key={item.path} className="text-lg">
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

      <div className="flex items-center justify-center mt-auto pb-12">
        <div className="px-4 pt-10">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}

const UserProfile = () => {
  const logout = async () => {
    await userService.logout().then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("test");
      localStorage.removeItem("testTimer");
      destroyCookie(null, "el-refresh-token");
      destroyCookie(null, "el-access-token");
      window.location.href = "/auth/login";
    });
  };

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="https://i.pinimg.com/550x/bc/17/4e/bc174e193f9b0fa89655adcbdd6bb5f1.jpg"
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />

        <Dropdown>
          <DropdownTrigger>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="logout" onClick={logout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
