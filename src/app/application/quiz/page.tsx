"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  ChevronDown,
  FileBarChart,
  Search,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const mockData = [
  {
    id: 962,
    title: "Maximum Width Ramp",
    solution: true,
    acceptance: "51.4%",
    difficulty: "Medium",
    status: "completed",
  },
  {
    id: 1,
    title: "Two Sum",
    solution: true,
    acceptance: "53.9%",
    difficulty: "Easy",
    status: "completed",
  },
  {
    id: 2,
    title: "Add Two Numbers",
    solution: true,
    acceptance: "44.3%",
    difficulty: "Medium",
    status: "not-started",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    solution: true,
    acceptance: "35.6%",
    difficulty: "Medium",
    status: "not-started",
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    solution: true,
    acceptance: "41.7%",
    difficulty: "Hard",
    status: "not-started",
  },
  {
    id: 5,
    title: "Longest Palindromic Substring",
    solution: true,
    acceptance: "34.5%",
    difficulty: "Medium",
    status: "not-started",
  },
  {
    id: 6,
    title: "Zigzag Conversion",
    solution: true,
    acceptance: "49.5%",
    difficulty: "Medium",
    status: "not-started",
  },
];

export default function QuizManagement() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className=" mx-auto space-y-6 p-6">
        <h1 className="text-2xl font-bold">Làm Quiz</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow w-4/5"
          />
          <Button variant="outline" className="w-1/5">
            Bộ lọc
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "Lọc theo",
            "Độ khó",
            "Kỹ năng",
            "Trạng thái",
            "Nội dung chủ đề",
          ].map((label) => (
            <Select key={label}>
              <SelectGroup>
                <SelectLabel>{label}</SelectLabel>
                <SelectTrigger>
                  <SelectValue placeholder={`Chọn ${label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option">Option</SelectItem>
                </SelectContent>
              </SelectGroup>
            </Select>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 justify-center p-6">
          <Button size={"lg"} className="bg-violet-500 hover:bg-violet-600">
            <Sparkles className="mr-2 h-4 w-4" />
            Tạo quiz tự động
          </Button>
          <Button size={"lg"} variant="destructive">
            Hủy thay đổi
          </Button>
          <Button size={"lg"} variant="outline">
            Chọn ngẫu nhiên
          </Button>
          <Button size={"lg"}>
            <Search className="mr-2 h-4 w-4" />
            Tìm kiếm
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-[150px]">Solution</TableHead>
              <TableHead>Acceptance</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockData.map((quiz) => (
              <TableRow key={quiz.id}>
                <TableCell>
                  {quiz.status === "completed" ? (
                    <CheckCircle2 className="text-green-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                  )}
                </TableCell>
                <TableCell>{quiz.title}</TableCell>
                <TableCell>
                  {quiz.solution && <FileBarChart className="text-blue-500" />}
                </TableCell>
                <TableCell>{quiz.acceptance}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      quiz.difficulty === "Easy"
                        ? "bg-green-100 text-green-800"
                        : quiz.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {quiz.difficulty}
                  </span>
                </TableCell>
                <TableCell>
                  {quiz.status === "completed" ? (
                    <CheckCircle2 className="text-green-500" />
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-gray-200" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
