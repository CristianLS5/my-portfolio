import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DarkModeService } from './services/dark-mode.service';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';
import {
  mockTranslateService,
  mockActivatedRoute,
  mockDarkModeService,
} from './testing/mock-services';
import { BehaviorSubject } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let darkModeService: jasmine.SpyObj<DarkModeService>;
  let darkModeSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, TranslateModule.forRoot()],
      providers: [
        { provide: TranslateService, useValue: mockTranslateService },
        { provide: DarkModeService, useValue: mockDarkModeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        provideRouter([]),
        provideLocationMocks(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    darkModeService = TestBed.inject(
      DarkModeService
    ) as jasmine.SpyObj<DarkModeService>;
    darkModeSubject = new BehaviorSubject<boolean>(false);
    (darkModeService.darkMode$ as any) = darkModeSubject.asObservable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add dark class to html element when dark mode is enabled', () => {
    darkModeSubject.next(true);
    component.ngOnInit();
    fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBeTrue();
  });

  it('should remove dark class from html element when dark mode is disabled', () => {
    darkModeSubject.next(false);
    component.ngOnInit();
    fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBeFalse();
  });

  it('should subscribe to dark mode changes', () => {
    component.ngOnInit();
    darkModeSubject.next(true);
    fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBeTrue();
    darkModeSubject.next(false);
    fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBeFalse();
  });

  it('should toggle dark mode when toggleDarkMode is called', () => {
    component.toggleDarkMode();
    expect(darkModeService.toggleDarkMode).toHaveBeenCalled();
  });
});
