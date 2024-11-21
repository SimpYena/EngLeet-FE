"use client";
import userService from "@/utils/services/user.service";
import {
  HomeIcon,
  ClipboardIcon,
  UserIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ApplicationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const NAV_ITEMS = [
    {
      title: "Homepage",
      icon: <HomeIcon className="w-5" />,
      path: "/dashboard"
    },
    {
      title: "Test",
      icon: <ClipboardIcon className="w-5" />,
      path: "/test"
    },
    {
      title: "Profile",
      icon: <UserIcon className="w-5" />,
      path: "/profile"
    },
    {
      title: "Rank",
      icon: <ChartBarIcon className="w-5" />,
      path: "/rank"
    },
    {
      title: "Setting",
      icon: <Cog6ToothIcon className="w-5" />,
      path: "/setting"
    }
  ];


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
      <aside className="w-64 bg-white border-r p-6">
        <div className="flex items-center mb-8">
          <Image
            width={60}
            height={60}
            src="https://via.placeholder.com/50"
            alt="Logo"
            className="w-10 h-10 mr-3"
          />
          <h1 className="text-xl font-bold text-blue-600">ENGLEET</h1>
        </div>
        <nav className="space-y-4 flex flex-col">
          {NAV_ITEMS.map((item, index) => (
            <Button
              key={index}
              className={'justify-start ' + (index === 0 ? '' : 'opacity-60')}
              color={
                index === 0 ? "primary" : "default"
              }
              variant="light"
              startContent={item.icon}
            >
              <span className="text-base">{item.title}</span>
            </Button>
          ))}
        </nav>
      </aside>
      {children}
    </div>
  );
}
