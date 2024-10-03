import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../services/language.service';
import { BehaviorSubject } from 'rxjs';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let languageService: jasmine.SpyObj<LanguageService>;
  let languageSubject: BehaviorSubject<string>;

  beforeEach(async () => {
    const translateSpy = jasmine.createSpyObj('TranslateService', ['instant']);
    languageSubject = new BehaviorSubject<string>('en');
    const languageSpy = jasmine.createSpyObj('LanguageService', [''], {
      currentLang$: languageSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, TranslateModule.forRoot()],
      providers: [
        { provide: TranslateService, useValue: translateSpy },
        { provide: LanguageService, useValue: languageSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(
      TranslateService
    ) as jasmine.SpyObj<TranslateService>;
    languageService = TestBed.inject(
      LanguageService
    ) as jasmine.SpyObj<LanguageService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects on init', () => {
    translateService.instant.and.returnValue('Translated Title');
    fixture.detectChanges();
    expect(component.projects().length).toBe(4);
    expect(component.projects()[0].title).toBe('Translated Title');
  });

  it('should reload projects on language change', () => {
    translateService.instant.and.returnValue('Initial Title');
    fixture.detectChanges();
    expect(component.projects()[0].title).toBe('Initial Title');

    translateService.instant.and.returnValue('New Title');
    languageSubject.next('es');
    expect(component.projects()[0].title).toBe('New Title');
  });

  it('should unsubscribe from language changes on destroy', () => {
    const unsubscribeSpy = jasmine.createSpy('unsubscribe');
    component['langChangeSubscription'] = {
      unsubscribe: unsubscribeSpy,
    } as any;
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should render correct number of project items', () => {
    fixture.detectChanges();
    const projectItems =
      fixture.nativeElement.querySelectorAll('.projects__item');
    expect(projectItems.length).toBe(4);
  });

  it('should render project details correctly', () => {
    translateService.instant.and.returnValue('Test Title');
    fixture.detectChanges();
    const firstProject = fixture.nativeElement.querySelector('.projects__item');
    expect(firstProject.querySelector('.project__title').textContent).toContain(
      'Test Title'
    );
    expect(firstProject.querySelector('.project__description')).toBeTruthy();
    expect(
      firstProject.querySelectorAll('.project__tag').length
    ).toBeGreaterThan(0);
  });

  it('should apply correct background image to projects', () => {
    fixture.detectChanges();
    const firstProject = fixture.nativeElement.querySelector('.project');
    expect(firstProject.style.backgroundImage).toContain(
      'assets/images/my-portfolio-intro.png'
    );
  });

  it('should apply correct data attributes to project tags', () => {
    fixture.detectChanges();
    const firstProjectTags =
      fixture.nativeElement.querySelectorAll('.project__tag');
    expect(firstProjectTags[0].getAttribute('data-tag')).toBe('Angular');
  });
});
