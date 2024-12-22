"use client";
import "./style.css";
import StreakCalendar from "./_components/streakCalendar";
import {
  Book,
  ChartNoAxesColumnIncreasing,
  ChevronLeft,
  ChevronRight,
  Crown,
  Ear,
  Flame,
  MessageSquareX,
  NotepadText,
  Pencil,
  Send,
  Sparkle,
  Users
} from "lucide-react";
import { Ranker } from "@/types/leaderboard.type";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Image,
  Input,
  Spinner,
  useDisclosure
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import userService from "@/utils/services/user.service";
import apiService from "@/utils/apis/user.service";
import { isEmpty } from "lodash";
import toast from "@/components/toast";
import testService from "@/utils/services/test.service";
import { useUser } from "@/provider/AuthContent";
import moment from "moment";

interface ChatMessage {
  id: number;
  content: string;
  timestamp: number;
  isUser: boolean;
}

function RecentTests() {
  const router = useRouter();
  const [newestTests, setNewestTests] = useState<any>([]);
  useEffect(() => {
    const fetchRecentTests = async () => {
      const result = await testService.getNewestTest();
      setNewestTests(result.items);
      console.log(newestTests);
    };

    fetchRecentTests();
  }, []);

  const goToTest = (id: string) => {
    router.push(`/application/test/${id}`);
  };

  return (
    <div className="bg-white rounded-3xl py-4 px-6 h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center font-bold text-lg gap-2">
          <NotepadText />
          <h3 className="">New release Test</h3>
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
      <div className="overflow-x-auto w-full">
        <div className="flex gap-4">
          {newestTests.map((test, index) => (
            <Card
              key={index}
              className="min-w-[200px] max-w-[200px] h-[300px] p-2 col-span-12 shadow-none border-1 bg-zinc-700 text-white sm:col-span-7 cursor-pointer"
            >
              <CardHeader
                onClick={() => {
                  goToTest(test.id);
                }}
                className="pb-0 pt-2 px-4 flex-col items-start"
              >
                <p className="text-tiny uppercase font-bold">{test.title}</p>
              </CardHeader>
              <CardBody
                onClick={() => {
                  goToTest(test.id);
                }}
                className="overflow-visible py-2"
              >
                <Image
                  removeWrapper
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover"
                  src={test.image_url}
                />
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
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
  return (
    <div className="bg-white rounded-3xl py-4 px-6 shadow-md text-lg h-full">
      <div className="flex gap-2 text-lg font-bold mb-3">
        <Crown />
        <h3 className="">Ranking</h3>
      </div>
      {!isEmpty(rankers) ? (
        <div className="space-y-4">
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
              <div
                key={index}
                className="flex items-center justify-between w-full gap-4"
              >
                <Avatar
                  isBordered
                  color="primary"
                  size="sm"
                  src={user.image_link}
                />
                <div className="flex flex-col flex-1 leading-tight">
                  <span>{user.full_name}</span>
                  <div className="flex gap-2 items-center font-normal text-[#7a7a7a]">
                    <Sparkle size={16}></Sparkle>
                    <span>{user.totalScore}</span>
                  </div>
                </div>
                <div className="w-[25px] h-[25px] leading-[0.5] text-white bg-primary rounded-full p-2">
                  {user.position}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner size="lg" color="primary" label="Loading leaderboard ..." />
        </div>
      )}
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
  const [streak, setStreak] = useState(0);
  const [dates, setDates] = useState<string[]>([]);

  function calculateStreak(dates) {
    const today = moment().startOf("day");
    const parsedDates = dates.map((date) =>
      moment(date, "YYYY/MM/DD").startOf("day")
    );
    
    // Sort dates in ascending order
    parsedDates.sort((a, b) => a.diff(b));

    let streak = 0;
    let isConsecutive = true;

    // Iterate through sorted dates from the most recent
    for (let i = parsedDates.length - 1; i >= 0; i--) {
      const date = parsedDates[i];
      if (streak === 0) {
        // Check if the streak should start with today or yesterday
        if (date.isSame(today)) {
          streak++;
        } else if (date.isSame(today.clone().subtract(1, "days"))) {
          streak++;
        } else {
          break;
        }
      } else {
        // Check if the current date is one day before the previous date in the streak
        if (date.isSame(parsedDates[i + 1].clone().subtract(1, "days"))) {
          streak++;
        } else {
          isConsecutive = false;
          break;
        }
      }
    }

    return isConsecutive ? streak : 0;
  }

  useEffect(() => {
    apiService.getStreaks().then((data) => {
      setDates(data);
      const result = calculateStreak(data);
      setStreak(result);
    });
  }, []);
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
            {streak} days streak
          </span>
          , keep it up!
        </p>
        <StreakCalendar dates={dates}></StreakCalendar>
      </div>
    </div>
  );
}

function ChatBot() {
  const [isWaiting, setIsWaiting] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = async () => {
    if (message === "") return;
    setIsWaiting(true);
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: message,
        timestamp: Date.now(),
        isUser: true
      }
    ]);
    setMessage("");

    apiService
      .generateChat({ message })
      .then((response) => {
        console.log(response);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            content: response,
            timestamp: Date.now(),
            isUser: false
          }
        ]);
      })
      .catch((error) => {
        toast.error("Something wrong with our bot, please try again later");
      })
      .finally(() => {
        setIsWaiting(false);
      });
  };

  const clearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    setTimeout(() => {
      const chatBox = document.getElementById("chat");
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    });
  }, [messages]);

  return (
    <div className="bg-white w-full h-[700px] rounded-3xl shadow-md flex flex-col h-full">
      <div className="flex flex-col relative overflow-hidden flex-1">
        {/* header */}
        <div className="flex items-center p-4 h-[80px] justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              size="lg"
              src="https://pbs.twimg.com/media/GfKcs1cbEAANZnn?format=png&name=900x900"
            />
            <p className="font-bold">Migu AI</p>
          </div>
          <div>
            <button onClick={clearChat}>
              <MessageSquareX className="" />
            </button>
          </div>
        </div>

        {/* body */}
        <div className="shadow-inner border-1 h-full overflow-y-auto" id="chat">
          <div className="p-4 space-y-4">
            {messages.length === 0 && (
              <div className="flex justify-center items-center">
                <div className="flex flex-col items-center gap-2">
                  <Avatar
                    size="lg"
                    src="https://pbs.twimg.com/media/GfKcs1cbEAANZnn?format=png&name=900x900"
                  />
                  <p className="p-4 font-bold text-lg">Chat with Migu AI</p>
                </div>
              </div>
            )}
            {messages.map((msg, index) => {
              return msg.isUser ? (
                <div key={index} className="flex gap-2 justify-end">
                  <div className="flex flex-col">
                    <p className="p-4 bg-primary text-white rounded-lg rounded-br-none">
                      {msg.content}
                    </p>
                  </div>
                  <div className="flex items-center justify-center"></div>
                </div>
              ) : (
                <div key={index} className="flex gap-2">
                  <div className="flex items-end justify-center">
                    <Avatar
                      size="sm"
                      src="https://pbs.twimg.com/media/GfKcs1cbEAANZnn?format=png&name=900x900"
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="p-4 bg-gray-300 rounded-lg rounded-bl-none">
                      {msg.content}
                    </p>
                  </div>
                </div>
              );
            })}
            {isWaiting && (
              <div className="flex gap-2">
                <div className="flex items-end justify-center">
                  <Avatar
                    size="sm"
                    src="https://pbs.twimg.com/media/GfKcs1cbEAANZnn?format=png&name=900x900"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="p-4 bg-gray-300 rounded-lg rounded-bl-none">
                    <Spinner size="sm" color="primary" />
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* composer */}
      <div className="w-full p-2 pb-4 h-[60px]">
        <Input
          aria-label="composer"
          placeholder="Type question here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          endContent={
            <button onClick={sendMessage}>
              <Send></Send>
            </button>
          }
        />
      </div>
    </div>
  );
}

