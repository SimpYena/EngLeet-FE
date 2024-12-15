export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  topic: string;
  type: string;
  acceptance: number;
  status: number;
}

export interface Transcript {
  id: number;
  acceptance: number;
  context: string;
  difficulty: string;
  topic: string;
  answer: string[];
  score: number;
  audio_link: string | null;
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
      return "bg-green-100 text-green-800";
    case QuizDifficulty.Medium:
      return "bg-yellow-100 text-yellow-800";
    case QuizDifficulty.Hard:
      return "bg-red-100 text-red-800";
  }
};
