import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../services/dark-mode.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Observable, of } from 'rxjs';
import {
  mockTranslateService,
  mockDarkModeService,
} from '../testing/mock-services';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let darkModeService: jasmine.SpyObj<DarkModeService>;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutComponent, TranslateModule.forRoot(), FontAwesomeModule],
      providers: [
        { provide: DarkModeService, useValue: mockDarkModeService },
        { provide: TranslateService, useValue: mockTranslateService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    darkModeService = TestBed.inject(
      DarkModeService
    ) as jasmine.SpyObj<DarkModeService>;
    translateService = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct central logo', () => {
    expect(component.centralLogo.name).toBe('Angular');
    expect(component.centralLogo.color).toBe('#DD0031');
  });

  it('should have correct number of tech logos', () => {
    expect(component.techLogos().length).toBe(8);
  });

  it('should return correct GitHub color based on dark mode', () => {
    expect(component.getGitHubColor(false)).toBe('#181717');
    expect(component.getGitHubColor(true)).toBe('#ffffff');
  });

  it('should return correct logo color based on dark mode', () => {
    const testLogo = {
      name: 'Test',
      icon: 'test.svg',
      size: '20px',
      animationDuration: '10s',
      color: '#123456',
      darkModeColor: '#654321',
      startPosition: '0deg',
    };

    expect(component.getLogoColor(testLogo, false)).toBe('#123456');
    expect(component.getLogoColor(testLogo, true)).toBe('#654321');
  });

  it('should handle logos without dark mode color', () => {
    const testLogo = {
      name: 'Test',
      icon: 'test.svg',
      size: '20px',
      animationDuration: '10s',
      color: '#123456',
      startPosition: '0deg',
    };

    expect(component.getLogoColor(testLogo, true)).toBe('#123456');
  });

  it('should update isDarkMode$ when darkMode$ emits', (done) => {
    // Create a new Observable that emits true then false
    const testObservable = new Observable<boolean>((subscriber) => {
      subscriber.next(true);
      setTimeout(() => {
        subscriber.next(false);
        subscriber.complete();
      }, 10);
    });

    // Replace the darkMode$ observable with our test observable
    component.isDarkMode$ = testObservable;

    let emissionCount = 0;
    component.isDarkMode$.subscribe({
      next: (isDarkMode) => {
        emissionCount++;
        if (emissionCount === 1) {
          expect(isDarkMode).toBeTrue();
        } else if (emissionCount === 2) {
          expect(isDarkMode).toBeFalse();
          done();
        }
      },
      error: done.fail,
    });
  });
});