function RecommendQuizz() {
  const [recommendQuizz, setRecommendQuizz] = useState<any>([]);
  const router = useRouter();
  const goToQuizz = () => {
    router.push(`/application/quiz/${recommendQuizz.id}`);
  };

  const goToAssessment = () => {
    router.push("/application/assessment");
  };

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await apiService.getRecommendQuizz();
        setRecommendQuizz(data);
      } catch (error) {
        console.log(error);
        toast.error("Fetch recommend quizz failed");
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="bg-white rounded-3xl py-4 px-6 shadow-md h-full">
      <div className="max-w-md">
        <div className="flex justify-between items-center font-bold text-lg gap-2 mb-8">
          <div className="flex gap-2">
            <Pencil />
            <h3 className="text-lg">Today's quizz</h3>
          </div>
          <div>
            <Button color="primary" variant="ghost" onPress={goToAssessment}>
              <span>Do the assessment</span>
            </Button>
          </div>
        </div>
        <div className="border-1 p-2 mb-4 rounded-md">
          <div className="font-bold text-md">{recommendQuizz.title}</div>
          <div className="flex gap-4 flex-wrap-1 my-4">
            <Chip
              className="text-white"
              color="success"
              variant="solid"
              startContent={
                recommendQuizz.type === "Reading" ? (
                  <Book className="w-3 h-3" />
                ) : (
                  <Ear className="w-3 h-3" />
                )
              }
            >
              {recommendQuizz.type}
            </Chip>
            <Chip
              className="text-white"
              color="success"
              variant="solid"
              startContent={
                <ChartNoAxesColumnIncreasing className="w-3 h-3"></ChartNoAxesColumnIncreasing>
              }
            >
              {recommendQuizz.difficulty}
            </Chip>
            <Chip
              className="text-white"
              color="success"
              variant="solid"
              startContent={<Users className="w-3 h-3"></Users>}
            >
              {recommendQuizz.acceptance}
            </Chip>
          </div>
        </div>
        <div className="flex justify-center items-center flex-col gap-4">
          <Button onPress={goToQuizz} color="primary" className="py-4">
            Do right now!
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Main() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useUser();
  console.log(user);

  return (
    <main className="flex flex-col flex-1 p-6 h-full">
      <div className="flex justify-between items-center">
        <div className="text-4xl font-bold mb-6">Home</div>
        <Button
          color="primary"
          variant="light"
          onPress={onOpen}
          startContent={
            <Avatar
              size="sm"
              src="https://pbs.twimg.com/media/GfKcs1cbEAANZnn?format=png&name=900x900"
            />
          }
        >
          Open Migu AI
        </Button>
      </div>
      <div className="flex gap-4 h-full">
        <div className="grid grid-cols-12 gap-6 flex-1">
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
            {isEmpty(user) ? (
              <AssessmentCard></AssessmentCard>
            ) : (
              <RecommendQuizz></RecommendQuizz>
            )}
          </div>

          <div className="col-span-12 lg:col-span-6 h-[380px]">
            <Streaks></Streaks>
          </div>
        </div>
      </div>
      <Drawer
        hideCloseButton
        isOpen={isOpen}
        size="xl"
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <ChatBot></ChatBot>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </main>
  );
}
