import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../services/dark-mode.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let darkModeService: jasmine.SpyObj<DarkModeService>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let darkModeSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    darkModeSubject = new BehaviorSubject<boolean>(false);
    const darkModeServiceSpy = jasmine.createSpyObj('DarkModeService', [''], {
      darkMode$: darkModeSubject.asObservable(),
    });

    const translateServiceSpy = jasmine.createSpyObj('TranslateService', [
      'instant',
    ]);

    await TestBed.configureTestingModule({
      imports: [AboutComponent, TranslateModule.forRoot(), FontAwesomeModule],
      providers: [
        { provide: DarkModeService, useValue: darkModeServiceSpy },
        { provide: TranslateService, useValue: translateServiceSpy },
      ],
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

  it('should react to dark mode changes', (done: DoneFn) => {
    darkModeSubject.next(true);
    fixture.detectChanges();

    component.isDarkMode$.subscribe((isDark) => {
      expect(isDark).withContext('Dark mode should be true').toBeTrue();
      done();
    });
  });
});
