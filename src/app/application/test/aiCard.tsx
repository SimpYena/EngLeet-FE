import { Card, CardContent, CardHeader } from "@/app/application/ui/card";
import { Button } from "@/app/application/ui/button";

export const AiCard = ({
  title,
  difficulty,
  topic,
  onDoNowClick,
  type,
}: {
  title?: string;
  difficulty?: string;
  topic?: string;
  acceptance?: number;
  description?: string;
  type?: string;
  onDoNowClick?: () => void;
}) => {
  return (
    <Card className="bg-white h-[300px]">
      <CardHeader className="space-y-2">
        <div className="font-bold text-xl">
          <span className="text-[#00A1E0]">ENG</span>
          <span>TEST(generated)</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="inline-block px-3 py-1 bg-[#2b71c2] rounded-full text-sm mr-2 text-white">
          {type || "Listening"}
        </div>
        <div className="inline-block px-3 py-1 bg-[#2b71c2] rounded-full text-sm mr-2 text-white">
          {topic || "Environment"}
        </div>
        <div className="inline-block px-3 py-1 bg-[#2b71c2] text-white rounded-full text-sm">
          {difficulty || "Easy"}
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="lg"
            className="w-24 bg-zinc-900 text-white rounded-medium"
            onClick={onDoNowClick}
          >
            Do now!
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
