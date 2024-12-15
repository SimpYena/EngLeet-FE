"use client";
// import { Button } from "@/app/application/ui/button";
import {
  ClipboardList,
  Filter,
  SortDesc,
  BrainCircuit,
  ClipboardPlus
} from "lucide-react";
import { QuizCard } from "./quizCard";
import { AiCard } from "./aiCard";
import { useEffect, useState } from "react";
import { Tests, TestFilter } from "./interface";
import { useRouter } from "next/navigation";
import useTotalPagesStore from "@/stores/quizTotal";
import api from "../../../utils/apis/user.service";
import testService from "@/utils/services/test.service";
import { Card, CardContent } from "../ui/card";
import { Button } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { aborted } from "util";

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
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [tests, setTests] = useState<Tests[]>([]);
  const [generatedTests, setGeneratedTests] = useState<Tests[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 6,
    offset: 0
  });
  const [type, setType] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [limit, setLimit] = useState(pagination.limit);
  const [loadingGenerating, setLoadingGenerating] = useState(false);
  const [offset, setOffset] = useState(0);
  const [difficulties, setDifficulties] = useState<string>();
  const [keyword, setKeyword] = useState<string>();
  const [categories, setCategories] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [filters, setFilters] = useState<TestFilter>({
    limit: limit,
    offset,
    difficulties,
    keyword,
    categories
  });

  const handleDoNowClick = (testId) => {
    router.push(`test/${testId}`);
  };

  const handleDoNowAIClick = (testId) => {
    router.push(`test/${testId}/ai`);
  }

  const generateTest = async () => {
    setLoadingGenerating(true);
    if (type === "Listening") {
      await testService.generateListeningTest(topic, difficulty);
    } else {
      await testService.generateReadingTest(topic, difficulty);
    }

    const list = await api.getGeneratedTests();
    setGeneratedTests(list);

    setLoadingGenerating(false);
    onClose();
  };

  useEffect(() => {
    const fetchGenTests = async () => {
      setLoading(true);
      const list = await api.getGeneratedTests();
      setGeneratedTests(list);
      setLoading(false);
    };

    fetchGenTests();
  }, []);

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
          offset: response.pagination.offset
        });

        if (response.pagination.total !== pagination.total) {
          setTotalPages(response.pagination.total);
        }
      } catch (error) {
        console.error("Failed to fetch tests:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTests();
  }, [filters, setTotalPages]);

  return (
    <div className="container mx-auto p-6 space-y-6 bg-white overflow-y-auto h-screen bg-white">
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
              description={card.description}
              onDoNowClick={() => handleDoNowClick("" + card.id)}
            />
          ))}
        </div>

        {/* AI generate test */}
        <div className="flex items-center justify-between pt-[30px]">
          <div className="w-full flex items-center justify-between gap-4">
            <div className="gap-2 text-lg flex items-center flex-row">
              <BrainCircuit className="h-4 w-4" />
              <h3 className="font-bold">Generated Tests</h3>
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
          {!loading && (
            <Card
              className="bg-white cursor-pointer h-[300px]"
              onClick={onOpen}
            >
              <CardContent className="space-y-4 h-full">
                <div className="flex flex-col justify-center items-center h-full">
                  <ClipboardPlus className="h-8 w-8 text-primary" />
                  <h2 className="text-xl font-semibold">Generate new test</h2>
                </div>
              </CardContent>
            </Card>
          )}
          {generatedTests.map((card, index) => (
            <AiCard
              key={index}
              {...card}
              description={card.description}
              onDoNowClick={() =>
                handleDoNowAIClick(card.id)
              }
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Generate test
              </ModalHeader>
              <ModalBody>
                <Select
                  className="w-full mb-2"
                  selectedKeys={[type]}
                  aria-label="Type"
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Select test type"
                >
                  {types.map((type) => (
                    <SelectItem key={type.key}>{type.label}</SelectItem>
                  ))}
                </Select>
                <Select
                  className="w-full mb-2"
                  selectedKeys={[topic]}
                  aria-label="Topic"
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Select a topic"
                >
                  {topics.map((topic) => (
                    <SelectItem key={topic.key}>{topic.label}</SelectItem>
                  ))}
                </Select>
                <Select
                  className="w-full mb-2"
                  aria-label="difficulty"
                  selectedKeys={[difficulty]}
                  onChange={(e) => setDifficulty(e.target.value)}
                  placeholder="Select a difficulty"
                >
                  {diffs.map((difficulty) => (
                    <SelectItem key={difficulty.key}>
                      {difficulty.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  isLoading={loadingGenerating}
                  onPress={generateTest}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
