export interface Article {
  id: number;
  title: string;
  releaseType: string;
  publishedAt: Date;
  commitSummary: string;
  isBreakingChange: boolean;
  url: string;
}
