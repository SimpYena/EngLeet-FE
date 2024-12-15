import { create } from "zustand";

interface Test {
  id?: number,
  question?: string,
  answer?: string[],
  correctAnswer?: string,
  choosenAnswer?: string,
}

interface AssessmentState {
  assessmentTest: Test[];
  result: {
    score: string;
    level: number;
  }
  setAssessmentTest: (tests: Test[]) => void;
  setResult: (result) => void,
}

const useAssessmentStore = create<AssessmentState>((set) => ({
  assessmentTest: [],
  result: {
    score: '',
    level: 1
  },
  setAssessmentTest: (test) => set({ assessmentTest: test }),
  setResult: (result) => set({ result }),
}));

export default useAssessmentStore;
