"use client";
import { DataTable } from "@/components/table";
import { Input } from "@/app/application/ui/input";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { CheckCircle2, FileBarChart, Shuffle, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  mapColorToDifficulty,
  Quiz,
  QuizDifficulty,
  QuizFilter
} from "@/types/quiz.type";
import api from "../../../utils/apis/user.service";
import useTotalPagesStore from "@/stores/quizTotal";
import { useRouter } from "next/navigation";
import _ from "lodash";

export default function QuizManagement() {
  const DIFFICULTIES = [
    // { key: 'None', label: 'None', isDisabled: true },
    { key: "Easy", label: "Easy" },
    { key: "Medium", label: "Medium" },
    { key: "Hard", label: "Hard" }
  ];
  const TOPICS = [
    // { key: 'None', label: 'None', isDisabled: true },
    { key: "School", label: "School" },
    { key: "Environment", label: "Environment" },
    { key: "Culture", label: "Culture" },
    { key: "Life", label: "Life" },
    { key: "Family", label: "Family" },
    { key: "Technology", label: "Technology" },
    { key: "History", label: "History" },
    { key: "Work", label: "Work" },
    { key: "Science", label: "Science" }
  ];
  const TYPE = [
    // { key: 'None', label: 'None', isDisabled: true },
    { key: "Reading", label: "Reading" },
    { key: "Listening", label: "Listening" }
  ];

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 5,
    offset: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [filters, setFilters] = useState<QuizFilter>({
    limit: 5,
    offset: 0,
    difficulties: undefined,
    topics: undefined,
    keyword: "",
    skills: undefined
  });

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const setTotalPages = useTotalPagesStore((state) => state.setTotalPages);
  async function fetchQuizzes(limit = 5, offset = 0) {
    setLoading(true);
    try {
      const f = _.omitBy(
        { ...filters, limit, offset },
        (value) => value === undefined || value === null || value === ""
      );
      const response = await api.getQuizzes(f);
      setQuizzes(response.items);
      setPagination({
        total: response.pagination.total,
        limit: response.pagination.limit,
        offset: response.pagination.offset
      });

      if (response.pagination.total !== pagination.total) {
        setTotalPages(response.pagination.total);
      }
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const pickRandomQuiz = () => {
    router.push(
      `/application/quiz/${Math.floor(Math.random() * pagination.total)}`
    );
  };

  const columns = [
    {
      header: "Status",
      accessor: (row: Quiz) =>
        row.status == 1 ? (
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        ) : null
    },
    {
      header: "Title",
      accessor: (row: Quiz) => row.title
    },
    {
      header: "Acceptance",
      accessor: (row: Quiz) => row.acceptance
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
      )
    },
    {
      header: "Topic",
      accessor: (row: Quiz) => (
        <span className="flex items-center">
          <FileBarChart className="h-4 w-4 mr-2" />
          {row.topic}
        </span>
      )
    },
    {
      header: "Type",
      accessor: (row: Quiz) => (
        <span className="flex items-center">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          {row.type}
        </span>
      )
    },
    {
      header: "Action",
      accessor: (row: Quiz) => (
        <Button
          onPress={() => {
            router.push(`/application/quiz/${row.id}`);
          }}
          variant="solid"
          color="primary"
        >
          Start
        </Button>
      )
    }
  ];

  const handlePaginationChange = async (e: {
    limit: number;
    offset: number;
  }) => {
    setFilters((prev) => ({
      ...prev,
      limit: e.limit,
      offset: e.offset
    }));

    await fetchQuizzes(e.limit, e.offset);
  };

  const resetFilter = () => {
    setFilters((prev) => ({
      ...prev,
      difficulties: "",
      topics: "",
      keyword: "",
      skills: ""
    }));
  };

  return (
    // <div className="container mx-auto p-6 space-y-6 bg-white overflow-y-auto h-screen">
    <div className=" mx-auto space-y-6 p-6">
      <h1 className="text-4xl font-bold">Quizz</h1>
      <div className="flex gap-4">
        <Input
          placeholder="Search"
          value={filters.keyword}
          onChange={(e) => updateFilter("keyword", e.target.value)}
          className="flex-grow w-4/5 h-12"
        />
        <Button
          className="h-12"
          onPress={() => fetchQuizzes(filters.limit, filters.offset)}
          size={"md"}
          color="primary"
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Select
          // disabledKeys={["None"]}
          aria-label="difficulties"
          placeholder="Select difficulties"
          value={filters.difficulties}
          onChange={(e) => updateFilter("difficulties", e.target.value)}
        >
          {DIFFICULTIES.map((diff) => (
            <SelectItem key={diff.key}>{diff.label}</SelectItem>
          ))}
        </Select>

        <Select
          // disabledKeys={["None"]}
          aria-label="topics"
          placeholder="Select topics"
          value={filters.topics}
          onChange={(e) => updateFilter("topics", e.target.value)}
        >
          {TOPICS.map((topic) => (
            <SelectItem key={topic.key}>{topic.label}</SelectItem>
          ))}
        </Select>

        <Select
          // disabledKeys={["None"]}
          aria-label="skills"
          placeholder="Select skills"
          value={filters.skills}
          onChange={(e) => updateFilter("skills", e.target.value)}
        >
          {TYPE.map((type) => (
            <SelectItem  key={type.key}>{type.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-wrap gap-4 justify-end">
        {/* <Button size={"md"} variant="solid" color="danger" onPress={() => resetFilter()}>
          <X className="mr-2 h-4 w-4" />
          Clear filter
        </Button> */}
        <Button className="text-white" size={"md"} variant="solid" color="success" onPress={() => pickRandomQuiz()}>
          <Shuffle className="mr-2 h-4 w-4" />
          Pick random quizz
        </Button>
      </div>

      <DataTable
        data={quizzes}
        columns={columns}
        pagination={{
          total: pagination.total,
          limit: pagination.limit,
          offset: pagination.offset
        }}
        onPaginationChange={handlePaginationChange}
        loading={loading}
      />
    </div>
    // </div>
  );
}
