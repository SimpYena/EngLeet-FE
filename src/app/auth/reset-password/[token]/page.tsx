"use client";
import toast from "@/components/toast";
import userService from "@/utils/services/user.service";
import { Button, Input, Link } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail({ params }: { params: { token: string } }) {
  const { token } = params;
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (token) {
          await userService.verifyResetPasswordToken(token)
            .then(() => {
              toast.success("Token verified");
            })
            .catch((error) => {
              throw error;
            });
        } else {
          throw new Error("Invalid token");
        }
      } catch (error: any) {
        toast.error(error.message);
        router.push("/auth/login");
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Password and confirm password must be the same");
      return;
    }

    try {
      await userService.resetPassword(token, password);
      toast.success("Password reset success");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Password reset failed");
    }
  };

  return (
    <>
      <div>
        <div className="bg-white p-9 rounded-lg shadow-md w-[440px]">
          <div className="flex justify-center mb-6">
            <span className="font-semibold">ENGLEET</span>
          </div>
          <div className="mb-6">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              label="Password"
              fullWidth
              type="password"
            />
          </div>
          <div className="mb-6">
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              label="Confirm password"
              fullWidth
              type="password"
            />
          </div>
          <Button className="w-full bg-black text-white" onPress={handleSubmit}>
            Reset password
          </Button>
          <div className="mt-4">
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
    </>
  );
}
