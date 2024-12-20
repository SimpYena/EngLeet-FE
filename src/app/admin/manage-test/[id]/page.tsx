"use client";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import userService from "@/utils/apis/user.service";
import { useState } from "react";
import { Tests } from "@/types/test.type";
import { Button, Textarea } from "@nextui-org/react";

export default function Page() {
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [currentTest, setCurrentTest] = useState<Tests>({} as Tests);
  const [readingDetail, setReadingDetail] = useState<any>([]);
  const [listeningDetail, setListeningDetail] = useState<any>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  useEffect(() => {
    async function fetchTests() {
      try {
        const response = await userService.getTestDetail(id);
        const readingDetail = await userService.getReadingTestDetail(id);
        const listeningDetail = await userService.getListeningTestDetail(id);
        setReadingDetail(readingDetail);
        setListeningDetail(listeningDetail);

        setCurrentTest(response);
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      }
    }

    fetchTests();
  }, []);

  const createContext = async () => {
    try {
      const response = await userService.createSectionContext({
        section_id: id,
        context: "context",
      });
      console.log(response);
    } catch (error) {
      console.error("Failed to create context:", error);
    }
  }
  return (
    <div className="container bg-white mx-auto p-6 space-y-6 h-screen">
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
            <Tabs defaultValue="reading" className="space-y-6">
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

              <TabsContent value="reading" className="space-y-8">
              {/* Reading Passage */}
              <div className="space-y-4">
                <Textarea
                  isDisabled={readingDetail.item?.length}
                  isRequired
                  className="col-span-12 md:col-span-6 mb-6 md:mb-0"
                  label="Context"
                  labelPlacement="outside"
                  placeholder="Enter reading context"
                  variant="bordered"
                />
                <div className="flex justify-end">
                {!readingDetail.item?.length && <Button onClick={createContext}>Create context</Button>}
                </div>
              </div>

              {/* Question */}
              <div className="col-span-3 space-y-6">
                  <div className="space-y-4">
                    <h2 className="font-medium">
                      Question {currentQuestionIndex + 1}
                    </h2>
                    <p className="text-muted-foreground">
                      {readingDetail.question[currentQuestionIndex].question}
                    </p>
                  </div>
                </div>
                <div className="col-span-1 bg-gray-50 p-4 rounded-md shadow">
                  {/* <h3 className="font-medium mb-4">Question</h3> */}
                  {/* <div className="grid grid-cols-5 gap-2">
                    {readingData.question.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => handleQuestionSelect(index)}
                        className={`p-2 text-center rounded-md cursor-pointer border border-gray-300 
                        ${
                          submitted
                            ? readingData.question[index].choosenAnswer ===
                              readingData.question[index].correct_answer
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
                          readingData.question[index].choosenAnswer
                            ? "bg-primary text-white"
                            : ""
                        } `}
                      >
                        {index + 1}
                      </div>
                    ))}
                  </div> */}
                </div>
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
