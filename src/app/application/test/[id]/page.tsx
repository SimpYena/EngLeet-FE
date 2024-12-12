"use client"
import { FileText } from "lucide-react";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Input } from "@nextui-org/react";
import { useEffect, useState } from "react";
import api from "../../../../utils/apis/user.service";
import { usePathname } from "next/navigation";
import { TestDetails } from "../interface";
import { useRouter } from "next/navigation";
export default function AssessmentTest() {
  const extractIdFromPath = (path: string): string | null => {
    const match = path.match(/\/application\/test\/(\d+)/);
    return match ? match[1] : null;
  };
  const [testDetails, setTestDetails] = useState<TestDetails | null>(null);
  const pathName = usePathname();
  const id = extractIdFromPath(pathName) as string | null;
  const [shouldError, setShouldError] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const fetchTestDetails = async () => {
      try {
        const response = await api.getTestDetail(id as string);
        setTestDetails(response);
      } catch (error) {
        console.error(error);
        setShouldError(true);
      }
    };
    fetchTestDetails();
  }, [id]);
  const doTheTest = () => {
    router.push(
      `${id}/detail`
    );
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mx-auto space-y-6 p-6 h-4/5">
        <div className="">
          <h1 className="text-4xl font-bold">Practice English Test</h1>
          <p className="text-muted-foreground mt-2">
            Do the test below to enhance your English
          </p>
        </div>

        <div className="flex justify-center bg-[#F1F3F9] h-3/5 ">
          <div className="flex justify-center gap-80 w-full">
            <div className="flex justify-center items-center">
              <div className="w-64 h-64 rounded-lg flex flex-col justify-center  gap-10">
              <div className="w-64 h-64 rounded-lg flex flex-col justify-center items-center gap-10">
                  <img
                    src={testDetails?.image_url}
                    alt="Test Preview"
                    style={{
                      width: '60%', // Maintain responsive resizing for parent container
                      height: '100%', // Maintain responsive resizing for parent container
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'cover',
                    }}
                    className="rounded-lg"
                  />
                </div>
                <Button
                  variant={"default"}
                  size={"lg"}
                  className="bg-purple-600 hover:bg-purple-700 py-4 px-8"
                  onClick={doTheTest}
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
                    <dd>{testDetails?.duration}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <dt className="font-medium">Topic covered:</dt>
                    <dd>{testDetails?.skill}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <dt className="font-medium">Difficulty level:</dt>
                    <dd>{testDetails?.difficulty}</dd>
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
        <div className="flex-1 relative">
          <Input
            placeholder="Bình luận..."
            className="w-full pr-20 min-h-[40px] bg-white"
          />
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
