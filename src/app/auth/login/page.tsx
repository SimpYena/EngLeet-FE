"use client";
import { Input, Button, Link, form } from "@nextui-org/react";
import { ChangeEvent, Suspense, useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import UserService from "@/utils/services/user.service";
import toast from "@/components/toast";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const verifyEmail = async () => {
    const query = Object.fromEntries(searchParams.entries());
    if (query.token) {
      UserService.verifyEmail(query.token)
        .then(() => {
          toast.success("Email verified successfully, please login");
        })
        .catch(() => {
          toast.error("Email verification failed");
        })
        .finally(() => {
          router.replace("/auth/login");
        });
    }};

    verifyEmail();
  }, [searchParams]);

  const togglePasswordVisible = () => setPasswordVisible(!isPasswordVisible);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: ""
    };
    if (!formData.email) {
      newErrors.email = "Email is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);

    for (const key in newErrors) {  
      if (newErrors[key]) {
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setErrors({
      email: "",
      password: ""
    });
    // Handle successful form submission here
    // await UserService.login(formData);
    const result = await UserService.login(formData);

    if (result.errors) {
      toast.error("Wrong username or password");
      const parsedErrors = result.errors.reduce(
        (acc, error) => {
          acc[error.field] = error.message;
          return acc;
        },
        {
          email: "",
          password: ""
        }
      );
      setErrors(parsedErrors);
      return;
    }

    window.location.href = "/application";
  };

  return (
    <div>
      <div className="bg-white p-9 rounded-lg shadow-md w-[440px]">
        <div className="flex justify-center mb-6">
          <span className="font-semibold">ENGLEET</span>
        </div>
        <div className="mb-6">
          <Input
            value={formData.email}
            onChange={handleInputChange}
            name="email"
            label="Email"
            fullWidth
            errorMessage={errors.email}
            type="email"
          />
        </div>
        <div className="mb-6">
          <Input
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            label="Password"
            fullWidth
            errorMessage={errors.password}
            type={isPasswordVisible ? "text" : "password"}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={togglePasswordVisible}
                aria-label="toggle password visibility"
              >
                {isPasswordVisible ? (
                  <EyeSlashIcon className="size-6 text-black" />
                ) : (
                  <EyeIcon className="size-6 text-black" />
                )}
              </button>
            }
          />
        </div>
        <Button className="w-full bg-black text-white" onPress={handleSubmit}>
          Login
        </Button>
        <div className="mt-4 flex justify-between">
          <Link href="/auth/register" className="text-gray-500 mt-3 mb-6 flex-1">
            Register new account
          </Link>
          <div className="text-right flex-1">
            <Link href="/auth/reset-password" className="text-gray-500 mt-3 mb-6 ">
              Reset password
            </Link>
          </div>
          <br />
        </div>
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
  );
}

export default function Main() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
