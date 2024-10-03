import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesComponent } from './articles.component';
import { ArticleService } from '../services/article.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
  UrlTree,
} from '@angular/router';
import { of } from 'rxjs';
import { Article } from '../models/article.interface';
import {
  mockTranslateService,
  mockActivatedRoute,
} from '../testing/mock-services';
import { NO_ERRORS_SCHEMA, Component, Directive, Input } from '@angular/core';

// Mock Router
class MockRouter {
  createUrlTree(): UrlTree {
    return {} as UrlTree;
  }
  serializeUrl(): string {
    return '';
  }
  events = of(null);
}

// Mock RouterLink directive
@Directive({
  selector: '[routerLink]',
  standalone: true,
})
class MockRouterLinkDirective {
  @Input() routerLink: any;
  constructor() {}
}

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let articleServiceSpy: jasmine.SpyObj<ArticleService>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;

  const mockArticles: Article[] = [
    {
      id: 1,
      title: 'Test Article 1',
      releaseType: 'Stable Release',
      isBreakingChange: false,
      commitSummary: 'Test summary 1',
      publishedAt: new Date(),
      url: 'https://test1.com',
    },
    {
      id: 2,
      title: 'Test Article 2',
      releaseType: 'Pre-release',
      isBreakingChange: true,
      commitSummary: 'Test summary 2',
      publishedAt: new Date(),
      url: 'https://test2.com',
    },
    {
      id: 3,
      title: 'Test Article 3',
      releaseType: 'Stable Release',
      isBreakingChange: false,
      commitSummary: 'Test summary 3',
      publishedAt: new Date(),
      url: 'https://test3.com',
    },
  ];

  beforeEach(() => {
    articleServiceSpy = jasmine.createSpyObj('ArticleService', ['getArticles']);
    articleServiceSpy.getArticles.and.returnValue(of([])); // Return an empty array by default
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ArticlesComponent,
        TranslateModule.forRoot(),
        RouterModule.forRoot([]),
        MockRouterLinkDirective, // Add this line
      ],
      providers: [
        { provide: ArticleService, useValue: articleServiceSpy },
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
      // Remove the declarations array
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    translateServiceSpy = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch articles on init', () => {
    articleServiceSpy.getArticles.and.returnValue(of(mockArticles));
    fixture.detectChanges();
    expect(articleServiceSpy.getArticles).toHaveBeenCalledWith(3);
    expect(component.articles()).toEqual(mockArticles);
  });

  it('should limit displayed articles based on input', () => {
    articleServiceSpy.getArticles.and.returnValue(of(mockArticles));
    component.limit = 2;
    fixture.detectChanges();
    expect(component.displayedArticles().length).toBe(2);
  });

  it('should show more button when showMoreButton is true', () => {
    articleServiceSpy.getArticles.and.returnValue(of(mockArticles));
    component.showMoreButton = true;
    fixture.detectChanges();
    const moreButton = fixture.nativeElement.querySelector('.glow-button');
    expect(moreButton).toBeTruthy();
  });

  it('should not show more button when showMoreButton is false', () => {
    articleServiceSpy.getArticles.and.returnValue(of(mockArticles));
    component.showMoreButton = false;
    fixture.detectChanges();
    const moreButton = fixture.nativeElement.querySelector('.glow-button');
    expect(moreButton).toBeFalsy();
  });

  it('should link to /news when more button is clicked', () => {
    articleServiceSpy.getArticles.and.returnValue(of(mockArticles));
    component.showMoreButton = true;
    fixture.detectChanges();
    const moreButton = fixture.nativeElement.querySelector('.glow-button');
    expect(moreButton.getAttribute('routerLink')).toBe('/news');
  });

  it('should load more articles when loadMore is called', () => {
    articleServiceSpy.getArticles.and.returnValue(of(mockArticles));
    component.limit = 2;
    fixture.detectChanges();
    expect(component.displayedArticles().length).toBe(2);
    component.loadMore();
    expect(component.limit).toBe(5);
  });

  it('should display correct article information', () => {
    articleServiceSpy.getArticles.and.returnValue(of(mockArticles));
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
    const articleElements = fixture.nativeElement.querySelectorAll('article');
    expect(articleElements.length).toBe(3);
    expect(articleElements[0].textContent).toContain('Test Article 1');
    expect(articleElements[1].textContent).toContain('Breaking Change');
    expect(articleElements[2].textContent).toContain('Test Article 3');
  });
});
