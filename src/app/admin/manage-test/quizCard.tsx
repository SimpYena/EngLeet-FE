import { Card, CardContent, CardHeader } from "@/app/application/ui/card";
import { Button } from "@/app/application/ui/button";
import { useRouter } from "next/navigation";

export const QuizCard = ({
  id,
  title,
  difficulty,
  acceptance,
  description
}: {
  id: number;
  title: string;
  difficulty: string;
  acceptance: number;
  description: string;
}) => {
  const router = useRouter();
  const openTest = () => {
    router.push(`manage-test/${id}`);
  };

  return (
    <Card className="bg-white" onClick={openTest}>
      <CardHeader className="space-y-2">
        <div className="font-bold text-xl">
          <span className="text-[#00A1E0]">ENG</span>
          <span>TEST</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{title}</h2>
        </div>
        <div className="inline-block px-3 py-1 bg-[#2b71c2] text-white rounded-full text-sm mr-2">
          Acceptance {acceptance}
        </div>
        <div className="inline-block px-3 py-1 bg-[#2b71c2] text-white rounded-full text-sm">
          {difficulty}
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
