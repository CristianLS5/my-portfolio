import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResumeComponent } from './resume.component';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';

describe('ResumeComponent', () => {
  let component: ResumeComponent;
  let fixture: ComponentFixture<ResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ResumeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize experiences', () => {
    expect(component.experiences().length).toBeGreaterThan(0);
  });

  it('should return correct year from date string', () => {
    expect(component.getYear('January 2024')).toBe('2024');
    expect(component.getYear('2024')).toBe('2024');
  });

  it('should render correct number of experience cards', () => {
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('.experience-card'));
    expect(cards.length).toBe(component.experiences().length);
  });

  it('should render experience details correctly', () => {
    fixture.detectChanges();
    const firstExperience = component.experiences()[0];
    const firstCard = fixture.debugElement.query(By.css('.experience-card'));

    expect(firstCard.query(By.css('h3')).nativeElement.textContent).toContain(
      firstExperience.role
    );
    expect(firstCard.query(By.css('h4')).nativeElement.textContent).toContain(
      firstExperience.company
    );
    expect(
      firstCard.query(By.css('p.text-sm')).nativeElement.textContent
    ).toContain(firstExperience.startDate);
    expect(
      firstCard.query(By.css('p.text-sm')).nativeElement.textContent
    ).toContain(firstExperience.endDate);
  });

  it('should render correct number of tasks for each experience', () => {
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('.experience-card'));
    cards.forEach((card, index) => {
      const tasks = card.queryAll(By.css('li'));
      expect(tasks.length).toBe(component.experiences()[index].tasks.length);
    });
  });

  it('should alternate card alignment', () => {
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('.experience-card'));
    cards.forEach((card, index) => {
      if (index % 2 === 0) {
        expect(card.classes['flex-row-reverse']).toBeFalsy();
      } else {
        expect(card.classes['flex-row-reverse']).toBeTruthy();
      }
    });
  });

  it('should call observeExperienceCards after view init', () => {
    spyOn<any>(component, 'observeExperienceCards');
    component.ngAfterViewInit();
    expect(component['observeExperienceCards']).toHaveBeenCalled();
  });

  it('should use IntersectionObserver to add show class', (done) => {
    let intersectionCallback: IntersectionObserverCallback | undefined;

    const mockIntersectionObserver = jasmine
      .createSpy('IntersectionObserver')
      .and.callFake(function (
        this: any,
        callback: IntersectionObserverCallback
      ) {
        intersectionCallback = callback;
        return {
          observe: jasmine.createSpy('observe'),
          unobserve: jasmine.createSpy('unobserve'),
          disconnect: jasmine.createSpy('disconnect'),
          root: null,
          rootMargin: '',
          thresholds: [],
          takeRecords: () => [],
        };
      });

    spyOn(window, 'IntersectionObserver').and.callFake(
      mockIntersectionObserver
    );

    fixture.detectChanges();
    component.ngAfterViewInit();

    expect(window.IntersectionObserver).toHaveBeenCalled();

    const observerInstance =
      mockIntersectionObserver.calls.mostRecent().returnValue;
    expect(observerInstance.observe).toHaveBeenCalledTimes(
      component.experiences().length
    );

    // Simulate intersection
    const mockEntry: IntersectionObserverEntry = {
      isIntersecting: true,
      target: document.createElement('div'),
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRatio: 0,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: 0,
    };

    if (intersectionCallback) {
      intersectionCallback(
        [mockEntry],
        observerInstance as IntersectionObserver
      );

      setTimeout(() => {
        expect(mockEntry.target.classList.contains('show')).toBeTrue();
        done();
      }, 150);
    } else {
      fail('IntersectionObserver callback was not set');
    }
  });
});
