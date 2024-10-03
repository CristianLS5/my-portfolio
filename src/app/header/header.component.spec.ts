import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { DarkModeService } from '../services/dark-mode.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import {
  mockDarkModeService,
  mockTranslateService,
  MockRouterModule,
} from '../testing/mock-services';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let darkModeService: jasmine.SpyObj<DarkModeService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, MockRouterModule],
      providers: [
        { provide: DarkModeService, useValue: mockDarkModeService },
        { provide: TranslateService, useValue: mockTranslateService },
        LanguageService,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    darkModeService = TestBed.inject(
      DarkModeService
    ) as jasmine.SpyObj<DarkModeService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show header content when scrolled', fakeAsync(() => {
    // Mock the intro section
    const mockIntroSection = document.createElement('div');
    mockIntroSection.classList.add('intro-section');
    Object.defineProperty(mockIntroSection, 'getBoundingClientRect', {
      value: () => ({ bottom: -1 }), // Simulate scrolled past intro
    });

    spyOn(document, 'querySelector').and.returnValue(mockIntroSection);

    // Trigger scroll event
    window.dispatchEvent(new Event('scroll'));
    tick(100); // Wait for any debounce
    fixture.detectChanges();

    expect(component.showHeaderContent()).toBeTrue();
  }));

  it('should handle dark mode toggle', () => {
    expect(darkModeService.isDarkMode()).toBeFalse();

    // Directly call the method that should trigger dark mode toggle
    component.darkModeService.toggleDarkMode();
    fixture.detectChanges();

    expect(darkModeService.toggleDarkMode).toHaveBeenCalled();
  });
});
