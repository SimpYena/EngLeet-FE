"use client";

import { useState } from "react";
// import { Button } from "@/app/application/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/app/application/ui/radio-group";
import { QuizAttempt, Transcript } from "@/types/quiz.type";
import api from "../../../../utils/apis/user.service";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

interface QuestionProps {
  args?: Transcript | null;
  total: number;
  showComment: (value: boolean | null) => void;
  page: string | null;
}

export default function Question({
  args,
  total,
  showComment,
  page
}: QuestionProps) {
  const [currentPage, setCurrentPage] = useState(Number(page));
  const [answer, setAnswer] = useState<QuizAttempt>();
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const router = useRouter();

  const handleCheck = async () => {
    if (args?.id !== undefined) {
      const result = await api.submitAnswer(args.id, selectedAnswer);
      if (result.status === "Correct") {
        setIsCorrect(true);
      } else {
        setIsCorrect(false);
      }
      setAnswer(result);
      showComment(result.status === "Correct");
    } else {
      console.error("ID is undefined");
    }
  };

  const handleNext = () => {
    setSelectedAnswer("");
    setIsCorrect(null);
    const nextQuizz = args?.nextQuizz;
    router.push(`/application/quiz/${nextQuizz?.id}`);
  };

  const handlePrevious = () => {
    setSelectedAnswer("");
    setIsCorrect(null);
    const previousQuizz = args?.previousQuizz;
    router.push(`/application/quiz/${previousQuizz?.id}`);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {args?.previousQuizz && (
            <Button
              variant="ghost"
              startContent={<ChevronLeft className="h-4 w-4" />}
              onPress={() => handlePrevious()}
              className="font-medium"
            >
              {args?.previousQuizz?.title}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          {args?.nextQuizz && (
            <Button
              variant="ghost"
              endContent={<ChevronRight className="h-4 w-4" />}
              onPress={() => handleNext()}
              className="font-medium"
            >
              {args?.nextQuizz?.title}
            </Button>
          )}
        </div>
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold">{args?.title}</h2>
        <p className="text-muted-foreground">{args?.context}</p>
      </div>

      <div className="space-y-2">
        <RadioGroup
          defaultValue="empire"
          className="space-y-2"
          onValueChange={(value) => {
            setSelectedAnswer(value);
            setIsCorrect(null);
          }}
          onTouchMove={(e) => {
            e.preventDefault();
          }}
        >
          {args?.answer?.map((item, index) => (
            <motion.label
              key={item}
              className={`flex items-center space-x-2 rounded-lg border p-4 hover:bg-accent cursor-pointer ${
                selectedAnswer === item && isCorrect
                  ? "bg-emerald-100"
                  : selectedAnswer === item && !isCorrect && isCorrect != null
                  ? "bg-red-100"
                  : ""
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={
                selectedAnswer === item && isCorrect
                  ? {
                      scale: [1, 1.05, 1],
                      transition: { repeat: 3, duration: 0.3 }
                    }
                  : {}
              }
            >
              <RadioGroupItem value={item} id={item} />
              <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {item}
              </span>

              {isCorrect && selectedAnswer === item && isCorrect != null ? (
                <span className="text-emerald-500">Correct</span>
              ) : !isCorrect && selectedAnswer === item && isCorrect != null ? (
                <span className="text-red-500">Incorrect</span>
              ) : (
                ""
              )}
            </motion.label>
          ))}
        </RadioGroup>

        <div className="flex justify-end">
          <Button
            onPress={handleCheck}
            className="w-auto"
            isDisabled={!!isCorrect}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
