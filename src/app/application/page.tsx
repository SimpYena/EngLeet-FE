"use client";
import { ChangeEvent, useState } from "react";
import "./style.css";
import RecentTests from "@/components/recentTest";
import AssessmentCard from "@/components/assessment-card";

export default function Main() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    gender: "none",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      email: "",
      name: "",
      password: "",
    };
    if (!formData.email) {
      newErrors.email = "Email is required.";
    }

    if (!formData.name) {
      newErrors.name = "Name is required.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    if (formData.password && formData.password !== formData.confirmPassword) {
      newErrors.password = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({
        email: "",
        name: "",
        password: "",
      });
      // Handle successful form submission here
      console.log("Form Data: ", formData);
    }
  };

  function shiftDate(date, numDays) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const today = new Date();

  const randomValues = getRange(200).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 3),
    };
  });

  return (
    <div className="container mx-auto p-6 space-y-6">
      <main className="flex-1 p-6">
        <h2 className="text-4xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-12 gap-6">
          {/* Recent Tests Section */}
          <div className="col-span-12 lg:col-span-6">
            <RecentTests />
          </div>

          {/* Ranking Section */}
          <div className="col-span-12 lg:col-span-6">
            <h3 className="text-lg font-semibold mb-4">Ranking</h3>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium">Nguyen Anh</h4>
                  <p className="text-sm text-gray-600">Score: 1120</p>
                </div>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium">Duong Hau</h4>
                  <p className="text-sm text-gray-600">Score: 1140</p>
                </div>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg flex items-center">
                <img
                  src="https://via.placeholder.com/50"
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium">Tran Vi Huy</h4>
                  <p className="text-sm text-gray-600">Score: 1100</p>
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Section */}
          <div className="col-span-12 lg:col-span-6">
            <AssessmentCard />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <h3 className="text-lg font-semibold mb-4">Streaks</h3>
            <div className="bg-white shadow-lg p-6 rounded-lg">
              <p className="font-bold mb-4">
                You are on{" "}
                <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  7 days streak
                </span>
                , keep it up!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
