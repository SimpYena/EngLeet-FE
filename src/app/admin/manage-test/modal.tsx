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
  Spinner,
  Textarea
} from "@nextui-org/react";
import { useState } from "react";
import { X } from "lucide-react";
import testService from "@/utils/services/test.service";
import { useEffect } from "react";
import userService from "@/utils/apis/user.service";
import toast from "@/components/toast";

enum Difficulty {
  EASY = "Easy",
  MEDIUM = "Medium",
  HARD = "Hard"
}

const DIFFICULTIES = [
  { key: "Easy", label: Difficulty.EASY },
  { key: "Medium", label: Difficulty.MEDIUM },
  { key: "Hard", label: Difficulty.HARD }
];

const CATEGORIES = [
  { key: 1, label: "TOEIC" },
  { key: 2, label: "IELTS" }
];

type formType = {
  title: string;
  description: string;
  category: number;
  difficulty: Difficulty;
  image: File | null;
};

export default function ModalComponent({
  isOpen,
  onOpen,
  onClose,
  onCreateSuccess
}: {
  isOpen: any;
  onOpen: any;
  onClose: any;
  onCreateSuccess: any;
}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    image: ""
  });
  const [form, setForm] = useState<formType>({
    title: "",
    description: "",
    difficulty: Difficulty.EASY,
    category: 0,
    image: null
  });

  const findKeyInCategory = (cate) => {
    const key = CATEGORIES.find((item) => item.label === cate);
    return key ? key.key : 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let submitForm = { ...form };

    submitForm = {
      ...submitForm,
      category: +submitForm.category
    };

    testService.createTest(submitForm).then((response) => {
      onCreateSuccess();
      toast.success("Create test successfully");
      onClose();
    });
  };

  const handleChange = (e) => {
    if (e.target.files) {
      setForm((prev) => ({
        ...prev,
        image: e.target.files[0]
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
              Create New Quizz
            </ModalHeader>
            <ModalBody>
              {!loading ? (
                <div className="flex flex-col gap-4">
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

                  {/* input category */}
                  <div className="flex flex-row justify-between items-center mb-2">
                    <label
                      htmlFor="category"
                      className="flex text-[14px] font-medium"
                    >
                      Category <span className="text-danger">*</span>
                    </label>
                    <Select
                      aria-label="category"
                      isRequired
                      name="category"
                      placeholder="Test category"
                      className="max-w-[350px]"
                      defaultSelectedKeys={[findKeyInCategory(form.category)]}
                      onChange={handleChange}
                    >
                      {CATEGORIES.map((item) => {
                        return (
                          <SelectItem key={item.key} value={item.key}>
                            {item.label}
                          </SelectItem>
                        );
                      })}
                    </Select>
                  </div>

                  {/* input correct answer */}
                  <div className="flex flex-row justify-between items-center mb-2">
                    <label
                      htmlFor="correct_answer"
                      className="flex text-[14px] font-medium"
                    >
                      Description <span className="text-danger">*</span>
                    </label>
                    <Textarea
                      isRequired
                      aria-label="Description"
                      value={form.description}
                      onChange={handleChange}
                      name="description"
                      className="max-w-[350px]"
                      placeholder="Enter your description"
                    />
                  </div>

                  {/* input image */}
                  <div className="flex flex-row justify-between items-center mb-2">
                    <label
                      htmlFor="image"
                      className="flex text-[14px] font-medium"
                    >
                      Image
                      <span className="text-danger">*</span>
                    </label>
                    <Input
                      isRequired
                      aria-label="image"
                      type="file"
                      className="max-w-[350px]"
                      onChange={handleChange}
                      name="image"
                    />
                  </div>
                </div>
              ) : (
                <Spinner size="md" />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
