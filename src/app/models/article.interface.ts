export interface Article {
  id: string;
  title: string;
  description: string;
  url: string;
  source: 'twitter' | 'github' | 'angular-blog';
  publishedAt: Date;
}
