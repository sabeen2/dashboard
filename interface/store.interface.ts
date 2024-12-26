export interface IDataState {
  users: any[];
  posts: any[];
  comments: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
  currentSection: string;
}
