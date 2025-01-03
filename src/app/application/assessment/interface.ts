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
  choosenAnswer?: string;
  correct_answer?: string;
}

export interface SectionContext {
  id: number;
  passage?: string;
  audio_link?: string;
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

export interface TestPayload {
  items: Item[];
}

export interface TestSubmitPayload {
  question_id?: number;
  answer?: string;
}
