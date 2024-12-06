import { Card, CardContent, CardHeader } from "@/app/application/ui/card";
import { Button } from "@/app/application/ui/button";

export const QuizCard = ({
  title,
  subtitle,
  rating,
  description,
}: {
  title: string;
  subtitle: string;
  rating: number;
  description: string;
}) => {
  return (
    <Card className="bg-white">
      <CardHeader className="space-y-2">
        <div className="font-bold text-xl">
          <span className="text-[#00A1E0]">TCS</span>
          <span>iON</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="inline-block px-3 py-1 bg-[#14AE5C] rounded-full text-sm">
          Rated {rating}
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className="flex justify-end">
          <Button
            variant="outline"
            size="lg"
            className="w-24 bg-zinc-900 text-white rounded-medium"
          >
            Do now!
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
