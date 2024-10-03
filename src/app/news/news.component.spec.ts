import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsComponent } from './news.component';
import { ArticleService } from '../services/article.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { Article } from '../models/article.interface';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;

  const mockArticles: Article[] = [
    {
      id: 1,
      title: 'Article 1',
      releaseType: 'Stable Release',
      isBreakingChange: false,
      commitSummary: 'Summary 1',
      publishedAt: new Date('2023-06-01T00:00:00Z'),
      url: 'https://example.com/1',
    },
    {
      id: 2,
      title: 'Article 2',
      releaseType: 'Pre-release',
      isBreakingChange: true,
      commitSummary: 'Summary 2',
      publishedAt: new Date('2023-06-02T00:00:00Z'),
      url: 'https://example.com/2',
    },
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ArticleService', ['getArticles']);

    await TestBed.configureTestingModule({
      imports: [NewsComponent, TranslateModule.forRoot()],
      providers: [{ provide: ArticleService, useValue: spy }, TranslateService],
    }).compileComponents();

    articleServiceSpy = TestBed.inject(
      ArticleService
    ) as jasmine.SpyObj<ArticleService>;
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch articles on init', () => {
    articleServiceSpy.getArticles.and.returnValue(of(mockArticles));
    fixture.detectChanges();
    expect(articleServiceSpy.getArticles).toHaveBeenCalledWith(9);
    expect(component.articles).toEqual(mockArticles);
  });

  it('should sort articles by publishedAt date in descending order', () => {
    const unsortedArticles = [...mockArticles].reverse();
    articleServiceSpy.getArticles.and.returnValue(of(unsortedArticles));
    fixture.detectChanges();
    expect(component.articles[0].id).toBe(2);
    expect(component.articles[1].id).toBe(1);
  });

  it('should handle error when fetching articles', () => {
    const errorMessage = 'Error fetching articles';
    articleServiceSpy.getArticles.and.returnValue(
      throwError(() => new Error(errorMessage))
    );
    spyOn(console, 'error');
    fixture.detectChanges();
    expect(console.error).toHaveBeenCalledWith(
      'Error fetching GitHub releases:',
      jasmine.any(Error)
    );
  });

  it('should render articles correctly', () => {
    articleServiceSpy.getArticles.and.returnValue(of(mockArticles));
    fixture.detectChanges();
    const articleElements = fixture.nativeElement.querySelectorAll('article');
    expect(articleElements.length).toBe(2);
    expect(articleElements[0].textContent).toContain('Article 2');
    expect(articleElements[1].textContent).toContain('Article 1');
  });
});
