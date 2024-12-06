import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const QuizCard = () => {
  return (
    <Card className="w-[350px] mx-auto shadow-md rounded-lg">
      <CardHeader>
        <div className="flex justify-center">
          <img src="/tcs-ion-logo.png" alt="TCS iON" className="h-12" />
        </div>
        <CardTitle className="text-center mt-4">TCQ Quiz Competition</CardTitle>
        <CardDescription className="text-center">
          TCS Campus Drive-2023
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>🕒</span>
            <p>
              Duration: <strong>60 minutes</strong>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>🛠️</span>
            <p>
              Skill: <strong>Listening, Reading</strong>
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>⚡</span>
            <p>
              Difficulty: <strong>Easy</strong>
            </p>
          </div>
        </div>
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-center">
          Bạn đã làm bài test này rồi
        </div>
        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <Button className="w-full mt-2">Làm ngay</Button>
      </CardContent>
    </Card>
  );
};

export default QuizCard;
