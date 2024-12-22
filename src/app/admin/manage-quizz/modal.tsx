import {
  Button,
  Input,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Modal,
  Spinner
} from "@nextui-org/react";
import { useState } from "react";
import { X } from "lucide-react";
import testService from "@/utils/services/test.service";

enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard"
}

enum Type {
  READING = "Reading",
  LISTENING = "Listening"
}

const DIFFICULTIES = [
  { key: "Easy", label: Difficulty.EASY },
  { key: "Medium", label: Difficulty.MEDIUM },
  { key: "Hard", label: Difficulty.HARD }
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
  { key: 10, label: "Family" }
];
const TYPE = [
  { key: "Reading", label: "Reading" },
  { key: "Listening", label: "Listening" }
];

type formType = {
  title: string;
  acceptance: number;
  difficulty: Difficulty;
  topic: number;
  type: Type;
  context: string;
  answer: string[];
  correct_answer: string;
  score: number;
  audio: File | null;
};

export default function ModalComponent({
  isOpen,
  onOpen,
  onClose,
  selectedQuiz
}: {
  isOpen: any;
  onOpen: any;
  onClose: any;
  selectedQuiz: any;
}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    acceptance: "",
    difficulty: "",
    topic: "",
    type: "",
    context: "",
    answer: "",
    correct_answer: "",
    score: "",
    audio: ""
  });
  const [form, setForm] = useState<formType>({
    title: "",
    acceptance: 0,
    difficulty: Difficulty.EASY,
    topic: 0,
    type: Type.READING,
    context: "",
    answer: ["", ""],
    correct_answer: "",
    score: 0,
    audio: null
  });

  const findKeyInTopic = (topic) => {
    const key = TOPICS.find((item) => item.label === topic);
    return key ? key.key : 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let submitForm = { ...form };
    if (submitForm.type === Type.READING) {
      if (!submitForm.context.trim()) {
        setErrors((prev) => ({
          ...prev,
          context: "Context cannot be empty"
        }));
        return;
      }
    }

    if (submitForm.type === Type.LISTENING) {
      if (!submitForm.audio) {
        setErrors((prev) => ({
          ...prev,
          audio: "Audio cannot be empty"
        }));
        return;
      }
    }

    submitForm = {
      ...submitForm,
      answer: submitForm.answer.filter((item) => item.trim() !== ""),
      acceptance: +submitForm.acceptance,
      score: +submitForm.score,
      topic: +submitForm.topic
    };

    testService.createQuiz(submitForm).then((response) => {});
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setForm((prev) => ({
        ...prev,
        audio: e.target.files[0]
      }));
      return;
    }

    const key = e.target.name;
    let value = e.target.value;
    if (key === "acceptance" || key === "score") {
      value = +value;
      if (isNaN(value)) {
        setErrors((prev) => ({
          ...prev,
          [key]: "Please enter a number"
        }));
        return;
      }
    }

    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addAnswer = () => {
    setForm((prev) => ({
      ...prev,
      answer: [...prev.answer, ""]
    }));
  };

  const removeQuestionItem = (index) => {
    setForm((prev) => ({
      ...prev,
      answer: prev.answer.filter((_, i) => i !== index)
    }));
  };

  const onQuestionChange = (index, value) => {
    setForm((prev) => ({
      ...prev,
      answer: prev.answer.map((item, i) => (i === index ? value : item))
    }));
  };
  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <form
            className="w-full justify-center items-center w-full space-y-4"
            // onReset={() => setSubmitted(null)}
            onSubmit={onSubmit}
          >
            <ModalHeader className="flex flex-col gap-1">
              {selectedQuiz ? "Modify Quizz" : "Create New Quizz"}
            </ModalHeader>
            <ModalBody>
              {!loading ? (<div className="flex flex-col gap-4">
                {/* input type */}
                <div className="flex flex-row justify-between items-center mb-2">
                  <label
                    htmlFor="type"
                    className="flex text-[14px] font-medium"
                  >
                    Type <span className="text-danger">*</span>
                  </label>
                  <Select
                    isRequired
                    aria-label="type"
                    className="max-w-[350px]"
                    name="type"
                    placeholder="Quizz type"
                    defaultSelectedKeys={[form.type]}
                    onChange={handleChange}
                  >
                    {TYPE.map((item) => {
                      return (
                        <SelectItem key={item.key} value={item.key}>
                          {item.label}
                        </SelectItem>
                      );
                    })}
                  </Select>
                </div>

                {/* input title */}
                <div className="flex flex-row justify-between items-center mb-2">
                  <label
                    htmlFor="title"
                    className="flex text-[14px] font-medium"
                  >
                    Title <span className="text-danger">*</span>
                  </label>
                  <Input
                    isRequired
                    aria-label="title"
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing) {
                        return "Title cannot empty";
                      }
                      return errors.title;
                    }}
                    value={form.title}
                    onChange={handleChange}
                    className="max-w-[350px]"
                    name="title"
                    placeholder="Enter a title"
                  />
                </div>

                {/* input difficulty */}
                <div className="flex flex-row justify-between items-center mb-2">
                  <label
                    htmlFor="difficulty"
                    className="flex text-[14px] font-medium"
                  >
                    Difficulty <span className="text-danger">*</span>
                  </label>
                  <Select
                    aria-label="difficulty"
                    isRequired
                    name="difficulty"
                    placeholder="Select difficulty"
                    className="max-w-[350px]"
                    defaultSelectedKeys={[form.difficulty]}
                    value={form.difficulty}
                    onChange={handleChange}
                  >
                    {DIFFICULTIES.map((item) => {
                      return (
                        <SelectItem key={item.key} value={item.key}>
                          {item.label}
                        </SelectItem>
                      );
                    })}
                  </Select>
                </div>

                {/* input topic */}
                <div className="flex flex-row justify-between items-center mb-2">
                  <label
                    htmlFor="topic"
                    className="flex text-[14px] font-medium"
                  >
                    Topic <span className="text-danger">*</span>
                  </label>
                  <Select
                    aria-label="topic"
                    isRequired
                    name="topic"
                    placeholder="Quizz topic"
                    className="max-w-[350px]"
                    defaultSelectedKeys={[findKeyInTopic(form.topic)]}
                    onChange={handleChange}
                  >
                    {TOPICS.map((item) => {
                      return (
                        <SelectItem key={item.key} value={item.key}>
                          {item.label}
                        </SelectItem>
                      );
                    })}
                  </Select>
                </div>

                {/* input difficulty */}
                <div className="flex flex-row justify-between items-center mb-2">
                  <label
                    htmlFor="title"
                    className="flex text-[14px] font-medium"
                  >
                    Context
                    <span className="text-danger">*</span>
                  </label>
                  <Input
                    aria-label="context"
                    isRequired
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing) {
                        return "Please fill this field";
                      }
                    }}
                    className="max-w-[350px]"
                    value={form.context}
                    onChange={handleChange}
                    name="context"
                    placeholder="Enter context"
                  />
                </div>

                {form.type === Type.LISTENING && (
                  <div className="flex flex-row justify-between items-center mb-2">
                    <label
                      htmlFor="title"
                      className="flex text-[14px] font-medium"
                    >
                      Audio
                      <span className="text-danger">*</span>
                    </label>
                    <Input
                      aria-label="audio"
                      type="file"
                      isRequired
                      errorMessage={({ validationDetails }) => {
                        if (validationDetails.valueMissing) {
                          return "Please fill this field";
                        }
                      }}
                      className="max-w-[350px]"
                      onChange={handleChange}
                      name="audio"
                    />
                  </div>
                )}

                <div className="flex flex-row justify-between mb-2">
                  <label
                    htmlFor="title"
                    className="flex text-[14px] font-medium"
                  >
                    Answers <span className="text-danger">*</span>
                  </label>
                  <div className="flex-1 max-w-[350px]">
                    <div className="mt-2 ">
                      {form.answer?.map((answer, index) => (
                        <Input
                          key={index}
                          isRequired
                          className="mb-3"
                          placeholder={`Answer #${index + 1} `}
                          value={answer}
                          aria-label={`Answer #${index + 1} `}
                          onChange={(e) =>
                            onQuestionChange(index, e.target.value)
                          }
                          endContent={
                            <button
                              type="button"
                              className="focus:outline-none"
                              aria-label="clear input"
                              onClick={() => removeQuestionItem(index)}
                            >
                              <X className="w-4 h-4" />
                            </button>
                          }
                        />
                      ))}
                    </div>
                    <Button className="mt-2" onClick={addAnswer}>
                      Add answer
                    </Button>
                  </div>
                </div>

                {/* input correct answer */}
                <div className="flex flex-row justify-between items-center mb-2">
                  <label
                    htmlFor="correct_answer"
                    className="flex text-[14px] font-medium"
                  >
                    Correct answer <span className="text-danger">*</span>
                  </label>
                  <Input
                    isRequired
                    aria-label="correct answer"
                    errorMessage={({ validationDetails }) => {
                      if (validationDetails.valueMissing) {
                        return "Please fill this field";
                      }
                    }}
                    className="max-w-[350px]"
                    value={form.correct_answer}
                    onChange={handleChange}
                    name="correct_answer"
                    placeholder="Enter correct answer"
                  />
                </div>

                {/* input acceptance */}
                <div className="flex flex-row justify-between items-center mb-2">
                  <label
                    htmlFor="acceptance"
                    className="flex text-[14px] font-medium"
                  >
                    Acceptance <span className="text-danger">*</span>
                  </label>
                  <Input
                    isRequired
                    value={`${form.acceptance}`}
                    onChange={handleChange}
                    aria-label="acceptance"
                    className="max-w-[350px]"
                    name="acceptance"
                    placeholder="Enter number of acceptance"
                  />
                </div>

                {/* input score */}
                <div className="flex flex-row justify-between items-center mb-2">
                  <label
                    htmlFor="score"
                    className="flex text-[14px] font-medium"
                  >
                    Score <span className="text-danger">*</span>
                  </label>
                  <Input
                    isRequired
                    value={`${form.score}`}
                    aria-label="score"
                    onChange={handleChange}
                    className="max-w-[350px]"
                    name="score"
                    placeholder="Enter quizz score"
                  />
                </div>
              </div>) : (<Spinner size="md" />)}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit">
                {selectedQuiz ? "Update" : "Create"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
