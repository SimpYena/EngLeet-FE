"use client";
import { useState } from "react";
import UserService from "@/utils/services/user.service";
import toast from "@/components/toast";
import { useRouter } from "next/navigation";
import { Button, Input, Link } from "@nextui-org/react";

export default function Main() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const result = await UserService.sendVerificationEmail(email);
    if (result?.error) {
      toast.error(result.error);
    }

    // toast.success("Register success, please check your email to verify.");
    router.push("/auth/verify-email");
  };

  return (
    <div>
      <div className="bg-white p-9 rounded-lg shadow-md w-[440px]">
        <div className="flex justify-center mb-6">
          <span className="font-semibold">ENGLEET</span>
        </div>
        <div className="mb-6">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            label="Email"
            fullWidth
            type="email"
          />
        </div>
        <Button className="w-full bg-black text-white" onPress={handleSubmit}>
          Send verification email
        </Button>
        <div className="mt-4">
          <Link href="/auth/register" className="text-gray-500 mt-3 mb-6">
            Register new account
          </Link>
          <br />
          <div className="text-center">
            <Link href="#" color="primary">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="#" color="primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
