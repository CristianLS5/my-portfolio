import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Article } from '../models/article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private mockArticles: Article[] = [
    {
      id: '1',
      title: 'Angular 18 Released',
      description:
        'Exciting new features in Angular 18 including improved performance and new APIs.',
      url: 'https://blog.angular.io/angular-18',
      source: 'angular-blog',
      publishedAt: new Date('2024-03-15'),
    },
    {
      id: '2',
      title: 'TypeScript 5.4 Announcement',
      description:
        'TypeScript 5.4 brings new type checking features and compiler improvements.',
      url: 'https://github.com/microsoft/TypeScript/releases/tag/v5.4.0',
      source: 'github',
      publishedAt: new Date('2024-02-22'),
    },
    {
      id: '3',
      title: 'Web Development Trends 2024',
      description:
        'Exploring the latest trends in web development, including AI integration and WebAssembly.',
      url: 'https://twitter.com/webdevtrends/status/1234567890',
      source: 'twitter',
      publishedAt: new Date('2024-01-10'),
    },
  ];

  getArticles(): Observable<Article[]> {
    return of(this.mockArticles);
  }
}
