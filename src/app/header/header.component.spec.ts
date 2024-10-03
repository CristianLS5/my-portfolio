import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DarkModeService } from '../services/dark-mode.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;
  let darkModeService: DarkModeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, TranslateModule.forRoot(), FontAwesomeModule],
      providers: [TranslateService, DarkModeService],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    darkModeService = TestBed.inject(DarkModeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle language', () => {
    const initialLang = translateService.currentLang;
    component.toggleLanguage();
    expect(translateService.currentLang).not.toBe(initialLang);
  });

  it('should get correct resume URL based on language', () => {
    translateService.use('en');
    expect(component.getResumeUrl())
      .withContext('English resume')
      .toContain('Cristian_Lopez_Resume.pdf');
    translateService.use('es');
    expect(component.getResumeUrl())
      .withContext('Spanish resume')
      .toContain('Cristian_Lopez_CV.pdf');
  });

  it('should show header content when scrolled', () => {
    const windowMock = { scrollY: 100 } as Window & typeof globalThis;
    spyOnProperty(window, 'scrollY').and.returnValue(windowMock.scrollY);
    expect(component.showHeaderContent())
      .withContext('Header content visibility')
      .toBeTrue();
  });

  it('should handle dark mode toggle', (done: DoneFn) => {
    darkModeService.darkMode$.subscribe((isDark) => {
      expect(isDark).withContext('Dark mode state').toBeTrue();
      done();
    });
    component.darkModeService.toggleDarkMode();
  });
});
