"use client";
import { Input, Button, Link } from "@nextui-org/react";
import { ChangeEvent, useEffect, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import UserService from "@/utils/services/user.service";
import toast from "@/components/toast";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Main() {
  const searchParams = useSearchParams();

  // const removeSearchParam = (param: string) => {
  //   // Convert searchParams to a plain object
  //   const params = new URLSearchParams(searchParams.toString());

  //   params.delete(param); // Remove the specific parameter

  //   // Update the URL
  //   console.log(params.toString());
    
  //   const newUrl = params.toString() ? `?${params.toString()}` : "";
  //   router.replace(newUrl);
  // };

  // const router = useRouter();

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const query = Object.fromEntries(searchParams.entries());
    if (query.token) {
      UserService.verifyEmail(query.token)
      .then(() => {
        toast.success("Email verified successfully, please login");
      })
      .catch(() => {
        toast.error("Email verification failed");
      })
      // .finally(() => {
        // removeSearchParam("token");
      // });
    }
  }, []);

  const togglePasswordVisible = () => setPasswordVisible(!isPasswordVisible);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };
    if (!formData.email) {
      newErrors.email = "Email is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key]) {
        return false;
      }
    });
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setErrors({
      email: "",
      password: "",
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
          password: "",
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
            type="email"
          />
          {errors.email && (
            <span className="text-danger mt-2 ml-1">{errors.email}</span>
          )}
        </div>
        <div className="mb-6">
          <Input
            value={formData.password}
            onChange={handleInputChange}
            name="password"
            label="Password"
            fullWidth
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
          {errors.password && (
            <span className="text-danger mt-2 ml-1">{errors.password}</span>
          )}
        </div>
        <Button className="w-full bg-black text-white" onClick={handleSubmit}>
          Login
        </Button>
        <div className="mt-4">
          <Link href="/auth/register" className="text-gray-500 mt-3 mb-6">
            Not having account yet?
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
