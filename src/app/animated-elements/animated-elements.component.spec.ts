import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnimatedElementsComponent } from './animated-elements.component';

describe('AnimatedTextComponent', () => {
  let component: AnimatedElementsComponent;
  let fixture: ComponentFixture<AnimatedElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimatedElementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AnimatedElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
