import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Article } from '../models/article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private githubApiUrl =
    'https://api.github.com/repos/angular/angular/releases';

  constructor(private http: HttpClient) {}

  getArticles(limit: number = 5): Observable<Article[]> {
    return this.http.get<any[]>(this.githubApiUrl).pipe(
      map((releases) =>
        releases.slice(0, limit).map((release) => ({
          id: release.id.toString(),
          title: release.name,
          releaseType: this.getReleaseType(release.tag_name),
          publishedAt: new Date(release.published_at),
          commitSummary: this.extractCommitSummary(release.body),
          isBreakingChange: this.checkForBreakingChanges(release.body),
          url: release.html_url,
        }))
      )
    );
  }

  private getReleaseType(tagName: string): string {
    if (tagName.includes('next')) return 'Pre-release';
    if (tagName.includes('rc')) return 'Release Candidate';
    if (tagName.includes('beta')) return 'Beta';
    return 'Stable Release';
  }

  private extractCommitSummary(body: string): string {
    const lines = body.split('\n');
    const commitLine = lines.find((line) => line.trim().startsWith('*'));
    return commitLine
      ? commitLine.trim().substring(1).trim()
      : 'No commit summary available';
  }

  private checkForBreakingChanges(body: string): boolean {
    return body.toLowerCase().includes('breaking change');
  }
}
