"use client";
import "./style.css";
import StreakCalendar from "./_components/streakCalendar";
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  Flame,
  NotepadText,
  Pencil,
  Sparkle
} from "lucide-react";
import { Ranker } from "@/types/leaderboard.type"
import { Avatar, Button, Card, CardFooter, Image, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import userService from "@/utils/services/user.service";
import { isEmpty } from "lodash";

function RecentTests() {
  return (
    <div className="bg-white rounded-3xl py-4 px-6 shadow-md h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center font-bold text-lg gap-2">
          <NotepadText />
          <h3 className="">Recent Test</h3>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <Card
        isFooterBlurred
        className="w-[250px] h-[300px] col-span-12 sm:col-span-7"
      >
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="https://img.lazcdn.com/g/p/2dd58b3fbc321ab97c83fd4916fcf414.jpg_720x720q80.jpg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Breathing App</p>
              <p className="text-tiny text-white/60">
                Get a good night&#39;s sleep.
              </p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Get App
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function Ranking() {
  const [rankers, setRankers] = useState<Ranker[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await userService.getRankers(5, 0);
      setRankers(data);
    };
    fetchData();
  }, []);
  // const rankers = [
  //   {
  //     name: "Duong Hau vip pro 1",
  //     stars: 1200,
  //     position: 1,
  //     avatar: "https://i.scdn.co/image/ab6761610000e5ebba025c8f62612b2ca6bfa375"
  //   },
  //   {
  //     name: "Duong Hau vip pro 2",
  //     stars: 1100,
  //     position: 2,
  //     avatar: "https://i.scdn.co/image/ab6761610000e5ebba025c8f62612b2ca6bfa375"
  //   },
  //   {
  //     name: "Duong Hau vip pro 3",
  //     stars: 1000,
  //     position: 3,
  //     avatar: "https://i.scdn.co/image/ab6761610000e5ebba025c8f62612b2ca6bfa375"
  //   },
  //   {
  //     name: "Duong Hau vip pro 4",
  //     stars: 900,
  //     position: 4,
  //     avatar: "https://i.scdn.co/image/ab6761610000e5ebba025c8f62612b2ca6bfa375"
  //   },
  //   {
  //     name: "Duong Hau vip pro 5",
  //     stars: 800,
  //     position: 5,
  //     avatar: "https://i.scdn.co/image/ab6761610000e5ebba025c8f62612b2ca6bfa375"
  //   }
  // ];
  return (
    <div className="bg-white rounded-3xl py-4 px-6 shadow-md text-lg h-full">
      <div className="flex gap-2 text-lg font-bold mb-3">
        <Crown />
        <h3 className="">Ranking</h3>
      </div>
      {!isEmpty(rankers) ? <div className="space-y-4">
        <div className="leader">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="relative flex items-center justify-center">
              <Avatar
                isBordered
                color="warning"
                size="lg"
                src={rankers[0].image_link}
              />
              <div className="absolute bg-warning w-[20px] h-[20px] rounded-full bottom-[-10px] text-center text-white text-sm">
                1
              </div>
            </div>
            <span className="text-[24px]">{rankers[0].full_name}</span>

            <div className="flex items-center justify-center gap-2 bg-primary w-[100px] h-[30px] rounded text-white font-normal">
              <Sparkle size={16}></Sparkle>
              {rankers[0].totalScore}
            </div>
          </div>
        </div>
        <div className="space-y-4 p-2 h-[140px] overflow-y-scroll">
          {rankers.slice(1).map((user, index) => (
            <div key={index} className="flex items-center justify-between w-full gap-4">
                <Avatar
                  isBordered
                  color="primary"
                  size="sm"
                  src={user.image_link}
                />
                <div className="flex flex-col flex-1 leading-tight">
                  <span>{user.full_name}</span>
                  <div className="flex gap-2 items-center font-normal text-[#7a7a7a]"><Sparkle size={16}></Sparkle><span>{user.totalScore}</span></div>
                </div>
                <div className="w-[25px] h-[25px] leading-[0.5] text-white bg-primary rounded-full p-2">{user.position}</div>
            </div>
          ))}
        </div>
      </div> : <div className="w-full h-full flex justify-center items-center"><Spinner size="lg" color="primary" label="Loading leaderboard ..." /></div>}
    </div>
  );
}

function AssessmentCard() {
  const router = useRouter();
  const goToTest = () => {
    router.push("/application/assessment");
  };

  return (
    <div className="bg-white rounded-3xl py-4 px-6 shadow-md h-full">
      <div className="max-w-md">
        <div className="flex items-center font-bold text-lg gap-2 mb-8">
          <Pencil />
          <h3 className="text-lg">Do the assessment test</h3>
        </div>

        <div className="flex justify-center items-center flex-col gap-4">
          <Image
            src={
              "https://cdn-icons-png.freepik.com/256/1581/1581884.png?semt=ais_hybrid"
            }
            alt="Test image"
            width={100}
            height={105}
            className="p-4"
          />

          <button
            onClick={goToTest}
            className="w-4/5 bg-gray-900 text-white rounded-xl py-4 font-medium hover:bg-gray-800 transition-colors"
          >
            Do right now!
          </button>
        </div>
      </div>
    </div>
  );
}

function Streaks() {
  return (
    <div className="bg-white rounded-3xl p-4 shadow-md h-full">
      <div className="flex gap-2 text-lg font-bold">
        <Flame />
        <h3 className="text-lg">Streaks</h3>
      </div>
      <div className="rounded-lg">
        <p className="font-bold mb-4">
          You are on{" "}
          <span className="bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
            7 days streak
          </span>
          , keep it up!
        </p>
        <StreakCalendar></StreakCalendar>
      </div>
    </div>
  );
}

export default function Main() {
  return (
    <main className="flex-1 p-6">
      <h2 className="text-4xl font-bold mb-6">Home</h2>
      <div className="grid grid-cols-12 gap-6">
        {/* Recent Tests Section */}
        <div className="col-span-12 lg:col-span-6 h-[380px]">
          <RecentTests></RecentTests>
        </div>

        {/* Ranking Section */}
        <div className="col-span-12 lg:col-span-6 h-[380px]">
          <Ranking></Ranking>
        </div>

        {/* Assessment Section */}
        <div className="col-span-12 lg:col-span-6 h-[380px]">
          <AssessmentCard></AssessmentCard>
        </div>

        <div className="col-span-12 lg:col-span-6 h-[380px]">
          <Streaks></Streaks>
        </div>
      </div>
    </main>
  );
}
