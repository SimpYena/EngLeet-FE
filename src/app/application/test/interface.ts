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
