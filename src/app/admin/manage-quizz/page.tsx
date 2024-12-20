"use client";
import { DataTable } from "./table";
import {
  Select,
  SelectItem,
  Button,
  useDisclosure,
  Input
} from "@nextui-org/react";
import {
  CheckCircle2,
  ChevronDown,
  ClipboardPlus,
  FileBarChart,
  Pencil,
  Search,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  mapColorToDifficulty,
  Quiz,
  QuizDifficulty,
  QuizFilter
} from "@/types/quiz.type";
import api from "../../../utils/apis/user.service";
import useTotalPagesStore from "@/stores/quizTotal";
import _ from "lodash";
import ModalComponent from "./modal";

const DIFFICULTIES = [
  { key: "Easy", label: "Easy" },
  { key: "Medium", label: "Medium" },
  { key: "Hard", label: "Hard" }
];
const TOPICS = [
  { key: 1, label: "Life" },
  { key: 2, label: "School" },
  { key: 3, label: "Environment" },
  { key: 4, label: "Culture" },
  { key: 5, label: "Technology" },
  { key: 6, label: "History" },
  { key: 7, label: "Sports" },
  { key: 8, label: "Work" },
  { key: 9, label: "Science" },
  { key: 10, label: "Family" },
];
const TYPE = [
  { key: "Reading", label: "Reading" },
  { key: "Listening", label: "Listening" }
];

export default function QuizManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 5,
    offset: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
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

  const openAddQuizzModal = (quiz?: Quiz) => {
    setSelectedQuiz(quiz || null);
    onOpen();
  };

  const columns = [
    {
      header: "ID",
      accessor: (row: Quiz) => row.id
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
      <h1 className="text-4xl font-bold">Manage quizz</h1>
      <div className="flex gap-4">
        <Input
          placeholder="Search"
          value={filters.keyword}
          onChange={(e) => updateFilter("keyword", e.target.value)}
          className="flex-grow w-4/5 h-12"
        />
        <Button variant="solid" color="primary" className="w-1/5  h-12">
          Filter
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Select
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
          aria-label="skills"
          placeholder="Select skills"
          value={filters.skills}
          onChange={(e) => updateFilter("skills", e.target.value)}
        >
          {TYPE.map((type) => (
            <SelectItem key={type.key}>{type.label}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-wrap gap-4 justify-end py-4">
        <Button
          size="md"
          variant="solid"
          color="success"
          className="text-white"
          onClick={() => openAddQuizzModal()}
        >
          <ClipboardPlus className="mr-2 h-4 w-4" />
          Add new quizz
        </Button>
        <Button
          size="md"
          variant="solid"
          color="danger"
          onClick={() => resetFilter()}
        >
          <X className="mr-2 h-4 w-4" />
          Clear filter
        </Button>
        <Button
          onClick={() => fetchQuizzes(filters.limit, filters.offset)}
          variant="solid"
          color="primary"
          size="md"
        >
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
          offset: pagination.offset
        }}
        onPaginationChange={handlePaginationChange}
        loading={loading}
      />
      <ModalComponent onOpen={onOpen} onClose={onClose} isOpen={isOpen} selectedQuiz={selectedQuiz} />
    </div>
    // </div>
  );
}
