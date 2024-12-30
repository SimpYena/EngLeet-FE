"use client";
import { Input, Radio, Button, Link, RadioGroup } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import UserService from "@/utils/services/user.service";
import toast from "@/components/toast";
import { useRouter } from "next/navigation";

export default function Main() {
  const router = useRouter();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "kotentuoi1122+2@gmail.com",
    full_name: "wdw",
    gender: "Male",
    password: "Tuananh@123",
    confirmPassword: "Tuananh@123"
  });
  const [errors, setErrors] = useState({
    email: "",
    full_name: "",
    password: ""
  });

  const togglePasswordVisible = () => setPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisible = () =>
    setConfirmPasswordVisible(!isConfirmPasswordVisible);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      full_name: "",
      password: ""
    };
    if (!formData.email) {
      newErrors.email = "Email is required.";
    }

    if (!formData.full_name) {
      newErrors.full_name = "Name is required.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.password = "Passwords do not match.";
    }

    setErrors(newErrors);
    Object.keys(newErrors).forEach((key) => {
      if (newErrors[key]) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    setErrors({
      email: "",
      full_name: "",
      password: ""
    });

    const result = await UserService.register(formData);

    if (result.error_id) {
      toast.error(result.message);
      const errors = result.errors.map((error) => {
        return {
          [error.field]: error.message
        };
      });
      setErrors(Object.assign({}, ...errors));
      return;
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
            value={formData.full_name}
            onChange={handleInputChange}
            name="full_name"
            label="Full Name"
            fullWidth
            type="text"
          />
          {errors.full_name && (
            <span className="text-danger mt-2 ml-1">{errors.full_name}</span>
          )}
        </div>
        <div className="mb-6">
          <RadioGroup
            className="flex"
            orientation="horizontal"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <Radio value="Male">Male</Radio>
            <Radio className="ml-5" value="Female">
              Female
            </Radio>
            <Radio className="ml-5" value="None">
              None
            </Radio>
          </RadioGroup>
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
        <div className="mb-6">
          <Input
            value={formData.confirmPassword}
            onChange={handleInputChange}
            name="confirmPassword"
            label="Confirm Password"
            fullWidth
            type={isConfirmPasswordVisible ? "text" : "password"}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleConfirmPasswordVisible}
                aria-label="toggle password visibility"
              >
                {isConfirmPasswordVisible ? (
                  <EyeSlashIcon className="size-6 text-black" />
                ) : (
                  <EyeIcon className="size-6 text-black" />
                )}
              </button>
            }
          />
        </div>
        <Button className="w-full bg-black text-white" onPress={handleSubmit}>
          Register
        </Button>
        <div className="mt-4">
          <Link href="/auth/login" className="text-gray-500 mt-3 mb-6">
            Already have an account? Login
          </Link>
          <br />
          <div className="text-center">
            <Link href="#" color="primary">
              Privacy Policy
            </Link>{" "}
            và{" "}
            <Link href="#" color="primary">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
