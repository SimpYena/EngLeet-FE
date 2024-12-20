"use client";
import {
  ClipboardList,
  ClipboardPlus,
  Filter,
  Plus,
  SortDesc
} from "lucide-react";
import { QuizCard } from "./quizCard";
import { useEffect, useState } from "react";
import { Tests, TestFilter } from "@/types/test.type";
import { useRouter } from "next/navigation";
import useTotalPagesStore from "@/stores/quizTotal";
import api from "../../../utils/apis/user.service";
import testService from "@/utils/services/test.service";
import { Button, Card, useDisclosure } from "@nextui-org/react";
import { CardContent } from "./ui/card";
import ModalComponent from "./modal";

const diffs = [
  { key: "Easy", label: "Easy" },
  { key: "Medium", label: "Medium" },
  { key: "Hard", label: "Hard" }
];

const topics = [
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

const types = [
  { key: "Listening", label: "Listening" },
  { key: "reading", label: "Reading" }
];

export default function Test() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tests, setTests] = useState<Tests[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 6,
    offset: 0
  });
  const [limit, setLimit] = useState(pagination.limit);
  const [offset, setOffset] = useState(0);
  const [difficulties, setDifficulties] = useState<string>();
  const [keyword, setKeyword] = useState<string>();
  const [categories, setCategories] = useState<string>();
  const router = useRouter();
  const [filters, setFilters] = useState<TestFilter>({
    limit: limit,
    offset,
    difficulties,
    keyword,
    categories
  });

  const setTotalPages = useTotalPagesStore((state) => state.setTotalPages);
  useEffect(() => {
    async function fetchTests() {
      try {
        const response = await api.getTest(filters);

        setTests(response.items);
        setPagination({
          total: response.pagination.total,
          limit: response.pagination.limit,
          offset: response.pagination.offset
        });

        if (response.pagination.total !== pagination.total) {
          setTotalPages(response.pagination.total);
        }
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      }
    }

    fetchTests();
  }, [filters, setTotalPages]);

  const createTest = () => {
    onOpen();
  };

  const onCreateSuccess = async () => {
    const response = await api.getTest(filters);

    setTests(response.items);
  };

  return (
    <>
      <div className="mx-auto space-y-6 p-6">
        <h1 className="text-4xl font-bold">Practice Test</h1>

        <div className="flex items-center justify-between ">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="gap-2 text-lg flex items-center flex-row">
              <ClipboardList className="h-4 w-4" />
              <h3 className="font-bold">All Tests</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white cursor-pointer h-[300px]">
            <CardContent className="space-y-4 h-full" onClick={createTest}>
              <div className="flex flex-col justify-center items-center h-full">
                <ClipboardPlus className="h-8 w-8 text-primary" />
                <h2 className="text-xl font-semibold">Create new test</h2>
              </div>
            </CardContent>
          </Card>
          {tests.map((card, index) => (
            <QuizCard key={index} {...card} description={card.description} />
          ))}
        </div>
      </div>
      <ModalComponent
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        onCreateSuccess={onCreateSuccess}
      />
    </>
  );
}
