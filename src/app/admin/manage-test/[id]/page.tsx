"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import apiService from "@/utils/apis/user.service";
import { useState } from "react";
import { Tests } from "@/types/test.type";
import { Button, Input, RadioGroup, Textarea, Radio } from "@nextui-org/react";
import { Plus, X } from "lucide-react";
import { get, startCase } from "lodash";
import testService from "@/utils/services/test.service";
import toast from "@/components/toast";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [currentTab, setCurrentTab] = useState("reading");
  const [currentTest, setCurrentTest] = useState<Tests>({} as Tests);
  const [readingPassage, setReadingPassage] = useState<string>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [readingDetail, setReadingDetail] = useState<any>([]);
  const [listeningDetail, setListeningDetail] = useState<any>([]);
  const [questions, setQuestions] = useState<any>([
    {
      question: "",
      answers: [""],
      correct_answer: ""
    }
  ]);
  useEffect(() => {
    async function fetchTests() {
      try {
        const response = await apiService.getTestDetail(id);
        const [readingResponse, listeningResponse] = await Promise.all([
          apiService.getReadingTestDetail(id),
          apiService.getListeningTestDetail(id)
        ]);
        const readingContext = get(readingResponse, [
          "items",
          "0",
          "sectionContext",
          "0"
        ]);
        const listeningContext = get(listeningResponse, [
          "items",
          "0",
          "sectionContext",
          "0"
        ]);

        if (readingContext?.question) {
          setQuestions((prev) => {
            return readingContext.question.map((question: any) => ({
              question: question.question,
              answers: question.answer,
              correct_answer: question.correct_answer,
              isReadonly: true
            }));
          });
        }

        setReadingPassage(readingContext?.passage);
        setReadingDetail(readingContext);
        setListeningDetail(listeningContext);
        setCurrentTest(response);
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      }
    }

    fetchTests();
  }, []);

  const createContext = async () => {
    try {
      await apiService
        .createSection({
          test: id,
          type: startCase(currentTab),
          title:
            currentTab === "reading"
              ? "Read the questions carefully and select the most appropriate answer."
              : "Listening the questions carefully and select the most appropriate answer."
        })
        .then(async () => {
          const response = await apiService.createSectionContext({
            section_id: id,
            context: readingPassage
          });

          const section = await apiService.getReadingTestDetail(id);
          const sectionContext = get(section, [
            "items",
            "0",
            "sectionContext",
            "0"
          ]);
          setReadingDetail(sectionContext);

          if (response?.error) {
            throw new Error("error");
          }
        })
        .catch(() => {
          throw new Error("error");
        });
    } catch (error) {
      console.error("Failed to create context:", error);
    }
  };

  const onAnswerChange = (e: any) => {
    if (!e.target) {
      return;
    }

    const index = e.target.getAttribute("data-index");
    const value = e.target.value;
    const newAnswers = questions[currentQuestionIndex].answers.map(
      (answer: any, i: number) => {
        if (i === parseInt(index)) {
          return value;
        }

        return answer;
      }
    );

    setQuestions((prev) => {
      return prev.map((question: any, i: number) => {
        if (i === currentQuestionIndex) {
          return {
            ...question,
            answers: newAnswers
          };
        }

        return question;
      });
    });
  };

  const onContextchange = (e) => {
    setReadingPassage(e.target.value);
  };

  const addMoreAnswer = () => {
    if (questions[currentQuestionIndex].answers.length >= 5) {
      return;
    }

    setQuestions((prev) => {
      return prev.map((question: any, i: number) => {
        if (i === currentQuestionIndex) {
          return {
            ...question,
            answers: [...question.answers, ""]
          };
        }

        return question;
      });
    });
  };

  const removeQuestionItem = (index) => {
    setQuestions((prev) => {
      return prev.map((question: any, i: number) => {
        if (i === currentQuestionIndex) {
          return {
            ...question,
            answers: question.answers.filter((_, j: number) => j !== index)
          };
        }

        return question;
      });
    });
  };

  const setCorrectAnswer = (value) => {
    setQuestions((prev) => {
      return prev.map((question: any, i: number) => {
        if (i === currentQuestionIndex) {
          return {
            ...question,
            correct_answer: value
          };
        }

        return question;
      });
    });
  };

  const setQuestion = (value) => {
    setQuestions((prev) => {
      return prev.map((question: any, i: number) => {
        if (i === currentQuestionIndex) {
          return {
            ...question,
            question: value
          };
        }

        return question;
      });
    });
  };

  const addMoreQuestion = () => {
    if (!questions[currentQuestionIndex]?.isReadonly) {
      return;
    }

    setQuestions((prev) => {
      return [
        ...prev,
        {
          question: "",
          answers: [""],
          correct_answer: "",
          isReadonly: false
        }
      ];
    });

    setCurrentQuestionIndex(questions.length);
  };

  const createQuestion = async () => {
    try {
      console.log(questions[currentQuestionIndex]);
      if (currentTab === "reading") {
        const response = await testService.addQuestion({
          section_context: readingDetail.id,
          question: questions[currentQuestionIndex].question,
          answer: questions[currentQuestionIndex].answers,
          correct_answer: questions[currentQuestionIndex].correct_answer,
          score: 10
        });

        if (response?.error) {
          throw new Error(response.error);
        }

        setQuestions((prev) => {
          return prev.map((question: any, i: number) => {
            if (i === currentQuestionIndex) {
              return {
                ...question,
                isReadonly: true
              };
            }

            return question;
          });
        });

        toast.success("Question created successfully");
      }
    } catch (error) {
      toast.error("Failed to create question");
      console.error("Failed to create question:", error);
    }
  };

  return (
    <div className="container bg-white mx-auto p-6 space-y-6">
      <div className="mx-auto space-y-6 p-6 h-4/5">
        <div className="min-h-screen">
          {/* Header */}
          <header className="p-4 flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg shadow-sm">
                <Image
                  src={
                    currentTest?.image_url ||
                    "https://m.media-amazon.com/images/I/71kv8uDt7rL._AC_UF1000,1000_QL80_.jpg"
                  }
                  alt="TCS iON Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </div>
              <div>
                <h1 className="font-medium">{currentTest.title}</h1>
                <p className="text-sm text-muted-foreground">
                  {currentTest.type}
                </p>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto p-4">
            <Tabs
              defaultValue="reading"
              className="space-y-6"
              onValueChange={(value) => setCurrentTab(value)}
            >
              <TabsList className="bg-transparent border-b rounded-none h-auto p-0 space-x-8">
                <TabsTrigger
                  value="reading"
                  className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent px-0 pb-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                >
                  Reading
                </TabsTrigger>
                <TabsTrigger
                  value="listening"
                  className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent px-0 pb-2 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
                >
                  Listening
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reading" className="space-y-4">
                {/* Reading Passage */}
                <div className="space-y-4">
                  <Textarea
                    isDisabled={readingDetail?.passage}
                    isRequired
                    className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                    label="Context"
                    labelPlacement="outside"
                    value={readingPassage}
                    onChange={onContextchange}
                    placeholder="Enter reading context"
                    // variant="bordered"
                  />
                  <div className="flex justify-end">
                    {!readingDetail?.passage && (
                      <Button onPress={createContext}>Create context</Button>
                    )}
                  </div>
                </div>

                {/* Question */}
                {readingDetail?.passage ? (
                  <>
                    <div className="col-span-3 space-y-6">
                      <div className="space-y-4">
                        <h2 className="font-medium">
                          Question {currentQuestionIndex + 1}
                        </h2>
                        <Textarea
                          isDisabled={
                            questions[currentQuestionIndex]?.isReadonly
                          }
                          aria-label="Enter question"
                          className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                          labelPlacement="outside"
                          value={questions[currentQuestionIndex].question}
                          onChange={(e) => setQuestion(e.target.value)}
                          placeholder="Enter question"
                          variant="bordered"
                        />
                      </div>
                    </div>
                    {/* answers */}
                    <RadioGroup
                      isDisabled={questions[currentQuestionIndex]?.isReadonly}
                      value={questions[currentQuestionIndex].correctAnswer}
                      onValueChange={(value) => setCorrectAnswer(value)}
                      className="flex flex-col gap-4"
                    >
                      <p className="font-medium text-md">
                        Fill possible answers and select right answer
                      </p>
                      {questions[currentQuestionIndex].answers.map(
                        (_, index) => (
                          <Input
                            isDisabled={
                              questions[currentQuestionIndex]?.isReadonly
                            }
                            key={index}
                            data-index={index}
                            label={`Answer ${index + 1}`}
                            value={
                              questions[currentQuestionIndex].answers[index]
                            }
                            onChange={onAnswerChange}
                            className="col-span-6 md:col-span-12 mb-6 md:mb-0 mt-2"
                            labelPlacement="outside"
                            placeholder="Enter answer"
                            variant="bordered"
                            startContent={
                              <Radio
                                name="correct_answer"
                                value={
                                  questions[currentQuestionIndex].answers[index]
                                }
                              />
                            }
                            endContent={
                              <button
                                type="button"
                                className="focus:outline-none"
                                aria-label="clear input"
                                onClick={() => removeQuestionItem(index)}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            }
                          />
                        )
                      )}
                    </RadioGroup>
                    {!questions[currentQuestionIndex]?.isReadonly &&
                      questions[currentQuestionIndex].answers.length < 5 && (
                        <div className="flex justify-between">
                          <Button onPress={addMoreAnswer}>
                            Add more answer
                          </Button>
                          <Button onPress={createQuestion} color="primary">
                            Create question
                          </Button>
                        </div>
                      )}
                    <div className="col-span-1 bg-gray-50 p-4 rounded-md shadow">
                      <h3 className="font-medium mb-4">Question list</h3>
                      <div className="grid grid-cols-4 md:grid-cols-5 gap-2">
                        {questions.map((_, index) => (
                          <div
                            key={index}
                            onClick={() => setCurrentQuestionIndex(index)}
                            className={`p-2 text-center rounded-md cursor-pointer border border-gray-300 
                        ${
                          currentQuestionIndex === index
                            ? "bg-blue-500 text-white"
                            : ""
                        }`}
                          >
                            {index + 1}
                          </div>
                        ))}
                        <div
                          onClick={() => addMoreQuestion()}
                          className="p-2 flex justify-center items-center rounded-md cursor-pointer border border-gray-300"
                        >
                          <Plus></Plus>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center">
                    <span>You have to create question context first</span>
                  </div>
                )}
              </TabsContent>

              {/* <TabsContent value="listening" className="space-y-8">
                <div className="space-y-4">
                  <div className="space-y-4 text-muted-foreground">
                    <audio controls>
                      <source
                        src={listeningData.audio_link}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div> */}

              {/* Question */}
              {/* <div className="col-span-3 space-y-6">
                  <div className="space-y-4">
                    <h2 className="font-medium">
                      Question {currentQuestionIndex + 1}
                    </h2>
                    <p className="text-muted-foreground">
                      {listeningData.question[currentQuestionIndex].question}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 bg-gray-50 p-4 rounded-md shadow">
                  <h3 className="font-medium mb-4">Question</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {listeningData.question.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => handleQuestionSelect(index)}
                        className={`p-2 text-center rounded-md cursor-pointer border border-gray-300 
                        ${
                          submitted
                            ? listeningData.question[index].choosenAnswer ===
                              listeningData.question[index].correct_answer
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
                          listeningData.question[index].choosenAnswer
                            ? "bg-primary text-white"
                            : ""
                        } `}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent> */}
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
