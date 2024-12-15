"use client"
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { getItem, setItemIntoStorage } from "@/utils/localStorage";
import moment, { DurationInputArg1, DurationInputArg2 } from "moment";
import testService from "@/utils/services/test.service";
import useAssessmentStore from "@/stores/assessment.store";
import { useRouter } from "next/navigation";
export default function AssessmentTest() {
  const setAssessmentTest = useAssessmentStore((state) => state.setAssessmentTest);
  const [isLoading, setLoading] = useState(false);
  const id = 'assessment';
  const router = useRouter();
  const doTheTest = async () => {
    setLoading(true);
    const timers = JSON.parse(getItem("testTimer")) || [];
    const timer = timers.find((timer: any) => timer.id === id);
    if (!timer) {
      const duration = [20, 'minutes'];
      setItemIntoStorage("testTimer", JSON.stringify([...timers, { id, timeStamp: moment().add(duration[0] as DurationInputArg1, duration[1] as DurationInputArg2).unix() }]));
    }

    await testService.generateAssessmentTest().then((response) => {
      if (response.length > 0) {
        setAssessmentTest(response);
        router.push('assessment/detail');
      }
    });

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6 space-y-6 bg-white overflow-y-auto h-screen">
      <div className="mx-auto space-y-6 p-6 h-4/5">
        <div className="">
          <h1 className="text-4xl font-bold">Test your skill</h1>
          <p className="text-muted-foreground mt-2">
            Do the test below to evaluate your English skill
          </p>
        </div>

        <div className="flex justify-center bg-[#F1F3F9] h-3/5 ">
          <div className="flex justify-center gap-20 w-full">
            <div className="flex justify-center items-center">
              <div className="w-64 h-64 rounded-lg flex flex-col justify-center  gap-10">
              <div className="w-64 h-64 rounded-lg flex flex-col justify-center items-center gap-10">
                  <img
                    src="https://camudigitalcampus.com/wp-content/uploads/2022/03/Test-Assessments.jpg"
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
                  isLoading={isLoading}
                  variant="solid"
                  color="primary"
                  size={"lg"}
                  className="py-4 px-8"
                  onClick={doTheTest}
                >
                  Let&apos;s do it!
                </Button>
              </div>
            </div>
    
            <div className="space-y-12 flex justify-center items-center">
              <div>
                <h2 className="text-3xl font-semibold mb-12">
                  {/* {testDetails?.title} */}
                  Assessment Test
                </h2>
                <dl className="grid gap-6 text-lg">
                  <div className="grid grid-cols-2 gap-2">
                    <dt className="font-medium">Test format:</dt>
                    <dd>Multiple Choice</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <dt className="font-medium">Duration:</dt>
                    <dd>20 minutes</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <dt className="font-medium">Topic covered:</dt>
                    <dd>All topics</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <dt className="font-medium">Difficulty level:</dt>
                    <dd>All level</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
