"use client";

import { Button } from "@/app/application/ui/button";
import { RadioGroup, RadioGroupItem } from "@/app/application/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer } from "lucide-react";
import Image from "next/image";
import logo from "../../../../public/images/logo.png";
import ReactMarkdown from "react-markdown";
import api from "../../../../../utils/apis/user.service";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { APIResponse } from "../../interface";
const extractIdFromPath = (path: string): string | null => {
  const match = path.match(/\/application\/test\/(\d+)\/.+/);
  return match ? match[1] : null;
};
export default function QuizInterface() {
  const pathName = usePathname();
  const id = extractIdFromPath(pathName) as string | null;

  const [data, setData] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.getReadingTestDetail(id as string);
        setData(response.items[0]);
        console.log(response);
        console.log(response.items);

        setLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;


  const handleQuestionSelect = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
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
                <h1 className="font-medium">TCQ Quiz Competion</h1>
                <p className="text-sm text-muted-foreground">
                  TCS Campus Drive-2023
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Timer className="w-5 h-5" />
                <span className="font-mono font-medium">00:57:40</span>
              </div>
              <Button className="bg-red-600 hover:bg-red-700">
                Kết thúc ngay
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto p-4">
            <Tabs defaultValue="reading" className="space-y-6">
              <TabsList className="bg-transparent border-b rounded-none h-auto p-0 space-x-8">
                <TabsTrigger
                  value="reading"
                  className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent px-0 pb-2"
                >
                  Reading
                </TabsTrigger>
                <TabsTrigger
                  value="listening"
                  className="border-b-2 border-transparent data-[state=active]:border-primary rounded-none bg-transparent px-0 pb-2"
                >
                  Listening
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reading" className="space-y-8">
                {/* Reading Passage */}
                <div className="space-y-4">
                  <h2 className="font-medium">
                    Read the passage below and answer these questions
                  </h2>
                  <div className="space-y-4 text-muted-foreground">
                    <p>{data.sectionContext[0].passage}</p>
                  </div>
                </div>

                {/* Question */}
                <div className="col-span-3 space-y-6">
                  <div className="space-y-4">
                    {/* Display the current question */}
                    <h2 className="font-medium">
                      Câu {currentQuestionIndex + 1}
                    </h2>
                    <p className="text-muted-foreground">
                      {
                        data.sectionContext[0].question[currentQuestionIndex]
                          .question
                      }
                    </p>

                    {/* Answer Choices */}
                    <RadioGroup className="space-y-3">
                      {data.sectionContext[0].question[
                        currentQuestionIndex
                      ].answer.map((choice, index) => (
                        <div
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
                      ))}
                    </RadioGroup>
                  </div>
                </div>
                <div className="col-span-1 bg-gray-50 p-4 rounded-md shadow">
                  <h3 className="font-medium mb-4">Câu hỏi</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {" "}
                    {/* Adjust the grid columns as needed */}
                    {data.sectionContext[0].question.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => handleQuestionSelect(index)}
                        className={`p-2 text-center rounded-md cursor-pointer ${
                          currentQuestionIndex === index
                            ? "bg-blue-500 text-white"
                            : "bg-white border border-gray-300 text-black"
                        }`}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="listening">
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  Listening content will go here
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
