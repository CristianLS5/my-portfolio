import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroComponent } from './intro.component';
import { DarkModeService } from '../services/dark-mode.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MarioComponent } from '../mario/mario.component';
import { BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('IntroComponent', () => {
  let component: IntroComponent;
  let fixture: ComponentFixture<IntroComponent>;
  let darkModeService: jasmine.SpyObj<DarkModeService>;
  let darkModeSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    darkModeSubject = new BehaviorSubject<boolean>(false);
    const darkModeServiceSpy = jasmine.createSpyObj('DarkModeService', [''], {
      darkMode$: darkModeSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [IntroComponent, TranslateModule.forRoot()],
      providers: [
        { provide: DarkModeService, useValue: darkModeServiceSpy },
        TranslateService,
      ],
      schemas: [NO_ERRORS_SCHEMA], // This allows us to ignore unknown elements and attributes
    }).compileComponents();

    fixture = TestBed.createComponent(IntroComponent);
    component = fixture.componentInstance;
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
    darkModeSubject.next(true);
    expect(component.isDarkMode).toBeTrue();
  });

  it('should unsubscribe from darkMode$ on component destroy', () => {
    const unsubscribeSpy = spyOn(
      component['darkModeSubscription'] as any,
      'unsubscribe'
    );
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should render the Mario component', () => {
    const marioComponent = fixture.nativeElement.querySelector('app-mario');
    expect(marioComponent).toBeTruthy();
  });

  it('should pass isDarkMode to Mario component', () => {
    const marioComponent = fixture.nativeElement.querySelector('app-mario');
    expect(marioComponent.getAttribute('ng-reflect-is-dark-mode')).toBe(
      'false'
    );

    darkModeSubject.next(true);
    fixture.detectChanges();

    expect(marioComponent.getAttribute('ng-reflect-is-dark-mode')).toBe('true');
  });

  it('should render the intro section with correct classes', () => {
    const introSection = fixture.nativeElement.querySelector('.intro-section');
    expect(introSection).toBeTruthy();
    expect(introSection.classList.contains('h-screen')).toBeTrue();
    expect(introSection.classList.contains('relative')).toBeTrue();
    expect(introSection.classList.contains('overflow-hidden')).toBeTrue();
  });

  it('should apply correct border classes based on dark mode', () => {
    const introSection = fixture.nativeElement.querySelector('.intro-section');
    expect(introSection.classList.contains('border-white')).toBeTrue();
    expect(introSection.classList.contains('border-gray-800')).toBeFalse();

    darkModeSubject.next(true);
    fixture.detectChanges();

    expect(introSection.classList.contains('border-white')).toBeFalse();
    expect(introSection.classList.contains('border-gray-800')).toBeTrue();
  });

  it('should render the intro content', () => {
    const titleElement = fixture.nativeElement.querySelector('h1');
    const descriptionElement = fixture.nativeElement.querySelector('p');

    expect(titleElement).toBeTruthy();
    expect(descriptionElement).toBeTruthy();
  });
});
