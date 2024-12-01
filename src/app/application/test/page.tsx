import { Button } from "@/components/ui/button";
import { ClipboardList, Filter, SortDesc } from "lucide-react";
import { QuizCard } from "./quizCard";

interface QuizCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  rating: number;
}

const quizCards: QuizCard[] = Array(6).fill({
  id: 1,
  title: "TCS Quiz Competition",
  subtitle: "TCS Campus Drive-2023",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna...",
  rating: 5.5,
});

export default function Test() {
  return (
    <div className="min-h-screen p-6">
      <div className=" mx-auto space-y-6 p-6">
        <h1 className="text-2xl font-bold">Làm Test</h1>

        <div className="flex items-center justify-between ">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="gap-2 text-lg">
                <ClipboardList className="h-4 w-4" />
                All Tests
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2 text-lg">
                <Filter className="h-4 w-4" />
                Bộ lọc
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-lg">
                <SortDesc className="h-4 w-4" />
                Sắp xếp theo
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizCards.map((card, index) => (
            <QuizCard key={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
}