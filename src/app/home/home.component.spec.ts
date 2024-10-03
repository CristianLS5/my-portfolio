import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../services/dark-mode.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let darkModeService: jasmine.SpyObj<DarkModeService>;

  beforeEach(async () => {
    const translateServiceSpy = jasmine.createSpyObj(
      'TranslateService',
      ['use'],
      { currentLang: 'en' }
    );
    const darkModeServiceSpy = jasmine.createSpyObj('DarkModeService', [''], {
      darkMode$: of(false),
    });

    await TestBed.configureTestingModule({
      imports: [HomeComponent, TranslateModule.forRoot()],
      providers: [
        { provide: TranslateService, useValue: translateServiceSpy },
        { provide: DarkModeService, useValue: darkModeServiceSpy },
      ],
      schemas: [NO_ERRORS_SCHEMA], // This allows us to ignore unknown elements and attributes
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
    const compiled = fixture.nativeElement;
    const socialLinks = compiled.querySelectorAll('.mt-8 .flex.space-x-4 a');
    expect(socialLinks.length).toBe(3); // LinkedIn, GitHub, and Resume download
  });

  it('should render action buttons', () => {
    const compiled = fixture.nativeElement;
    const actionButtons = compiled.querySelectorAll('.mt-8 .glow-button');
    expect(actionButtons.length).toBe(2); // View Work and Contact buttons
  });
});
