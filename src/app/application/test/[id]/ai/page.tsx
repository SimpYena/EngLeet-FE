"use client";
// import { Button } from "../../ui/button";
import { Button } from "@nextui-org/react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import api from "@/utils/apis/user.service";
import { TestDetails } from "@/types/test.type";
import { useRouter } from "next/navigation";
import { getItem, setItemIntoStorage } from "@/utils/localStorage";
import moment, { DurationInputArg1, DurationInputArg2 } from "moment";
export default function AssessmentTest({ params }: { params: { id: string } }) {
  const [testDetails, setTestDetails] = useState<TestDetails | null>(null);
  const { id } = params;
  const [shouldError, setShouldError] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
          const response = await api.getGeneratedTests();
          const res = response.find((test) => test.id === +id);
          setTestDetails(res);
          return;
      } catch (error) {
        console.error(error);
        setShouldError(true);
      }
    };
    fetchTestDetails();
  }, [id]);
  const doTheTest = () => {
    const timers = JSON.parse(getItem("testTimer")) || [];
    const timer = timers.find((timer: any) => timer.id === `g-${id}`);
    if (!timer) {
      const duration = testDetails?.duration?.split(" ") || [45, "minutes"];
      setItemIntoStorage(
        "testTimer",
        JSON.stringify([
          ...timers,
          {
            id: `g-${id}`,
            timeStamp: moment()
              .add(
                duration[0] as DurationInputArg1,
                duration[1] as DurationInputArg2
              )
              .unix()
          }
        ])
      );
    }

    router.push(`ai/detail`);
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-white overflow-y-auto h-screen">
      <div className="mx-auto space-y-6 p-6 h-4/5">
        <div className="">
          <h1 className="text-4xl font-bold">Practice English Test</h1>
          <p className="text-muted-foreground mt-2">
            Do the test below to enhance your English
          </p>
        </div>

        <div className="flex justify-center bg-[#F1F3F9] h-3/5 p-4">
          <div className="flex justify-center gap-20 w-full">
            <div className="flex justify-center items-center">
              <div className="w-64 h-64 rounded-lg flex flex-col justify-center gap-5">
                <div className="w-64 h-64 rounded-lg flex flex-col justify-center items-center gap-10">
                  <img
                    src={testDetails?.image_url || "https://images.smiletemplates.com/uploads/screenshots/148/0000148482/powerpoint-template-450w.jpg"}
                    alt="Test Preview"
                    style={{
                      width: "60%", // Maintain responsive resizing for parent container
                      height: "100%", // Maintain responsive resizing for parent container
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "cover"
                    }}
                    className="rounded-lg"
                  />
                </div>
                <Button
                  variant="solid"
                  color="primary"
                  onClick={doTheTest}
                  className="h-[64px]"
                >
                  Let&apos;s do it!
                </Button>
              </div>
            </div>

            <div className="space-y-12 flex justify-center items-center">
              <div>
                <h2 className="text-3xl font-semibold mb-12">
                  {testDetails?.title}
                </h2>
                <dl className="grid gap-6 text-lg">
                  <div className="grid grid-cols-2 gap-2">
                    <dt className="font-medium">Test format:</dt>
                    <dd>Multiple Choice</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <dt className="font-medium">Duration:</dt>
                    <dd>{testDetails?.duration || "45 minutes"}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <dt className="font-medium">Topic covered:</dt>
                    <dd>{testDetails?.skill || testDetails?.type}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <dt className="font-medium">Difficulty level:</dt>
                    <dd>{testDetails?.difficulty || "Easy"}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            {" "}
            <CommentInput />
          </div>
          <h3 className="font-medium">2 comments</h3>
          <div className="border-t pt-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
                <span className="text-sm font-medium text-purple-700">Y</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Yena</span>
                  <span className="text-sm text-muted-foreground">
                    16-08-2024
                  </span>
                </div>
                <p className="text-sm mt-1">I love Duong Hau!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommentInput() {
  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-start gap-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/placeholder.svg" alt="User avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className="flex gap-2 flex-1 relative">
          <Input
            placeholder="Comment..."
            className="w-full min-h-[40px] bg-white"
          />
          <Button
            color="primary"
            size="sm"
            className="h-100"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
