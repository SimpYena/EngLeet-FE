export interface Quiz {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  topic: string;
  type: string;
  acceptance: number;
}

export interface QuizFilter {
  limit?: number;
  offset?: number;
  difficulties?: string[] | string;
  topics?: string[] | string;
  keyword?: string;
  type?: string;
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
