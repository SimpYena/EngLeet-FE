export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  topic: string | number;
  type: string;
  acceptance: number;
  status: number;
}

export interface Transcript {
  type?: string;
  id?: number;
  title?: string;
  acceptance?: number;
  context?: string;
  difficulty?: string;
  topic?: string;
  answer?: string[];
  correct_answer?: string;
  score?: number;
  audio_link?: string | null;
  audio?: File | null;
  previousQuizz?: Transcript;
  nextQuizz?: Transcript;

}

export interface QuizAttempt {
  status: "Correct" | "Incorrect";
  score: number;
  attempt: number;
}
export interface QuizFilter {
  limit?: number;
  offset?: number;
  difficulties?: string[] | string
  topics?: string[] | string
  keyword?: string;
  skills?: string[] | string;
  status?: string;
}

export enum QuizDifficulty {
  Easy = "Easy",
  Medium = "Medium",
  Hard = "Hard",
}

export const mapColorToDifficulty = (difficulty: QuizDifficulty) => {
  switch (difficulty) {
    case QuizDifficulty.Easy:
      return "bg-green-100 text-success";
    case QuizDifficulty.Medium:
      return "bg-warning-100 text-warning";
    case QuizDifficulty.Hard:
      return "bg-red-100 text-danger";
  }
};
