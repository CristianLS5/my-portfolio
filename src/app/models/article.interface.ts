export interface Article {
  id: string;
  title: string;
  releaseType: string;
  publishedAt: Date;
  commitSummary: string;
  isBreakingChange: boolean;
  url: string;
}
