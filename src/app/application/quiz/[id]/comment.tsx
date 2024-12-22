import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/app/application/ui/card";
import { Label } from "@/app/application/ui/label";
import { Textarea } from "@/app/application/ui/textarea";
import { Button } from "@/app/application/ui/button";
import { useEffect, useState } from "react";
import apiService from "@/utils/apis/user.service";
import { useParams } from "next/navigation";
import { Avatar } from "@nextui-org/react";
import { useUser } from "@/provider/AuthContent";

export default function Component() {
  const { id } = useParams();
  const user = useUser();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await apiService.getQuizzReview(id);
        setComments(response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchComments();
  }, []);

  const postComment = async () => {
    try {
      await apiService.submitQuizzReview(id, comment);
      setComments([
        ...comments,
        {
          description: comment,
          user: {
            full_name: user.full_name,
            image_url: user.image_url
          }
        }
      ]);
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Others' thoughts about this quiz</CardTitle>
          <CardDescription>
            Share your thoughts and feedback on this article.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 mb-4">
            <div className="space-y-6">
              {comments.map((comment) => (
                <>
                  <div className="flex items-start gap-4" key={comment.id}>
                    <div className="flex gap-2">
                      <Avatar src={comment.user.image_url} />
                    </div>
                    <div className="grid gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="font-bold">
                          {comment.user.full_name}
                        </div>
                      </div>
                      <div>{comment.description}</div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="comment">Add a comment</Label>
              <Textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment"
                className="min-h-[100px]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    postComment();
                  }
                }}
              />
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" onClick={postComment}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
