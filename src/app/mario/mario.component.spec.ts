import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarioComponent } from './mario.component';
import { DarkModeService } from '../services/dark-mode.service';
import { BehaviorSubject } from 'rxjs';

describe('MarioComponent', () => {
  let component: MarioComponent;
  let fixture: ComponentFixture<MarioComponent>;
  let darkModeService: jasmine.SpyObj<DarkModeService>;
  let darkModeSubject: BehaviorSubject<boolean>;

  beforeEach(async () => {
    darkModeSubject = new BehaviorSubject<boolean>(false);
    const darkModeServiceSpy = jasmine.createSpyObj('DarkModeService', [''], {
      darkMode$: darkModeSubject.asObservable(),
    });

    await TestBed.configureTestingModule({
      imports: [MarioComponent],
      providers: [{ provide: DarkModeService, useValue: darkModeServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(MarioComponent);
    component = fixture.componentInstance;
    darkModeService = TestBed.inject(
      DarkModeService
    ) as jasmine.SpyObj<DarkModeService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize game elements', () => {
    spyOn(component as any, 'initGame');
    fixture.detectChanges();
    expect((component as any).initGame).toHaveBeenCalled();
  });

  it('should update isDarkMode when darkMode$ emits', () => {
    fixture.detectChanges();
    expect(component.isDarkMode).toBeFalse();
    darkModeSubject.next(true);
    expect(component.isDarkMode).toBeTrue();
  });

  it('should initialize obstacles', () => {
    fixture.detectChanges();
    expect(component.obstacles().length).toBe(5);
  });

  it('should initialize birds', () => {
    fixture.detectChanges();
    expect(component.birds().length).toBe(3);
  });

  it('should initialize clouds', () => {
    fixture.detectChanges();
    expect(component.clouds().length).toBe(4);
  });

  it('should initialize stars', () => {
    fixture.detectChanges();
    expect(component.stars().length).toBe(50);
  });

  it('should start game loop', () => {
    spyOn(window, 'requestAnimationFrame').and.callThrough();
    fixture.detectChanges();
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  it('should move obstacles in game loop', () => {
    fixture.detectChanges();
    const initialPosition = component.obstacles()[0].position;
    (component as any).gameLoop();
    expect(component.obstacles()[0].position).toBeLessThan(initialPosition);
  });

  it('should move birds in game loop', () => {
    fixture.detectChanges();
    const initialX = component.birds()[0].x;
    (component as any).gameLoop();
    expect(component.birds()[0].x).not.toEqual(initialX);
  });

  it('should move clouds in game loop', () => {
    fixture.detectChanges();
    const initialX = component.clouds()[0].x;
    (component as any).gameLoop();
    expect(component.clouds()[0].x).not.toEqual(initialX);
  });

  it('should cancel animation frame on destroy', () => {
    spyOn(window, 'cancelAnimationFrame');
    fixture.detectChanges();
    component.ngOnDestroy();
    expect(window.cancelAnimationFrame).toHaveBeenCalled();
  });

  it('should unsubscribe from darkMode$ on destroy', () => {
    const unsubscribeSpy = jasmine.createSpy('unsubscribe');
    (component as any).darkModeSubscription = { unsubscribe: unsubscribeSpy };
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
