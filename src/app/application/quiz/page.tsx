"use client";
import { DataTable } from "@/components/table";
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
  CheckCircle2,
  ChevronDown,
  FileBarChart,
  Search,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  mapColorToDifficulty,
  Quiz,
  QuizDifficulty,
  QuizFilter,
} from "./interface";
import api from "../../../utils/apis/user.service";

export default function QuizManagement() {
  const DIFFICULTIES = ["Easy", "Medium", "Hard", "Expert"];
  const TOPICS = ["School", "Environment", "Culture", "Life", "Family"];
  const TYPE = ["Reading", "Writing", "Listening", "Speaking"];

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 5,
    offset: 0,
  });
  const [limit, setLimit] = useState(pagination.limit);
  const [offset, setOffset] = useState(0);
  const [difficulties, setDifficulties] = useState<string>("Difficulty");
  const [topics, setTopics] = useState<string>("Topic");

  const [keyword, setKeyword] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const [filters, setFilters] = useState<QuizFilter>({
    limit: limit,
    offset: offset,
    difficulties: difficulties,
    topics: topics,
    keyword: keyword,
  });

  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    async function fetchQuizzes() {
      setLoading(true);
      try {
        const response = await api.getQuizzes(filters);

        setQuizzes(response.items);
        setPagination({
          total: response.pagination.total,
          limit: response.pagination.limit,
          offset: response.pagination.offset,
        });
      } catch (error) {
        console.error("Failed to fetch quizzes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuizzes();
  }, [filters]);

  const columns = [
    {
      header: "Title",
      accessor: (row: Quiz) => row.title,
    },
    {
      header: "Acceptance",
      accessor: (row: Quiz) => row.acceptance,
    },
    {
      header: "Difficulty",
      accessor: (row: Quiz) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${mapColorToDifficulty(
            row.difficulty as QuizDifficulty
          )}`}
        >
          {row.difficulty}
        </span>
      ),
    },
    {
      header: "Topic",
      accessor: (row: Quiz) => (
        <span className="flex items-center">
          <FileBarChart className="h-4 w-4 mr-2" />
          {row.topic}
        </span>
      ),
    },
    {
      header: "Type",
      accessor: (row: Quiz) => (
        <span className="flex items-center">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          {row.type}
        </span>
      ),
    },
  ];

  const handlePaginationChange = (e: { limit: number; offset: number }) => {
    setFilters((prev) => ({
      ...prev,
      limit: e.limit,
      offset: e.offset,
    }));
  };

  const resetFilter = () => {
    setFilters({
      ...filters,
      difficulties: undefined,
      topics: undefined,
      keyword: undefined,
      type: undefined,
    });

    setDifficulties("Difficulty");
    setTopics("Topic");
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className=" mx-auto space-y-6 p-6">
        <h1 className="text-4xl font-bold">Quizz</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search"
            value={keyword}
            onChange={(e) => updateFilter("keyword", e.target.value)}
            className="flex-grow w-4/5 h-12"
          />
          <Button variant="default" className="w-1/5  h-12">
            Filter
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Select
            onValueChange={(value) => updateFilter("difficulties", [value])}
          >
            <SelectTrigger>
              <SelectValue placeholder={difficulties} />
            </SelectTrigger>
            <SelectContent>
              {DIFFICULTIES.map((diff) => (
                <SelectItem key={diff} value={diff}>
                  {diff}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            onValueChange={(value) => {
              updateFilter("topics", [value]);
              setTopics(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder={topics} />
            </SelectTrigger>
            <SelectContent>
              {TOPICS.map((topic) => (
                <SelectItem key={topic} value={topic}>
                  {topic}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => updateFilter("type", [value])}>
            <SelectTrigger>
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {TYPE.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap gap-4 justify-center p-6">
          <Button size={"lg"} className="bg-violet-500 hover:bg-violet-600">
            <Sparkles className="mr-2 h-4 w-4" />
            Create random quizz
          </Button>
          <Button
            size={"lg"}
            variant="destructive"
            onClick={() => resetFilter()}
          >
            Hủy thay đổi
          </Button>
          <Button size={"lg"} variant="outline">
            Pick random quizz
          </Button>
          <Button size={"lg"}>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>

        <DataTable
          data={quizzes}
          columns={columns}
          pagination={{
            total: pagination.total,
            limit: pagination.limit,
            offset: pagination.offset,
          }}
          onPaginationChange={handlePaginationChange}
          loading={loading}
        />
      </div>
    </div>
  );
}
