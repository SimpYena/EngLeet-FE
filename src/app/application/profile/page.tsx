"use client";
import { useUser } from "@/provider/AuthContent";
import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Skeleton,
  useDisclosure
} from "@nextui-org/react";
import { isEmpty } from "lodash";
import { Award, Calendar, Edit, FileBadge, Flame } from "lucide-react";
import { useEffect, useState } from "react";
import apiService from "@/utils/apis/user.service";
import toast from "@/components/toast";
import moment from "moment";
import Image from "next/image";

export default function Page() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUser = useUser();
  const [user, setUser] = useState(currentUser);
  const [streak, setStreak] = useState(0);
  const [image, setImage] = useState<any>(null);

  function longestStreakIncludingToday(dates) {
    const today = moment().startOf("day");
    const parsedDates = dates.map((date) =>
      moment(date, "YYYY/MM/DD").startOf("day")
    );

    // Filter dates that are <= today and sort in descending order
    const validDates = parsedDates
      .filter((date) => date.isSameOrBefore(today))
      .sort((a, b) => b.diff(a));

    let longestStreak = 0;
    let currentStreak = 0;

    for (let i = 0; i < validDates.length; i++) {
      if (i === 0 && validDates[i].isSame(today)) {
        currentStreak = 1; // Start streak if the first date is today
      } else if (validDates[i].add(1, "days").isSame(validDates[i - 1])) {
        currentStreak++; // Increment streak if consecutive
      } else {
        longestStreak = Math.max(longestStreak, currentStreak); // Update longest streak
        currentStreak = validDates[i].isSame(today) ? 1 : 0; // Reset streak
      }
    }

    // Final check for the last streak
    longestStreak = Math.max(longestStreak, currentStreak);

    return longestStreak;
  }

  const updateImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setImage(file);
  };

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    apiService.getStreaks().then((data) => {
      const result = longestStreakIncludingToday(data);
      setStreak(result);
    });
  }, []);

  const updateProfile = () => {
    console.log("a", image);

    apiService
      .updateProfile(user, image)
      .then(async () => {
        const data = await apiService.getCurrentUser();
        setUser(data);
        console.log(data);
        onClose();
      })
      .catch((err) => {
        toast.error("Update profile failed");
      });
  };

  return (
    <div className=" mx-auto space-y-6 p-6">
      <h1 className="text-4xl font-bold">Profile</h1>
      <div className="flex flex-col gap-4">
        <div className="relative">
          <div className="w-full h-40 bg-gray-200 rounded-lg overflow-hidden object-contain">
            <img
              className="w-full h-full"
              src="https://pbs.twimg.com/media/Ge2jlGgbUAAGcPe?format=jpg&name=4096x4096"
              alt=""
            />
          </div>
        </div>
        {/* profile info */}
        <div className="flex gap-4 h-20">
          <div className="relative size-20 sm:size-40">
            <div className="absolute size-16 sm:size-32 inset-0 left-6 top-0 sm:top-[-20px] flex items-end">
              <Avatar
                isBordered
                src={user.image_link}
                alt="profile"
                className="object-cover rounded-full w-full h-full"
              />
            </div>
          </div>
          <div className="flex justify-between flex-1 ml-46">
            <div className="flex flex-col gap-2 flex-1">
              {isEmpty(user) ? (
                <>
                  <Skeleton className="h-4 w-[100px] rounded-lg" />
                  <Skeleton className="h-3 w-[150px] rounded-lg" />
                </>
              ) : (
                <>
                  <div className="flex">
                    <p className="text-2xl font-bold">{user.full_name}</p>
                    <Button
                      isIconOnly
                      color="primary"
                      variant="light"
                      size="sm"
                      onPress={onOpen}
                    >
                      <Edit size={16} />
                    </Button>
                  </div>
                  <p className="text-gray-500">{user.email}</p>
                </>
              )}
            </div>
            <div className="flex justify-end hidden sm:block">
              <Button
                color="primary"
                variant="solid"
                size="sm"
                onPress={onOpen}
              >
                <Edit size={16} />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>

        {/* statistic */}
        <div className="my-6">
          <h2 className="text-2xl font-bold mb-4">Statistic</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <Flame className="text-[#ff0000] w-12 h-12"></Flame>
                <div>
                  <p className="text-2xl font-bold">{streak}</p>
                  <p className="text-gray-500">Day streak</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <FileBadge className="w-12 h-12 text-[#02a1d1]"></FileBadge>
                <div>
                  <p className="text-2xl font-bold">10</p>
                  <p className="text-gray-500">Quizz attemp</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <Award className="w-12 h-12 text-[#ffa600]"></Award>
                <div>
                  <p className="text-2xl font-bold">{user.level}</p>
                  <p className="text-gray-500">Current level</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <Calendar className="w-12 h-12 text-[#007bff]"></Calendar>
                <div>
                  <p className="text-2xl font-bold">
                    {moment(user.created_at).format("yyyy/MM/DD")}
                  </p>
                  <p className="text-gray-500">Join date</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update profile
              </ModalHeader>
              <ModalBody>
                <Input
                  isDisabled
                  className="mb-2"
                  label="Email"
                  labelPlacement="outside"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <Input
                  className="mb-2"
                  label="Full name"
                  labelPlacement="outside"
                  value={user.full_name}
                  onChange={(e) =>
                    setUser({ ...user, full_name: e.target.value })
                  }
                />
                <Input
                  className="mb-2"
                  label="Avatar"
                  type="file"
                  onChange={updateImage}
                />
                <div className="w-20 h-20 rounded-full bg-gray-200 rounded-lg overflow-hidden object-contain relative">
                  {image && (
                    <Image
                      fill
                      className="w-full h-full relative"
                      src={URL.createObjectURL(image || "")}
                      alt=""
                    />
                  )}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={updateProfile}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
