"use client";

import { RadioGroup, RadioGroupItem } from "@/app/application/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer } from "lucide-react";
import Image from "next/image";
import logo from "@/app/public/images/logo.png";
import api from "@/utils/apis/user.service";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getItem, setItemIntoStorage } from "@/utils/localStorage";
import moment from "moment";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button
} from "@nextui-org/react";
import testService from "@/utils/services/test.service";
import useAssessmentStore from "@/stores/assessment.store";
import toast from "@/components/toast";
export default function TestInterface() {
  const id = "assessment";
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const assessmentTest = useAssessmentStore((state) => state.assessmentTest);
  const setResult = useAssessmentStore((state) => state.setResult);
  const [testData, setTestData] = useState(assessmentTest);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  function calculateTimeLeft() {
    const timers = JSON.parse(getItem("testTimer")) || [];
    const targetTimestamp = timers.find((timer) => timer.id === id)?.timeStamp;
    const now = moment().unix(); // Current timestamp in seconds
    const difference = targetTimestamp - now;

    const timeLeft = {
      total: difference,
      hours: Math.floor(difference / 3600),
      minutes: Math.floor((difference % 3600) / 60),
      seconds: Math.floor(difference % 60)
    };

    return timeLeft;
  }

  // Format the time as hh:mm:ss
  const formatTime = ({ total }) => {
    if (total <= 0) {
      return "00:00:00";
    }

    const duration = moment.duration(total, "seconds");

    const formattedTime = moment
      .utc(duration.asMilliseconds())
      .format("HH:mm:ss");

    return formattedTime;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = calculateTimeLeft();
      setTimeLeft(remainingTime);

      if (remainingTime.total <= 0 || submitted) {
        clearInterval(interval);
      }
    }, 1000);

    let storageTest = getItem("test") || "[]";
    storageTest = JSON.parse(storageTest);

    const handleLocalStorage = (questions) => {
      // handle first save to storage
      const readingObj = questions.map((question) => {
        const isExist = storageTest.find((item) => item.id === id);
        if (!isExist) {
          return {
            id: question.id,
            choosenAnswer: null
          };
        } else {
          return {
            id: question.id,
            choosenAnswer: isExist.questions.find((q) => q.id === question.id)
              ?.choosenAnswer
          };
        }
      });

      const isTestExist = storageTest.find((item) => item.id === id);
      if (isTestExist) {
        storageTest = storageTest.filter((item) => item.id !== id);
      }
      
      storageTest = [...storageTest, { id, questions: readingObj }];

      setItemIntoStorage("test", JSON.stringify(storageTest));
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        if (assessmentTest.length === 0) {
          const questions = await testService.generateAssessmentTest();
          if (questions.length === 0) {
            toast.error("Failed to fetch assessment test");
            setLoading(false);
            return;
          }

          handleLocalStorage(questions);
          setTestData(questions);
          setLoading(false);
          return;
        }

        handleLocalStorage(assessmentTest);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (timeLeft.total < 0 && !submitted) {
      // submitTest();
    }
  }, [timeLeft.total, submitted]);

  useEffect(() => {
    const storageItem = getItem("test") || "[]";
    const parsedStorageItem = JSON.parse(storageItem);

    const updatedStorageItem = parsedStorageItem.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          questions: testData.map((q) => ({
            id: q.id,
            choosenAnswer: q.choosenAnswer
          }))
        };
      }

      return item;
    });

    setItemIntoStorage("test", JSON.stringify(updatedStorageItem));
  }, [testData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleAnswerSelect = (currentQuestionIndex: number, answer: string) => {
    if (submitted) {
      return;
    }

    setTestData((prev) => {
      return prev.map((question, index) => {
        if (index === currentQuestionIndex) {
          return {
            ...question,
            choosenAnswer: answer
          };
        }
        return question;
      });
    });
  };

  const submitTest = async () => {
    // handle submit test
    const answers = testData.map((question) => question.choosenAnswer);
    await api
      .submitAssessmentTest(answers)
      .then((response) => {
        setResult(response);
        router.push(`/application/assessment/result`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return testData ? (
    <div className="container mx-auto p-6 space-y-6 bg-white overflow-y-auto h-screen">
      <div className="mx-auto space-y-6 p-6 h-4/5">
        <div className="min-h-screen bg-[#F8F9FE]">
          {/* Header */}
          <header className="p-4 flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Image
                  src={logo}
                  alt="TCS iON Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <h1 className="font-medium">Assessment test</h1>
              </div>
            </div>
            {timeLeft.total > 0 && !submitted && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Timer className="w-5 h-5" />
                  <span className="font-medium">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <Button variant="solid" color="danger" onClick={onOpen}>
                  End now
                </Button>
              </div>
            )}
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto p-4">
            <Tabs defaultValue="reading" className="space-y-6">
              <TabsList className="bg-transparent border-b rounded-none h-auto p-0 space-x-8">
                <TabsTrigger
                  value="reading"
                  className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent px-0 pb-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                >
                  Reading
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reading" className="space-y-8">
                {/* Question */}
                <div className="col-span-3 space-y-6">
                  <div className="space-y-4">
                    {/* Display the current question */}
                    <h2 className="font-medium">
                      Question {currentQuestionIndex + 1}
                    </h2>
                    <p className="text-muted-foreground">
                      {testData[currentQuestionIndex].question}
                    </p>

                    {/* Answer Choices */}
                    <RadioGroup
                      disabled={submitted}
                      className="space-y-3"
                      value={testData[currentQuestionIndex].choosenAnswer}
                    >
                      {testData[currentQuestionIndex]?.answer?.map(
                        (choice, index) => (
                          <div
                            onClick={() =>
                              handleAnswerSelect(currentQuestionIndex, choice)
                            }
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={choice}
                              id={`q${currentQuestionIndex}-choice${index}`}
                            />
                            <label
                              htmlFor={`q${currentQuestionIndex}-choice${index}`}
                              className="text-sm font-medium"
                            >
                              {choice}
                            </label>
                          </div>
                        )
                      )}
                    </RadioGroup>
                  </div>
                </div>
                <div className="col-span-1 bg-gray-50 p-4 rounded-md shadow">
                  <h3 className="font-medium mb-4">Question</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {" "}
                    {/* Adjust the grid columns as needed */}
                    {testData.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => handleQuestionSelect(index)}
                        className={`p-2 text-center rounded-md cursor-pointer border border-gray-300 
                          ${
                            submitted
                              ? testData[index].choosenAnswer ===
                                testData[index].correctAnswer
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                              : ""
                          } 
                          ${
                            currentQuestionIndex === index
                              ? "bg-blue-500 text-white"
                              : ""
                          } ${
                          !submitted && testData[index].choosenAnswer
                            ? "bg-primary text-white"
                            : ""
                        } `}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Submit the test
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to submit the test? You can&apos;t undo
                  this action.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button color="primary" onClick={submitTest}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  ) : (
    <div>loading</div>
  );
}
