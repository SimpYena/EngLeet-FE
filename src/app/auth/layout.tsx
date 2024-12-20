"use client";
import { CustomButton } from "@/components/button";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import Image from "next/image";
import banner from "../public/images/banner.png";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/application");
    }
  }, []);

  return (
    <div>
      <Navbar className="bg-background pt-3 fixed">
        <NavbarBrand>
          <p className="font-bold text-black">ENGLEET</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
            <Link href="/auth/login" className="text-black">
              Sign In
            </Link>
          </NavbarItem>
          <NavbarItem>
            <CustomButton
              as={Link}
              className="bg-black text-white"
              href="/auth/register"
              variant="solid"
            >
              Sign Up
            </CustomButton>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div className="h-screen pt-20 flex ">
        {!pathName.includes('/verify-email') && <div className="content-left flex-1 content-end">
          <Image className="" src={banner} alt="banner"></Image>
        </div>}
        <div className="content-right flex flex-1 items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
