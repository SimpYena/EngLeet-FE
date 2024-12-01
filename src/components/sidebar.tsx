import React, { useEffect } from "react";
import {
  Home,
  FileText,
  HelpCircle,
  Trophy,
  User,
  Settings,
} from "lucide-react";
import logo from "./../app/public/images/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
const NAV_ITEMS = [
  {
    title: "Homepage",
    icon: Home,
    path: "/dashboard",
    label: "Trang chủ",
  },
  {
    title: "Test",
    icon: FileText,
    path: "/test",
    label: "Làm tests",
  },
  {
    title: "Quiz",
    icon: HelpCircle,
    path: "/quiz",
    label: "Quiz",
  },
  {
    title: "Rank",
    icon: Trophy,
    path: "/rank",
    label: "Bảng xếp hạng",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
    label: "Profile R",
  },
  {
    title: "Setting",
    icon: Settings,
    path: "/setting",
    label: "Cài Đặt",
  },
];

export default function Sidebar() {
  const [activeRoute, setActiveRoute] = React.useState("/application/");

  // refactor to use nextjs router here
  useEffect(() => {
    const path = window.location.pathname;
    const route = path === "/" ? "/dashboard" : path;

    setActiveRoute(route);
  }, []);

  const setActiveRouteAndRedirect = (path: string) => {
    if (path === "/dashboard") {
      setActiveRoute(path);
      window.location.href = "/application/";
      return;
    }

    setActiveRoute(path);
    window.location.href = `/application${path}`;
  };

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
              const isActive = activeRoute === item.path;

              return (
                <li key={item.path} className="text-lg">
                  <button
                    onClick={() => setActiveRouteAndRedirect(item.path)}
                    className={`w-full flex items-center px-4 py-2 rounded-lg text-left ${
                      isActive
                        ? "text-black font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </button>
                </li>
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
  return (
    <div className="flex items-center gap-4 p-4">
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V4a2 2 0 10-4 0v1.341C7.67 6.165 7 7.388 7 9v5.159c0 .538-.214 1.054-.595 1.436L5 17h5m4 0v1a3 3 0 11-6 0v-1m4 0H9"
          />
        </svg>
        <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full" />
      </div>

      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
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
      </div>
    </div>
  );
};