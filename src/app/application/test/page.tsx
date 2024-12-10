"use client";
import { Button } from "@/app/application/ui/button";
import { ClipboardList, Filter, SortDesc } from "lucide-react";
import { QuizCard } from "./quizCard";
import { useEffect, useState } from "react";
import { Tests, TestFilter } from "./interface";
import { useRouter } from "next/navigation";
import useTotalPagesStore from "@/stores/quizTotal";
import api from "../../../utils/apis/user.service";

export default function Test() {
  const DIFFICULTIES = ["Easy", "Medium", "Hard"];
  const CATEGORIES = ["TOEIC", "IELTS"];
  const [tests, setTests] = useState<Tests[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 6,
    offset: 0,
  });
  const [limit, setLimit] = useState(pagination.limit);
  const [offset, setOffset] = useState(0);
  const [difficulties, setDifficulties] = useState<string>(null);
  const [keyword, setKeyword] = useState<string>();
  const [categories, setCategories] = useState<string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [filters, setFilters] = useState<TestFilter>({
    limit: limit,
    offset,
    difficulties,
    keyword,
    categories,
  });

  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleDoNowClick = (testId: number) => {
    router.push(`./test/${testId}`);
  };

  const setTotalPages = useTotalPagesStore((state) => state.setTotalPages);
  useEffect(() => {
    async function fetchTests() {
      setLoading(true);
      try {
        const response = await api.getTest(filters);

        setTests(response.items);
        setPagination({
          total: response.pagination.total,
          limit: response.pagination.limit,
          offset: response.pagination.offset,
        });

        if (response.pagination.total !== pagination.total) {
          setTotalPages(response.pagination.total);
        }
        console.log(tests);
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTests();
  }, [filters, setTotalPages]);
  const truncateText = (text: string, limit: number) => {
    if (text.length > limit) {
      return `${text.slice(0, limit)}...`;
    }
    return text;
  };
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mx-auto space-y-6 p-6">
        <h1 className="text-4xl font-bold">Practice Test</h1>

        <div className="flex items-center justify-between ">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="gap-2 text-lg flex items-center flex-row">
              <ClipboardList className="h-4 w-4" />
              <h3 className="font-bold">All Tests</h3>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="gap-2 text-lg">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 text-lg">
                <SortDesc className="h-4 w-4" />
                Sort By
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tests.map((card, index) => (
            <QuizCard
              key={index}
              {...card}
              description={truncateText(card.description, 100)}
              onDoNowClick={()=> handleDoNowClick(card.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
