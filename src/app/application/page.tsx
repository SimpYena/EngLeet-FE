"use client";
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Image,
  CardBody,
  Avatar
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { UserIcon } from "@heroicons/react/24/outline";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./style.css";

function TestCard() {
  return (
    <Card
      isFooterBlurred
      className="w-[250px] h-[300px] col-span-12 sm:col-span-5"
    >
      <CardHeader className="pb-0 py-2 px-4 flex-col items-start backdrop-blur bg-white/30">
        <h4 className="text-black font-medium text-xl">
          The very long test name
        </h4>
        <small className="flex">
          <UserIcon className="w-4" />
          13 participants
        </small>
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src="https://cdn0.fahasa.com/media/catalog/product/9/7/9786048557683.jpg"
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Available soon.</p>
          <p className="text-black text-tiny">Get notified.</p>
        </div>
        <Button
          className="text-tiny bg-primary text-white"
          radius="full"
          size="sm"
        >
          Join
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function Main() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    gender: "none",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    name: "",
    password: ""
  });
  const togglePasswordVisible = () => setPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisible = () =>
    setConfirmPasswordVisible(!isConfirmPasswordVisible);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {
      email: "",
      name: "",
      password: ""
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
        password: ""
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
      count: getRandomInt(1, 3)
    };
  });

  return (
    <div className="flex h-screen bg-gray-50 flex-1 px-10">
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-12 gap-6">
          {/* Streak Section */}
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
              <div className="bg-gray-200 w-100 rounded">
                <CalendarHeatmap
                  showWeekdayLabels
                  gutterSize={2}
                  startDate={shiftDate(today, -300)}
                  endDate={today}
                  values={randomValues}
                  classForValue={(value) => {
                    if (!value) {
                      return "color-empty";
                    }
                    return `color-gitlab-${value.count}`;
                  }}
                  tooltipDataAttrs={(value) => {
                    return {
                      "data-tooltip-id": "my-tooltip",
                      "data-tooltip-content": `Joined ${
                        value.count
                      } test on ${value.date?.toLocaleDateString("en-US")}`
                    };
                  }}
                />
                <ReactTooltip id="my-tooltip" />
              </div>
            </div>
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
          {/* Recent Tests Section */}
          <div className="col-span-12 lg:col-span-6">
            <h3 className="text-lg font-semibold mb-4">Latest Test</h3>
            <div className="flex space-x-4">
              <TestCard />
              <TestCard />
            </div>
          </div>

          {/* Assessment Section */}
          <div className="col-span-12 lg:col-span-6">
            <h3 className="text-lg font-semibold mb-4">Assessment Test</h3>
            <div className="w-[300px]">
              <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start flex flex-row">
                  <div>
                    <h4 className="font-bold text-large"></h4>
                    <p className="text-tiny uppercase font-bold">Evaluate your english talent</p>
                    <small className="text-default-500">
                      100 participants known their skills
                    </small>
                  </div>
                  <div>
                    <Button
                      className="text-tiny bg-primary text-white"
                      radius="full"
                      size="sm"
                    >
                      Join
                    </Button>
                  </div>
                </CardHeader>
                {/* <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src="https://nextui.org/images/hero-card-complete.jpeg"
                  width={270}
                />
              </CardBody> */}
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
