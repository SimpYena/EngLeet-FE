"use client";

import { RadioGroup, RadioGroupItem } from "@/app/application/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer } from "lucide-react";
import Image from "next/image";
import logo from "@/app/public/images/logo.png";
import api from "@/utils/apis/user.service";
import userService from "@/utils/services/user.service";
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
import { isEmpty } from "lodash";
export default function TestInterface({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { id } = params;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [readingData, setReadingData] = useState<any>({});
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  function calculateTimeLeft() {
    const timers = JSON.parse(getItem("testTimer")) || [];
    const targetTimestamp = timers.find((timer) => timer.id === `g-${id}`)?.timeStamp;
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

  const formatTest = (generatedTest) => {
    console.log(generatedTest);
    
    return {
      id: generatedTest.content.sectionContext[0].id,
      title: generatedTest.title,
      type: generatedTest.type,
      passage: generatedTest.content.sectionContext[0].passage,
      audio_link: generatedTest.content.sectionContext[0].audio_link,
      questions: generatedTest.content.sectionContext[0].question.map(
        (question) => ({
          id: question.id,
          question: question.question,
          answer: question.answer,
          choosenAnswer: null,
          correct_answer: question.correct_answer
        })
      )
    }
  }

  // Format the time as hh:mm:ss
  const formatTime = ({ total, hours, minutes, seconds }) => {
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
    // run timer
    const interval = setInterval(() => {
      const remainingTime = calculateTimeLeft();
      setTimeLeft(remainingTime);

      if (remainingTime.total <= 0 || submitted) {
        clearInterval(interval);
      }
    }, 1000);

    let storageTest = getItem("test") || "[]";
    storageTest = JSON.parse(storageTest);

    const handleLocalStorage = (generatedTest) => {
      console.log(generatedTest);
      generatedTest.id = `g-${generatedTest.id}`;
      // handle first save to storage
      const readingObj = generatedTest.questions.map((question) => {
        const isExist = storageTest.find((item) => item.id === generatedTest.id);
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

      if (storageTest.length === 0) {
        storageTest = [
          {
            id: generatedTest.id,
            questions: readingObj
          }
        ];
      } else {
        storageTest = storageTest.map((item) => {
          if (item.id === generatedTest.id) {
            return {
              ...item,
              questions: readingObj
            };
          }

          return item;
        });
      }

      setItemIntoStorage("test", JSON.stringify(storageTest));
    };

    const fetchData = async () => {
      try {
        setLoading(true);
        let [generatedTest, submittedTest] = await Promise.all([
          testService.getGeneratedTest(id),
          testService.getSubmitedTest(id)
        ]);

        generatedTest = formatTest(generatedTest);

        if (submittedTest && submittedTest.length > 0) {
          setSubmitted(true);

          generatedTest.questions = generatedTest.questions.map((question) => {
            const matchQuestion = submittedTest.find(
              (q) => q.question_id === question.id
            );
            return {
              ...question,
              choosenAnswer: matchQuestion.answer,
              correct_answer: matchQuestion.correct_answer
            };
          });

          setReadingData(generatedTest);
          setLoading(false);
          return;
        }

        const isTestExist = storageTest.find((item) => item.id === id);

        if (isTestExist) {
          generatedTest.questions = generatedTest.questions.map((question) => {
            const choosenAnswer = isTestExist.questions.find(
              (q) => q.id === question.id
            )?.choosenAnswer;
            return {
              ...question,
              choosenAnswer
            };
          });
        }

        setReadingData(generatedTest);
        handleLocalStorage(generatedTest);
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
    console.log(readingData);
    
    const storageItem = getItem("test") || "[]";
    const parsedStorageItem = JSON.parse(storageItem);

    const updatedStorageItem = parsedStorageItem.map((item) => {
      if (item.id === `g-${readingData.id}`) {
        return {
          ...item,
          id: `g-${readingData.id}`,
          questions: readingData.questions.map((q) => ({
            id: q.id,
            choosenAnswer: q.choosenAnswer
          }))
        };
      }
      return item;
    });

    setItemIntoStorage("test", JSON.stringify(updatedStorageItem));
  }, [readingData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleAnswerSelect = (
    questionType: "reading" | "listening",
    currentQuestionIndex: number,
    answer: string
  ) => {
    if (submitted) {
      return;
    }

    setReadingData((prev) => {
      const updatedQuestion = prev.questions.map((question, index) => {
        if (index === currentQuestionIndex) {
          return {
            ...question,
            choosenAnswer: answer
          };
        }
        return question;
      });

      return {
        ...prev,
        questions: updatedQuestion
      };
    });
  };

  const submitTest = async () => {
    // handle submit test

    await api
      .submitGeneratedTest(id, [
        ...readingData.questions.map((question) => (question.choosenAnswer))
      ])
      .then(() => {
        router.push(`/application/test/${id}/result`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
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
                <h1 className="font-medium">{readingData.title}</h1>
              </div>
            </div>
            {(timeLeft.total > 0 && isEmpty(submitted)) && (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Timer className="w-5 h-5" />
                  <span className="font-mono font-medium">
                    {formatTime(timeLeft)}
                  </span>
                </div>

                <Button variant="solid" color="danger" onPress={onOpen}>
                  End now
                </Button>
              </div>
            )}
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto p-4">
            <Tabs defaultValue="reading" className="space-y-6">
              <TabsList className="bg-transparent border-b rounded-none h-auto p-0 space-x-8">
                {readingData.type === "Reading" && <TabsTrigger
                  value="reading"
                  className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent px-0 pb-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                >
                  Reading
                </TabsTrigger>}
                {readingData.type === "Listening" && <TabsTrigger
                  value="listening"
                  className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent px-0 pb-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                >
                  Listening
                </TabsTrigger>}
              </TabsList>

              {readingData.type === "Reading" && <TabsContent value="reading" className="space-y-8">
                {/* Reading Passage */}
                <div className="space-y-4">
                  <h2 className="font-medium">
                    Read the passage below and answer these questions
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>{readingData.passage}</p>
                  </div>
                </div>

                {/* Question */}
                <div className="col-span-3 space-y-6">
                  <div className="space-y-4">
                    {/* Display the current question */}
                    <h2 className="font-medium">
                      Question {currentQuestionIndex + 1}
                    </h2>
                    <p className="text-muted-foreground">
                      {readingData.questions[currentQuestionIndex].question}
                    </p>

                    {/* Answer Choices */}
                    <RadioGroup
                      disabled={submitted}
                      className="space-y-3"
                      value={
                        readingData.questions[currentQuestionIndex].choosenAnswer
                      }
                    >
                      {readingData.questions[currentQuestionIndex].answer.map(
                        (choice, index) => (
                          <div
                            onClick={() =>
                              handleAnswerSelect(
                                "reading",
                                currentQuestionIndex,
                                choice
                              )
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
                    {readingData.questions.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => handleQuestionSelect(index)}
                        className={`p-2 text-center rounded-md cursor-pointer border border-gray-300 
                          ${
                            submitted
                              ? readingData.questions[index].choosenAnswer ===
                                readingData.questions[index].correct_answer
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                              : ""
                          } 
                          ${
                            currentQuestionIndex === index
                              ? "bg-blue-500 text-white"
                              : ""
                          } ${
                          !submitted &&
                          readingData.questions[index].choosenAnswer
                            ? "bg-primary text-white"
                            : ""
                        } `}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>}

              {readingData.type === "Listening" && <TabsContent value="listening" className="space-y-8">
                {/* <div className="h-[200px] flex items-center justify-center text-muted-foreground"> */}
                <div className="space-y-4">
                  <h2 className="font-medium">
                    Listening the audio and answer these questions
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <audio controls>
                      <source
                        src={readingData.audio_link}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>

                {/* Question */}
                <div className="col-span-3 space-y-6">
                  <div className="space-y-4">
                    {/* Display the current question */}
                    <h2 className="font-medium">
                      Question {currentQuestionIndex + 1}
                    </h2>
                    <p className="text-muted-foreground">
                      {readingData.questions[currentQuestionIndex].question}
                    </p>

                    {/* Answer Choices */}
                    <RadioGroup
                      disabled={submitted}
                      className="space-y-3"
                      value={
                        readingData.questions[currentQuestionIndex]
                          .choosenAnswer
                      }
                    >
                      {readingData.questions[currentQuestionIndex].answer.map(
                        (choice, index) => (
                          <div
                            key={index}
                            onClick={() =>
                              handleAnswerSelect(
                                "listening",
                                currentQuestionIndex,
                                choice
                              )
                            }
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
                    {readingData.questions.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => handleQuestionSelect(index)}
                        className={`p-2 text-center rounded-md cursor-pointer border border-gray-300 
                          ${
                            submitted
                              ? readingData.questions[index].choosenAnswer ===
                                readingData.questions[index].correct_answer
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                              : ""
                          } 
                          ${
                            currentQuestionIndex === index
                              ? "bg-blue-500 text-white"
                              : ""
                          } ${
                          !submitted &&
                          readingData.questions[index].choosenAnswer
                            ? "bg-primary text-white"
                            : ""
                        } `}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
                {/* </div> */}
              </TabsContent>}
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
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={submitTest}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
