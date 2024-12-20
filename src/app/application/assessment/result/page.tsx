"use client";

// import { Button } from "@/app/application/ui/button";
import Image from "next/image";
import image from "@/app/public/images/illustration.png";
import logo from "@/app/public/images/logo.png";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import useAssessmentStore from "@/stores/assessment.store";

export default function QuizCompletion({ params }: { params: { id: string } }) {
  const result = useAssessmentStore((state) => state.result);
  // const router = useRouter();
  // const { id } = params;
  // const viewResult = () => {
  //   router.push(`/application/test/${id}/detail`);
  // }
  return (
    <div className="container mx-auto p-6 space-y-6 bg-white overflow-y-auto h-screen">
      <div className="mx-auto space-y-6 p-6">
        <div className="min-h-screen bg-white">
          {/* Header */}
          <header className="p-4 flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="TCS iON Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <div className="text-sm">
                <div className="font-medium">Assessment Test</div>
              </div>
            </div>
          </header>

          <main className="max-w-4xl mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Thank you for taking the test!
            </h1>
            <h2 className="text-xl md:text-2xl mb-12">
              You have finished {result.score} questions, Your english level is {result.level}
            </h2>

            <div className="relative w-full max-w-md mx-auto mb-8">
              <Image
                src={image}
                alt="Quiz completion illustration"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
{/* 
            <p className="text-muted-foreground mb-8">
              Press the button below to view your results
            </p>

            <Button variant="solid" color="primary" onClick={viewResult}>
              View Results
            </Button> */}
          </main>
        </div>
      </div>
    </div>
  );
}
