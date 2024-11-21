import { CustomButton } from "@/components/button";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

import Image from "next/image";
import banner from "./public/images/banner.png"

export default function App() {
  return (
    <>
      <Navbar className="bg-background pt-3">
        <NavbarBrand>
          <p className="font-bold text-black">ENGLEET</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem className="lg:flex">
            <Link href="/auth/login" className="text-black">
              Login
            </Link>
          </NavbarItem>
          <NavbarItem>
            <CustomButton
              as={Link}
              className="bg-black text-white"
              href="/auth/register"
              variant="solid"
            >
              Register
            </CustomButton>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      <div>
        <Image src={banner} width="300" height="300" alt="Banner image"></Image>
      </div>
    </>
  );
}
