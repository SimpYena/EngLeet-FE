export interface Tests {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  acceptance: number;
  image_url: string;
}
export interface TestFilter {
  limit?: number;
  offset?: number;
  difficulties?: string[] | string;
  keyword?: string;
  categories?: string;
}
export interface TestDetails {
    title: string;
    duration: string;
    skill: string;
    difficulty: string;
    description: string;
    image_url: string;
}
export interface Question {
  id: number;
  question: string;
  answer: string[];
}

export interface SectionContext {
  id: number;
  passage: string;
  question: Question[];
}

export interface Item {
  sectionContext: SectionContext[];
}

export interface APIResponse {
  data: {
    items: Item[];
  };
}