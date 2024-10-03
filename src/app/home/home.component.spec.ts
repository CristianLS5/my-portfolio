import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../services/dark-mode.service';
import { LanguageService } from '../services/language.service';
import { ArticleService } from '../services/article.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  mockTranslateService,
  mockDarkModeService,
  mockArticleService,
  mockActivatedRoute,
} from '../testing/mock-services';
import { ActivatedRoute } from '@angular/router';
import { provideRouter } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let darkModeService: jasmine.SpyObj<DarkModeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot(), FontAwesomeModule],
      providers: [
        provideHttpClient(withFetch()),
        provideRouter([]),
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: DarkModeService, useValue: mockDarkModeService },
        { provide: ArticleService, useValue: mockArticleService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        LanguageService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>;
    darkModeService = TestBed.inject(
      DarkModeService
    ) as jasmine.SpyObj<DarkModeService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isDarkMode to false', () => {
    // Ensure darkModeService.isDarkMode() returns false
    darkModeService.isDarkMode.and.returnValue(false);

    // Re-create the component to trigger ngOnInit
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isDarkMode).toBeFalse();
  });

  it('should update isDarkMode when darkMode$ emits', () => {
    darkModeService.darkMode$ = of(true);
    component.ngOnInit();
    expect(component.isDarkMode).toBeTrue();
  });

  it('should return correct resume URL for English', () => {
    translateService.currentLang = 'en';
    expect(component.getResumeUrl()).toBe(
      'assets/files/Cristian_Lopez_Resume.pdf'
    );
  });

  it('should return correct resume URL for Spanish', () => {
    translateService.currentLang = 'es';
    expect(component.getResumeUrl()).toBe('assets/files/Cristian_Lopez_CV.pdf');
  });

  it('should return correct LinkedIn URL for English', () => {
    translateService.currentLang = 'en';
    expect(component.getLinkedInUrl()).toBe(
      'https://www.linkedin.com/in/cristian-l%C3%B3pez-sol%C3%A1-2b6493204/?locale=en_US'
    );
  });

  it('should return correct LinkedIn URL for Spanish', () => {
    translateService.currentLang = 'es';
    expect(component.getLinkedInUrl()).toBe(
      'https://www.linkedin.com/in/cristian-l%C3%B3pez-sol%C3%A1-2b6493204/'
    );
  });

  it('should have correct technologies array', () => {
    expect(component.technologies).toEqual([
      'a Software Developer',
      'a Front-end Specialist',
      'an Angular Enthusiastic',
      'Ironman',
    ]);
  });

  it('should render child components', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-intro')).toBeTruthy();
    expect(compiled.querySelector('app-about')).toBeTruthy();
    expect(compiled.querySelector('app-skills')).toBeTruthy();
    expect(compiled.querySelector('app-projects')).toBeTruthy();
    expect(compiled.querySelector('app-articles')).toBeTruthy();
    expect(compiled.querySelector('app-contact')).toBeTruthy();
  });

  it('should render social media links', () => {
    fixture.detectChanges();
    const socialLinksContainer = fixture.debugElement.query(
      By.css('.mt-8.flex.space-x-4')
    );
    if (socialLinksContainer) {
      const socialLinks = socialLinksContainer.queryAll(By.css('fa-icon'));
      expect(socialLinks.length).toBe(3); // LinkedIn, GitHub, and Resume download
    } else {
      fail('Social links container not found');
    }
  });

  it('should render action buttons', () => {
    const compiled = fixture.nativeElement;
    const actionButtons = compiled.querySelectorAll('.mt-8 .glow-button');
    expect(actionButtons.length).toBe(2); // View Work and Contact buttons
  });
});
