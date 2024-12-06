import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/app/application/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/app/application/ui/card";
import { Label } from "@/app/application/ui/label";
import { Input } from "@/app/application/ui/input";
import { Textarea } from "@/app/application/ui/textarea";
import { Button } from "@/app/application/ui/button";

export default function Component() {
  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold">Comments</h2>
        <p className="text-muted-foreground">
          Share your thoughts and feedback on this article.
        </p>
      </div>
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">2 days ago</div>
            </div>
            <div>
              This is a great article! I learned a lot about the history of joke
              taxation. Can't wait to read more.
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Avatar className="w-10 h-10 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>JA</AvatarFallback>
          </Avatar>
          <div className="grid gap-1.5">
            <div className="flex items-center gap-2">
              <div className="font-medium">Jane Appleseed</div>
              <div className="text-xs text-muted-foreground">1 week ago</div>
            </div>
            <div>
              Fascinating read! I had no idea about the Joke Tax Chronicles.
              Looking forward to more content like this.
            </div>
          </div>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Add a Comment</CardTitle>
          <CardDescription>
            Share your thoughts and feedback on this article.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                placeholder="Write your comment"
                className="min-h-[100px]"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
